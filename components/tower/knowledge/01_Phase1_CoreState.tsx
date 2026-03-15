import React from 'react';

const Phase1CoreState: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-emerald-500/30 pb-1 flex items-center gap-2">
                <span className="bg-emerald-900/50 text-emerald-200 px-2 rounded text-xs border border-emerald-500/50">FAS 1</span>
                🧠 Core State & Session Memory
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-emerald-500/20 text-slate-300 text-sm space-y-8">
                
                <div className="bg-slate-950 p-4 rounded border border-slate-800 mb-6">
                    <p className="text-xs text-slate-400 mb-2 font-mono">Referensmoduler: 53, 57, 59</p>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                        Denna fas lägger grunden för appen. Innan ljud eller AI-logik byggs, måste vi ha en stenhård hantering av vem användaren är, vilken hårdvara de sitter vid, och hur länge sessionen får leva.
                    </p>
                </div>

                {/* 1. SEPARATION AV ROLL OCH HÅRDVARA */}
                <div className="space-y-4">
                    <h4 className="text-purple-400 font-bold text-xs uppercase tracking-widest border-l-4 border-purple-500 pl-3">1. Separation av Roll och Hårdvara (Kritisk Arkitektur)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Zustand-storen (<code>useAppStore.ts</code>) måste strikt separera användarens auktoritet från den fysiska ljudroutern.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                            <div className="bg-black/30 p-3 rounded border border-purple-500/20">
                                <strong className="text-purple-300 text-[11px] block mb-1">UserRole (Auktoritet):</strong>
                                <p className="text-[10px] text-slate-400">
                                    Kan vara Admin, Teacher eller Listener. Detta styrs via URL-parametrar (t.ex. <code>?role=teacher</code>). Detta styr ENDAST vilka UI-knappar som är synliga (t.ex. knappar för att byta möte). En Teacher kan använda en mobiltelefon.
                                </p>
                            </div>
                            <div className="bg-black/30 p-3 rounded border border-blue-500/20">
                                <strong className="text-blue-300 text-[11px] block mb-1">HardwareMode (Ljudrouting):</strong>
                                <p className="text-[10px] text-slate-400">
                                    Kan vara Simple eller Pro. Detta styrs av en fysisk toggle-knapp i gränssnittet och MÅSTE sparas i <code>localStorage</code> per enhet. Denna bestämmer om appen ska göra en avancerad stereosplit eller inte.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. RUMS- OCH MÖTESLOGIK */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-widest border-l-4 border-orange-500 pl-3">2. Rums- och Möteslogik</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Storen måste hantera två lager av plats:
                        </p>
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li>
                                <strong className="text-orange-300">roomId (Fysiskt rum):</strong> T.ex. "Kapellet". Hämtas från URL (<code>/room/kapellet</code>). Styr vilken SFU-kanal vi ansluter till.
                            </li>
                            <li>
                                <strong className="text-orange-300">meetingState (Digital aktivitet):</strong> T.ex. "Gudstjänst" eller "Söndagsskola". Ändras av en Admin/Teacher i realtid under pågående möte.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 3. OÄNDLIGT MINNE */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-cyan-400 font-bold text-xs uppercase tracking-widest border-l-4 border-cyan-500 pl-3">3. Oändligt Minne (Sermon Mode)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            För att hantera timlånga möten måste vi förhindra att Googles WebSocket stänger ner pga fullt minne.
                        </p>
                        <div className="bg-black/40 p-3 rounded border border-cyan-500/20">
                            <strong className="text-cyan-300 text-[11px] block mb-1">Krav:</strong>
                            <p className="text-[10px] text-slate-400">
                                I filen <code>useGeminiSession.ts</code> (eller där sessionConfig definieras), måste fältet <code>contextWindowCompression: {'{'} slidingWindow: {'{}'} {'}'}</code> inkluderas i konfigurationen mot Live API:et.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 4. PARTICIPANT & PERMISSION STATE */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-pink-400 font-bold text-xs uppercase tracking-widest border-l-4 border-pink-500 pl-3">4. Participant & Permission State (UX/Integritet)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Storen måste hantera tillstånd för deltagarnas interaktion, baserat på klassisk videokonferens-standard.
                        </p>
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li>
                                <strong className="text-pink-300">Room Permissions:</strong> En boolean <code>allowSelfUnmute</code> (styrs av Admin/Teacher).
                            </li>
                            <li>
                                <strong className="text-pink-300">Participant State:</strong> Storen måste hålla koll på den lokala klientens <code>isMuted</code> (boolean) och <code>handRaised</code> (boolean).
                            </li>
                        </ul>
                        <div className="bg-black/40 p-3 rounded border border-pink-500/20 mt-2">
                            <strong className="text-red-400 text-[11px] block mb-1">Regel (Integritet):</strong>
                            <p className="text-[10px] text-slate-400">
                                En Admin kan <strong>aldrig</strong> tvinga <code>isMuted</code> till false (integritet). En Admin kan bara skicka en request, eller tvinga den till true (Mute All).
                            </p>
                        </div>
                    </div>
                </div>

                {/* 5. SÄKERHET OCH ÅTERHÄMTNING */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-yellow-400 font-bold text-xs uppercase tracking-widest border-l-4 border-yellow-500 pl-3">5. Säkerhet och Återhämtning</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li>
                                <strong className="text-yellow-300">Återanslutningslogik (Auto-reconnect):</strong> Storen ska hantera tillstånd för att automatiskt försöka återställa sessionen vid tillfälliga nätverksavbrott.
                            </li>
                            <li>
                                <strong className="text-yellow-300">Sessionsskydd:</strong> Implementera en varning (beforeunload) som hindrar Admin/Teacher från att oavsiktligt stänga fliken eller ladda om sidan under pågående möte.
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
                            Denna fil definierar endast STATE och KONFIGURATION. Ljudhantering (Web Audio API) och Prompt-byggnation hör hemma i senare faser och ska inte beröras här.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Phase1CoreState;
