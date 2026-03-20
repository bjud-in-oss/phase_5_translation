import React from 'react';

const Module94BffSecurityNetlify: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-300">
            <h3 className="text-red-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-red-500/30 pb-1 flex items-center gap-2">
                <span className="bg-red-900/50 text-red-200 px-2 rounded text-xs border border-red-500/50">MODUL 94</span>
                Säkerhet & BFF (Netlify Functions)
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-red-500/20 text-slate-300 text-sm space-y-6">
                
                <div className="bg-slate-950 p-4 rounded border border-slate-800">
                    <p className="text-xs text-slate-300 leading-relaxed">
                        <strong>Zero Trust på Klientsidan:</strong> API-nycklar (Gemini, SFU) lagras <strong>aldrig</strong> i frontend-koden (t.ex. .env-filer) eftersom Vites byggprocess exponerar dem. Istället används ett <strong>Backend-For-Frontend (BFF)</strong>-mönster via Netlify Functions.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">Netlify Functions som Proxy</h4>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-2 ml-2">
                        <li>Klienten skickar en begäran till <code>/api/get-sfu-token</code> eller <code>/api/get-gemini-token</code>.</li>
                        <li>Begäran inkluderar användarens Firebase Auth-token (JWT).</li>
                        <li>Netlify Function använder <strong>Firebase Admin SDK</strong> för att verifiera token och kontrollera användarens behörighet.</li>
                        <li>Om godkänd, hämtar funktionen organisationens krypterade BYOK-nycklar från en skyddad Firestore-samling.</li>
                        <li>Funktionen genererar en kortlivad sessionstoken (för SFU) eller returnerar nyckeln (för Gemini) till klienten.</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-widest border-l-4 border-orange-500 pl-3">Kill Switch (Tidslås)</h4>
                    <div className="bg-orange-900/20 p-4 rounded border border-orange-500/30">
                        <p className="text-xs text-orange-200 leading-relaxed">
                            För att förhindra skenande kostnader från glömda sessioner har varje rum en <code>expiresAt</code>-tidsstämpel. Netlify Functions och cron-jobb övervakar detta. När tiden går ut triggas <code>peerConnection.close()</code> på alla klienter, och rummet låses.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Module94BffSecurityNetlify;
