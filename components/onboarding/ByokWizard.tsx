import React, { useState, useMemo } from 'react';
import { ONBOARDING_CARDS } from '../../src/data/OnboardingCards';
import { OnboardingCard } from '../../src/types/Onboarding';
import { createOrganization } from '../../src/services/byokService';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAppStore } from '../../stores/useAppStore';
import MagnifierViewer from '../../src/components/onboarding/MagnifierViewer';

type SfuType = 'livekit' | 'daily' | 'cloudflare' | null;

// --- WIZARD COMPONENT ---

const ByokWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSfu, setSelectedSfu] = useState<SfuType>(null);
  
  // Form state
  const [geminiKey, setGeminiKey] = useState('');
  const [sfuKey1, setSfuKey1] = useState('');
  const [sfuKey2, setSfuKey2] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const setUserRole = useAppStore(state => state.setUserRole);
  const setRoomId = useAppStore(state => state.setRoomId);

  // Filter cards based on selected SFU
  const filteredCards = useMemo(() => {
    const cards: OnboardingCard[] = [];
    
    // Add intro cards
    cards.push(...ONBOARDING_CARDS.filter(c => c.provider === 'intro'));
    
    // Add SFU choice step
    cards.push({
      id: 'sfu-choice',
      provider: 'sfu-choice',
      title: 'Välj din SFU-leverantör',
      description: 'Välj hur du vill hantera ljudströmningen.',
    });

    // Add Gemini cards
    cards.push(...ONBOARDING_CARDS.filter(c => c.provider === 'gemini'));

    // Add selected SFU cards
    if (selectedSfu) {
      cards.push(...ONBOARDING_CARDS.filter(c => c.provider === selectedSfu));
    }

    // Add Keys input step
    cards.push({
      id: 'keys_input',
      provider: 'keys',
      title: 'Ange dina nycklar',
      description: 'Klistra in nycklarna du just skapade.',
    });

    // Add outro cards
    cards.push(...ONBOARDING_CARDS.filter(c => c.provider === 'outro'));

    return cards;
  }, [selectedSfu]);

  const currentCard = filteredCards[currentStep];

  const handleNext = () => {
    if (currentStep < filteredCards.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError('');
    try {
      // 1. Sign in anonymously (MVP)
      await signInAnonymously(auth);

      // 2. Create organization and save keys
      const code = await createOrganization(
        'Min Församling', // Default name for now
        selectedSfu || 'livekit',
        {
          geminiKey,
          sfuKey1,
          sfuKey2,
        }
      );

      setInviteCode(code);
      setUserRole('admin');
      setIsSaved(true);
      handleNext();
    } catch (err: any) {
      console.error('Error saving organization:', err);
      setError(err.message || 'Ett fel uppstod när organisationen skulle sparas.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderSfuChoice = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* LiveKit */}
      <div 
        onClick={() => setSelectedSfu('livekit')}
        className={`cursor-pointer p-4 rounded-xl border transition-all ${selectedSfu === 'livekit' ? 'bg-indigo-900/40 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-slate-800/50 border-slate-700 hover:border-slate-500'}`}
      >
        <h4 className="text-white font-bold mb-2">LiveKit</h4>
        <div className="text-xs text-slate-400 space-y-2">
          <p><strong className="text-emerald-400">~83h gratis / månad</strong></p>
          <p>5 000 deltagarminuter.</p>
          <p>Inget kreditkort krävs.</p>
          <p>Inbyggd hård spärr.</p>
        </div>
      </div>

      {/* Daily */}
      <div 
        onClick={() => setSelectedSfu('daily')}
        className={`cursor-pointer p-4 rounded-xl border transition-all ${selectedSfu === 'daily' ? 'bg-indigo-900/40 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-slate-800/50 border-slate-700 hover:border-slate-500'}`}
      >
        <h4 className="text-white font-bold mb-2">Daily.co</h4>
        <div className="text-xs text-slate-400 space-y-2">
          <p><strong className="text-emerald-400">~166h gratis / månad</strong></p>
          <p>10 000 deltagarminuter.</p>
          <p>Inget kreditkort krävs.</p>
          <p>Inbyggd hård spärr.</p>
        </div>
      </div>

      {/* Cloudflare */}
      <div 
        onClick={() => setSelectedSfu('cloudflare')}
        className={`cursor-pointer p-4 rounded-xl border transition-all ${selectedSfu === 'cloudflare' ? 'bg-indigo-900/40 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-slate-800/50 border-slate-700 hover:border-slate-500'}`}
      >
        <h4 className="text-white font-bold mb-2">Cloudflare Calls</h4>
        <div className="text-xs text-slate-400 space-y-2">
          <p><strong className="text-orange-400">~92 000h gratis / månad</strong></p>
          <p>1 TB gratis egress.</p>
          <p className="text-red-400">Kräver kreditkort.</p>
          <p>Kräver vår Kill-Switch.</p>
        </div>
      </div>
    </div>
  );

  const renderKeyInputs = () => (
    <div className="space-y-4 mb-6">
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Gemini API Key</label>
        <input 
          type="password" 
          value={geminiKey}
          onChange={(e) => setGeminiKey(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          placeholder="AIzaSy..."
        />
      </div>
      
      {selectedSfu === 'livekit' && (
        <>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">LiveKit API Key</label>
            <input 
              type="text" 
              value={sfuKey1}
              onChange={(e) => setSfuKey1(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              placeholder="API Key"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">LiveKit API Secret</label>
            <input 
              type="password" 
              value={sfuKey2}
              onChange={(e) => setSfuKey2(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              placeholder="API Secret"
            />
          </div>
        </>
      )}

      {selectedSfu === 'daily' && (
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Daily API Key</label>
          <input 
            type="password" 
            value={sfuKey1}
            onChange={(e) => setSfuKey1(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            placeholder="Daily API Key"
          />
        </div>
      )}

      {selectedSfu === 'cloudflare' && (
        <>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Cloudflare App ID</label>
            <input 
              type="text" 
              value={sfuKey1}
              onChange={(e) => setSfuKey1(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              placeholder="App ID"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Cloudflare App Secret</label>
            <input 
              type="password" 
              value={sfuKey2}
              onChange={(e) => setSfuKey2(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              placeholder="App Secret"
            />
          </div>
        </>
      )}
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">BYOK Setup Wizard</h2>
          <p className="text-xs text-slate-400">Steg {currentStep + 1} av {filteredCards.length}</p>
        </div>
        
        {/* Progress bar */}
        <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / filteredCards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">{currentCard.title}</h3>
          <p className="text-sm text-slate-300">{currentCard.description}</p>
        </div>

        {currentCard.provider !== 'sfu-choice' && currentCard.provider !== 'keys' && currentCard.provider !== 'outro' && (
          <MagnifierViewer card={currentCard} />
        )}

        {currentCard.provider === 'sfu-choice' && renderSfuChoice()}
        
        {currentCard.provider === 'keys' && renderKeyInputs()}

        {currentCard.provider === 'outro' && (
          <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-emerald-400 font-bold text-lg mb-2">Nycklar Sparade!</h4>
            <p className="text-sm text-slate-300 mb-6">
              Din organisation är nu redo. Skriv ut QR-koden nedan och sätt upp den i lokalen så att lyssnare kan ansluta.
            </p>
            <div className="mb-6">
              <p className="text-xs text-slate-400 mb-1">Din rumskod:</p>
              <div className="text-3xl font-mono font-bold text-white tracking-widest">{inviteCode}</div>
            </div>
            <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm transition-colors border border-slate-600 flex items-center gap-2 mx-auto">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Skriv ut QR-kod & Instruktioner
            </button>
          </div>
        )}
      </div>

      {/* Footer / Controls */}
      <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Föregående
        </button>

        {currentCard.provider === 'keys' ? (
          <button
            onClick={handleSave}
            disabled={!geminiKey || !sfuKey1 || (selectedSfu !== 'daily' && !sfuKey2) || isSaving}
            className="px-6 py-2 rounded-lg text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            {isSaving ? 'Sparar...' : 'Spara Nycklar'}
          </button>
        ) : currentCard.provider === 'outro' ? (
          <button
            onClick={() => { 
              const newUrl = new URL(window.location.href);
              newUrl.searchParams.set('room', inviteCode);
              newUrl.searchParams.set('role', 'admin');
              window.history.pushState({}, '', newUrl.toString());
              setRoomId(inviteCode);
            }}
            className="px-6 py-2 rounded-lg text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]"
          >
            Gå till rummet
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={currentCard.provider === 'sfu-choice' && !selectedSfu}
            className="px-6 py-2 rounded-lg text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]"
          >
            Nästa
          </button>
        )}
      </div>
    </div>
  );
};

export default ByokWizard;
