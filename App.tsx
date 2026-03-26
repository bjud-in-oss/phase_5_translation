
import React, { useState, useEffect, useRef } from 'react';
import { signInAnonymously } from 'firebase/auth';
import { auth } from './firebase';
import { useGeminiLive } from './hooks/useGeminiLive';
import { useWakeLock } from './hooks/useWakeLock';
import { useDataChannel } from './hooks/useDataChannel';
import { SubtitleOverlay } from './components/SubtitleOverlay';
import HeaderControls from './components/HeaderControls';
import CalibrationModal from './components/CalibrationModal';
import LanguageSelectorModal from './components/LanguageSelectorModal';
import ControlBar from './components/ControlBar';
import Tower from './components/Tower';
import SystemPromptModal from './components/SystemPromptModal'; 
import PinCodeModal from './components/PinCodeModal';
import StartPage from './components/StartPage';
import MagnifierEditor from './src/components/onboarding/MagnifierEditor';
import { AudioGroup } from './types';
import { useAppStore, UserRole } from './stores/useAppStore';

const ALL_LANGUAGES = [
  "Afrikaans",
  "Azərbaycan (Azerbajdzjanska)",
  "Bahasa Indonesia",
  "Bahasa Melayu",
  "Basa Jawa (Javanesiska)",
  "Bosanski (Bosniska)",
  "Català (Katalanska)",
  "Čeština (Tjeckiska)",
  "Cymraeg (Walesiska)",
  "Dansk (Danska)",
  "Deutsch (Tyska)",
  "Eesti (Estniska)",
  "English (Engelska)",
  "Español (Spanska)",
  "Esperanto",
  "Euskara (Baskiska)",
  "Filipino (Tagalog)",
  "Français (Franska)",
  "Frysk (Frisiska)",
  "Gaeilge (Irländska)",
  "Gàidhlig (Skotsk gäliska)",
  "Galego (Galiciska)",
  "Hausa",
  "Hrvatski (Kroatiska)",
  "Igbo",
  "Íslenska (Isländska)",
  "Italiano (Italienska)",
  "Kinyarwanda",
  "Kiswahili (Swahili)",
  "Latviešu (Lettiska)",
  "Lietuvių (Litauiska)",
  "Lëtzebuergesch (Luxemburgska)",
  "Magyar (Ungerska)",
  "Malti (Maltesiska)",
  "Māori",
  "Nederlands (Nederländska)",
  "Norsk (Norska)",
  "O‘zbek (Uzbekiska)",
  "Polski (Polska)",
  "Português (Portugisiska)",
  "Română (Rumänska)",
  "Shqip (Albanska)",
  "Slovenčina (Slovakiska)",
  "Slovenščina (Slovenska)",
  "Soomaali (Somaliska)",
  "Suomi (Finska)",
  "Svenska",
  "Tiếng Việt (Vietnamesiska)",
  "Türkçe (Turkiska)",
  "Yorùbá",
  "Zulu",
  "Ελληνικά (Grekiska)",
  "Беларуская (Vitryska)",
  "Български (Bulgariska)",
  "Кыргызча (Kirgiziska)",
  "Македонски (Makedonska)",
  "Монгол (Mongoliska)",
  "Русский (Ryska)",
  "Српски (Serbiska)",
  "Тоҷикӣ (Tadzjikiska)",
  "Українська (Ukrainska)",
  "Қазақ тілі (Kazakiska)",
  "Հայերեն (Armeniska)",
  "עברית (Hebreiska)",
  "ייִדיש (Jiddisch)",
  "اردو (Urdu)",
  "العربية (Arabiska)",
  "فارسی (Persiska)",
  "پښتو (Pashto)",
  "नेपाली (Nepalesiska)",
  "मराठी (Marathi)",
  "हिन्दी (Hindi)",
  "বাংলা (Bengali)",
  "ਪੰਜਾਬੀ (Punjabi)",
  "ગુજરાતી (Gujarati)",
  "தமிழ் (Tamil)",
  "తెలుగు (Telugu)",
  "ಕನ್ನಡ (Kannada)",
  "മലയാളം (Malayalam)",
  "සිංහල (Singalesiska)",
  "ไทย (Thailändska)",
  "ພາສາລາວ (Lao)",
  "ဗမာစာ (Burmesiska)",
  "ខ្មែរ (Khmer)",
  "한국어 (Koreanska)",
  "中文 (Kinesiska)",
  "日本語 (Japanska)",
  "አማርኛ (Amhariska)"
];

const LOCAL_MODE_NAME = "Lokalt i min mobil";

const RoomSession: React.FC = () => {
  useEffect(() => {
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    // Hämta aktuellt state direkt från storen utan att trigga re-renders
    const { userRole, roomState } = useAppStore.getState();
    
    // Varna endast Admin/Teacher om de är i ett aktivt möte
    if ((userRole === 'admin' || userRole === 'teacher') && roomState.meetingState) {
      e.preventDefault();
      e.returnValue = ''; // Måste sättas för att webbläsarens varningsdialog ska visas
    }
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, []);

  const { requestLock, releaseLock } = useWakeLock();

  useEffect(() => {
    console.log("App Component Mounted Successfully");
  }, []);

  const { 
    status, 
    transcripts, 
    error,
    setTargetLanguages,
    targetLanguages,
    queueStats,
    currentPlaybackRate,
    currentLatency,
    activeMode,
    setMode,
    currentRoom,
    setCurrentRoom,
    packetEvents,
    minTurnDuration,
    setMinTurnDuration,
    vadThreshold,
    setVadThreshold,
    silenceThreshold,
    setSilenceThreshold,
    // NEW: Elasticity & Min Speech
    elasticityStart,
    setElasticityStart,
    minSpeechDuration,
    setMinSpeechDuration,
    
    // NEW: Ghost Pressure Props
    momentumStart,
    setMomentumStart,
    ghostTolerance,
    setGhostTolerance,

    volMultiplier,
    setVolMultiplier,
    // DEVICES
    inputDeviceId,
    setInputDeviceId,
    outputDeviceId,
    setOutputDeviceId,
    
    // NEW: Configs from useGeminiLive/useLiveConfig
    coldStartSamples,
    setColdStartSamples,
    autoSleepTimeout,
    setAutoSleepTimeout,

    notification,
    effectiveMinDuration,
    debugMode,
    setDebugMode,
    aiSpeakingRate,
    setAiSpeakingRate,
    activePhraseTiming, 
    audioContext,       
    audioDiagnosticsRef,
    triggerTestTone,
    injectTextAsAudio,
    initAudioInput, 
    connect,
    disconnect,
    customSystemInstruction, 
    setCustomSystemInstruction, 
    enableLogs, 
    setEnableLogs,
    simulateNetworkDrop,
    getBufferStatus,
    isJitterEnabled,
    setIsJitterEnabled,
    jitterIntensity,
    setJitterIntensity,
    // ADDED: Pro Mode & Transcription Configs
    enableProMode,
    setEnableProMode,
    isTranscriptionEnabled,
    setIsTranscriptionEnabled,
    isLocalAiAudioEnabled,
    toggleLocalAiAudio,
    getRadiomixStream,
    activeTranscript,
    injectRemoteTranscript
  } = useGeminiLive();

  const { userRole } = useAppStore();
  const { sendMessage, announceTrack, remoteStream, publishAudio, connectSfu, sfuStatus, broadcastTranscript } = useDataChannel(
    currentRoom,
    undefined,
    (transcript) => {
      if (userRole === 'listener') {
        injectRemoteTranscript(transcript);
      }
    }
  );
  const remoteAudioRef = useRef<HTMLAudioElement>(null);

  // NEW: Broadcast transcripts if we are Admin/Teacher
  useEffect(() => {
    if (userRole === 'admin' || userRole === 'teacher') {
      if (activeTranscript) {
        broadcastTranscript(activeTranscript);
      }
    }
  }, [activeTranscript, broadcastTranscript, userRole]);

  useEffect(() => {
    if (userRole === 'admin' || userRole === 'teacher') {
      if (transcripts.length > 0) {
        const latest = transcripts[transcripts.length - 1];
        broadcastTranscript({ ...latest, isFinal: true });
      }
    }
  }, [transcripts, broadcastTranscript, userRole]);

  // 2. Admin: Skicka radiomixen till molnet när den är redo (Robust version)
  useEffect(() => {
    let checkInterval: any;

    if (sfuStatus === 'connected' && (userRole === 'admin' || userRole === 'teacher')) {
      // Vi kollar regelbundet tills strömmen dyker upp
      checkInterval = setInterval(() => {
        const radiomix = getRadiomixStream ? getRadiomixStream() : null;
        if (radiomix && radiomix.getAudioTracks().length > 0) {
          const track = radiomix.getAudioTracks()[0];
          publishAudio(track).then((sessionId) => {
            if (sessionId) {
              announceTrack(sessionId, track.id);
              console.log("📡 Ljud publicerat och annonserat!");
            }
          });
          clearInterval(checkInterval); // Sluta kolla när vi har publicerat
        }
      }, 500); // Kolla varje halvsekund
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [sfuStatus, userRole, getRadiomixStream, publishAudio, announceTrack]);

  const [hasJoinedAudio, setHasJoinedAudio] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);

  useEffect(() => {
    if (remoteAudioRef.current && remoteStream && userRole === 'listener') {
      remoteAudioRef.current.srcObject = remoteStream;
      
      // Only attempt autoplay if the user has already clicked the join button
      if (hasJoinedAudio) {
        remoteAudioRef.current.play().catch(e => {
            console.error("Autoplay blocked:", e);
            setAudioBlocked(true);
        });
      }
    }
  }, [remoteStream, userRole, hasJoinedAudio]);

  const handlePlayAudio = () => {
    setHasJoinedAudio(true);
    if (remoteAudioRef.current) {
      // If srcObject is already set, play it. Otherwise the useEffect will play it when stream arrives.
      if (remoteAudioRef.current.srcObject) {
        remoteAudioRef.current.play().catch(e => console.error("Still cannot play:", e));
      }
    }
    setAudioBlocked(false);
  };

  useEffect(() => {
    if (activeMode !== 'off') {
        requestLock();
    } else {
        releaseLock();
    }
  }, [activeMode, requestLock, releaseLock]);

  const [showLangModal, setShowLangModal] = useState(false);
  const [showCalibrationModal, setShowCalibrationModal] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false); 
  const [showSubtitles, setShowSubtitles] = useState(true);

  // NEW: Track if we have ever connected to show subtitles button permanently after first use
  const [hasEverConnected, setHasEverConnected] = useState(false);

  useEffect(() => {
      if (status === 'connected') {
          setHasEverConnected(true);
      }
  }, [status]);

  const handleSaveLanguages = (langs: string[]) => setTargetLanguages(langs);

  const handleRoomChange = (room: string) => {
      setCurrentRoom(room);
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('room', room);
      window.history.pushState({}, '', newUrl.toString());
  };

  const [lastActiveGroupId, setLastActiveGroupId] = useState<number | null>(null);

  useEffect(() => {
      if (activePhraseTiming?.groupId !== undefined) {
          setLastActiveGroupId(activePhraseTiming.groupId);
      }
  }, [activePhraseTiming]);

  const effectiveActiveGroupId = activePhraseTiming?.groupId ?? lastActiveGroupId;

  const activeItem = effectiveActiveGroupId !== null 
      ? transcripts.find(t => t.groupId === effectiveActiveGroupId) 
      : null;
  
  const activeGroup: AudioGroup | null = activeItem ? { 
      id: activeItem.id, 
      text: activeItem.text, 
      duration: activePhraseTiming?.duration 
  } : null;

  const history: AudioGroup[] = transcripts
    .filter(t => !activeItem || t.groupId < activeItem.groupId)
    .sort((a, b) => a.groupId - b.groupId) 
    .map(t => ({ id: t.id, text: t.text }));
  
  const queue: AudioGroup[] = transcripts
    .filter(t => activeItem && t.groupId > activeItem.groupId)
    .sort((a, b) => a.groupId - b.groupId)
    .map(t => ({ id: t.id, text: t.text }));

  // Helper to determine if we have a valid language set
  const hasLanguages = targetLanguages.length > 0 && targetLanguages[0] !== '';

  return (
    <div className="h-screen w-screen bg-[#101010] text-white overflow-hidden font-sans relative flex flex-col items-center justify-center">
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#050505] z-0"></div>
      
      {/* HEADER CONTROLS (Handles Hero Animation internally) */}
      <HeaderControls 
          currentRoom={currentRoom}
          onRoomChange={handleRoomChange}
          userLanguage={targetLanguages.length > 1 ? `${targetLanguages.length} Språk` : targetLanguages[0] || 'Välj'}
          targetLanguages={targetLanguages}
          allLanguages={ALL_LANGUAGES}
          onOpenLangModal={() => setShowLangModal(true)}
          onCloseLangModal={() => setShowLangModal(false)}
          isLangModalOpen={showLangModal} // PASSED HERE
          onOpenSettings={() => setDebugMode(true)} 
          status={status}
          isTranscriptionEnabled={isTranscriptionEnabled}
          setIsTranscriptionEnabled={setIsTranscriptionEnabled}
          showSubtitles={showSubtitles}
          onToggleSubtitles={() => setShowSubtitles(!showSubtitles)}
          currentPlaybackRate={currentPlaybackRate}
          inputDeviceId={inputDeviceId}
          setInputDeviceId={setInputDeviceId}
          outputDeviceId={outputDeviceId}
          setOutputDeviceId={setOutputDeviceId}
          onToggleTower={() => setDebugMode(!debugMode)}
          hasEverConnected={hasEverConnected}
      />

      <LanguageSelectorModal 
        isOpen={showLangModal}
        onClose={() => setShowLangModal(false)}
        onSave={handleSaveLanguages}
        currentLanguages={targetLanguages} 
        allLanguages={ALL_LANGUAGES}
        isSingleSelection={false}
      />

      {showCalibrationModal && (
          <CalibrationModal 
            isOpen={showCalibrationModal}
            onClose={() => setShowCalibrationModal(false)}
            transcripts={transcripts}
          />
      )}

      <SystemPromptModal 
        isOpen={showPromptModal}
        onClose={() => setShowPromptModal(false)}
        customSystemInstruction={customSystemInstruction}
        setCustomSystemInstruction={setCustomSystemInstruction}
        targetLanguages={targetLanguages}
        onLanguagesChange={handleSaveLanguages}
        aiSpeakingRate={aiSpeakingRate}
        allLanguages={ALL_LANGUAGES}
      />

      {notification && (
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-neutral-800/80 border border-neutral-700 px-4 py-2 rounded-full backdrop-blur-md z-30 animate-in fade-in slide-in-from-top-4 duration-200">
              <p className="text-neutral-300 text-xs font-mono flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                  </svg>
                  {notification}
              </p>
          </div>
      )}

      {error && (
          <div className="absolute top-32 left-4 right-4 bg-red-900/20 border border-red-500/50 rounded-lg p-3 z-30 text-center backdrop-blur-md">
              <p className="text-red-400 text-sm font-medium">{error}</p>
          </div>
      )}

      <div 
        className={`flex-1 w-full relative z-10 flex flex-col transition-opacity duration-700 ease-in-out ${showSubtitles ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
          <SubtitleOverlay 
            activeGroup={activeGroup}
            activePhraseTiming={activePhraseTiming}
            history={history}
            queue={queue}
            audioContext={audioContext}
          />
      </div>
      
      {debugMode && (
          <Tower 
              diagnosticsRef={audioDiagnosticsRef} 
              isConnected={status === 'connected'}
              triggerTestTone={triggerTestTone} 
              injectTextAsAudio={injectTextAsAudio}
              initAudioInput={initAudioInput} 
              aiSpeakingRate={aiSpeakingRate}
              setAiSpeakingRate={setAiSpeakingRate}
              minTurnDuration={minTurnDuration}
              setMinTurnDuration={setMinTurnDuration}
              vadThreshold={vadThreshold}
              setVadThreshold={setVadThreshold}
              silenceThreshold={silenceThreshold}
              setSilenceThreshold={setSilenceThreshold}
              elasticityStart={elasticityStart}
              setElasticityStart={setElasticityStart}
              minSpeechDuration={minSpeechDuration}
              setMinSpeechDuration={setMinSpeechDuration}
              volMultiplier={volMultiplier}
              setVolMultiplier={setVolMultiplier}
              inputDeviceId={inputDeviceId}
              setInputDeviceId={setInputDeviceId}
              outputDeviceId={outputDeviceId}
              setOutputDeviceId={setOutputDeviceId}
              coldStartSamples={coldStartSamples}
              setColdStartSamples={setColdStartSamples}
              autoSleepTimeout={autoSleepTimeout}
              setAutoSleepTimeout={setAutoSleepTimeout}
              momentumStart={momentumStart}
              setMomentumStart={setMomentumStart}
              ghostTolerance={ghostTolerance}
              setGhostTolerance={setGhostTolerance}
              debugMode={debugMode}
              setDebugMode={setDebugMode}
              onOpenCalibration={() => setShowCalibrationModal(true)}
              connect={connect}
              disconnect={disconnect}
              setCustomSystemInstruction={setCustomSystemInstruction}
              enableLogs={enableLogs}
              setEnableLogs={setEnableLogs}
              onOpenPromptModal={() => setShowPromptModal(true)}
              simulateNetworkDrop={simulateNetworkDrop}
              getBufferStatus={getBufferStatus}
              isJitterEnabled={isJitterEnabled}
              setIsJitterEnabled={setIsJitterEnabled}
              jitterIntensity={jitterIntensity}
              setJitterIntensity={setJitterIntensity}
              queueStats={queueStats}
              currentPlaybackRate={currentPlaybackRate}
              enableProMode={enableProMode}
              setEnableProMode={setEnableProMode}
          />
      )}

      {/* ControlBar only visible if language selected */}
      {hasLanguages && (
          <ControlBar 
            activeMode={activeMode}
            setMode={setMode}
            isLocalAiAudioEnabled={isLocalAiAudioEnabled}
            toggleLocalAiAudio={toggleLocalAiAudio}
            sendMessage={sendMessage}
          />
      )}
      
      {/* Hidden audio element for listeners */}
      {userRole === 'listener' && (
        <>
          <audio ref={remoteAudioRef} playsInline style={{ display: 'none' }} />
          {(!hasJoinedAudio || audioBlocked) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
              <div className="bg-zinc-900 p-8 rounded-2xl flex flex-col items-center gap-6 max-w-sm text-center border border-white/10 shadow-2xl">
                <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Anslut till sändningen</h3>
                  <p className="text-zinc-400 text-sm">Klicka nedan för att ansluta till ljudet.</p>
                </div>
                <button 
                  onClick={handlePlayAudio}
                  className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors"
                >
                  Starta Ljud
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [pendingRole, setPendingRole] = useState<UserRole | null>(null);
  const { roomState, setRoomId, setUserRole } = useAppStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        await signInAnonymously(auth);
      } catch (error) {
        console.error("Firebase Auth Error:", error);
      }
    };
    initAuth();

    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get('role') as UserRole | null;
    const roomParam = params.get('room');

    if (roomParam) {
      setRoomId(roomParam);
    } else {
      setRoomId(null);
    }

    if (roleParam === 'admin' || roleParam === 'teacher') {
      setPendingRole(roleParam);
    } else {
      setUserRole('listener');
    }

    setIsBooting(false);
  }, []);

  if (isBooting) {
    return (
      <div className="h-screen w-screen bg-[#101010] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-slate-400 font-mono tracking-widest uppercase">Initierar system...</p>
        </div>
      </div>
    );
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('mode') === 'editor') {
    return <MagnifierEditor />;
  }

  if (pendingRole) {
    return (
      <PinCodeModal 
        expectedRole={pendingRole} 
        onSuccess={() => { setUserRole(pendingRole); setPendingRole(null); }} 
        onCancel={() => { setUserRole('listener'); setPendingRole(null); }} 
      />
    );
  }

  if (!roomState.roomId) {
    return <StartPage />;
  }

  return <RoomSession key={roomState.roomId} />;
};

export default App;
