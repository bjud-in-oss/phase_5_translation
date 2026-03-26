import React from 'react';
import { OnboardingCard } from '../../types/Onboarding';

interface MagnifierViewerProps {
  card: OnboardingCard;
}

const MagnifierViewer: React.FC<MagnifierViewerProps> = ({ card }) => {
  if (!card.imageUrl) return null;

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-900 border border-slate-700">
      <img 
        src={card.imageUrl} 
        alt={card.title} 
        className="w-full h-full object-contain"
        referrerPolicy="no-referrer"
      />
      
      {card.overlays && card.overlays.length > 0 && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {card.overlays.map((overlay, index) => (
            <line 
              key={`line-${index}`}
              x1={`${overlay.ringX}%`} 
              y1={`${overlay.ringY}%`} 
              x2={`${overlay.magX}%`} 
              y2={`${overlay.magY}%`} 
              stroke="#ef4444" 
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          ))}
        </svg>
      )}

      {card.overlays?.map((overlay, index) => (
        <React.Fragment key={`overlay-${index}`}>
          {/* Lilla ringen */}
          <div 
            className="absolute w-8 h-8 border-2 border-red-500 rounded-full z-20"
            style={{
              left: `${overlay.ringX}%`,
              top: `${overlay.ringY}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)'
            }}
          />
          
          {/* Förstoringsglaset */}
          <div 
            className="absolute w-40 h-40 border-4 border-red-500 rounded-full bg-white shadow-2xl z-30 flex flex-col items-center justify-center"
            style={{
              left: `${overlay.magX}%`,
              top: `${overlay.magY}%`,
              transform: 'translate(-50%, -50%)',
              backgroundImage: `url(${card.imageUrl})`,
              backgroundPosition: `${overlay.ringX}% ${overlay.ringY}%`,
              backgroundSize: `${overlay.zoom * 100}%`,
              backgroundRepeat: 'no-repeat'
            }}
          >
            {overlay.text && (
              <div className="absolute -bottom-8 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-lg">
                {overlay.text}
              </div>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default MagnifierViewer;
