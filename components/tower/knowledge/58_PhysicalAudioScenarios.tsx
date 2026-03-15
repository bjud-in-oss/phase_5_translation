import React from 'react';

const PhysicalAudioScenarios: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-3 border-b border-white/20 pb-1 flex items-center gap-2">
                <span className="bg-white text-black px-2 rounded text-xs">MODUL 58</span>
                Fysiska Ljudscenarier & Routing
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-white/10 text-slate-300 text-sm space-y-8">
                
                <div className="bg-blue-900/20 p-4 rounded border border-blue-500/30 mb-6">
                    <p className="text-xs text-blue-300 leading-relaxed">
                        Appen är hårdvaru-agnostisk. Detta innebär att routingen ser helt olika ut beroende på vilken maskin och kringutrustning som används. Här dokumenteras hur ljudet flödar fysiskt och virtuellt i våra tre huvudscenarier.
                    </p>
                </div>

                {/* SCENARIO A */}
                <div className="space-y-4">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">1. Scenario A: Den lilla gruppen (Mobiler)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800">
                        <ul className="text-[11px] text-slate-300 list-disc pl-4 space-y-3">
                            <li>
                                <strong className="text-emerald-300 block mb-1">Setup:</strong>
                                Flera personer sitter runt ett bord med varsin mobiltelefon (t.ex. iOS Safari) i samma privata rum.
                            </li>
                            <li>
                                <strong className="text-emerald-300 block mb-1">Ljudflöde:</strong>
                                Alla mobiler skickar sitt ljud till SFU. AI-Leadern översätter. Enbart den rena AI-rösten spelas upp lokalt i mobilernas högtalare (ingen duckad mix).
                            </li>
                            <li>
                                <strong className="text-emerald-300 block mb-1">Ekohantering:</strong>
                                Webbläsarens inbyggda mjukvaru-AEC (som är PÅ i Simple Mode) i kombination med låg högtalarvolym förhindrar rundgång. Ingen Pro-routing krävs.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* SCENARIO B */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-widest border-l-4 border-orange-500 pl-3">2. Scenario B: Mac + Ljudpuck (Mellanstort möte)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800">
                        <ul className="text-[11px] text-slate-300 list-disc pl-4 space-y-3">
                            <li>
                                <strong className="text-orange-300 block mb-1">Setup:</strong>
                                En Mac-dator (Safari/Chrome) kopplad till en Jabra/Polycom-ljudpuck placerad mitt på bordet.
                            </li>
                            <li>
                                <strong className="text-orange-300 block mb-1">Ljudflöde:</strong>
                                Datorn agerar "Leader". Pucken fångar allas röster → Webbappen → AI → Puckens högtalare.
                            </li>
                            <li>
                                <strong className="text-orange-300 block mb-1">Ekohantering:</strong>
                                Ljudpuckens stenhårda inbyggda AEC förhindrar effektivt att AI-rösten går tillbaka in i mikrofonen. Viktigt: Eftersom vi använder extern DSP-hårdvara här, rekommenderas att webbläsarens AEC inaktiveras i UI:t (eller att webbläsaren automatiskt känner igen pucken och bypassar sitt eget filter) för att undvika dubbel-AEC.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* SCENARIO C */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-purple-400 font-bold text-xs uppercase tracking-widest border-l-4 border-purple-500 pl-3">3. Scenario C: Huvudkyrkan (Pro Mode via vMix/Tesira)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800">
                        <ul className="text-[11px] text-slate-300 list-disc pl-4 space-y-3">
                            <li>
                                <strong className="text-purple-300 block mb-1">Setup:</strong>
                                PC-dator inkopplad i kyrkans PA-system och FM-sändare.
                            </li>
                            <li>
                                <strong className="text-purple-300 block mb-1">Varifrån kommer Zoom?:</strong>
                                Webbappen har ingen aning om vad Zoom är. Den fysiska DSP:n (Tesira) eller mjukvarumixern (vMix) slår ihop ljudet från Salens mikrofoner och Zoom, och skickar in denna mixade klump i Webbappens mikrofon-ingång.
                            </li>
                            <li>
                                <strong className="text-purple-300 block mb-1">Utljudet (The Pro Split):</strong>
                                Webbappen använder Web Audio API (<code>StereoPannerNode</code>) för att skicka ren AI-röst i VÄNSTER kanal, och en duckad Radiomix (originalljud + AI) i HÖGER kanal. Extern hårdvara/mjukvara delar sedan på dessa kanaler och skickar dem till FM respektive Takhögtalare.
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default PhysicalAudioScenarios;
