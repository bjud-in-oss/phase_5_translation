import React from 'react';

const LongDurationMemory: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-3 border-b border-white/20 pb-1 flex items-center gap-2">
                <span className="bg-white text-black px-2 rounded text-xs">MODUL 57</span>
                Långtidskörning & Minneshantering
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-white/10 text-slate-300 text-sm space-y-8">
                
                <div className="bg-blue-900/20 p-4 rounded border border-blue-500/30 mb-6">
                    <p className="text-xs text-blue-300 leading-relaxed">
                        För att hantera kyrkans "Sermon Mode" där möten kan pågå i över en timme, måste vi kringgå Googles standardgränser för WebSocket-sessioner (som ofta klipper efter 10-15 minuter för att skydda minnet). Vi använder två experimentella funktioner i <code>@google/genai</code> SDK:t för detta.
                    </p>
                </div>

                {/* 1. CONTEXT WINDOW COMPRESSION */}
                <div className="space-y-4">
                    <h4 className="text-purple-400 font-bold text-xs uppercase tracking-widest border-l-4 border-purple-500 pl-3">1. Context Window Compression (Sliding Window)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800">
                        <ul className="text-[11px] text-slate-300 list-disc pl-4 space-y-3">
                            <li>
                                <strong className="text-purple-300 block mb-1">Oändliga Sessioner:</strong>
                                Appen använder <code>contextWindowCompression: &#123; slidingWindow: &#123;&#125; &#125;</code> i konfigurationen för att tillåta oändliga sessioner (60+ minuter) utan att minnet kraschar.
                            </li>
                            <li>
                                <strong className="text-purple-300 block mb-1">Perfekt för Tape Recorder Protocol:</strong>
                                Vårt "Tape Recorder Protocol" bryr sig inte om vad som sades för 20 minuter sedan. Det är en fullt acceptabel förlust att servern kastar gammal kontext för att hålla sessionen vid liv. Tolken behöver bara den omedelbara kontexten för att översätta nästa mening.
                            </li>
                            <li>
                                <strong className="text-purple-300 block mb-1">Sömlöst Ljud:</strong>
                                Inga avbrott sker i den pågående ljudströmmen (PCM) när servern flyttar fönstret. Processen är helt transparent för Web Audio API på klientsidan.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 2. SESSION RESUMPTION */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">2. Session Resumption (Återanslutning)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800">
                        <ul className="text-[11px] text-slate-300 list-disc pl-4 space-y-3">
                            <li>
                                <strong className="text-emerald-300 block mb-1">Spara Biljetter:</strong>
                                Vi fångar upp och sparar <code>SessionResumptionUpdate</code> (biljetter/handles) från servern lokalt i minnet (t.ex. via en <code>useRef</code>).
                            </li>
                            <li>
                                <strong className="text-emerald-300 block mb-1">Nätverkssvängningar:</strong>
                                Om nätverket svajar (t.ex. byter från Wi-Fi till 4G) och WebSocketen dör, försöker vi återansluta med <code>sessionResumption: &#123; handle: savedHandle &#125;</code> för att behålla kontexten och undvika en kallstart.
                            </li>
                            <li>
                                <strong className="text-red-400 block mb-1">Kritisk Fallback (Hard Reset):</strong>
                                Om nätverket varit nere för länge och återupptagandet misslyckas (eftersom servern har städat bort sessionen), måste koden automatiskt falla tillbaka till att starta en helt ny, ren session.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 3. GOTCHAS */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest border-l-4 border-red-500 pl-3">Kända Fallgropar (Gotchas)</h4>
                    
                    <div className="bg-red-900/10 p-4 rounded border border-red-500/20 space-y-4">
                        <div>
                            <strong className="text-red-400 text-xs block mb-1">TypeScript Varning</strong>
                            <p className="text-[11px] text-slate-300 leading-relaxed">
                                Eftersom detta är experimentella funktioner i <code>@google/genai</code> SDK:t, kan Typescript-definitionerna saknas eller vara inkompletta. Utvecklare får använda <code>// @ts-ignore</code> eller casta config-objektet till <code>any</code> om nödvändigt för att kompilatorn ska godkänna bygget.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default LongDurationMemory;
