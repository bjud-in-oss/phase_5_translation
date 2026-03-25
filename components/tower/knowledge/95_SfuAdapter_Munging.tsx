import React from 'react';

const Module95SfuAdapterMunging: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-400">
            <h3 className="text-purple-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-purple-500/30 pb-1 flex items-center gap-2">
                <span className="bg-purple-900/50 text-purple-200 px-2 rounded text-xs border border-purple-500/50">MODUL 95</span>
                SFU Adapters & SDP Munging
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-purple-500/20 text-slate-300 text-sm space-y-6">
                
                <div className="bg-slate-950 p-4 rounded border border-slate-800">
                    <p className="text-xs text-slate-300 leading-relaxed">
                        <strong>Adapter Pattern:</strong> Systemet är <strong>SFU-agnostiskt</strong>. Detta innebär att administratörer kan välja vilken SFU-leverantör de vill använda via inställningarna.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">SFU Alternativ</h4>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-2 ml-2">
                        <li><strong>LiveKit Cloud (Rekommenderad):</strong> 10k gratis minuter/månad, inget kreditkort krävs, inbyggd kill switch.</li>
                        <li><strong>Daily.co (Fallback):</strong> 10k gratis minuter/månad, inget kreditkort krävs.</li>
                        <li><strong>Cloudflare Calls (För Power Users):</strong> 1TB gratis egress, därefter $0.05/GB. Kräver kreditkort.</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-widest border-l-4 border-orange-500 pl-3">Server-side SDP Munging (Cloudflare Protection)</h4>
                    <div className="bg-orange-900/20 p-4 rounded border border-orange-500/30">
                        <p className="text-xs text-orange-200 leading-relaxed">
                            För att förhindra obegränsade egress-kostnader med Cloudflare modifierar Netlify Functionen SDP (Session Description Protocol) på serversidan innan den skickas till Cloudflare. Detta är "obrytbart" av klienten.
                        </p>
                        <ul className="list-disc list-inside text-xs text-orange-200 space-y-1 mt-2 ml-2">
                            <li>Injekterar <code>b=AS:24</code> (24 kbps) för ljud i Chrome/Safari.</li>
                            <li>Injekterar <code>b=TIAS:24000</code> (24000 bps) för Firefox (eftersom Firefox ignorerar <code>b=AS</code>).</li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest border-l-4 border-red-500 pl-3">WebRTC Garbage Collection (Memory Leak Prevention)</h4>
                    <div className="bg-red-900/20 p-4 rounded border border-red-500/30">
                        <p className="text-xs text-red-200 leading-relaxed">
                            Ett kritiskt arkitektoniskt krav är korrekt hantering av WebRTC-livscykeln i React. Om anslutningar inte stängs ordentligt kraschar webbläsaren med felet <code>Cannot create so many PeerConnections</code> efter ca 500 re-renders (vanligt vid Hot Reloads eller rumsbyten).
                        </p>
                        <p className="text-xs text-red-200 leading-relaxed mt-2">
                            <strong>Åtgärd:</strong> Reacts <code>useEffect</code>-cleanup måste <strong>alltid</strong> anropa <code>peerConnection.close()</code> och nollställa alla referenser. Detta förhindrar port-exhaustion och minnesläckor.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Module95SfuAdapterMunging;
