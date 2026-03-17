import { useState, useCallback, useRef } from 'react';

export type SFUStatus = 'disconnected' | 'connecting' | 'connected';

export function useCloudflareSFU(roomId: string | null, onMessage?: (msg: any) => void) {
  const [status, setStatus] = useState<SFUStatus>('disconnected');
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  const subscribeToTrack = useCallback(async (remoteSessionId: string, trackName: string) => {
    const pc = peerConnectionRef.current;
    const sessionId = sessionIdRef.current;
    const appId = import.meta.env.VITE_CLOUDFLARE_APP_ID;
    const appSecret = import.meta.env.VITE_CLOUDFLARE_APP_SECRET;

    if (!pc || !sessionId || !appId || !appSecret) {
      console.error("[SFU] Cannot subscribe to track: missing connection or credentials");
      return;
    }

    try {
      pc.addTransceiver('audio', { direction: 'recvonly' });

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const response = await fetch(`https://rtc.live.cloudflare.com/v1/apps/${appId}/sessions/${sessionId}/tracks/new`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${appSecret}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionDescription: {
            type: offer.type,
            sdp: offer.sdp
          },
          tracks: [
            {
              location: "remote",
              sessionId: remoteSessionId,
              trackName: trackName
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Cloudflare API error subscribing to track: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data && data.sessionDescription) {
        await pc.setRemoteDescription(new RTCSessionDescription(data.sessionDescription));
        console.log("[SFU] Successfully subscribed to remote audio track");
      } else {
        throw new Error("No sessionDescription in Cloudflare response for track subscribe");
      }
    } catch (error) {
      console.error("[SFU] Failed to subscribe to track:", error);
    }
  }, []);

  const connect = useCallback(async () => {
    if (!roomId) return;
    
    const appId = import.meta.env.VITE_CLOUDFLARE_APP_ID;
    const appSecret = import.meta.env.VITE_CLOUDFLARE_APP_SECRET;

    if (!appId || !appSecret) {
      console.error("[SFU] Cloudflare credentials missing in environment variables");
      return;
    }

    try {
      setStatus('connecting');

      const pc = new RTCPeerConnection({
        iceServers: [
          {
            urls: 'stun:stun.cloudflare.com:3478'
          }
        ]
      });
      peerConnectionRef.current = pc;

      pc.ontrack = (event) => {
        console.log("[SFU] Received remote track", event.track.kind);
        setRemoteStream(event.streams[0]);
      };

      // Create DataChannel
      const dc = pc.createDataChannel('motesbryggan-data');
      dataChannelRef.current = dc;

      dc.onopen = () => {
        console.log("[SFU] DataChannel opened");
        setStatus('connected');
      };

      dc.onclose = () => {
        console.log("[SFU] DataChannel closed");
        setStatus('disconnected');
      };

      dc.onerror = (error) => {
        console.error("[SFU] DataChannel error:", error);
      };

      dc.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          
          if (parsed.type === 'TRACK_AVAILABLE' && parsed.sessionId !== sessionIdRef.current) {
            subscribeToTrack(parsed.sessionId, parsed.trackName);
          } else if (onMessage) {
            onMessage(parsed);
          }
        } catch (e) {
          console.error("[SFU] Failed to parse DataChannel message", e);
        }
      };

      // Create an offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Send offer to Cloudflare Calls API
      const response = await fetch(`https://rtc.live.cloudflare.com/v1/apps/${appId}/sessions/new`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${appSecret}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionDescription: {
            type: offer.type,
            sdp: offer.sdp
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Cloudflare API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Set remote description from Cloudflare's answer
      if (data && data.sessionDescription) {
        await pc.setRemoteDescription(new RTCSessionDescription(data.sessionDescription));
        sessionIdRef.current = data.sessionId;
      } else {
        throw new Error("No sessionDescription in Cloudflare response");
      }

    } catch (error) {
      console.error("[SFU] Failed to connect:", error);
      setStatus('disconnected');
    }
  }, [roomId, onMessage, subscribeToTrack]);

  const disconnect = useCallback(() => {
    if (dataChannelRef.current) {
      dataChannelRef.current.close();
      dataChannelRef.current = null;
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    sessionIdRef.current = null;
    setRemoteStream(null);
    setStatus('disconnected');
  }, []);

  const sendData = useCallback((message: any) => {
    if (dataChannelRef.current && dataChannelRef.current.readyState === 'open') {
      dataChannelRef.current.send(JSON.stringify(message));
    } else {
      console.warn("[SFU] DataChannel not open, cannot send message");
    }
  }, []);

  const publishAudio = useCallback(async (track: MediaStreamTrack) => {
    const pc = peerConnectionRef.current;
    const sessionId = sessionIdRef.current;
    const appId = import.meta.env.VITE_CLOUDFLARE_APP_ID;
    const appSecret = import.meta.env.VITE_CLOUDFLARE_APP_SECRET;

    if (!pc || !sessionId || !appId || !appSecret) {
      console.error("[SFU] Cannot publish audio: missing connection or credentials");
      return;
    }

    try {
      pc.addTransceiver(track, { direction: 'sendonly' });

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const response = await fetch(`https://rtc.live.cloudflare.com/v1/apps/${appId}/sessions/${sessionId}/tracks/new`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${appSecret}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionDescription: {
            type: offer.type,
            sdp: offer.sdp
          },
          tracks: [
            {
              location: "local",
              mid: pc.getTransceivers().find(t => t.sender.track === track)?.mid,
              trackName: track.id
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Cloudflare API error publishing track: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data && data.sessionDescription) {
        await pc.setRemoteDescription(new RTCSessionDescription(data.sessionDescription));
        console.log("[SFU] Successfully published audio track");
        
        if (dataChannelRef.current && dataChannelRef.current.readyState === 'open') {
          dataChannelRef.current.send(JSON.stringify({ 
            type: 'TRACK_AVAILABLE', 
            sessionId: sessionId, 
            trackName: track.id 
          }));
        }
      } else {
        throw new Error("No sessionDescription in Cloudflare response for track publish");
      }
    } catch (error) {
      console.error("[SFU] Failed to publish audio:", error);
    }
  }, []);

  return { status, connect, disconnect, sendData, publishAudio, remoteStream };
}
