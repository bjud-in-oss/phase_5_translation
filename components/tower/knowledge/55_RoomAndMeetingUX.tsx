import React from 'react';

const RoomAndMeetingUX: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-3 border-b border-white/20 pb-1 flex items-center gap-2">
                <span className="bg-white text-black px-2 rounded text-xs">MODUL 55</span>
                Room & Meeting UX
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-white/10 text-slate-300 text-sm space-y-8">
                
                {/* 1. FYSISKA RUM VS DIGITALA MÖTEN */}
                <div className="space-y-4">
                    <h4 className="text-indigo-400 font-bold text-xs uppercase tracking-widest border-l-4 border-indigo-500 pl-3">1. Fysiska Rum vs Digitala Möten</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                            Systemet skiljer på den fysiska platsen och den aktuella aktiviteten för att ge en flexibel upplevelse.
                        </p>
                        <ul className="text-[11px] text-slate-300 list-disc pl-4 space-y-2">
                            <li>
                                <strong className="text-indigo-300">Fysiskt Rum (URL):</strong> 
                                URL:en definierar det fysiska rummet, till exempel <code>/room/kapellet</code>. Detta gör att användare kan bokmärka eller scanna en fast QR-kod vid dörren.
                            </li>
                            <li>
                                <strong className="text-indigo-300">Digitalt Mötestillstånd:</strong> 
                                Inuti rummet kan Admin byta Mötestillstånd (t.ex. från "Gudstjänst" till "Söndagsskola").
                            </li>
                            <li>
                                <strong className="text-indigo-300">WebRTC DataChannels:</strong> 
                                När Admin byter möte skickas en signal via WebRTC DataChannels. Detta gör att alla anslutna klienter i rummet automatiskt uppdaterar sina språk- och UI-inställningar <em>utan att ladda om sidan</em> eller göra databasanrop.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 2. INTEGRITET & MUTE-LOGIK */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-pink-400 font-bold text-xs uppercase tracking-widest border-l-4 border-pink-500 pl-3">2. Deltagarnas Integritet & Mute-logik</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                            Vi tillämpar strikta "Zoom-standard"-regler för mikrofonhantering för att skydda användarnas integritet.
                        </p>
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li>
                                <strong className="text-pink-300">Deltagaren äger sin mikrofon:</strong> En Admin kan <strong>aldrig</strong> tvinga en "Unmute". Admin kan bara skicka en förfrågan ("Ask to Unmute").
                            </li>
                            <li>
                                <strong className="text-pink-300">Mute All:</strong> Admin kan tvinga "Mute All" via DataChannels, vilket sätter allas <code>isMuted</code> till true.
                            </li>
                            <li>
                                <strong className="text-pink-300">Handuppräckning:</strong> Deltagare har en ✋-knapp för att be om ordet.
                            </li>
                            <li>
                                <strong className="text-pink-300">Rättigheter:</strong> Admin kan styra en global <code>allowSelfUnmute</code> boolean via DataChannels.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 3. INBJUDAN VIA QR */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">3. Inbjudan via QR</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800">
                        <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                            Ikonen för rumsval (fyra kvadrater) i gränssnittet visar rummets QR-kod vid klick, vilket gör delning omedelbar.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-black/30 p-3 rounded border border-white/5">
                                <strong className="text-emerald-300 text-[11px] block mb-1">Offentliga Rum</strong>
                                <p className="text-[10px] text-slate-400">
                                    Har fasta QR-koder som kan printas ut och sättas upp på väggar eller i programblad.
                                </p>
                            </div>
                            <div className="bg-black/30 p-3 rounded border border-white/5">
                                <strong className="text-emerald-300 text-[11px] block mb-1">Privata Diskussionsrum</strong>
                                <p className="text-[10px] text-slate-400">
                                    Genererar dynamiska Hash-URL:er och QR-koder direkt på skärmen för snabb, tillfällig delning mellan deltagare.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default RoomAndMeetingUX;
