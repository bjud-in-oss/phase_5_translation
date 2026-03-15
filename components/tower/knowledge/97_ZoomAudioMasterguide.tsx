import React from 'react';

const ZoomAudioMasterguide: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-3 border-b border-white/20 pb-1 flex items-center gap-2">
                <span className="bg-white text-black px-2 rounded text-xs">MODUL 97</span>
                🎙️ Masterguide: Ljudhantering i Zoom
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-white/10 text-slate-300 text-sm space-y-8">
                
                <div className="bg-blue-900/20 p-4 rounded border border-blue-500/30 mb-6">
                    <p className="text-xs text-blue-300 leading-relaxed">
                        Denna guide förklarar hur vi optimerar ljudet för att undvika eko och burkigt tal. Den gyllene regeln för digitala möten är: <strong>Endast en enhet per plats får städa ljudet åt gången.</strong>
                    </p>
                </div>

                {/* 1. GRUNDPRINCIPEN */}
                <div className="space-y-4">
                    <h4 className="text-purple-400 font-bold text-xs uppercase tracking-widest border-l-4 border-purple-500 pl-3">1. Grundprincipen: AEC är LOKALT (Per Klient)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-4">
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                            AEC (Acoustic Echo Cancellation) är ett filter som hindrar att ljudet från dina högtalare åker tillbaka in i din egen mikrofon.
                        </p>
                        
                        <div className="bg-purple-900/10 p-3 rounded border border-purple-500/20">
                            <strong className="text-purple-300 text-xs block mb-1">Viktigt Förtydligande:</strong>
                            <p className="text-[11px] text-slate-400">
                                AEC sköts individuellt av varje uppkopplad dator/telefon. Att vi stänger av Zooms AEC på kyrkans huvuddator påverkar <strong>inte</strong> de som sitter hemma. Deltagare hemma ska ha sin AEC påslagen som vanligt.
                            </p>
                        </div>

                        <div className="bg-red-900/10 p-3 rounded border border-red-500/20">
                            <strong className="text-red-400 text-xs block mb-1">Dubbel-AEC (Fällan):</strong>
                            <p className="text-[11px] text-slate-400">
                                Det vi till varje pris måste undvika är att ha två AEC igång på samma dator. Om både vår hårdvara i kyrkan (Tesira/Jabra) och mjukvaran (Zoom) kör AEC samtidigt på kyrkans dator, "krockar" de. Resultatet blir att röster klipps bort, ljudet pumpar i volym eller låter som om talaren sitter i en plåtburk under vatten.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2. SCENARIO A */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">2. Scenario A: Stora salen (Biamp Tesira-system)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <div className="text-[10px] text-emerald-500 uppercase tracking-widest mb-2">Målgrupp: Administratörer och Teknikansvariga</div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                            I stora salen sköts allt ljud av en Tesira DSP. Det är en kraftfull ljudprocessor som är kalibrerad exakt efter salens akustik och hanterar all ekosläckning (via AEC Ref).
                        </p>
                        
                        <div className="bg-black/30 p-3 rounded border border-white/5">
                            <strong className="text-emerald-300 text-xs block mb-1">Inställning i Zoom: "Original Sound for Musicians" – PÅ</strong>
                            <p className="text-[11px] text-slate-400 mb-3">
                                <strong>Varför?</strong> Eftersom Tesira inte är en standard-USB-puck, vet inte Zoom att Tesiran redan städat ljudet. Vi måste tvinga Zoom att hålla fingrarna borta.
                            </p>
                            
                            <strong className="text-slate-300 text-[11px] block mb-1">Instruktion:</strong>
                            <ol className="text-[10px] text-slate-400 list-decimal pl-4 space-y-1">
                                <li>Gå till <strong>Settings &gt; Audio</strong> i Zoom.</li>
                                <li>Välj <strong>Original sound for musicians</strong>.</li>
                                <li><em>Valfritt skyddsnät:</em> Markera rutan "Echo cancellation" under Original Sound (detta fungerar som en mild säkerhetsspärr utan att störa Tesiran för mycket).</li>
                                <li><strong>I mötet:</strong> Se till att knappen uppe till vänster i bild står på "Original Sound: On".</li>
                            </ol>
                        </div>
                    </div>
                </div>

                {/* 3. SCENARIO B */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-widest border-l-4 border-orange-500 pl-3">3. Scenario B: Mötesrummet (Jabra Speak2 75)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <div className="text-[10px] text-orange-500 uppercase tracking-widest mb-2">Målgrupp: Lärare och Dagliga användare</div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                            Jabran är en "smart" certifierad enhet som pratar direkt med Zoom.
                        </p>
                        
                        <div className="bg-black/30 p-3 rounded border border-white/5">
                            <strong className="text-orange-300 text-xs block mb-1">Inställning i Zoom: "Audio Profile: Auto"</strong>
                            <p className="text-[11px] text-slate-400 mb-3">
                                <strong>Varför?</strong> Genom att ha Zoom på Auto skapar vi ett intelligent skyddsnät. När Jabran används känner Zoom av den och stänger automatiskt av sin egen AEC (Jabrans inbyggda chip sköter det, vilket ger perfekt "Full Duplex").
                            </p>
                            
                            <strong className="text-slate-300 text-[11px] block mb-1">Fail-safe:</strong>
                            <p className="text-[10px] text-slate-400">
                                Om en lärare glömmer koppla in Jabran och använder laptopens inbyggda mick/högtalare, slår Zooms Auto-läge omedelbart på mjukvaru-AEC. Utan detta skulle mötet dränkas i eko.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 4. FELSÖKNING */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-pink-400 font-bold text-xs uppercase tracking-widest border-l-4 border-pink-500 pl-3">4. Snabbguide för felsökning</h4>
                    
                    <div className="grid grid-cols-1 gap-3">
                        <div className="bg-slate-950 p-3 rounded border border-slate-800">
                            <strong className="text-pink-300 text-[11px] block mb-1">Fjärrdeltagare (Zoom) hör eko av sig själva:</strong>
                            <p className="text-[10px] text-slate-400 mb-1"><strong>Orsak:</strong> Kyrkans AEC fungerar inte. Ljudet från taket går in i prästens mick.</p>
                            <p className="text-[10px] text-slate-300"><strong>Lösning (Tesira):</strong> Kontrollera att "Original Sound" är PÅ i Zoom och att webbappen har "Pro Mode" (som stänger av webbläsarens AEC).</p>
                        </div>
                        
                        <div className="bg-slate-950 p-3 rounded border border-slate-800">
                            <strong className="text-pink-300 text-[11px] block mb-1">Ljudet klipper / svajar när två pratar:</strong>
                            <p className="text-[10px] text-slate-400 mb-1"><strong>Orsak:</strong> "Double processing" (Både Tesira/Jabra och Zoom försöker städa ljudet).</p>
                            <p className="text-[10px] text-slate-300"><strong>Lösning:</strong> Stäng av Zooms mjukvaru-AEC genom att aktivera "Original Sound" (Tesira) eller välja "Auto" (Jabra).</p>
                        </div>

                        <div className="bg-slate-950 p-3 rounded border border-slate-800">
                            <strong className="text-pink-300 text-[11px] block mb-1">Ljudet låter burkigt/långt borta:</strong>
                            <p className="text-[10px] text-slate-400 mb-1"><strong>Orsak:</strong> Zoom har tjuvbytt till laptopens inbyggda lilla mikrofon istället för Tesira/Jabra.</p>
                            <p className="text-[10px] text-slate-300"><strong>Lösning:</strong> Byt källa i Zooms ljudinställningar.</p>
                        </div>
                    </div>
                </div>

                {/* 5. TEKNISK SUMMERING */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">5. Varför detta fungerar (Teknisk summering)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800">
                        <ol className="text-[11px] text-slate-300 list-decimal pl-4 space-y-2">
                            <li>Ljud in i mikrofonen.</li>
                            <li>Lokal hårdvara (Tesira/Jabra) räknar ut vad som är eko och raderar det (Signal in - Högtalarljud = Rent tal).</li>
                            <li>Datorn (Zoom/Webbapp) tar emot det rena talet.</li>
                            <li>Om Zoom/Webbappen försöker köra AEC på detta igen, letar den efter eko som inte längre finns. Då börjar den istället äta upp frekvenser i talet (distorsion). Genom att be mjukvaran backa, får nätverket en perfekt ljudsignal.</li>
                        </ol>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ZoomAudioMasterguide;
