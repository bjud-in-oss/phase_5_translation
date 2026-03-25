import React from 'react';

const AudioRoutingStateMachine: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-3 border-b border-white/20 pb-1 flex items-center gap-2">
                <span className="bg-white text-black px-2 rounded text-xs">MODUL 54</span>
                Audio Routing State Machine
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-white/10 text-slate-300 text-sm space-y-8">
                
                <div className="bg-blue-900/20 p-4 rounded border border-blue-500/30 mb-6">
                    <p className="text-xs text-blue-300 leading-relaxed">
                        Denna State Machine är hjärtat i ljudhanteringen. Den definierar den slutgiltiga ljudarkitekturen och hur ljud mixas och skickas lokalt respektive till molnet (SFU).
                    </p>
                </div>

                {/* 1. SIMPLE MODE */}
                <div className="space-y-4">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">1. Simple Mode (Standard)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800">
                        <ul className="text-[11px] text-slate-300 list-disc pl-4 space-y-3">
                            <li>
                                <strong className="text-emerald-300 block mb-1">Lokal Uppspelning:</strong>
                                Spelar bara upp den rena AI-rösten lokalt i enhetens standardhögtalare.
                            </li>
                            <li>
                                <strong className="text-emerald-300 block mb-1">Moln-sändning (Radiomix):</strong>
                                Skapar internt en duckad "Radiomix" (Originalljudet duckas automatiskt + AI-rösten läggs över). Denna mix skickas <strong>enbart</strong> till molnet (SFU <code>broadcast_mix</code>) för fjärrlyssnare.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 2. PRO MODE */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-purple-400 font-bold text-xs uppercase tracking-widest border-l-4 border-purple-500 pl-3">2. Pro Mode ("The Pro Split")</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800">
                        <p className="text-[11px] text-slate-400 mb-3">
                            Aktiveras på PC med Tesira/vMix. Använder en <code>StereoPannerNode</code> för att separera ljudströmmarna fysiskt.
                        </p>
                        <ul className="text-[11px] text-slate-300 list-disc pl-4 space-y-3">
                            <li>
                                <strong className="text-purple-300 block mb-1">VÄNSTER KANAL (Salen):</strong>
                                Ren AI-röst. Skickas till Tesira AEC Ref och Takhögtalare. Styrs via en UI-toggle "Spela upp i Sal".
                            </li>
                            <li>
                                <strong className="text-purple-300 block mb-1">HÖGER KANAL (FM-sändare):</strong>
                                Appens interna Radiomix (Duckat originalljud + AI). Skickas till FM-sändaren för lokala lyssnare med hörlurar.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 3. ZOOM & KLIENT-UPPLEVELSE */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-widest border-l-4 border-orange-500 pl-3">3. Zoom- & Klient-upplevelse</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800">
                        <ul className="text-[11px] text-slate-300 list-disc pl-4 space-y-3">
                            <li>
                                <strong className="text-orange-300 block mb-1">Enkel Prenumeration:</strong>
                                Alla fjärrlyssnare (t.ex. via Zoom) prenumererar <em>endast</em> på <code>broadcast_mix</code> från SFU:n.
                            </li>
                            <li>
                                <strong className="text-orange-300 block mb-1">Sömlös Upplevelse:</strong>
                                Lyssnare hör originalljudet klart och tydligt. När ett främmande språk talas, hör de automatiskt tolkningen med det duckade originalljudet i bakgrunden. Inget extra UI krävs.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 4. FLERVÄGSSAMTAL & KLIENT-PUBLICERING */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-yellow-400 font-bold text-xs uppercase tracking-widest border-l-4 border-yellow-500 pl-3">4. Flervägssamtal & Klient-publicering</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800">
                        <ul className="text-[11px] text-slate-300 list-disc pl-4 space-y-3">
                            <li>
                                <strong className="text-yellow-300 block mb-1">Lyssnare som Sändare:</strong>
                                I privata rum måste även vanliga deltagare ('listeners') tillåtas publicera sitt lokala mikrofonljud till SFU:n (Cloudflare/LiveKit/Daily) när de är unmuteade. Detta möjliggör flervägssamtal.
                            </li>
                            <li>
                                <strong className="text-yellow-300 block mb-1">Spårhantering (Kritiskt för Cloudflare):</strong>
                                För att detta ska fungera när flera pratar samtidigt, måste SFU-adaptrarna uppdateras så att <code>ontrack</code>-eventet använder <code>stream.addTrack(event.track)</code> på den befintliga strömmen, istället för att skriva över den. LiveKit och Daily hanterar detta nästan automatiskt, men det är kritiskt att implementera korrekt för Cloudflare.
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AudioRoutingStateMachine;
