import React, { useState, useMemo } from 'react';
import { ONBOARDING_CARDS } from '../../src/data/OnboardingCards';
import { OnboardingCard, MagnifierOverlay } from '../../src/types/Onboarding';

const MagnifierEditor: React.FC = () => {
  const [selectedCardId, setSelectedCardId] = useState<string>(ONBOARDING_CARDS[0].id);
  const [overlay, setOverlay] = useState<MagnifierOverlay>({
    ringX: 50, ringY: 50, magX: 70, magY: 30, zoom: 3, text: ''
  });

  const selectedCard = useMemo(() => 
    ONBOARDING_CARDS.find(c => c.id === selectedCardId) || ONBOARDING_CARDS[0],
    [selectedCardId]
  );

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOverlay(prev => ({ ...prev, ringX: x, ringY: y }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(overlay, null, 2));
    alert('JSON kopierat till urklipp!');
  };

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Magnifier Editor</h1>
      
      <select 
        value={selectedCardId} 
        onChange={(e) => setSelectedCardId(e.target.value)}
        className="mb-4 p-2 bg-slate-800 rounded text-white w-full"
      >
        {ONBOARDING_CARDS.map(card => (
          <option key={card.id} value={card.id}>{card.title} ({card.id})</option>
        ))}
      </select>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div 
          className="relative aspect-video overflow-hidden rounded-xl bg-slate-900 border border-slate-700 cursor-crosshair"
          onClick={handleImageClick}
        >
          {selectedCard.imageUrl && (
            <img src={selectedCard.imageUrl} alt={selectedCard.title} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          )}

          {/* Preview Overlay (Same as MagnifierViewer) */}
          <div 
            className="absolute w-8 h-8 border-2 border-red-500 rounded-full z-20"
            style={{ left: `${overlay.ringX}%`, top: `${overlay.ringY}%`, transform: 'translate(-50%, -50%)' }}
          />
          <div 
            className="absolute w-40 h-40 border-4 border-red-500 rounded-full bg-white shadow-2xl z-30"
            style={{
              left: `${overlay.magX}%`, top: `${overlay.magY}%`, transform: 'translate(-50%, -50%)',
              backgroundImage: `url(${selectedCard.imageUrl})`,
              backgroundPosition: `${overlay.ringX}% ${overlay.ringY}%`,
              backgroundSize: `${overlay.zoom * 100}%`,
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 space-y-4">
          <label>Mag X: {overlay.magX.toFixed(1)}%
            <input type="range" min="0" max="100" step="0.1" value={overlay.magX} onChange={(e) => setOverlay({...overlay, magX: parseFloat(e.target.value)})} className="w-full" />
          </label>
          <label>Mag Y: {overlay.magY.toFixed(1)}%
            <input type="range" min="0" max="100" step="0.1" value={overlay.magY} onChange={(e) => setOverlay({...overlay, magY: parseFloat(e.target.value)})} className="w-full" />
          </label>
          <label>Zoom: {overlay.zoom.toFixed(1)}x
            <input type="range" min="1" max="5" step="0.1" value={overlay.zoom} onChange={(e) => setOverlay({...overlay, zoom: parseFloat(e.target.value)})} className="w-full" />
          </label>
          <input 
            type="text" 
            placeholder="Instruktionstext" 
            value={overlay.text} 
            onChange={(e) => setOverlay({...overlay, text: e.target.value})}
            className="w-full p-2 bg-slate-800 rounded"
          />
          <button onClick={copyToClipboard} className="w-full p-3 bg-indigo-600 rounded font-bold hover:bg-indigo-500">
            Kopiera JSON
          </button>
        </div>
      </div>
    </div>
  );
};

export default MagnifierEditor;
