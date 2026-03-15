import React from 'react';

const FutureVisions: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-cyan-500/30 pb-1 flex items-center gap-2">
                <span className="bg-cyan-900/50 text-cyan-200 px-2 rounded text-xs border border-cyan-500/50">MODUL 99</span>
                Framtidsvisioner (Phase 5)
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-cyan-500/20 text-slate-300 text-sm space-y-8">
                
                <div className="bg-cyan-900/20 p-4 rounded border border-cyan-500/30 mb-6">
                    <p className="text-xs text-cyan-300 leading-relaxed">
                        Här dokumenteras projektets långsiktiga roadmap ("Phase 5"). Arkitekturen är förberedd för dessa paradigmskiften för att ta systemet från en renodlad tolk-app till ett komplett, AI-drivet ekosystem för möten.
                    </p>
                </div>

                {/* 1. ERSÄTTA ZOOM */}
                <div className="space-y-4">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">1. Att ersätta Zoom (The Ultimate SFU)</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            <strong className="text-blue-400">Vision:</strong> Eftersom vi använder Cloudflare WebRTC SFU (samma underliggande teknik som Google Meet), bygger vi redan ett komplett videokonferenssystem.
                        </p>
                        <p className="text-[11px] text-slate-300">
                            <strong className="text-blue-400">Genomförande:</strong> I framtiden kan appen låta fjärrdeltagare ansluta med både bild och ljud direkt in i våra SFU-rum. Appen kan då spela upp de obearbetade rösterna från fjärrdeltagarna i takhögtalarna. Detta eliminerar behovet av en extern Zoom-klient i kyrkan helt och hållet.
                        </p>
                    </div>
                </div>

                {/* 2. AI DIRECTOR */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-purple-400 font-bold text-xs uppercase tracking-widest border-l-4 border-purple-500 pl-3">2. The AI Director (Multimodal Kamera-styrning)</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            <strong className="text-purple-400">Vision:</strong> Gemini 2.0+ är multimodala modeller som kan processa video i realtid.
                        </p>
                        <p className="text-[11px] text-slate-300">
                            <strong className="text-purple-400">Genomförande:</strong> Genom att koppla in en webbkamera i Admin-datorn som överblickar kapellet, kan AI:n se vem som ställer sig upp. AI:n kan då via ett API (t.ex. VISCA över IP) skicka kommandon för att styra PTZ-kamerorna i taket och zooma in på rätt person, samt slå på rätt mikrofon på mixerbordet. Appen går från att vara en tolk till att bli en bildproducent.
                        </p>
                    </div>
                </div>

                {/* 3. BILD-OPTIMERING & KEN BURNS */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">3. Smart Bildströmning (Gratisnivå & Ken Burns)</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            <strong className="text-emerald-400">Vision:</strong> Att sända live-video kan vara extremt resurskrävande och dyrt. För att hålla lösningen 100% gratis för kyrkor kan vi använda smarta bildtekniker.
                        </p>
                        <p className="text-[11px] text-slate-300">
                            <strong className="text-emerald-400">Genomförande:</strong> Istället för 30 fps video, skickar vi högupplösta stillbilder. På klientsidan appliceras mjuka <strong>Ken Burns-effekter</strong> (långsam inzoomning och panorering via CSS/JS) för att skapa en illusion av rörelse och liv utan att utmatta servrarna.
                        </p>
                        <p className="text-[11px] text-slate-300">
                            <strong className="text-emerald-400">AI-Klippning:</strong> AI:n kan analysera bilden, identifiera talaren och automatiskt beskära (klippa) stillbilden för att förfina kompositionen och fokusera på det som är viktigt, vilket ytterligare förstärker rörelsekänslan.
                        </p>
                        <div className="bg-black/40 p-3 rounded border border-emerald-500/20 mt-2">
                            <strong className="text-emerald-300 text-[10px] block mb-1">Kalkyl för Gratisnivå (Gemini API):</strong>
                            <p className="text-[10px] text-slate-400">
                                Googles gratisnivå för Gemini tillåter <strong>15 requests per minut (RPM)</strong>. Genom att uppdatera stillbilden var <strong>5:e till 10:e sekund</strong> (6-12 RPM) håller vi oss väl inom gratisgränsen. Ken Burns-effekten överbryggar gapet mellan bilduppdateringarna så att tittaren inte upplever det som ett statiskt bildspel, utan som en dynamisk sändning.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 4. WALKIE-TALKIE */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-widest border-l-4 border-orange-500 pl-3">4. Fallback: Walkie-Talkie-läget</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            <strong className="text-orange-400">Vision:</strong> Om simultantolkning via Gemini Live stöter på oöverstigliga akustiska problem i svåra lokaler, är arkitekturen förberedd för sekventiell tolkning.
                        </p>
                        <p className="text-[11px] text-slate-300">
                            <strong className="text-orange-400">Genomförande:</strong> En "Push-to-talk"-funktion där ljud spelas in, skickas till AI, och sedan spelas upp när talaren är tyst. Detta eliminerar 100% av alla ekoproblem, men till priset av att mötestiden fördubblas.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FutureVisions;
