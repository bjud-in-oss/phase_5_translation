import React from 'react';

const InteractiveOnboardingEngine: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-500">
            <h3 className="text-pink-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-pink-500/30 pb-1 flex items-center gap-2">
                <span className="bg-pink-900/50 text-pink-200 px-2 rounded text-xs border border-pink-500/50">MODUL 97</span>
                🎯 Interactive Onboarding Engine & Data Mapping
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-pink-500/20 text-slate-300 text-sm space-y-8">
                
                <div className="bg-slate-950 p-4 rounded border border-slate-800 mb-6">
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                        För att underlätta för nya funktionärer ("Hjälp till"-flödet) överger vi statiska, färdigredigerade bilder i våra guider. Istället introducerar vi en interaktiv, CSS-driven motor för onboarding-kort.
                    </p>
                </div>

                {/* 1. ARKITEKTUR */}
                <div className="space-y-4">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">1. Arkitektur för Viewern & Editorn</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            <strong className="text-emerald-300">MagnifierViewer.tsx:</strong> Renderar originalbilden med dynamiska CSS-overlays (blur, förstoringsglas med X/Y-koordinater och zoom-faktor). Mellan steget för "Intro" och "SFU" ska den stödja en "Text-Only"-vy där man väljer ljudleverantör.
                        </p>
                        <p className="text-[11px] text-slate-300">
                            <strong className="text-emerald-300">MagnifierEditor.tsx:</strong> Ett admin-verktyg där man kan dra förstoringsglasen över bilden. Verktyget genererar en JSON-sträng som kan kopieras och klistras in i koden för att uppdatera guiden permanent.
                        </p>
                    </div>
                </div>

                {/* 2. DATA MAPPING */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">2. Den Kompletta Datamappningen</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-4">
                        
                        {/* Del 1: INTRO */}
                        <div>
                            <h5 className="text-xs font-bold text-blue-300 mb-2">Del 1: INTRO</h5>
                            <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-1">
                                <li><strong>Bild 1:</strong> b84dfbcf-47a5-4d97-a1bd-5876aae6d4d5 (Ingen ring) | "Välkommen! Appen är gratis tack vare BYOK..."</li>
                                <li><strong>Bild 2:</strong> e5cf2ea5-488f-4d71-9953-7c83fe8ea8c6 (Ring: x:50%, y:50%, zoom:2) | "Internet kan vara rörigt. Vi har suddat ut allt du inte behöver bry dig om..."</li>
                                <li><strong>Bild 3:</strong> fe7070a5-37cd-4625-94a0-48bec8441ace (Ingen ring) | "Del 1: Din AI-Nyckel. Vi börjar med Google Gemini."</li>
                            </ul>
                        </div>

                        {/* Del 2: GEMINI */}
                        <div>
                            <h5 className="text-xs font-bold text-blue-300 mb-2">Del 2: GEMINI</h5>
                            <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-1">
                                <li><strong>Bild 1:</strong> 3afdd79f-9520-4819-ac91-d5bb86ff1be1 (Ring: x:12%, y:85%, zoom:3) | "Öppna Google AI Studio. Klicka på 'Get API key' nere till vänster."</li>
                                <li><strong>Bild 2:</strong> 1c9fd3bd-1e00-4276-b2f4-a47d173dc55d (Ring: x:85%, y:15%, zoom:3) | "Klicka på 'Create API key' uppe till höger."</li>
                                <li><strong>Bild 3:</strong> 47f3fd65-71d2-4c96-9dc8-76a64c99020c (Ring: x:50%, y:50%, zoom:3) | "Välj Create project."</li>
                                <li><strong>Bild 4:</strong> 084aea68-36ce-4847-addb-e2d540b9a020 (Ring: x:75%, y:45%, zoom:4) | "Kopiera den färdiga nyckeln."</li>
                                <li><strong>Bild 5:</strong> a142a8e8-cb96-41a7-9234-e34d51ed8570 (Ring: x:50%, y:50%, zoom:2) | "Klistra in nyckeln i appen."</li>
                            </ul>
                        </div>

                        {/* Del 3: VÄLJ LJUDSERVER */}
                        <div>
                            <h5 className="text-xs font-bold text-blue-300 mb-2">Del 3: VÄLJ LJUDSERVER (Textvy)</h5>
                            <p className="text-[11px] text-slate-400 pl-4">
                                Innehåll: Visar alternativ för LiveKit, Daily och Cloudflare med tillhörande beskrivning av gratistimmar. Valet avgör vilka bilder som visas härnäst.
                            </p>
                        </div>

                        {/* Del 4A: LIVEKIT */}
                        <div>
                            <h5 className="text-xs font-bold text-blue-300 mb-2">Del 4A: LIVEKIT</h5>
                            <p className="text-[11px] text-slate-400 pl-4">
                                Länkar i ordning: 693f1605..., 82be7e28..., 2c0b248b..., ba08f099..., af9550c7..., d38efc60.... Fokus (Ring) börjar generellt vid x:50, y:50 och justeras senare via editorn.
                            </p>
                        </div>

                        {/* Del 4B: DAILY */}
                        <div>
                            <h5 className="text-xs font-bold text-blue-300 mb-2">Del 4B: DAILY</h5>
                            <p className="text-[11px] text-slate-400 pl-4">
                                Länkar i ordning: 71f62a2f..., 192c893e..., 79775d18..., 5fb1b3c6..., a9191a79..., f3938dc1..., dd0899c2....
                            </p>
                        </div>

                        {/* Del 4C: CLOUDFLARE */}
                        <div>
                            <h5 className="text-xs font-bold text-blue-300 mb-2">Del 4C: CLOUDFLARE</h5>
                            <p className="text-[11px] text-slate-400 pl-4">
                                Länkar i ordning: 4788a289..., d92da951..., 468e41f4..., 5c9ea6da..., b7918972..., 177aa3ca....
                            </p>
                        </div>

                        {/* Del 5: OUTRO */}
                        <div>
                            <h5 className="text-xs font-bold text-blue-300 mb-2">Del 5: OUTRO</h5>
                            <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-1">
                                <li><strong>Bild 1:</strong> eb5c7d15-c20e-40e8-8495-951220891185 (Ingen ring) | "Redo att tolka! Du har nu framgångsrikt hämtat nycklarna."</li>
                            </ul>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default InteractiveOnboardingEngine;
