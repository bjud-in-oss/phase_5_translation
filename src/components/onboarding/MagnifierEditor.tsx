import React, { useState, useEffect } from 'react';
import { ONBOARDING_CARDS } from '../../data/OnboardingCards';
import { OnboardingCard, MagnifierOverlay } from '../../types/Onboarding';

const MagnifierEditor: React.FC = () => {
  const [selectedCardId, setSelectedCardId] = useState<string>(ONBOARDING_CARDS[0].id);
  const [card, setCard] = useState<OnboardingCard>(ONBOARDING_CARDS[0]);
  const [overlay, setOverlay] = useState<MagnifierOverlay>({
    ringX: 50,
    ringY: 50,
    magX: 75,
    magY: 50,
    zoom: 3,
    text: 'Klicka Här'
  });

  useEffect(() => {
    const foundCard = ONBOARDING_CARDS.find(c => c.id === selectedCardId);
    if (foundCard) {
      setCard(foundCard);
      if (foundCard.overlays && foundCard.overlays.length > 0) {
        setOverlay(foundCard.overlays[0]);
      } else {
        setOverlay({ ringX: 50, ringY: 50, magX: 75, magY: 50, zoom: 3, text: '' });
      }
    }
  }, [selectedCardId]);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOverlay(prev => ({ ...prev, ringX: x, ringY: y }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(overlay, null, 2));
    alert('JSON kopierad!');
  };

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Magnifier Editor</h1>
      <select 
        value={selectedCardId} 
        onChange={(e) => setSelectedCardId(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        {ONBOARDING_CARDS.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
      </select>

      <div className="flex gap-8">
        <div 
          className="relative aspect-video overflow-hidden rounded-xl bg-slate-900 border border-slate-700 cursor-crosshair"
          onClick={handleImageClick}
        >
          {card.imageUrl && (
            <img src={card.imageUrl} alt={card.title} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute w-8 h-8 border-2 border-red-500 rounded-full z-20"
              style={{ left: `${overlay.ringX}%`, top: `${overlay.ringY}%`, transform: 'translate(-50%, -50%)' }}
            />
            <div 
              className="absolute w-40 h-40 border-4 border-red-500 rounded-full bg-white shadow-2xl z-30"
              style={{
                left: `${overlay.magX}%`,
                top: `${overlay.magY}%`,
                transform: 'translate(-50%, -50%)',
                backgroundImage: `url(${card.imageUrl})`,
                backgroundPosition: `${overlay.ringX}% ${overlay.ringY}%`,
                backgroundSize: `${overlay.zoom * 100}%`,
                backgroundRepeat: 'no-repeat'
              }}
            />
          </div>
        </div>

        <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
          <label className="block mb-2">Ring X: {overlay.ringX.toFixed(1)}%</label>
          <label className="block mb-2">Ring Y: {overlay.ringY.toFixed(1)}%</label>
          
          <label className="block mb-2">Mag X: {overlay.magX.toFixed(0)}%</label>
          <input type="range" min="0" max="100" value={overlay.magX} onChange={(e) => setOverlay(prev => ({ ...prev, magX: Number(e.target.value) }))} className="w-full mb-4" />
          
          <label className="block mb-2">Mag Y: {overlay.magY.toFixed(0)}%</label>
          <input type="range" min="0" max="100" value={overlay.magY} onChange={(e) => setOverlay(prev => ({ ...prev, magY: Number(e.target.value) }))} className="w-full mb-4" />
          
          <label className="block mb-2">Zoom: {overlay.zoom.toFixed(1)}x</label>
          <input type="range" min="1" max="5" step="0.1" value={overlay.zoom} onChange={(e) => setOverlay(prev => ({ ...prev, zoom: Number(e.target.value) }))} className="w-full mb-4" />
          
          <label className="block mb-2">Text:</label>
          <input type="text" value={overlay.text || ''} onChange={(e) => setOverlay(prev => ({ ...prev, text: e.target.value }))} className="w-full p-2 border rounded mb-4" />
          
          <button onClick={copyToClipboard} className="w-full bg-blue-600 text-white p-3 rounded font-bold">Kopiera JSON</button>
        </div>
      </div>
    </div>
  );
};

export default MagnifierEditor;
