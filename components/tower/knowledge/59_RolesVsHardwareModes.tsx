import React from 'react';

const RolesVsHardwareModes: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-3 border-b border-white/20 pb-1 flex items-center gap-2">
                <span className="bg-white text-black px-2 rounded text-xs">MODUL 59</span>
                Roller vs Hårdvarulägen
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-white/10 text-slate-300 text-sm space-y-8">
                
                <div className="bg-red-900/20 p-4 rounded border border-red-500/30 mb-6">
                    <strong className="text-red-400 text-xs block mb-2 uppercase tracking-widest">Kritisk Begreppsseparering</strong>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                        I vår arkitektur får vi <strong>aldrig</strong> blanda ihop Användarroller (vem du är) med Hårdvarulägen (vilken maskin du sitter vid). En administratör kan sitta vid en mobiltelefon, och en vanlig lyssnare kan sitta vid en avancerad PC. Dessa två koncept är helt frikopplade från varandra.
                    </p>
                </div>

                {/* 1. ANVÄNDARROLLER */}
                <div className="space-y-4">
                    <h4 className="text-purple-400 font-bold text-xs uppercase tracking-widest border-l-4 border-purple-500 pl-3">1. Användarroller (Mötesrättigheter)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800">
                        <ul className="text-[11px] text-slate-300 list-disc pl-4 space-y-3">
                            <li>
                                <strong className="text-purple-300 block mb-1">Styrs via URL:</strong>
                                Rollen definieras av parametrar i URL:en (t.ex. <code>?role=teacher</code> eller <code>?role=admin</code>).
                            </li>
                            <li>
                                <strong className="text-purple-300 block mb-1">UI-Rättigheter:</strong>
                                Ger tillgång till UI-kontroller för att byta mötestillstånd (t.ex. från "Gudstjänst" till "Söndagsskola") via WebRTC DataChannels.
                            </li>
                            <li>
                                <strong className="text-purple-300 block mb-1">Oberoende av Hårdvara:</strong>
                                En lärare eller admin kan köra detta från en vanlig iPhone. Rollen tvingar <strong>aldrig</strong> fram avancerad ljudrouting eller specifika hårdvarukrav.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 2. HÅRDVARULÄGEN */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">2. Hårdvarulägen (Audio Routing Mode)</h4>
                    
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                        Detta styrs av en lokal switch i klientens UI, och sparas i <code>localStorage</code> för den specifika enheten. Det definierar hur ljudet hanteras lokalt på maskinen.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="bg-slate-950 p-4 rounded border border-slate-800">
                            <strong className="text-blue-400 text-xs block mb-2">Simple Mode (Standard)</strong>
                            <p className="text-[10px] text-slate-400 mb-2">
                                Skickar allt ljud i mono/stereo centrerat, precis som ett vanligt webbsamtal.
                            </p>
                            <div className="bg-black/30 p-2 rounded border border-white/5 text-[10px] text-slate-500">
                                <strong>Används för:</strong> Mobiler, Mac-datorer och Ljudpuckar.
                            </div>
                        </div>
                        
                        <div className="bg-slate-950 p-4 rounded border border-slate-800">
                            <strong className="text-orange-400 text-xs block mb-2">Pro Mode (Mix-Minus Ready)</strong>
                            <p className="text-[10px] text-slate-400 mb-2">
                                Aktiverar vår "Pro Split" (Vänster = Ren AI-röst, Höger = Duckad Radiomix) och <strong>inaktiverar</strong> webbläsarens inbyggda AEC.
                            </p>
                            <div className="bg-black/30 p-2 rounded border border-white/5 text-[10px] text-slate-500">
                                <strong>Används för:</strong> Endast den specifika PC som är inkopplad i Tesira/vMix.
                            </div>
                        </div>
                    </div>

                    <div className="bg-orange-900/10 p-3 rounded border border-orange-500/20 mt-3">
                        <strong className="text-orange-400 text-[10px] block mb-1">Graceful Fallback:</strong>
                        <p className="text-[10px] text-slate-300">
                            Om en användare på en iPhone försöker aktivera Pro Mode (som saknar stöd för avancerad kanalseparering eller inaktivering av AEC på iOS Safari), avbryts försöket snyggt och appen faller automatiskt tillbaka till Simple Mode.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default RolesVsHardwareModes;
