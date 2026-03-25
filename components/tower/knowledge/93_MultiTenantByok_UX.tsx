import React from 'react';

const Module93MultiTenantByokUX: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-emerald-500/30 pb-1 flex items-center gap-2">
                <span className="bg-emerald-900/50 text-emerald-200 px-2 rounded text-xs border border-emerald-500/50">MODUL 93</span>
                Multi-Tenant BYOK & UX-flöde
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-emerald-500/20 text-slate-300 text-sm space-y-6">
                
                <div className="bg-slate-950 p-4 rounded border border-slate-800">
                    <p className="text-xs text-slate-300 leading-relaxed">
                        Systemet använder en <strong>"Väg 3"-arkitektur (Multi-Tenant, Delegerad BYOK)</strong>. Detta maximerar tillgängligheten för slutanvändare utan att kompromissa med budgetkontroll och säkerhet. Systemet är 100 % kostnadsfritt för plattformsägaren att hosta (Netlify + Firebase Spark). Kostnaderna för AI och medie-routing (Egress) delegeras helt till de enskilda organisationerna via BYOK (Bring Your Own Key).
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">Hierarki och Behörigheter</h4>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-2 ml-2">
                        <li><strong>Plattformsägaren (Infrastruktur):</strong> Tillhandahåller appen via kyrktolk.netlify.app. Betalar 0 kr tack vare free-tiers.</li>
                        <li><strong>Main-Admin (Ex. Kyrkans IT-ansvarige):</strong> Skapar ett konto och anger organisationens egna Gemini- och SFU-nycklar i inställningsvyn. Nycklarna sparas säkert i Firestore. Bjuder in "Leaders".</li>
                        <li><strong>Leader (Ex. Lärare/Stödsyskon):</strong> Loggar in i systemet. Kan dynamiskt skapa tidsbegränsade mötesrum via UI:t (ex. URL: /utby/sondagsskola). Aktiverar API-anropen.</li>
                        <li><strong>Visitor (Lyssnare):</strong> Kräver ingen inloggning. Klickar på en delad länk.</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-widest border-l-4 border-orange-500 pl-3">Rumstyper & Väntrums-logik (Kostnadsskydd)</h4>
                    <div className="bg-orange-900/20 p-4 rounded border border-orange-500/30">
                        <p className="text-xs text-orange-200 leading-relaxed mb-3">
                            För att balansera användarvänlighet med budgetskydd kan en Leader skapa två typer av rum:
                        </p>
                        <ul className="space-y-4">
                            <li>
                                <strong className="text-orange-300 text-xs">1. Värdstyrda rum (Standard):</strong>
                                <p className="text-xs text-orange-200/80 mt-1">
                                    Om en Visitor surfar till möteslänken innan en Leader har startat rummet, placeras de i ett <strong>"Väntrum"</strong> (en låst UI-vy). WebRTC-anslutningen och Gemini-anropen förblir blockerade tills en verifierad Leader träder in i rummet och låser upp sessionen.
                                </p>
                            </li>
                            <li>
                                <strong className="text-orange-300 text-xs">2. Auto-Start rum ("Join before host"):</strong>
                                <p className="text-xs text-orange-200/80 mt-1">
                                    Ljudmotorn och AI:n startar omedelbart när den första personen klickar på länken (inget väntrum). För att skydda BYOK-budgeten <strong>MÅSTE</strong> dessa rum ha en hård tidsgräns (t.ex. 45 eller 60 minuter) som sätts av Leadern vid skapandet. När tiden löper ut klipper Netlify-dörrvakten anslutningen automatiskt. Detta maximerar friktionen för vanliga användare vid obehörig användning.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Module93MultiTenantByokUX;
