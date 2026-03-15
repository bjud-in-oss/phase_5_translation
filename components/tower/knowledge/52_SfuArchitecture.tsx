import React from 'react';

const SfuArchitecture: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-3 border-b border-white/20 pb-1 flex items-center gap-2">
                <span className="bg-white text-black px-2 rounded text-xs">MODUL 52</span>
                SFU & Cloud Routing (WebRTC)
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-white/10 text-slate-300 text-sm space-y-8">
                
                {/* 1. PARADIGMSKIFTE */}
                <div className="space-y-4">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">Paradigmskifte: Från Lokal Relay till Moln-SFU</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Vi har övergett idén om att bygga och underhålla en egen lokal "Relay Server" (Node.js/Go) på plats i kyrkan. Istället använder vi en modern molnbaserad <strong>SFU (Selective Forwarding Unit)</strong>, som till exempel Cloudflare Realtime eller LiveKit, via vår <code>networkService</code>.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="bg-slate-950 p-3 rounded border border-slate-800">
                            <strong className="text-white text-xs block mb-1">Gammal plan (Lokal Relay)</strong>
                            <ul className="text-[10px] text-slate-500 list-disc pl-4 space-y-1">
                                <li>Kräver fysisk server/dator på nätverket.</li>
                                <li>Svårt med brandväggar och NAT.</li>
                                <li>Bandbredden på det lokala nätverket blir en flaskhals vid många lyssnare.</li>
                                <li>Ingen inbyggd ekosläckning eller avancerad routing.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-950 p-3 rounded border border-slate-800">
                            <strong className="text-emerald-400 text-xs block mb-1">Ny plan (Moln-SFU)</strong>
                            <ul className="text-[10px] text-slate-500 list-disc pl-4 space-y-1">
                                <li>Noll installationskrav lokalt.</li>
                                <li>Inbyggd TURN-server löser alla brandväggsproblem.</li>
                                <li>Molnet tar bandbreddssmällen, obegränsat antal lyssnare.</li>
                                <li>Branschstandard WebRTC hanterar anslutningarna, medan vi behåller full lokal kontroll över AEC (mjukvara vs hårdvara) per klient.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 2. UNICAST VS PUB/SUB */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">Unicast vs Pub/Sub (Tracks & Rum)</h4>
                    
                    <div className="space-y-3">
                        <p className="text-xs text-slate-400 leading-relaxed">
                            I en traditionell P2P-lösning (Unicast) måste sändaren ladda upp en separat ljudström för varje lyssnare. Med 50 lyssnare kraschar sändarens uppkoppling.
                        </p>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Med en SFU använder vi en <strong>Publish/Subscribe</strong>-modell inuti virtuella "Rum".
                        </p>
                    </div>

                    <div className="relative bg-black/40 p-4 rounded-lg border border-white/10 font-mono text-xs space-y-4 mt-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            
                            {/* Publisher */}
                            <div className="bg-indigo-900/30 text-indigo-300 p-3 rounded border border-indigo-500/30 w-full md:w-1/3 text-center">
                                <strong className="block text-white mb-1">Sändare (Appen)</strong>
                                <span className="text-[10px]">Publicerar 1 Track (Audio)</span>
                            </div>

                            {/* SFU */}
                            <div className="flex-1 flex flex-col items-center">
                                <div className="text-[10px] text-emerald-400 mb-1">1x Uppladdning</div>
                                <div className="w-full h-0.5 bg-emerald-500/50 relative">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full"></div>
                                </div>
                            </div>

                            <div className="bg-slate-800 text-white p-3 rounded border border-slate-600 w-full md:w-1/3 text-center relative shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                                <strong className="block text-emerald-400 mb-1">Moln-SFU</strong>
                                <span className="text-[10px] text-slate-400">Virtuellt Rum: "Svenska"</span>
                            </div>

                        </div>

                        {/* Subscribers */}
                        <div className="flex flex-col items-center mt-4">
                            <div className="w-0.5 h-6 bg-slate-600"></div>
                            <div className="text-[10px] text-slate-400 mb-2">50x Nedladdningar (Molnet betalar bandbredden)</div>
                            <div className="flex flex-wrap justify-center gap-2">
                                <div className="bg-green-900/20 text-green-400 p-2 rounded border border-green-500/30 text-[10px]">Lyssnare 1</div>
                                <div className="bg-green-900/20 text-green-400 p-2 rounded border border-green-500/30 text-[10px]">Lyssnare 2</div>
                                <div className="bg-green-900/20 text-green-400 p-2 rounded border border-green-500/30 text-[10px]">Lyssnare 3...</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 p-3 rounded text-[11px] text-slate-400 border border-slate-700 mt-4">
                        <strong>Sammanfattning:</strong> Genom att publicera ett enda "Track" till SFU:n, sparar sändaren enormt mycket bandbredd och CPU. SFU:n hanterar sedan den tunga uppgiften att kopiera och skicka ut strömmen till alla prenumeranter i rummet, oavsett om de sitter på samma Wi-Fi eller på andra sidan jorden.
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SfuArchitecture;
