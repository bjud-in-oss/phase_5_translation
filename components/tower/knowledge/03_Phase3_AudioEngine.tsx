import React from 'react';

const Phase3AudioEngine: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-orange-500/30 pb-1 flex items-center gap-2">
                <span className="bg-orange-900/50 text-orange-200 px-2 rounded text-xs border border-orange-500/50">FAS 3</span>
                🎛️ Audio Engine & AEC Matrix
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-orange-500/20 text-slate-300 text-sm space-y-8">
                
                <div className="bg-slate-950 p-4 rounded border border-slate-800 mb-6">
                    <p className="text-xs text-slate-400 mb-2 font-mono">Referensmoduler: 54, 56, 58, 97, 98</p>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                        Denna fas bygger ljudmotorn med Web Audio API. Den ansvarar för att rätt ljud skickas till rätt plats utan att skapa ekoloopar.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-widest border-l-4 border-orange-500 pl-3">1. Autoplay Policy & AEC-kontroll</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            <strong>Autoplay Policy:</strong> Hooken måste hantera <code>AudioContext.resume()</code> vid initiering och uppvaknande (t.ex. vid <code>VOICE_START</code> från workleten) för att kringgå webbläsarens blockeringar och spara batteri i "Eco Mode".
                        </p>
                        <p className="text-[11px] text-slate-300">
                            Koden för getUserMedia måste vara dynamisk baserad på HardwareMode (från Fas 1). Om HardwareMode === 'Pro' (eller vid användning av certifierad ljudpuck) måste appen tvinga fram <code>{'{'} echoCancellation: false, noiseSuppression: false, autoGainControl: false {'}'}</code>. Detta låter Tesira eller Jabra-pucken hantera ljudtvätten och förhindrar "undervattensljud".
                        </p>
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-widest border-l-4 border-orange-500 pl-3">2. Simple Mode Routing (Mobiler & Ljudpuckar)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            När appen körs i standardläge:
                        </p>
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li>
                                <strong className="text-orange-300">Lokal Utgång (Högtalaren):</strong> Spelar ENBART upp den rena, nakna AI-rösten (i Mono/Center). Den får absolut inte spela upp mikrofonljudet, för att undvika rundgång i rummet.
                            </li>
                            <li>
                                <strong className="text-orange-300">Nätverksutgång (SFU broadcast_mix):</strong> Appen skapar en "Radiomix" internt. Radiomixen åstadkoms genom att skicka både mikrofonen och AI-rösten genom en kraftigt inställd <code>DynamicsCompressorNode</code> (t.ex. threshold: -30, ratio: 12). När AI:n talar trycker kompressorn automatiskt ner hela mixen (och därmed micken). Denna duckade mix skickas enbart till SFU:n för de som lyssnar med hörlurar hemma.
                            </li>
                        </ul>
                        <div className="bg-red-900/30 p-3 rounded border border-red-500/50 mt-3">
                            <p className="text-[11px] text-red-300 font-bold">
                                DEN GYLLENE LJUDREGELN (Feedback-skyddet):
                            </p>
                            <p className="text-[11px] text-red-200 mt-1">
                                Radiomixen (Ducked Mic + AI) får UNDER INGA OMSTÄNDIGHETER kopplas till <code>audioContext.destination</code> i Simple Mode. Detta skulle orsaka en omedelbar rundgång (feedback loop) i PA-systemet. Den får enbart exporteras till Nätverket (SFU).
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-widest border-l-4 border-orange-500 pl-3">3. Pro Mode Routing ("The Pro Split")</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            När HardwareMode === 'Pro' aktiveras (Huvudkyrkan med Tesira/vMix):<br/>
                            Appen MÅSTE använda en <code>ChannelMergerNode</code> (med 2 ingångar) för att garantera absolut hård vänster/höger-separation utan överhörning (bleed). <em>(Använd aldrig StereoPannerNode för detta).</em>
                        </p>
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li>
                                <strong className="text-orange-300">VÄNSTER KANAL (Ingång 0):</strong> Endast ren AI-röst. Kopplas till PA-systemet i salen och används som referenssignal för hårdvaru-AEC.
                            </li>
                            <li>
                                <strong className="text-orange-300">HÖGER KANAL (Ingång 1):</strong> Endast Radiomixen (kompressorns output). Kopplas till FM-sändaren för hörselhjälpmedel.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-widest border-l-4 border-orange-500 pl-3">4. Intern Gain-Routing ("Lärarens Knapp")</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            I ljudmotorn (både Simple och Pro Mode) måste uppspelningen av den lokala AI-rösten passera en GainNode. Denna nod är mutad (0) som standard, och styrs av UI-knappen "Spela upp AI i Salen" som byggs i Fas 4.
                        </p>
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <div className="bg-red-900/20 p-4 rounded border border-red-500/40">
                        <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span>⚠️</span> ARBETSREGEL FÖR DENNA FIL
                        </h4>
                        <p className="text-[11px] text-red-200 leading-relaxed font-medium">
                            Denna fil hanterar enbart Web Audio API, noder, ducking-algoritmer och mikrofon-parametrar. WebRTC DataChannels och visuella knappar hanteras i Fas 4.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Phase3AudioEngine;
