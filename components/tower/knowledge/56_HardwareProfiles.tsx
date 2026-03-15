import React from 'react';

const HardwareProfiles: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-3 border-b border-white/20 pb-1 flex items-center gap-2">
                <span className="bg-white text-black px-2 rounded text-xs">MODUL 56</span>
                Hardware Profiles & AEC
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-white/10 text-slate-300 text-sm space-y-8">
                
                <div className="bg-red-900/20 p-4 rounded border border-red-500/40 mb-6">
                    <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span>⚠️</span> DEN GYLLENE REGELN OM AEC
                    </h4>
                    <p className="text-[11px] text-red-200 leading-relaxed font-medium">
                        Mjukvaru-AEC (Acoustic Echo Cancellation i webbläsaren) och Hårdvaru-AEC (i DSP/Ljudpuck) får <strong>ALDRIG krocka</strong>. Om båda är aktiva samtidigt skapas fasfel, artefakter och ett "undervattensljud".
                    </p>
                </div>

                <div className="bg-blue-900/20 p-4 rounded border border-blue-500/30 mb-6">
                    <p className="text-xs text-blue-300 leading-relaxed">
                        Webbappen är i grunden <strong>hårdvaru-agnostisk</strong>. Det är dock Admin-vyns ansvar att hantera valet av ljudkort (via <code>setSinkId</code> för utljud och <code>getUserMedia</code> för inljud). Nedan beskrivs våra huvudscenarier för ljudrouting och AEC.
                    </p>
                </div>

                {/* PROFIL A: THE PRO SETUP */}
                <div className="space-y-4">
                    <h4 className="text-purple-400 font-bold text-xs uppercase tracking-widest border-l-4 border-purple-500 pl-3">Profil A: Pro Mode (Tesira/vMix)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800">
                        <ul className="text-[11px] text-slate-300 list-disc pl-4 space-y-3">
                            <li>
                                <strong className="text-purple-300 block mb-1">AEC-Hantering:</strong>
                                Webbläsarens AEC stängs av (<code>echoCancellation: false</code>). Tesiran ställs på "Speakerphone: Disables Computer AEC" via USB och sköter all ekosläckning.
                            </li>
                            <li>
                                <strong className="text-purple-300 block mb-1">Mix-Minus (Hårdvara):</strong>
                                Tesira-hårdvaran konfigureras med "Mix-Minus" i sin Matrix. Detta görs för att undvika att datorns utljud ekar tillbaka in i mikrofonen.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* PROFIL B: THE QUICK SETUP */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">Profil B: Simple Mode (Mac + Jabra Puck)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800">
                        <ul className="text-[11px] text-slate-300 list-disc pl-4 space-y-3">
                            <li>
                                <strong className="text-emerald-300 block mb-1">AEC-Hantering:</strong>
                                Webbläsarens AEC stängs av (<code>echoCancellation: false</code>). Ljudpuckens inbyggda hårdvaru-AEC förhindrar rundgång och eko helt automatiskt.
                            </li>
                            <li>
                                <strong className="text-emerald-300 block mb-1">Routing:</strong>
                                Ingen Mix-Minus krävs i mjukvaran. Pucken hanterar in/ut.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* PROFIL C: MOBILER */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-widest border-l-4 border-orange-500 pl-3">Profil C: Simple Mode (Mobiler)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800">
                        <ul className="text-[11px] text-slate-300 list-disc pl-4 space-y-3">
                            <li>
                                <strong className="text-orange-300 block mb-1">AEC-Hantering:</strong>
                                Webbläsarens AEC är <strong>PÅ</strong> (<code>echoCancellation: true</code>). Eftersom mobilen saknar avancerad DSP-hårdvara måste webbläsaren sköta ekosläckningen.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* GOTCHAS */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-slate-400 font-bold text-xs uppercase tracking-widest border-l-4 border-slate-500 pl-3">Kända Fallgropar (Gotchas)</h4>
                    
                    <div className="bg-slate-900/50 p-4 rounded border border-slate-800 space-y-4">
                        <div>
                            <strong className="text-slate-300 text-xs block mb-1">ASIO vs Sandlådan</strong>
                            <p className="text-[11px] text-slate-400 leading-relaxed">
                                Webbläsare förstår <strong>INTE</strong> ASIO-drivrutiner på grund av säkerhetssandlådan. Alla ljudkort, inklusive avancerade system som Tesira, måste presentera sig som standard Windows WASAPI/WDM-enheter för att överhuvudtaget kunna väljas i appen.
                            </p>
                        </div>
                        
                        <div className="border-t border-slate-800 pt-3">
                            <strong className="text-slate-300 text-xs block mb-1">Windows "Ljudförbättringar"</strong>
                            <p className="text-[11px] text-slate-400 leading-relaxed">
                                Om "Windows Sonic" eller annat rumsligt ljud är påslaget i Windows inställningar kan ljud blöda mellan kanalerna. Detta förstör all form av routing och <strong>måste vara avstängt</strong>.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HardwareProfiles;
