import React from 'react';

const DatabaseSchema: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-400">
            <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-cyan-500/30 pb-1 flex items-center gap-2">
                <span className="bg-cyan-900/50 text-cyan-200 px-2 rounded text-xs border border-cyan-500/50">FAS 6</span>
                🗄️ Databas-schema (Firestore)
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-cyan-500/20 text-slate-300 text-sm space-y-8">
                
                <div className="bg-slate-950 p-4 rounded border border-slate-800 mb-6">
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                        För att hantera Multi-Tenant BYOK och säkerhet på ett robust sätt, använder vi följande Firestore-datamodell. Säkerhetsregler (Security Rules) och Firebase Admin SDK säkerställer att känslig data förblir skyddad.
                    </p>
                </div>

                {/* 1. ORGANIZATIONS */}
                <div className="space-y-4">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">1. Collection: organizations</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <ul className="text-[11px] text-slate-400 list-none space-y-2 font-mono">
                            <li><span className="text-blue-300">orgId</span> (Document ID)</li>
                            <li><span className="text-blue-300">name:</span> String</li>
                            <li><span className="text-blue-300">inviteCode:</span> String <span className="text-slate-500 font-sans italic">(Offentlig kod som sätts på väggen, ex "UTBY")</span></li>
                            <li><span className="text-blue-300">sfuPreference:</span> String</li>
                        </ul>
                    </div>
                </div>

                {/* 2. SECRETS (SUB-COLLECTION) */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest border-l-4 border-red-500 pl-3">2. Sub-Collection: organizations/&#123;orgId&#125;/secrets</h4>
                    <div className="bg-red-900/10 p-4 rounded border border-red-500/30 space-y-3">
                        <p className="text-[11px] text-red-300 font-bold mb-2">⚠️ LÅST FÖR FRONTEND</p>
                        <p className="text-[11px] text-slate-300 mb-2">Endast vår Netlify Function får läsa detta via Firebase Admin SDK.</p>
                        <ul className="text-[11px] text-slate-400 list-none space-y-2 font-mono">
                            <li><span className="text-red-300">Document:</span> api_keys</li>
                            <li className="pl-4"><span className="text-red-300">geminiKey:</span> String</li>
                            <li className="pl-4"><span className="text-red-300">sfuKey:</span> String</li>
                            <li className="pl-4"><span className="text-red-300">sfuSecret:</span> String</li>
                        </ul>
                    </div>
                </div>

                {/* 3. USERS */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">3. Collection: users (Användarroller)</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <ul className="text-[11px] text-slate-400 list-none space-y-2 font-mono">
                            <li><span className="text-emerald-300">uid</span> (Document ID)</li>
                            <li><span className="text-emerald-300">email:</span> String</li>
                            <li><span className="text-emerald-300">orgId:</span> String <span className="text-slate-500 font-sans italic">(Endast 1 org per användare initialt)</span></li>
                            <li><span className="text-emerald-300">role:</span> String <span className="text-slate-500 font-sans italic">('main-admin' eller 'leader')</span></li>
                            <li><span className="text-emerald-300">status:</span> String <span className="text-slate-500 font-sans italic">('pending' eller 'approved')</span></li>
                        </ul>
                        <div className="mt-3 p-2 bg-emerald-900/20 border border-emerald-500/30 rounded">
                            <p className="text-[11px] text-emerald-200">
                                <strong>Kritiskt för säkerheten:</strong> <code>status: 'pending'</code> förhindrar obehöriga från att starta rum och dra kostnader, även om de känner till den offentliga Gruppkoden.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 4. ROOMS */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-purple-400 font-bold text-xs uppercase tracking-widest border-l-4 border-purple-500 pl-3">4. Collection: rooms (Mötesrum & Kill Switch)</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <ul className="text-[11px] text-slate-400 list-none space-y-2 font-mono">
                            <li><span className="text-purple-300">roomId</span> (Document ID)</li>
                            <li><span className="text-purple-300">orgId:</span> String</li>
                            <li><span className="text-purple-300">type:</span> String <span className="text-slate-500 font-sans italic">('host-controlled' eller 'auto-start')</span></li>
                            <li><span className="text-purple-300">expiresAt:</span> Timestamp <span className="text-slate-500 font-sans italic">(Vår Kill Switch)</span></li>
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default DatabaseSchema;
