import React from 'react';

const Phase4UX: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-pink-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-pink-500/30 pb-1 flex items-center gap-2">
                <span className="bg-pink-900/50 text-pink-200 px-2 rounded text-xs border border-pink-500/50">FAS 4</span>
                📱 UX & WebRTC DataChannels
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-pink-500/20 text-slate-300 text-sm space-y-8">
                
                <div className="bg-slate-950 p-4 rounded border border-slate-800 mb-6">
                    <p className="text-xs text-slate-400 mb-2 font-mono">Referensmoduler: 55</p>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                        Denna fas bygger det visuella gränssnittet och P2P-synkroniseringen. Den förlitar sig på det State som byggdes i Fas 1 och den Ljudmotor som byggdes i Fas 3.
                    </p>
                </div>

                {/* 1. FJÄRRSTYRNING VIA DATACHANNELS */}
                <div className="space-y-4">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">1. Fjärrstyrning via DataChannels</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Rums- och mötesuppdateringar ska ske i realtid utan databasanrop.
                        </p>
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li>
                                <strong className="text-blue-300">BroadcastChannel Simulering:</strong> Vi använder <code>BroadcastChannel</code> i <code>useDataChannel.ts</code> som en lokal "drop-in replacement" för WebRTC. Detta gör att vi kan testa fjärrstyrning och P2P-synkronisering mellan webbläsarflikar direkt på en dator, innan vi kopplar in Cloudflare SFU.
                            </li>
                            <li>
                                <strong className="text-blue-300">Late Joiner (State Sync):</strong> Vi implementerar en "Handskakning". När en ny klient ansluter till ett rum, skickar den en <code>REQUEST_FULL_STATE</code> via DataChannel, och en Admin-klient svarar med den aktuella sanningen (<code>SYNC_STATE</code>). Detta förhindrar osynkad state (Split-brain).
                            </li>
                            <li>
                                När en Admin eller Teacher ändrar mötestillstånd (t.ex. byter från "Gudstjänst" till "Söndagsskola"), skickas en signal via WebRTC DataChannels.
                            </li>
                            <li>
                                Alla anslutna klienter i rummet lyssnar på denna kanal och uppdaterar sitt lokala UI och språkval omedelbart.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 2. DELTAGARNAS INTEGRITET & MUTE-LOGIK */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">2. Deltagarnas Integritet & Mute-logik</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Vi tillämpar strikt "Zoom-standard" för mikrofonhantering:
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                            <div className="bg-black/30 p-3 rounded border border-emerald-500/20">
                                <strong className="text-emerald-300 text-[11px] block mb-2 border-b border-emerald-500/30 pb-1">Deltagar-UI:</strong>
                                <ul className="text-[10px] text-slate-400 space-y-2">
                                    <li><strong>Mikrofon/Unmute:</strong> En stor knapp. Deltagaren äger alltid sin egen mikrofon.</li>
                                    <li><strong>Handuppräckning:</strong> En ✋-knapp låter deltagaren visa att de vill tala.</li>
                                </ul>
                            </div>
                            <div className="bg-black/30 p-3 rounded border border-purple-500/20">
                                <strong className="text-purple-300 text-[11px] block mb-2 border-b border-purple-500/30 pb-1">Admin/Teacher-UI:</strong>
                                <ul className="text-[10px] text-slate-400 space-y-2">
                                    <li><strong>Mute All:</strong> Skickar en signal via DataChannel som tvingar alla klienters <code>isMuted</code> till true.</li>
                                    <li><strong>Rättigheter:</strong> En toggle för "Tillåt deltagare att unmuta sig själva" (styr en global <code>allowSelfUnmute</code> boolean via DataChannel). Om denna är false blir deltagarnas mick-knapp utgråad.</li>
                                    <li><strong>Ask to Unmute:</strong> En Admin kan aldrig slå på någons mikrofon, utan skickar en förfrågan till deltagaren om de räckt upp handen.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. SÄKERHETSARKITEKTUR & STABILITET */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest border-l-4 border-red-500 pl-3">3. Säkerhetsarkitektur & Stabilitet</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-3">
                            <li>
                                <strong className="text-red-300">Zero-Trust URL Roles (Admin PIN):</strong> URL-parametrar som <code>?role=admin</code> är endast önskemål. Appen MÅSTE blockera tillgången och kräva en PIN-kod (verifierad mot miljövariabel) innan admin-rättigheter faktiskt tilldelas i Zustand.
                            </li>
                            <li>
                                <strong className="text-red-300">Hard Teardown (Zombie Protection):</strong> Vi använder Reacts key-mönster (t.ex. <code>&lt;Room key=&#123;roomId&#125; /&gt;</code>). Vid varje ändring av rums-ID i URL:en måste hela rums-komponenten avmonteras brutalt för att stänga gamla WebSockets, WebRTC-kanaler och AudioContexts utan risk för läckage (Zombie Connections).
                            </li>
                            <li>
                                <strong className="text-red-300">Strict Boot Sequence (Hydration Barrier):</strong> Nätverks- och ljudmotorer har startförbud vid sidladdning. De får anropas först när URL-parametrar är parsade, rollen är validerad via PIN och Zustand är fullt uppdaterat.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 5. UI & SÄKERHET */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-yellow-400 font-bold text-xs uppercase tracking-widest border-l-4 border-yellow-500 pl-3">5. UI & Säkerhet</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li>
                                <strong className="text-yellow-300">Zero Trust & Säkerhet:</strong> Mottagaren tillämpar "Zero Trust". Admin-kommandon (<code>ADMIN_MUTE_ALL</code> etc.) ignoreras strikt om avsändarens roll inte är verifierad som Admin/Teacher.
                            </li>
                            <li>
                                <strong className="text-yellow-300">Stale Closures:</strong> WebRTC/Broadcast-listeners får aldrig förlita sig på reaktiva hook-värden, utan måste alltid läsa färskt state via <code>useAppStore.getState()</code>.
                            </li>
                            <li>
                                <strong className="text-yellow-300">Visuell AI-status:</strong> UI-indikatorer (t.ex. pulserande ikoner/animationer) som visar i realtid om AI:n "Lyssnar", "Tänker" eller "Talar".
                            </li>
                            <li>
                                <strong className="text-yellow-300">Proaktiv Felhantering (UI):</strong> Tydliga toasts/modaler vid nekad mikrofonåtkomst eller brutna anslutningar istället för tysta krascher.
                            </li>
                            <li>
                                <strong className="text-yellow-300">DataChannel-validering:</strong> All inkommande data via P2P-kanaler ska saneras och typkontrolleras för att förhindra att korrupta meddelanden kraschar klienternas UI.
                            </li>
                            <li>
                                <strong className="text-yellow-300">Tillgänglighet (a11y):</strong> Tangentbordsnavigering och skärmläsarstöd för kritiska funktioner (Mute, Unmute, Rollbyten).
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 6. LÄRDOMAR FRÅN IMPLEMENTATION (GOTCHAS) */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-widest border-l-4 border-orange-500 pl-3">6. Lärdomar från Implementation (Gotchas)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-3">
                            <li>
                                <strong className="text-orange-300">COEP & Externa Bilder (QR-koder):</strong> Eftersom vi använder strikta säkerhetsheaders (Cross-Origin-Embedder-Policy: require-corp) för att ljudmotorn ska få maximal prestanda, blockerar webbläsaren externa bilder. Vi kan därför INTE använda externa API:er (som api.qrserver.com) för QR-koder. Vi MÅSTE använda ett lokalt bibliotek (t.ex. <code>react-qr-code</code>) som ritar koden direkt som en SVG/Canvas.
                            </li>
                            <li>
                                <strong className="text-orange-300">API-nycklar & Fallback Chain:</strong> Miljövariabler beter sig olika lokalt (Vite) och i produktion (Netlify/Node). För att göra anslutningen skottsäker MÅSTE vi använda en fallback-kedja vid anslutning: <code>import.meta.env.VITE_GEMINI_API_KEY || process.env.API_KEY</code> etc.
                            </li>
                            <li>
                                <strong className="text-orange-300">Stale Closures vid Rumsbyte:</strong> För att undvika att React skickar in gamla rums-ID:n vid skapandet av Privata Rum (pga asynkrona state-uppdateringar), måste det nya rums-ID:t skickas in direkt som argument till onConfirm-funktionerna, och vi får inte använda setTimeout för att vänta på state.
                            </li>
                            <li>
                                <strong className="text-orange-300">Ljudsäkerhet vid Start:</strong> Applikationen måste ALLTID starta med <code>isLocalAiAudioEnabled = false</code> för att undvika omedelbar rundgång om en vanlig användare råkar starta AI:n.
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
                            Denna fil hanterar React-komponenter, knappar, visuella states och utskick/mottagning av DataChannel-meddelanden. Den bygger inte om ljudnoder eller AI-prompter.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Phase4UX;
