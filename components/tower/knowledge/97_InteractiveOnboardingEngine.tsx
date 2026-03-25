import React from 'react';

const InteractiveOnboardingEngine: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-500">
            <h3 className="text-pink-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-pink-500/30 pb-1 flex items-center gap-2">
                <span className="bg-pink-900/50 text-pink-200 px-2 rounded text-xs border border-pink-500/50">MODUL 97</span>
                🎯 Interactive Onboarding Engine
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-pink-500/20 text-slate-300 text-sm space-y-8">
                
                <div className="bg-slate-950 p-4 rounded border border-slate-800 mb-6">
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                        För att underlätta för nya funktionärer ("Hjälp till"-flödet) överger vi statiska, färdigredigerade bilder i våra guider. Istället introducerar vi en interaktiv, CSS-driven motor för onboarding-kort.
                    </p>
                </div>

                {/* 1. MAGNIFIER VIEWER */}
                <div className="space-y-4">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">1. MagnifierViewer (Klienten)</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            En React-komponent som tar oredigerade originalbilder från ett CDN (t.ex. GitHub). Ovanpå bilden använder vi ren CSS (<code>clip-path</code>, <code>transform</code>, <code>box-shadow</code>) för att dynamiskt rita röda ringar, pilar och "förstoringsglas" (magnifier) baserat på JSON-data.
                        </p>
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li><strong className="text-emerald-300">Fördel:</strong> Text och UI-element förblir knivskarpa oavsett skärmstorlek.</li>
                            <li><strong className="text-emerald-300">Fördel:</strong> Vi behöver aldrig öppna Photoshop för att uppdatera en guide.</li>
                        </ul>
                    </div>
                </div>

                {/* 2. MAGNIFIER EDITOR */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">2. MagnifierEditor (Föreningsdemokrati)</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            En drag-and-drop-editor inbyggd i appen. Om t.ex. LiveKit ändrar designen på sitt dashboard, kan <em>vem som helst</em> (även icke-utvecklare) ladda upp en ny skärmdump, dra den röda ringen till rätt plats, och generera ett "förslag".
                        </p>
                        <p className="text-[11px] text-slate-300">
                            Förslaget spottar ut JSON-data som utvecklaren enkelt kan godkänna och klistra in i koden.
                        </p>
                    </div>
                </div>

                {/* 3. JSON STRUKTUR */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-yellow-400 font-bold text-xs uppercase tracking-widest border-l-4 border-yellow-500 pl-3">3. JSON-strukturen (Onboarding Cards)</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <pre className="text-[10px] text-yellow-300 font-mono overflow-x-auto p-2 bg-black/50 rounded">
{`{
  "id": "livekit-step-1",
  "title": "Skapa projekt",
  "description": "Klicka på 'New Project' uppe till höger.",
  "imageUrl": "https://cdn.../livekit-dashboard.png",
  "magnifier": {
    "x": 85, // Procentuell X-koordinat
    "y": 12, // Procentuell Y-koordinat
    "size": 150, // Storlek i pixlar
    "zoom": 2.5 // Zoom-nivå för förstoringsglaset
  }
}`}
                        </pre>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default InteractiveOnboardingEngine;
