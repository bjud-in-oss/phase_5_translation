import React from 'react';

const Phase5SFU: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-indigo-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-indigo-500/30 pb-1 flex items-center gap-2">
                <span className="bg-indigo-900/50 text-indigo-200 px-2 rounded text-xs border border-indigo-500/50">FAS 5</span>
                🌐 SFU Agnosticism & Adapter Pattern
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-indigo-500/20 text-slate-300 text-sm space-y-8">
                
                <div className="bg-slate-950 p-4 rounded border border-slate-800 mb-6">
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                        Denna fas flyttar applikationen från en specifik SFU-leverantör till ett <strong>SFU Adapter Pattern</strong>. Vi stödjer nu LiveKit, Daily.co och Cloudflare Calls för att ge organisationer maximal flexibilitet och kostnadskontroll.
                    </p>
                </div>

                {/* 1. ADAPTER PATTERN */}
                <div className="space-y-4">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">1. SFU Adapter Pattern & Kalkyler</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li><strong className="text-emerald-300">LiveKit (Rekommenderad):</strong> 5 000 gratis deltagarminuter (ca 83 timmar) / 50 GB. Inget kort krävs. Inbyggd hård spärr (hard limit).</li>
                            <li><strong className="text-emerald-300">Daily.co (Fallback):</strong> 10 000 gratis deltagarminuter (ca 166 timmar). Inget kort krävs. Inbyggd hård spärr.</li>
                            <li><strong className="text-emerald-300">Cloudflare Calls (Power Users):</strong> 1 TB gratis egress. Kräver kreditkort. Saknar inbyggd hård spärr, vilket lägger det ekonomiska ansvaret på vår app.</li>
                        </ul>
                    </div>
                </div>

                {/* 2. PUB/SUB MODELLEN */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">2. Pub/Sub Logik (Audio Tracks)</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li><strong className="text-blue-300">Admin Publisher:</strong> När rollen är Admin, skickas <code>radiomix</code>-strömmen (AI + Original) upp som ett WebRTC-track till vald SFU.</li>
                            <li><strong className="text-blue-300">Listener Subscriber:</strong> Lyssnare ansluter passivt och prenumererar på Admin-tracket. De pratar <em>inte</em> med Gemini själva, vilket sparar API-kostnader.</li>
                        </ul>
                    </div>
                </div>

                {/* 3. SDP MUNGING */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-widest border-l-4 border-orange-500 pl-3">3. SDP Munging (Firefox-kompatibilitet)</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            För att skydda mot obegränsade egress-kostnader stryper vi ljudet till 24 kbps serverside via SDP Munging.
                        </p>
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li><strong className="text-orange-300">Chrome/Safari:</strong> Vi injicerar <code>b=AS:24</code> (kbps).</li>
                            <li><strong className="text-orange-300">Firefox (Kritiskt):</strong> Vi MÅSTE injicera <code>b=TIAS:24000</code> (bps).</li>
                        </ul>
                        <div className="mt-3 p-2 bg-orange-900/20 border border-orange-500/30 rounded">
                            <p className="text-[11px] text-orange-200">
                                <strong>Ekonomisk konsekvens:</strong> För Cloudflare betyder 24 kbps att 1 TB räcker i över 92 500 timmar (sparar enormt mycket pengar). För LiveKit/Daily förlängs inte gratistiden (eftersom de debiterar per minut), men det sparar användarnas nätverkskapacitet.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Phase5SFU;
