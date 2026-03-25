import React, { useState, useMemo } from 'react';

// --- MOCK DATA & COMPONENTS (Från Del 2) ---

type SfuType = 'livekit' | 'daily' | 'cloudflare' | null;

interface OnboardingCard {
  id: string;
  title: string;
  description: string;
  type: 'intro' | 'sfu_choice' | 'gemini' | 'livekit' | 'daily' | 'cloudflare' | 'keys' | 'outro';
  imageUrl?: string;
  magnifier?: { x: number; y: number; size: number; text: string };
}

const ONBOARDING_CARDS: OnboardingCard[] = [
  {
    id: 'intro_1',
    title: 'Välkommen till BYOK',
    description: 'För att använda systemet gratis behöver du egna API-nycklar. Vi guidar dig steg för steg.',
    type: 'intro',
  },
  {
    id: 'sfu_choice',
    title: 'Välj din SFU-leverantör',
    description: 'Välj hur du vill hantera ljudströmningen.',
    type: 'sfu_choice',
  },
  {
    id: 'gemini_1',
    title: 'Hämta Gemini API-nyckel',
    description: 'Gå till Google AI Studio och skapa en nyckel.',
    type: 'gemini',
    magnifier: { x: 50, y: 50, size: 80, text: 'Klicka på "Get API key"' }
  },
  {
    id: 'livekit_1',
    title: 'LiveKit Setup',
    description: 'Skapa ett projekt på LiveKit Cloud. Du får 5000 gratisminuter.',
    type: 'livekit',
    magnifier: { x: 80, y: 20, size: 100, text: 'Kopiera API Key & Secret' }
  },
  {
    id: 'daily_1',
    title: 'Daily.co Setup',
    description: 'Skapa ett konto på Daily.co för 10000 gratisminuter.',
    type: 'daily',
    magnifier: { x: 20, y: 40, size: 90, text: 'Skapa ny API-nyckel' }
  },
  {
    id: 'cloudflare_1',
    title: 'Cloudflare Calls Setup',
    description: 'Aktivera Cloudflare Calls. Kräver kreditkort men ger 1TB gratis.',
    type: 'cloudflare',
    magnifier: { x: 50, y: 60, size: 120, text: 'Hämta App ID & Secret' }
  },
  {
    id: 'keys_input',
    title: 'Ange dina nycklar',
    description: 'Klistra in nycklarna du just skapade.',
    type: 'keys',
  },
  {
    id: 'outro_1',
    title: 'Klart!',
    description: 'Dina nycklar är sparade. Du kan nu skriva ut din QR-kod för lyssnare.',
    type: 'outro',
  }
];

const MagnifierViewer: React.FC<{ card: OnboardingCard }> = ({ card }) => {
  return (
    <div className="relative w-full h-64 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center overflow-hidden mb-6">
      {card.imageUrl ? (
        <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover opacity-50" />
      ) : (
        <div className="text-slate-500 flex flex-col items-center">
          <svg className="w-12 h-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm">Visuell guide för: {card.title}</span>
        </div>
      )}
      
      {card.magnifier && (
        <div 
          className="absolute border-2 border-indigo-500 rounded-full bg-indigo-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]"
          style={{
            left: `${card.magnifier.x}%`,
            top: `${card.magnifier.y}%`,
            width: `${card.magnifier.size}px`,
            height: `${card.magnifier.size}px`,
            transform: 'translate(-50%, -50%)'
          }}
        >
            <div className="absolute top-full mt-2 bg-indigo-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap border border-indigo-500">
                {card.magnifier.text}
            </div>
        </div>
      )}
    </div>
  );
};

// --- WIZARD COMPONENT ---

const ByokWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSfu, setSelectedSfu] = useState<SfuType>(null);
  
  // Form state
  const [geminiKey, setGeminiKey] = useState('');
  const [sfuKey1, setSfuKey1] = useState('');
  const [sfuKey2, setSfuKey2] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Filter cards based on selected SFU
  const filteredCards = useMemo(() => {
    return ONBOARDING_CARDS.filter(card => {
      if (card.type === 'intro' || card.type === 'sfu_choice' || card.type === 'gemini' || card.type === 'keys' || card.type === 'outro') {
        return true;
      }
      return card.type === selectedSfu;
    });
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

  const handleSave = () => {
    // Simulate save
    setIsSaved(true);
    handleNext();
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

        {currentCard.type !== 'sfu_choice' && currentCard.type !== 'keys' && currentCard.type !== 'outro' && (
          <MagnifierViewer card={currentCard} />
        )}

        {currentCard.type === 'sfu_choice' && renderSfuChoice()}
        
        {currentCard.type === 'keys' && renderKeyInputs()}

        {currentCard.type === 'outro' && (
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

        {currentCard.type === 'keys' ? (
          <button
            onClick={handleSave}
            disabled={!geminiKey || !sfuKey1 || (selectedSfu !== 'daily' && !sfuKey2)}
            className="px-6 py-2 rounded-lg text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            Spara Nycklar
          </button>
        ) : currentCard.type === 'outro' ? (
          <button
            onClick={() => { /* Close wizard */ }}
            className="px-6 py-2 rounded-lg text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]"
          >
            Stäng
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={currentCard.type === 'sfu_choice' && !selectedSfu}
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
