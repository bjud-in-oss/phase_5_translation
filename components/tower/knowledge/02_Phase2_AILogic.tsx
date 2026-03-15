import React from 'react';

const Phase2AILogic: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-purple-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-purple-500/30 pb-1 flex items-center gap-2">
                <span className="bg-purple-900/50 text-purple-200 px-2 rounded text-xs border border-purple-500/50">FAS 2</span>
                🤖 AI Logic & Prompt Engineering
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-purple-500/20 text-slate-300 text-sm space-y-8">
                
                <div className="bg-slate-950 p-4 rounded border border-slate-800 mb-6">
                    <p className="text-xs text-slate-400 mb-2 font-mono">Referensmoduler: 51</p>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                        Denna fas ansvarar för filen <code>utils/promptBuilder.ts</code>. Systemet får inte längre lita på en enda statisk prompt, utan måste vara kontextmedvetet.
                    </p>
                </div>

                {/* 1. DEN KONTEXTMEDVETNA BUILDERN */}
                <div className="space-y-4">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">1. Den Kontextmedvetna Buildern</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Funktionen som bygger systemprompten måste läsa av appens tillstånd (hur många språk som är valda, eller vilket rums-läge som är aktivt) och dynamiskt välja mellan två olika huvudmallar innan anslutningen till Gemini öppnas.
                        </p>
                    </div>
                </div>

                {/* 2. SCENARIO A */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">2. Scenario A: Tvåvägs-tolken (Solo-läge)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Används när en användare sitter ensam med en enhet (t.ex. en telefon som skickas mellan två personer) och har valt två språk (L1 och L2).
                        </p>
                        <div className="bg-black/30 p-3 rounded border border-emerald-500/20">
                            <strong className="text-emerald-300 text-[11px] block mb-1">Krav på Mall:</strong>
                            <p className="text-[10px] text-slate-400 italic">
                                Prompten måste explicit instruera AI:n att använda en IF-logik: "Lyssna på ljudet. Identifiera om L1 eller L2 talas. Om L1 talas -&gt; översätt till L2. Om L2 talas -&gt; översätt till L1."
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. SCENARIO B */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-widest border-l-4 border-orange-500 pl-3">3. Scenario B: Smart Broadcast (SFU / Multi-läge)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Används i Huvudkyrkan eller i privata rum där varje deltagare har en egen enhet och bara har valt ett Målspråk (L1).
                        </p>
                        <div className="bg-black/30 p-3 rounded border border-orange-500/20">
                            <strong className="text-orange-300 text-[11px] block mb-1">Krav på Mall:</strong>
                            <p className="text-[10px] text-slate-400 mb-2">
                                AI:n agerar envägs-tolk. Prompten måste innehålla vår Smart Mute-funktion för att förhindra över-översättning och dubbelekande.
                            </p>
                            <strong className="text-red-400 text-[10px] block mb-1">Kritisk instruktion:</strong>
                            <p className="text-[10px] text-slate-400 italic">
                                "Översätt allt du hör till [Målspråk]. KRITISK REGEL: Om språket som talas REDAN ÄR [Målspråk], var helt tyst och generera inget ljud."
                            </p>
                        </div>
                    </div>
                </div>

                {/* 4. THE CORE LAWS */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-cyan-400 font-bold text-xs uppercase tracking-widest border-l-4 border-cyan-500 pl-3">4. The Core Laws (Gäller för alla mallar)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Oavsett vilken mall buildern väljer, måste följande grundregler alltid injiceras i slutet av prompten för att tvinga fram låg latens:
                        </p>
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li>
                                <strong className="text-cyan-300">"The Tape Recorder Protocol":</strong> Linear flow. NEVER backtrack or restart a sentence to regain context.
                            </li>
                            <li>
                                <strong className="text-cyan-300">"Speed over perfection":</strong> IGNORE GRAMMAR. It is acceptable if the output is grammatically broken.
                            </li>
                            <li>
                                <strong className="text-cyan-300">"Safety":</strong> NO CONVERSATION. Do not answer questions asked by the speaker. Only translate.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 5. API ROBUSTNESS */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-yellow-400 font-bold text-xs uppercase tracking-widest border-l-4 border-yellow-500 pl-3">5. API Robustness</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Definiera en strategi för felhantering mot Gemini API.
                        </p>
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li>
                                <strong className="text-yellow-300">Felhantering:</strong> Hantering av rate-limits/kvoter, timeouter och oväntade krascher.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* ARBETSREGEL */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <div className="bg-red-900/20 p-4 rounded border border-red-500/40">
                        <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span>⚠️</span> ARBETSREGEL FÖR DENNA FIL
                        </h4>
                        <p className="text-[11px] text-red-200 leading-relaxed font-medium">
                            Denna fil hanterar enbart textsträngarna och villkoren för att generera instruktionen till AI:n. Web Audio API-hantering och SFU-anslutningar hanteras i Fas 3.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Phase2AILogic;
