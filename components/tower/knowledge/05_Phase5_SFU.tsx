import React from 'react';

const Phase5SFU: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-indigo-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-indigo-500/30 pb-1 flex items-center gap-2">
                <span className="bg-indigo-900/50 text-indigo-200 px-2 rounded text-xs border border-indigo-500/50">FAS 5</span>
                🌐 SFU & Global Distribution
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-indigo-500/20 text-slate-300 text-sm space-y-8">
                
                <div className="bg-slate-950 p-4 rounded border border-slate-800 mb-6">
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                        Denna fas flyttar applikationen från lokal simulering till global distribution via <strong>Cloudflare Serverless SFU</strong>. Vi ersätter <code>BroadcastChannel</code> med äkta WebRTC SFU-logik.
                    </p>
                </div>

                {/* 1. PUB/SUB MODELLEN */}
                <div className="space-y-4">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">1. Pub/Sub Logik (Audio Tracks)</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li><strong className="text-emerald-300">Admin Publisher:</strong> När rollen är Admin, skickas <code>radiomix</code>-strömmen (AI + Original) upp som ett WebRTC-track till Cloudflare.</li>
                            <li><strong className="text-emerald-300">Listener Subscriber:</strong> Lyssnare ansluter passivt och prenumererar på Admin-tracket. De pratar <em>inte</em> med Gemini själva, vilket sparar API-kostnader.</li>
                        </ul>
                    </div>
                </div>

                {/* 2. DATACHANNELS OVER INTERNET */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">2. Global State Sync</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Vi ersätter <code>BroadcastChannel</code> i <code>useDataChannel.ts</code>. Meddelanden som <code>ADMIN_MUTE_ALL</code> och rumsbyten skickas nu via Cloudflares WebRTC-datakanaler.
                        </p>
                    </div>
                </div>

                {/* 3. SÄKERHET & TOKENS */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest border-l-4 border-red-500 pl-3">3. Säkerhet (Cloudflare Auth)</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Anslutning kräver en sessionstoken. Vi implementerar en backend (t.ex. Netlify Edge Function) som genererar tokens baserat på rums-ID och App Secret, för att förhindra obehörig åtkomst till ljudströmmarna.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Phase5SFU;
