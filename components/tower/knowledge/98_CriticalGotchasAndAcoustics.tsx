import React from 'react';

const CriticalGotchasAndAcoustics: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-red-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-red-500/30 pb-1 flex items-center gap-2">
                <span className="bg-red-900/50 text-red-200 px-2 rounded text-xs border border-red-500/50">MODUL 98</span>
                Kritiska Gotchas & Akustik (Skyddsnätet)
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-red-500/20 text-slate-300 text-sm space-y-8">
                
                <div className="bg-yellow-900/20 p-4 rounded border border-yellow-500/30 mb-6">
                    <p className="text-xs text-yellow-300 leading-relaxed">
                        <strong>⚠️ VARNING:</strong> Detta är vårt "Skyddsnät". Här dokumenteras de kritiska fysiska och tekniska lagar vi identifierat. Framtida utveckling får <strong>aldrig</strong> oavsiktligt bryta mot dessa regler, då det omedelbart förstör systemets ljudkvalitet eller stabilitet.
                    </p>
                </div>

                {/* 1. LAGEN OM DUBBEL AEC */}
                <div className="space-y-4">
                    <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest border-l-4 border-red-500 pl-3">1. Lagen om Dubbel AEC (Varning för Undervattensljud)</h4>
                    
                    <div className="bg-red-950/30 p-4 rounded border border-red-800/50 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            <strong className="text-red-400">Regel:</strong> Mjukvaru-AEC (Webbläsare/Zoom) och Hårdvaru-AEC (Tesira/Jabra) får <strong>aldrig</strong> vara igång samtidigt.
                        </p>
                        <p className="text-[11px] text-slate-300">
                            <strong className="text-orange-400">Konsekvens:</strong> Om båda försöker släcka eko, försöker de förutse varandra. Resultatet blir fasfel, metalliskt ljud och ett bubblande "undervattensljud".
                        </p>
                        <div className="bg-black/40 p-3 rounded border border-red-500/20">
                            <strong className="text-emerald-400 text-[11px] block mb-1">Lösning:</strong>
                            <p className="text-[10px] text-slate-400">
                                Appen tvingar <code>echoCancellation: false</code> när Pro Mode är aktivt. Tesiran ställs in på "Speakerphone: Disables Computer AEC".
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2. TESIRAS AEC REF */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-widest border-l-4 border-orange-500 pl-3">2. Tesiras AEC Ref (Lärarens Knapp)</h4>
                    
                    <div className="bg-orange-950/20 p-4 rounded border border-orange-800/30 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            <strong className="text-orange-400">Regel:</strong> Allt ljud som spelas upp i takhögtalarna MÅSTE skickas till Tesirans AEC Reference-ingång, med exakt samma volym.
                        </p>
                        <p className="text-[11px] text-slate-300">
                            <strong className="text-yellow-400">Praktik:</strong> Om "Lärarens knapp" aktiveras så att AI-rösten spelas upp i rummet, måste den routas in i AEC Ref. Annars kommer rummets mikrofoner att plocka upp AI-rösten och skicka tillbaka den till molnet (vilket skapar en oändlig loop av rundgång).
                        </p>
                    </div>
                </div>

                {/* 3. PRESTANDA & TRÅD-SVÄLT */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-yellow-400 font-bold text-xs uppercase tracking-widest border-l-4 border-yellow-500 pl-3">3. Prestanda & Tråd-svält (Main Thread Starvation)</h4>
                    
                    <div className="bg-yellow-950/20 p-4 rounded border border-yellow-800/30 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            <strong className="text-yellow-400">Problem:</strong> Vår app använder UI-animationer (karaoke-text, scroll). Ljudhanteringen (<code>ScriptProcessorNode</code>) delar tyvärr samma tråd som UI:t (Main Thread). Om UI:t laggar &gt;16ms, svälter ljudbufferten och vi får sprak/klickljud (dropouts).
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                            <div className="bg-black/30 p-3 rounded border border-yellow-500/20">
                                <strong className="text-emerald-400 text-[10px] block mb-1">Lösning idag:</strong>
                                <p className="text-[10px] text-slate-400">
                                    Vi tvingar upp bufferten till 4096 samples (~250ms latens) för att ge UI:t andrum.
                                </p>
                            </div>
                            <div className="bg-black/30 p-3 rounded border border-blue-500/20">
                                <strong className="text-blue-400 text-[10px] block mb-1">Lösning imorgon:</strong>
                                <p className="text-[10px] text-slate-400">
                                    Koden måste i framtiden refaktoreras till att använda <code>AudioWorklet</code>, vilket flyttar ljudbearbetningen till en dedikerad, oavbrytbar bakgrundstråd (likt ASIO).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. FÖRBJUDEN MIXNING */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest border-l-4 border-red-500 pl-3">4. Förbjuden mixning av Roller och Hårdvara</h4>
                    
                    <div className="bg-red-950/30 p-4 rounded border border-red-800/50 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            <strong className="text-red-400">Regel:</strong> "Admin" och "Teacher" är Användarroller (styr UI). "Pro Mode" är ett Hårdvaruläge (styr stereosplittning och ljudkort).
                        </p>
                        <div className="bg-black/40 p-3 rounded border border-red-500/20">
                            <p className="text-[11px] text-red-300 font-bold italic">
                                Anta aldrig att en Admin sitter vid en PC. En Admin kan sitta på en iPhone på bussen.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CriticalGotchasAndAcoustics;
