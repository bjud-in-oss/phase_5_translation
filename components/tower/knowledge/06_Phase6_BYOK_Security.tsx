import React from 'react';

const Phase6BYOKSecurity: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-300">
            <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-emerald-500/30 pb-1 flex items-center gap-2">
                <span className="bg-emerald-900/50 text-emerald-200 px-2 rounded text-xs border border-emerald-500/50">FAS 6</span>
                🔒 BYOK, Säkerhet & Multi-Tenant UX
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-emerald-500/20 text-slate-300 text-sm space-y-8">
                
                <div className="bg-slate-950 p-4 rounded border border-slate-800 mb-6">
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                        Denna fas markerar skiftet till en Multi-Tenant SaaS-plattform. Vi introducerar delegerad BYOK (Bring Your Own Key), en säker Netlify BFF (Backend-For-Frontend) och ett robust "Hjälp till"-flöde för föreningsdemokrati.
                    </p>
                </div>

                {/* 1. NETLIFY BFF */}
                <div className="space-y-4">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">1. Netlify BFF (Dörrvakten)</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Netlify Functions agerar som en säker proxy ("Dörrvakt") mellan klienten och externa API:er (Gemini, SFU). Detta döljer organisationernas API-nycklar från klienten och möjliggör säkra anrop via Firebase Admin SDK.
                        </p>
                    </div>
                </div>

                {/* 2. THE AUTOMATED KILL-SWITCH */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest border-l-4 border-red-500 pl-3">2. The Automated Kill-Switch</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Eftersom Cloudflare saknar en "hard cap" för sin 1 TB-gräns, riskerar organisationer med registrerade kreditkort skenande kostnader om en länk läcker eller ett rum glöms öppet.
                        </p>
                        <p className="text-[11px] text-slate-300">
                            <strong>Hur vår Kill-Switch fungerar:</strong> Vi hanterar detta via Netlify BFF (Dörrvakten) och Firestore. När ett rum skapas sätts en tvingande tidsgräns (<code>expiresAt</code>).
                        </p>
                        <div className="mt-3 p-2 bg-red-900/20 border border-red-500/30 rounded">
                            <p className="text-[11px] text-red-200">
                                Netlify-funktionen vägrar konsekvent att dela ut nya SFU-tokens (eller Gemini-tokens) till klienter om rummets <code>expiresAt</code> har passerats. Detta kapar automatiskt all ny trafik till Cloudflare och agerar som en idiotsäker, serverstyrd kostnadsspärr.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. STARTSIDAN & UX */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-widest border-l-4 border-orange-500 pl-3">3. Startsidan (UX)</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Startsidan är extremt avskalad. Den visar endast en inmatningsruta och en knapp för lyssnare (besökare) att ange en Gruppkod (ex. "UTBY"). Längst ner finns en diskret länk: <strong>"Hjälp till"</strong> för funktionärer.
                        </p>
                    </div>
                </div>

                {/* 4. HJÄLP TILL & GODKÄNNANDE */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-purple-400 font-bold text-xs uppercase tracking-widest border-l-4 border-purple-500 pl-3">4. "Hjälp till"-flödet & Godkännande-loop</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li><strong className="text-purple-300">Starta ny grupp (Main-Admin):</strong> Skapar ett konto och ställer in organisationens BYOK-nycklar (Gemini, SFU).</li>
                            <li><strong className="text-purple-300">Hjälp till i befintlig grupp (Leader):</strong> Skapar ett konto och anger gruppens offentliga "Gruppkod". Användaren sätts då i status <code>pending</code>.</li>
                            <li><strong className="text-red-300">Godkännande-loop:</strong> En <code>pending</code> Leader <strong>MÅSTE</strong> godkännas av en Main-Admin eller en befintlig Leader innan de får starta rum. Detta skyddar BYOK-budgeten eftersom Gruppkoden är offentlig (t.ex. uppsatt på en vägg).</li>
                        </ul>
                    </div>
                </div>

                {/* 5. PDF & QR-KOD */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-yellow-400 font-bold text-xs uppercase tracking-widest border-l-4 border-yellow-500 pl-3">5. PDF & QR-kod Utskrift</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Appen innehåller en funktion där godkända Leaders kan generera och skriva ut en A4-PDF. Denna PDF innehåller en stor QR-kod för lyssnare, samt instruktioner och den offentliga Gruppkoden för nya funktionärer som vill "Hjälpa till".
                        </p>
                    </div>
                </div>

                {/* 6. MILJÖVARIABLER & FIREBASE CONFIG */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-pink-400 font-bold text-xs uppercase tracking-widest border-l-4 border-pink-500 pl-3">6. Miljövariabler & Firebase Config</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Även om Firebase API-nycklar är publika och måste skickas till klienten, får de aldrig checkas in i Git (t.ex. via en <code>firebase-config.json</code>). Detta beror på tre saker:
                        </p>
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li><strong className="text-pink-300">Delade Cloud-rättigheter:</strong> Nyckeln kan ibland ge tillgång till underliggande Google Cloud-tjänster (som Gemini API) om de delar samma projekt.</li>
                            <li><strong className="text-pink-300">Quota Snyltning:</strong> Vem som helst kan ta nyckeln från GitHub och köra trafik mot din databas lokalt.</li>
                            <li><strong className="text-pink-300">GitHub Scanners:</strong> GitHub flaggar automatiskt filer med <code>AIzaSy...</code> som läckor.</li>
                        </ul>
                        <div className="mt-3 p-2 bg-pink-900/20 border border-pink-500/30 rounded">
                            <p className="text-[11px] text-pink-200">
                                Lösningen är att använda Vite's <code>.env</code>-filer (<code>VITE_FIREBASE_API_KEY</code>) och bygga in variablerna under CI/CD-processen.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Phase6BYOKSecurity;
