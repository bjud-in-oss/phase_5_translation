import React from 'react';

const MasterDevelopmentPlan: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-emerald-500/30 pb-1 flex items-center gap-2">
                <span className="bg-emerald-900/50 text-emerald-200 px-2 rounded text-xs border border-emerald-500/50">MODUL 00</span>
                🏗️ Master Development Plan
            </h3>

            <div className="bg-emerald-900/20 p-4 rounded border border-emerald-500/40 mb-6 mt-4">
                <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                    ✅ AKTUELL STATUS (Färdigställt - RÖR EJ)
                </h4>
                <p className="text-[11px] text-emerald-200 leading-relaxed font-medium mb-2">
                    Följande funktioner är redan stabilt implementerade i koden. Du får absolut inte bygga om, "förenkla" eller ändra kärnlogiken i dessa utan uttrycklig order:
                </p>
                <ul className="list-disc list-inside text-[11px] text-emerald-200/80 space-y-1 ml-2">
                    <li>Gemini Live Connection: WebSockets och anslutningen till Googles API fungerar.</li>
                    <li>Simultantolkning (Grund): Ljud strömmas till AI:n och röstsyntes kommer tillbaka.</li>
                    <li>UI med språkväljare, visare av översatt text med kareoke markering (kareokedelen behöver repareras), Ljud och platsväljare (skall uppdateras). Systemdokumentation med planering, parametrar och testmiljö.</li>
                </ul>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-emerald-500/20 text-slate-300 text-sm space-y-8">
                
                <div className="bg-slate-950 p-4 rounded border border-slate-800 mb-6">
                    <p className="text-xs text-slate-300 leading-relaxed">
                        Detta dokument definierar arbetsordningen för att bygga AI-översättningsmotorn. För att garantera <strong>"Context Isolation"</strong> och förhindra att kod skrivs över av misstag, är implementationen uppdelad i 4 isolerade filer.
                    </p>
                </div>

                {/* FASERNA */}
                <div className="space-y-4">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">Faserna (Se respektive fil för detaljer)</h4>
                    
                    <div className="grid grid-cols-1 gap-3">
                        <div className="bg-slate-950 p-3 rounded border border-slate-800 flex flex-col sm:flex-row sm:items-center gap-2">
                            <span className="bg-blue-900/30 text-blue-300 px-2 py-1 rounded text-[10px] font-mono border border-blue-500/30 whitespace-nowrap">01_Phase1_CoreState.tsx</span>
                            <span className="text-[11px] text-slate-400">Zustand Store, Rum & Minneshantering</span>
                        </div>
                        
                        <div className="bg-slate-950 p-3 rounded border border-slate-800 flex flex-col sm:flex-row sm:items-center gap-2">
                            <span className="bg-purple-900/30 text-purple-300 px-2 py-1 rounded text-[10px] font-mono border border-purple-500/30 whitespace-nowrap">02_Phase2_AILogic.tsx</span>
                            <span className="text-[11px] text-slate-400">Prompt Engineering & Språk-kontext</span>
                        </div>
                        
                        <div className="bg-slate-950 p-3 rounded border border-slate-800 flex flex-col sm:flex-row sm:items-center gap-2">
                            <span className="bg-orange-900/30 text-orange-300 px-2 py-1 rounded text-[10px] font-mono border border-orange-500/30 whitespace-nowrap">03_Phase3_AudioEngine.tsx</span>
                            <span className="text-[11px] text-slate-400">Web Audio API, The Pro Split & AEC</span>
                        </div>
                        
                        <div className="bg-slate-950 p-3 rounded border border-slate-800 flex flex-col sm:flex-row sm:items-center gap-2">
                            <span className="bg-pink-900/30 text-pink-300 px-2 py-1 rounded text-[10px] font-mono border border-pink-500/30 whitespace-nowrap">04_Phase4_UX.tsx</span>
                            <span className="text-[11px] text-slate-400">WebRTC DataChannels & UI</span>
                        </div>
                        
                        <div className="bg-slate-950 p-3 rounded border border-slate-800 flex flex-col sm:flex-row sm:items-center gap-2">
                            <span className="bg-indigo-900/30 text-indigo-300 px-2 py-1 rounded text-[10px] font-mono border border-indigo-500/30 whitespace-nowrap">05_Phase5_SFU.tsx</span>
                            <span className="text-[11px] text-slate-400">SFU, Cloudflare Serverless SFU & Global Distribution</span>
                        </div>
                    </div>
                </div>

                {/* DEN GYLLENE REGELN */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <div className="bg-red-900/20 p-4 rounded border border-red-500/40">
                        <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span>⚠️</span> DEN GYLLENE REGLERN FÖR AI-ASSISTENTEN
                        </h4>
                        <p className="text-[11px] text-red-200 leading-relaxed font-medium">
                            När en användare ber dig implementera eller skriva kod för en specifik Fas, får du ENDAST läsa kraven i den motsvarande Fas-filen (t.ex. <code>01_Phase1...</code>). Du får under inga omständigheter modifiera logik som tillhör andra faser, och du får inte föregå händelserna. Arbeta strikt sekventiellt.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default MasterDevelopmentPlan;
