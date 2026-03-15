
import React, { useState } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { DataChannelMessage } from '../hooks/useDataChannel';

interface ControlBarProps {
  activeMode: 'translate' | 'pause' | 'off';
  setMode: (mode: 'translate' | 'pause' | 'off') => void;
  isLocalAiAudioEnabled?: boolean;
  toggleLocalAiAudio?: () => void;
  sendMessage?: (msg: Omit<DataChannelMessage, 'senderId' | 'senderRole'>) => void;
}

const ControlBar: React.FC<ControlBarProps> = ({
  activeMode,
  setMode,
  isLocalAiAudioEnabled,
  toggleLocalAiAudio,
  sendMessage
}) => {
  const { 
    userRole, 
    hardwareMode, 
    setHardwareMode, 
    roomState, 
    setAllowSelfUnmute, 
    participantState, 
    setIsMuted,
    setHandRaised
  } = useAppStore();

  const [showSettings, setShowSettings] = useState(false);

  const handleMuteAll = () => {
    if (sendMessage) {
      sendMessage({ type: 'ADMIN_MUTE_ALL' });
    }
  };

  const handleToggleSelfUnmute = () => {
    const newValue = !roomState.allowSelfUnmute;
    setAllowSelfUnmute(newValue);
    if (sendMessage) {
      sendMessage({ type: 'SET_ALLOW_SELF_UNMUTE', payload: newValue });
    }
  };

  const handleMicToggle = () => {
    if (participantState.isMuted) {
      // Try to unmute
      if (!roomState.allowSelfUnmute && userRole === 'listener') {
        // Cannot unmute
        return;
      }
      setIsMuted(false);
      setMode('translate');
    } else {
      setIsMuted(true);
      setMode('pause');
    }
  };
  
  let sliderPosition = 'left-1.5';
  let indicatorStyle = 'bg-slate-800 border-slate-600';
  
  if (activeMode === 'off') {
      sliderPosition = 'left-1.5';
      indicatorStyle = 'bg-slate-800 border-slate-600';
  } else if (activeMode === 'pause') {
      sliderPosition = 'left-[34%]'; 
      // Amber/Gold for Pause
      indicatorStyle = 'bg-amber-500 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)]';
  } else if (activeMode === 'translate') {
      sliderPosition = 'left-[68%]'; 
      // Indigo/Purple for Active
      indicatorStyle = 'bg-indigo-500 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.6)]';
  }

  const getTextClass = (target: string) => {
      if (activeMode === target) return 'text-white';
      return 'text-slate-500 hover:text-slate-300';
  };

  return (
    <div className="absolute bottom-8 left-0 right-0 z-40 flex flex-col items-center justify-center pointer-events-none px-6 gap-4">
      
      {/* Settings / Admin Panel */}
      {showSettings && (
        <div className="pointer-events-auto bg-slate-900 border border-slate-700 p-4 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col gap-4 animate-in slide-in-from-bottom-4 fade-in duration-200">
          
          {/* Hardware Mode (Available to all, but usually set per device) */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-200">Hardware Mode</p>
              <p className="text-xs text-slate-500">{hardwareMode === 'pro' ? 'Pro (Split Audio)' : 'Simple (Local Audio)'}</p>
            </div>
            <button 
              onClick={() => setHardwareMode(hardwareMode === 'simple' ? 'pro' : 'simple')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${hardwareMode === 'pro' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300'}`}
            >
              {hardwareMode === 'pro' ? 'PRO' : 'SIMPLE'}
            </button>
          </div>

          {/* Admin Controls */}
          {(userRole === 'admin' || userRole === 'teacher') && (
            <>
              <div className="h-px bg-slate-800 w-full" />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-400">Tillåt översättning i Salen</p>
                  <p className="text-xs text-slate-500">Spela upp AI-rösten lokalt</p>
                </div>
                <button 
                  onClick={toggleLocalAiAudio}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isLocalAiAudioEnabled ? 'bg-orange-500' : 'bg-slate-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isLocalAiAudioEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-400">Tillåt Self-Unmute</p>
                  <p className="text-xs text-slate-500">Deltagare kan slå på sin mick</p>
                </div>
                <button 
                  onClick={handleToggleSelfUnmute}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${roomState.allowSelfUnmute ? 'bg-emerald-500' : 'bg-slate-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${roomState.allowSelfUnmute ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <button 
                onClick={handleMuteAll}
                className="w-full py-2 bg-red-900/50 hover:bg-red-900/80 text-red-200 border border-red-500/30 rounded-lg text-sm font-medium transition-colors"
              >
                Mute All
              </button>
            </>
          )}
        </div>
      )}

      <div className="relative w-full max-w-sm flex items-center justify-center gap-2">

        {/* Settings Toggle Button */}
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="pointer-events-auto bg-slate-900 border border-slate-700 h-16 w-16 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors shadow-2xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        <div className="pointer-events-auto relative bg-slate-900 border border-slate-700 p-1.5 rounded-full h-16 flex-1 shadow-2xl flex items-center justify-between z-20">
            
            <div 
              className={`absolute top-1.5 bottom-1.5 w-[31%] rounded-full transition-all duration-300 ease-out shadow-inner border ${sliderPosition} ${indicatorStyle}`}
            />

            {/* OFF (Power Icon - Simplified) */}
            <button 
              onClick={() => { setMode('off'); setIsMuted(true); }}
              className={`relative z-10 flex-1 h-full flex items-center justify-center transition-colors duration-300 ${getTextClass('off')}`}
              aria-label="Stäng av"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* PAUSE (Pause Icon - Bigger) */}
            <button 
              onClick={() => { setMode('pause'); setIsMuted(true); }}
              className={`relative z-10 flex-1 h-full flex items-center justify-center transition-colors duration-300 ${getTextClass('pause')}`}
              aria-label="Pausa"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 9v6m4-6v6" />
                </svg>
            </button>

            {/* ON (Mic Icon - Clean) */}
            <button 
              onClick={handleMicToggle}
              disabled={!roomState.allowSelfUnmute && userRole === 'listener' && participantState.isMuted}
              className={`relative z-10 flex-1 h-full flex items-center justify-center transition-colors duration-300 ${getTextClass('translate')} ${(!roomState.allowSelfUnmute && userRole === 'listener' && participantState.isMuted) ? 'opacity-30 cursor-not-allowed' : ''}`}
              aria-label="Slå på"
            >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                 </svg>
            </button>
        </div>

        {/* Hand Raised Button (For Listeners) */}
        {userRole === 'listener' && (
          <button 
            onClick={() => setHandRaised(!participantState.handRaised)}
            className={`pointer-events-auto border h-16 w-16 rounded-full flex items-center justify-center transition-colors shadow-2xl ${participantState.handRaised ? 'bg-yellow-500 border-yellow-400 text-white shadow-[0_0_20px_rgba(234,179,8,0.5)]' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'}`}
          >
            <span className="text-2xl">✋</span>
          </button>
        )}

      </div>
    </div>
  );
};

export default ControlBar;
