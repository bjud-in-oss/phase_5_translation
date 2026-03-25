import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ByokWizard from './onboarding/ByokWizard';

const StartPage: React.FC = () => {
  const [roomCode, setRoomCode] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = roomCode.trim().toUpperCase();
    if (!code) return;

    setIsJoining(true);
    setError('');

    try {
      const orgsRef = collection(db, 'organizations');
      const q = query(orgsRef, where('inviteCode', '==', code));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('Ogiltig rumskod. Vänligen försök igen.');
        setIsJoining(false);
        return;
      }

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('room', code);
      window.location.href = newUrl.toString();
    } catch (err) {
      console.error('Error validating room code:', err);
      setError('Ett fel uppstod vid validering av rumskoden.');
      setIsJoining(false);
    }
  };

  if (showWizard) {
    return (
      <div className="min-h-screen w-full bg-[#101010] text-white overflow-y-auto p-4 md:p-8">
        <ByokWizard />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#101010] text-white flex flex-col items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#050505] z-0"></div>
      
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
          <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Välkommen</h1>
        <p className="text-slate-400 text-sm mb-10 text-center">Ange din rumskod för att ansluta till tolkningen.</p>

        <form onSubmit={handleJoin} className="w-full space-y-4">
          <div>
            <input 
              type="text" 
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder="Ange din rumskod (ex. UTBY)"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-center text-xl tracking-widest uppercase text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              maxLength={10}
              disabled={isJoining}
            />
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button 
            type="submit"
            disabled={!roomCode.trim() || isJoining}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] disabled:shadow-none"
          >
            {isJoining ? 'Ansluter...' : 'Gå med'}
          </button>
        </form>

        <div className="mt-16 w-full flex flex-col items-center">
          {!showHelp ? (
            <button 
              onClick={() => setShowHelp(true)}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-4"
            >
              Hjälp till
            </button>
          ) : (
            <div className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 text-center">Administratör</h3>
              <div className="space-y-2">
                <button 
                  className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors border border-slate-700"
                >
                  Hjälp till i en befintlig grupp
                </button>
                <button 
                  onClick={() => setShowWizard(true)}
                  className="w-full py-3 px-4 bg-indigo-900/30 hover:bg-indigo-900/50 text-indigo-300 rounded-lg text-sm transition-colors border border-indigo-500/30"
                >
                  Starta upp en helt ny grupp
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartPage;
