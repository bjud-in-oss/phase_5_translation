
import { useRef, useState, useCallback, useEffect } from 'react';
import { OUTPUT_WORKLET_CODE } from '../utils/workerScripts';
import { useAppStore } from '../stores/useAppStore';

const SAMPLE_RATE = 24000;

interface AudioEngineState {
    isReady: boolean;
    audioContext: AudioContext | null;
}

// GLOBAL REF SINGLETON
const globalBufferStatus = { samples: 0, ms: 0, speed: 1.0, active: true };

export function useAudioEngine() {
    const [state, setState] = useState<AudioEngineState>({ isReady: false, audioContext: null });
    
    const audioCtxRef = useRef<AudioContext | null>(null);
    const workletNodeRef = useRef<AudioWorkletNode | null>(null);
    const workletBlobUrlRef = useRef<string | null>(null);

    // Phase 3 Nodes
    const micStreamRef = useRef<MediaStream | null>(null);
    const micSourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const compressorNodeRef = useRef<DynamicsCompressorNode | null>(null);
    const aiLocalGainNodeRef = useRef<GainNode | null>(null);
    const radiomixDestinationRef = useRef<MediaStreamAudioDestinationNode | null>(null);
    const mergerNodeRef = useRef<ChannelMergerNode | null>(null);

    const hardwareMode = useAppStore(state => state.hardwareMode);
    const [isLocalAiAudioEnabled, setIsLocalAiAudioEnabled] = useState(false);

    const toggleLocalAiAudio = useCallback(() => {
        setIsLocalAiAudioEnabled(prev => !prev);
    }, []);

    const buildRoutingGraph = useCallback(() => {
        const ctx = audioCtxRef.current;
        const aiNode = workletNodeRef.current;
        if (!ctx || !aiNode) return;

        // Clean up old routing
        try { aiNode.disconnect(); } catch(e) {}
        try { micSourceNodeRef.current?.disconnect(); } catch(e) {}
        try { compressorNodeRef.current?.disconnect(); } catch(e) {}
        try { aiLocalGainNodeRef.current?.disconnect(); } catch(e) {}
        try { mergerNodeRef.current?.disconnect(); } catch(e) {}

        // Create nodes if they don't exist
        if (!compressorNodeRef.current) {
            const comp = ctx.createDynamicsCompressor();
            comp.threshold.value = -30;
            comp.knee.value = 10;
            comp.ratio.value = 12;
            comp.attack.value = 0.01;
            comp.release.value = 0.25;
            compressorNodeRef.current = comp;
        }
        if (!aiLocalGainNodeRef.current) aiLocalGainNodeRef.current = ctx.createGain();
        if (!radiomixDestinationRef.current) radiomixDestinationRef.current = ctx.createMediaStreamDestination();
        
        const compressor = compressorNodeRef.current;
        const aiLocalGain = aiLocalGainNodeRef.current;
        const radiomixDest = radiomixDestinationRef.current;

        // 1. Ducking Logic (DynamicsCompressorNode)
        // Connect Mic to Compressor
        if (micSourceNodeRef.current) {
            micSourceNodeRef.current.connect(compressor);
        }
        // Connect AI node to Compressor
        aiNode.connect(compressor);

        // 2. Radiomix = Compressor Output
        compressor.connect(radiomixDest);

        // 3. Physical Playback & The Pro Split
        if (hardwareMode === 'simple') {
            // Simple Mode: AI Voice -> Local GainNode -> Destination
            aiNode.connect(aiLocalGain);
            aiLocalGain.connect(ctx.destination);
            
            // Ensure gain is set correctly
            aiLocalGain.gain.value = isLocalAiAudioEnabled ? 1.0 : 0.0;
            
            // Radiomix MUST NOT go to local destination (Feedback protection)
        } else if (hardwareMode === 'pro') {
            // Pro Mode: ChannelMergerNode(2)
            if (!mergerNodeRef.current) {
                mergerNodeRef.current = ctx.createChannelMerger(2);
            }
            const merger = mergerNodeRef.current;
            
            // Input 0 (Left): AI Voice -> PA & AEC-ref
            aiNode.connect(merger, 0, 0);
            
            // Input 1 (Right): Radiomix (Compressor Output) -> FM transmitter
            compressor.connect(merger, 0, 1);

            merger.connect(ctx.destination);
        }

        console.log(`[AudioEngine] Routing updated for ${hardwareMode} mode. Feedback protection active.`);
    }, [hardwareMode, isLocalAiAudioEnabled]);

    // Update local AI gain when toggled
    useEffect(() => {
        if (aiLocalGainNodeRef.current && audioCtxRef.current) {
            const target = isLocalAiAudioEnabled ? 1.0 : 0.0;
            aiLocalGainNodeRef.current.gain.setTargetAtTime(target, audioCtxRef.current.currentTime, 0.05);
        }
    }, [isLocalAiAudioEnabled]);

    // Rebuild routing when hardwareMode changes
    useEffect(() => {
        if (state.isReady) {
            buildRoutingGraph();
        }
    }, [hardwareMode, buildRoutingGraph, state.isReady]);

    const setMicrophoneStream = useCallback((stream: MediaStream) => {
        micStreamRef.current = stream;
        
        // Apply AEC constraints based on current hardware mode
        const track = stream.getAudioTracks()[0];
        if (track) {
            const isPro = useAppStore.getState().hardwareMode === 'pro';
            track.applyConstraints({
                echoCancellation: !isPro,
                noiseSuppression: !isPro,
                autoGainControl: !isPro
            }).catch(e => console.error("[AudioEngine] Failed to apply AEC constraints", e));
        }

        if (audioCtxRef.current) {
            if (micSourceNodeRef.current) {
                micSourceNodeRef.current.disconnect();
            }
            micSourceNodeRef.current = audioCtxRef.current.createMediaStreamSource(stream);
            buildRoutingGraph();
        }
    }, [buildRoutingGraph]);

    const initAudio = useCallback(async () => {
        if (audioCtxRef.current) return;

        try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ 
                sampleRate: SAMPLE_RATE,
                latencyHint: 'interactive'
            });
            audioCtxRef.current = ctx;

            // Load Worklet from Blob
            if (!workletBlobUrlRef.current) {
                const blob = new Blob([OUTPUT_WORKLET_CODE], { type: 'application/javascript' });
                workletBlobUrlRef.current = URL.createObjectURL(blob);
            }
            
            await ctx.audioWorklet.addModule(workletBlobUrlRef.current!);

            const workletNode = new AudioWorkletNode(ctx, 'audio-processor');
            
            // Listen for status updates from the audio thread
            workletNode.port.onmessage = (e) => {
                const msg = e.data;
                
                if (msg.type === 'STATUS') {
                    globalBufferStatus.samples = msg.samples;
                    globalBufferStatus.ms = msg.ms;
                    globalBufferStatus.speed = msg.speed || 1.0;
                } 
                else if (msg.type === 'VOICE_STOP') {
                    if (ctx.state === 'running') {
                        console.log("[AudioEngine] 🌙 Idle detected. Suspending to save battery.");
                        ctx.suspend().then(() => {
                            globalBufferStatus.active = false;
                        });
                    }
                }
                else if (msg.type === 'VOICE_START') {
                    if (ctx.state === 'suspended') {
                        console.log("[AudioEngine] ☀️ Voice detected. Waking up.");
                        ctx.resume().then(() => {
                            globalBufferStatus.active = true;
                        });
                    }
                }
            };

            workletNodeRef.current = workletNode;

            // Build the initial routing graph
            buildRoutingGraph();

            setState({ isReady: true, audioContext: ctx });
            console.log("[AudioEngine] Initialized 24kHz Pipeline (Phase 3 Routing Active)");

        } catch (error) {
            console.error("[AudioEngine] Init Failed:", error);
        }
    }, [buildRoutingGraph]);

    const pushPCM = useCallback(async (base64Data: string) => {
        if (!workletNodeRef.current) return;

        if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
            await audioCtxRef.current.resume();
            globalBufferStatus.active = true;
        }

        const binaryString = atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const int16View = new Int16Array(bytes.buffer);
        
        const float32Data = new Float32Array(int16View.length);
        for (let i = 0; i < int16View.length; i++) {
            float32Data[i] = int16View[i] / 32768.0;
        }

        workletNodeRef.current.port.postMessage({
            type: 'PUSH',
            data: float32Data
        }, [float32Data.buffer]); 

    }, []);

    const getBufferStatus = useCallback(() => {
        return globalBufferStatus;
    }, []);

    const resumeContext = useCallback(async () => {
        if (audioCtxRef.current?.state === 'suspended') {
            await audioCtxRef.current.resume();
            globalBufferStatus.active = true;
        }
    }, []);

    // Export the Radiomix stream for SFU
    const getRadiomixStream = useCallback(() => {
        return radiomixDestinationRef.current?.stream || null;
    }, []);

    // Cleanup
    useEffect(() => {
        return () => {
            if (workletBlobUrlRef.current) {
                URL.revokeObjectURL(workletBlobUrlRef.current);
            }
            try { mergerNodeRef.current?.disconnect(); } catch(e) {}
            try { radiomixDestinationRef.current?.disconnect(); } catch(e) {}
            try { compressorNodeRef.current?.disconnect(); } catch(e) {}
            try { aiLocalGainNodeRef.current?.disconnect(); } catch(e) {}
            try { micSourceNodeRef.current?.disconnect(); } catch(e) {}
            
            audioCtxRef.current?.close().catch(e => console.warn("Context close warning:", e));
        };
    }, []);

    return {
        initAudio,
        pushPCM,
        getBufferStatus,
        resumeContext,
        isReady: state.isReady,
        audioContext: state.audioContext,
        setMicrophoneStream,
        getRadiomixStream,
        isLocalAiAudioEnabled,
        toggleLocalAiAudio
    };
}
