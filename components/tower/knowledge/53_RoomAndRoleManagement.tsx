import React from 'react';

const RoomAndRoleManagement: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-3 border-b border-white/20 pb-1 flex items-center gap-2">
                <span className="bg-white text-black px-2 rounded text-xs">MODUL 53</span>
                Rum, Möten & Roller (State Specifikation)
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-white/10 text-slate-300 text-sm space-y-8">
                
                {/* 1. SEPARATION AV ROLL OCH HÅRDVARA */}
                <div className="space-y-4">
                    <h4 className="text-purple-400 font-bold text-xs uppercase tracking-widest border-l-4 border-purple-500 pl-3">1. Separation av Roll och Hårdvara (Kritisk Arkitektur)</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        För att systemet ska vara flexibelt och skalbart har vi en stenhård separation mellan <strong>vem du är</strong> och <strong>vilken maskin du sitter vid</strong>.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="bg-purple-900/20 p-4 rounded border border-purple-500/30">
                            <strong className="text-purple-300 text-[11px] block mb-2 border-b border-purple-500/30 pb-1">UserRole (Auktoritet)</strong>
                            <ul className="text-[10px] text-slate-300 list-disc pl-4 space-y-2">
                                <li><strong>Roller:</strong> Admin, Teacher eller Listener.</li>
                                <li><strong>Styrning:</strong> Sätts via URL-parameter (t.ex. <code>?role=admin</code>).</li>
                                <li><strong>Funktion:</strong> Styr ENDAST vilka UI-rättigheter du har (t.ex. knappar för att byta möte, Mute All).</li>
                                <li><strong>Enhetsoberoende:</strong> En Admin eller Teacher kan köra appen på en mobiltelefon. Rollen har <em>ingenting</em> med ljudrouting att göra.</li>
                            </ul>
                        </div>
                        <div className="bg-blue-900/20 p-4 rounded border border-blue-500/30">
                            <strong className="text-blue-300 text-[11px] block mb-2 border-b border-blue-500/30 pb-1">HardwareMode (Ljudrouting)</strong>
                            <ul className="text-[10px] text-slate-300 list-disc pl-4 space-y-2">
                                <li><strong>Lägen:</strong> Simple eller Pro.</li>
                                <li><strong>Styrning:</strong> Fysisk toggle-knapp i gränssnittet. Sparas i <code>localStorage</code> per enhet.</li>
                                <li><strong>Funktion:</strong> Styr hur ljudet routas i webbläsaren (t.ex. stereosplit, AEC-inställningar).</li>
                                <li><strong>Enhetsspecifikt:</strong> Detta är specifikt för den fysiska enhet som är inkopplad i PA-systemet (t.ex. en PC med Tesira).</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 2. KONCEPTET RUM */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">2. Konceptet "Rum" (SFU Rooms)</h4>
                    
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Systemet bygger på isolerade SFU-rum. En användare kan befinna sig i det stora publika rummet eller i ett mindre, privat rum.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="bg-slate-950 p-3 rounded border border-slate-800">
                            <strong className="text-blue-400 text-xs block mb-1">Offentliga Rum (Huvudkyrkan)</strong>
                            <p className="text-[10px] text-slate-500">
                                Fasta URL:er (t.ex. <code>/room/kapellet</code>). Här sker envägs-tolkning (Smart Broadcast).
                            </p>
                        </div>
                        <div className="bg-slate-950 p-3 rounded border border-slate-800">
                            <strong className="text-orange-400 text-xs block mb-1">Privata Diskussionsrum</strong>
                            <p className="text-[10px] text-slate-500">
                                Unikt hash-ID (delas via QR). Flervägs-tolkning där alla deltagare kan tala.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. ÖVERSÄTTNING AV RUMSNAMN */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">3. Översättning av Rumsnamn (UI)</h4>
                    
                    <p className="text-xs text-slate-400 leading-relaxed">
                        För att undvika onödiga nätverksanrop, API-kostnader och komplex SFU-synkronisering använder vi en statisk ordlista (i18n) snarare än AI för rumsnamn.
                    </p>

                    <div className="bg-emerald-900/10 p-4 rounded border border-emerald-500/20">
                        <strong className="text-emerald-300 text-xs block mb-2">Teknisk Regel: Statisk Översättning (i18n)</strong>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                            Systemet mappar fasta rums-IDn mot en lokal ordlista. Detta garanterar omedelbar laddning och noll API-förbrukning.
                        </p>
                        <div className="mt-3 p-2 bg-black/50 rounded text-[10px] text-slate-400 font-mono space-y-1">
                            <div>1. <span className="text-emerald-500 italic">// Publika rum:</span> Visas enligt lokal ordlista (t.ex. "Huvudsalen", "Main Hall").</div>
                            <div>2. <span className="text-emerald-500 italic">// Privata rum:</span> Dynamiska hash-IDn namnges ej av användaren.</div>
                            <div>3. <span className="text-emerald-500 italic">// UI-standard:</span> Alla privata rum visas enhetligt som "Privat grupp" + Ikon.</div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default RoomAndRoleManagement;
