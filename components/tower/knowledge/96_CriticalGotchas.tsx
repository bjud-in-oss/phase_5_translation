import React from 'react';

const Module96CriticalGotchas: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-500">
            <h3 className="text-yellow-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-yellow-500/30 pb-1 flex items-center gap-2">
                <span className="bg-yellow-900/50 text-yellow-200 px-2 rounded text-xs border border-yellow-500/50">MODUL 96</span>
                Kritiska Gotchas & Lärdomar
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-yellow-500/20 text-slate-300 text-sm space-y-6">
                
                <div className="bg-slate-950 p-4 rounded border border-slate-800">
                    <p className="text-xs text-slate-300 leading-relaxed">
                        Här samlar vi våra viktigaste tekniska "blodiga läxor" kring React, Firebase, WebRTC och infrastruktur. Dessa insikter är avgörande för systemets stabilitet och prestanda.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">1. React: Den sanna meningen med key-propen</h4>
                    <p className="text-xs text-slate-300 leading-relaxed ml-2">
                        Många tror att <code>key</code> bara används för att slippa varningar när man loopar arrayer. Den riktiga best practicen är att <code>key</code> styr en komponents identitet över tid i Reacts virtuella DOM. Om man byter <code>key</code> på en komponent, tvingar man React att unmounta den gamla och montera en helt ny instans.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-widest border-l-4 border-orange-500 pl-3">2. WebRTC: Autoplay-policys och tystnad</h4>
                    <p className="text-xs text-slate-300 leading-relaxed ml-2">
                        Moderna webbläsare (särskilt Safari och Chrome) har strikta Autoplay-policys. Om en app försöker spela upp WebRTC-ljud innan användaren har interagerat med sidan (t.ex. klickat på en knapp), kommer ljudet att blockeras. 
                        <br/><br/>
                        <strong>Lösning:</strong> Kräv alltid att användaren klickar på en "Gå med i möte"-knapp innan <code>RTCPeerConnection</code> och ljud-elementet initieras.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">3. Firebase: Firestore vs Realtime DB för Signallering</h4>
                    <p className="text-xs text-slate-300 leading-relaxed ml-2">
                        Även om Firestore är bra för statisk data (som BYOK-nycklar och roller), är det för långsamt för WebRTC-signallering och chatt. Tester visar att Firebase Realtime Database (RTDB) är 10-20x snabbare än Firestore eftersom RTDB använder äkta WebSockets. 
                        <br/><br/>
                        <strong>Slutsats:</strong> Använd RTDB för snabba händelser (signallering) och Firestore för lagring.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-purple-400 font-bold text-xs uppercase tracking-widest border-l-4 border-purple-500 pl-3">4. Infrastruktur och Kostnader: 100 % Gratis med Firebase Spark</h4>
                    <div className="bg-purple-900/20 p-4 rounded border border-purple-500/30">
                        <p className="text-xs text-purple-200 leading-relaxed mb-3">
                            Att hosta själva plattformen kostar 0 kr och kräver inget kreditkort. Vi använder Firebase Spark-plan som erbjuder generösa gratisgränser:
                        </p>
                        <ul className="list-disc list-inside text-xs text-purple-200 space-y-2 ml-2">
                            <li><strong>Cloud Firestore</strong> (används för inställningar, BYOK-nycklar och roller): Tillåter upp till 50 000 läsningar och 20 000 skrivningar per dag. Detta är ett enormt tak som vår Netlify-dörrvakt sällan kommer i närheten av.</li>
                            <li><strong>Realtime Database</strong> (används för WebRTC-signallering): Tillåter upp till 100 samtidiga anslutningar (personer uppkopplade exakt samtidigt mot databasen). Eftersom signalleringen är överstökad på några sekunder när SFU-ljudet väl är igång, är detta mycket svårt att slå i taket på.</li>
                        </ul>
                        <p className="text-xs text-purple-200 leading-relaxed mt-3">
                            <strong>Slutsats:</strong> Genom att kombinera Netlify (gratis hosting & functions) med Firebase Spark, delegeras alla eventuella kostnader för medierouting och AI helt till organisationernas egna API-nycklar.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Module96CriticalGotchas;
