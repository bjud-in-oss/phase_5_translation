
import React from 'react';

const PromptEngineering: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-600">
            <h3 className="text-pink-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-pink-500/30 pb-1 flex items-center gap-2">
                <span className="bg-pink-900/30 text-pink-300 px-2 rounded text-xs border border-pink-500/30">MODUL 51</span>
                Arkitektur: Prompt Engineering & Språkval
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-pink-500/20 text-slate-300 text-sm space-y-8">
                
                <p className="text-sm text-slate-400 leading-relaxed italic">
                    Vår arkitektur för AI-prompter är kontextmedveten och byter mall baserat på rumstyp och antal valda språk för att stödja vår SFU-routing.
                </p>

                {/* 1. VISUELLT FLÖDE */}
                <div className="flex items-center gap-2 text-[10px] font-mono overflow-x-auto pb-4 pt-2">
                    <div className="bg-slate-950 p-3 rounded border border-slate-700 min-w-[100px]">
                        <strong className="text-blue-400 block mb-1">UI (Språkval)</strong>
                        <span className="text-slate-500">Väljer språk</span>
                    </div>
                    <span className="text-slate-600">→</span>
                    <div className="bg-slate-950 p-3 rounded border border-slate-700 min-w-[100px]">
                        <strong className="text-purple-400 block mb-1">Builder</strong>
                        <span className="text-slate-500">Väljer mall & injicerar variabler</span>
                    </div>
                    <span className="text-slate-600">→</span>
                    <div className="bg-slate-950 p-3 rounded border border-slate-700 min-w-[100px]">
                        <strong className="text-pink-400 block mb-1">System Prompt</strong>
                        <span className="text-slate-500">Låst för sessionen</span>
                    </div>
                </div>

                {/* 2. SPRÅKVÄLJAREN */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">2. Språkväljaren (State)</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-2">
                        <ul className="text-[11px] text-slate-300 list-disc pl-4 space-y-2">
                            <li>
                                <strong className="text-blue-300">Solo-läge:</strong> I ett privat rum (1 enhet) väljer användaren <strong>två språk</strong>.
                            </li>
                            <li>
                                <strong className="text-blue-300">Multi-läge:</strong> I SFU/Offentligt rum är det låst till ett enda <strong>Målspråk</strong>.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 3. PROMPT BUILDER */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest border-l-4 border-purple-500 pl-3">3. Prompt Builder (Den Kontextmedvetna Fabriken)</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-4">
                        <p className="text-[11px] text-slate-400">
                            Filen <code>utils/promptBuilder.ts</code> byter mall baserat på appens State (antal valda språk/rumstyp).
                        </p>

                        <div className="bg-black/30 p-3 rounded border border-white/5">
                            <strong className="text-purple-300 text-[11px] block mb-2">Scenario A: Tvåvägs-tolken (Solo-läge)</strong>
                            <p className="text-[10px] text-slate-400 mb-2">När två språk anges, används en strikt villkorsmall för pendling:</p>
                            <div className="bg-black/50 p-2 rounded font-mono text-[10px] text-slate-300 border border-white/10 space-y-1">
                                <div>1. Listen to the audio. Identify if the speaker is using {'{{L1}}'} or {'{{L2}}'}.</div>
                                <div>2. If {'{{L1}}'} is spoken → Translate to {'{{L2}}'} immediately.</div>
                                <div>3. If {'{{L2}}'} is spoken → Translate to {'{{L1}}'} immediately.</div>
                            </div>
                        </div>

                        <div className="bg-black/30 p-3 rounded border border-white/5">
                            <strong className="text-orange-400 text-[11px] block mb-2">Scenario B: Smart Broadcast (SFU / Multi-läge)</strong>
                            <p className="text-[10px] text-slate-400 mb-2">När endast ett målspråk anges, används en envägsmall med en inbyggd Smart Mute-funktion för att undvika över-översättning av rätt språk:</p>
                            <div className="bg-black/50 p-2 rounded font-mono text-[10px] text-slate-300 border border-white/10 space-y-1">
                                <div>1. If the spoken language is NOT {'{{L1}}'} → Translate it to {'{{L1}}'} immediately.</div>
                                <div className="text-red-400">2. CRITICAL MUTE RULE: If the spoken language ALREADY IS {'{{L1}}'} → BE COMPLETELY SILENT. Do not output any audio.</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. SYSTEM PROMPT */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest border-l-4 border-pink-500 pl-3">4. System Prompt (The Law)</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-400">
                            Prompten är statisk. Om användaren byter språk eller rum måste WebSocket-sessionen (<code>ai.live.connect()</code>) startas om.
                        </p>
                        <strong className="text-pink-300 text-[11px] block mt-3 mb-2">Båda mallarna delar våra tre heliga grundregler:</strong>
                        <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-2">
                            <li><strong className="text-pink-400">"NEVER BACKTRACK"</strong> (Tape Recorder Protocol).</li>
                            <li><strong className="text-pink-400">"IGNORE GRAMMAR"</strong> (Flöde över perfektion).</li>
                            <li><strong className="text-pink-400">"NO CONVERSATION"</strong> (Svara aldrig på talarens egna frågor).</li>
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default PromptEngineering;
