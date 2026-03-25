
import { KnowledgeEntry, ModuleDoc } from '../../types';
import { NETWORK_DOC, NETWORK_ENTRIES } from './knowledge/modules/NetworkKnowledge';
import { LOGIC_DOC, LOGIC_ENTRIES } from './knowledge/modules/LogicKnowledge';
import { AUDIO_DOC, AUDIO_ENTRIES } from './knowledge/modules/AudioKnowledge';
import { CONFIG_DOC, CONFIG_ENTRIES } from './knowledge/modules/ConfigKnowledge';

// --- AGGREGATED DOCUMENTATION (For Module Help) ---
export const MODULE_DOCS: Record<string, ModuleDoc> = {
    'MODULE_MASTER_PLAN': {
        title: 'Master Development Plan (Modul 00)',
        description: 'Centralt styrdokument för implementationsfasen. Arbetsordning och gyllene regeln.',
        params: [
            { abbr: 'ISO', full: 'Context Isolation', desc: 'Implementationen är uppdelad i 4 isolerade filer.' },
            { abbr: 'SEQ', full: 'Sekventiellt', desc: 'Arbeta strikt sekventiellt fas för fas.' },
            { abbr: 'RUL', full: 'Gyllene Regeln', desc: 'Läs ENDAST kraven i den motsvarande Fas-filen.' }
        ]
    },
    'MODULE_PHASE_1': {
        title: 'Phase 1: Core State (Modul 01)',
        description: 'Kravspecifikation för Zustand Store, Rum & Minneshantering.',
        params: [
            { abbr: 'ROL', full: 'UserRole', desc: 'Auktoritet (Admin, Teacher, Listener). Styr UI.' },
            { abbr: 'HW', full: 'HardwareMode', desc: 'Ljudrouting (Simple, Pro). Sparas lokalt.' },
            { abbr: 'MEM', full: 'Sliding Window', desc: 'Oändligt minne via contextWindowCompression.' }
        ]
    },
    'MODULE_PHASE_2': {
        title: 'Phase 2: AI Logic (Modul 02)',
        description: 'Kravspecifikation för Prompt Engineering & Språk-kontext.',
        params: [
            { abbr: 'BLD', full: 'Context Builder', desc: 'Dynamiskt val av prompt-mall baserat på state.' },
            { abbr: '2WY', full: 'Tvåvägs-tolk', desc: 'Solo-läge: IF L1 -> L2, ELSE L2 -> L1.' },
            { abbr: '1WY', full: 'Smart Broadcast', desc: 'Multi-läge: Envägs-tolk med Smart Mute.' }
        ]
    },
    'MODULE_PHASE_4': {
        title: 'Phase 4: UX & DataChannels (Modul 04)',
        description: 'Kravspecifikation för UI, integritet och P2P-synkronisering.',
        params: [
            { abbr: 'DAT', full: 'DataChannels', desc: 'Realtidsuppdateringar av rum och möten.' },
            { abbr: 'MUT', full: 'Mute Logic', desc: 'Deltagare äger sin mick. Admin kan Mute All.' },
            { abbr: 'TCH', full: 'Lärarens Knapp', desc: 'Toggle för att spela upp AI-rösten i salen.' }
        ]
    },
    'MODULE_PHASE_5': {
        title: 'Phase 5: SFU Agnosticism (Modul 05)',
        description: 'Kravspecifikation för SFU Adapter Pattern (LiveKit, Daily, Cloudflare).',
        params: [
            { abbr: 'LVK', full: 'LiveKit', desc: 'Rekommenderad. 10k min/mån gratis.' },
            { abbr: 'DLY', full: 'Daily.co', desc: 'Fallback. 10k min/mån gratis.' },
            { abbr: 'CFL', full: 'Cloudflare', desc: 'Power Users. Kräver SDP Munging.' }
        ]
    },
    'MODULE_PHASE_6': {
        title: 'Phase 6: BYOK & Security (Modul 06)',
        description: 'Multi-Tenant SaaS, Netlify BFF och Föreningsdemokrati.',
        params: [
            { abbr: 'BFF', full: 'Netlify BFF', desc: 'Dörrvakt som döljer API-nycklar.' },
            { abbr: 'BYO', full: 'Hjälp till', desc: 'Godkännande-loop för nya Leaders.' },
            { abbr: 'PDF', full: 'QR-Utskrift', desc: 'A4-PDF med lyssnar-QR och Gruppkod.' }
        ]
    },
    'MODULE_DATABASE_SCHEMA': {
        title: 'Database Schema (Modul 07)',
        description: 'Firestore-datamodell för Multi-Tenant BYOK.',
        params: [
            { abbr: 'ORG', full: 'Organizations', desc: 'Innehåller offentlig inviteCode.' },
            { abbr: 'SEC', full: 'Secrets', desc: 'Låst sub-collection för API-nycklar.' },
            { abbr: 'USR', full: 'Users', desc: 'Status: pending förhindrar obehöriga rum.' }
        ]
    },
    'MODULE_NETWORK': NETWORK_DOC,
    'MODULE_LOGIC': LOGIC_DOC,
    'MODULE_AUDIO': AUDIO_DOC,
    'MODULE_CONFIG': CONFIG_DOC,
    'MODULE_VAD_DYNAMICS': {
        title: 'VAD Dynamics (Modul 14)',
        description: 'Avancerad logik för hur C_ELA, Q_LOG och C_SIL samverkar för att lösa "Paus-paradoxen".',
        params: []
    },
    'MODULE_PUPPETEER': {
        title: 'Puppeteer Protocol (Modul 37)',
        description: 'Regissören som osynligt styr AI:n med textkommandon för att hantera tystnad och undvika hallucinationer.',
        params: [
            { abbr: 'PUP', full: 'Puppeteer State', desc: 'IDLE, REPEAT, FILLER eller CUT.' },
            { abbr: 'CMD', full: 'Command Injection', desc: 'Osynliga text-instruktioner till modellen.' }
        ]
    },
    'MODULE_SFU': {
        title: 'SFU Architecture (Modul 52)',
        description: 'Paradigmskifte från lokal Relay-server till molnbaserad SFU (Selective Forwarding Unit) för ljuddistribution.',
        params: [
            { abbr: 'SFU', full: 'Selective Forwarding Unit', desc: 'Molnserver som kopierar ljudströmmar till lyssnare.' },
            { abbr: 'PUB', full: 'Publish', desc: 'Sändaren skickar en enda ström till molnet.' },
            { abbr: 'SUB', full: 'Subscribe', desc: 'Lyssnare prenumererar på strömmen från molnet.' }
        ]
    },
    'MODULE_ROOMS': {
        title: 'Room & Role Management (Modul 53)',
        description: 'Specifikation för hur State hanterar Admin-roller, SFU-rum och LLM-översättning av rumsnamn.',
        params: [
            { abbr: 'ADM', full: 'Admin Role', desc: 'Endast Admin tillåts publicera originalljudet.' },
            { abbr: 'ROOM', full: 'SFU Room', desc: 'Isolerade rum (Huvudkyrkan vs Privata rum).' },
            { abbr: 'LLM', full: 'Name Translation', desc: 'Rumsnamn översätts dynamiskt till UI-språket.' }
        ]
    },
    'MODULE_ROUTING': {
        title: 'Audio Routing State Machine (Modul 54)',
        description: 'Strikt regelverk för ljudhantering för att undvika rundgång, eko och dubbla API-kostnader.',
        params: [
            { abbr: 'ST1', full: 'State 1: Admin', desc: 'Publicerar original_audio, anropar aldrig AI.' },
            { abbr: 'ST2', full: 'State 2: Solo', desc: 'Fick-tolk utan SFU-koppling.' },
            { abbr: 'ST3', full: 'State 3: Multi', desc: 'AI-Leader mixar peer_mics och publicerar translation.' }
        ]
    },
    'MODULE_UX': {
        title: 'Room & Meeting UX (Modul 55)',
        description: 'Hantering av fysiska rum, digitala möten via DataChannels och QR-kodsdelning.',
        params: [
            { abbr: 'URL', full: 'Physical Room', desc: 'URL definierar det fysiska rummet.' },
            { abbr: 'DAT', full: 'DataChannels', desc: 'Sömlösa UI-uppdateringar utan sidomladdning.' },
            { abbr: 'QR', full: 'QR Sharing', desc: 'Fasta eller dynamiska QR-koder för inbjudan.' }
        ]
    },
    'MODULE_HARDWARE': {
        title: 'Hardware Profiles & Routing (Modul 56)',
        description: 'Hårdvaru-agnostisk design, Admin-val av ljudkort, Tesira vs Ljudpuck och Windows-fallgropar.',
        params: [
            { abbr: 'PRO', full: 'Pro Setup', desc: 'Tesira USB med Mix-Minus i hårdvara.' },
            { abbr: 'QCK', full: 'Quick Setup', desc: 'Ljudpuck med inbyggd AEC.' },
            { abbr: 'WDM', full: 'WASAPI/WDM', desc: 'Webbläsare stöder ej ASIO, kräver standarddrivrutiner.' }
        ]
    },
    'MODULE_MEMORY': {
        title: 'Långtidskörning & Minneshantering (Modul 57)',
        description: 'Hantering av Googles 15-minutersgränser via Sliding Window och Session Resumption.',
        params: [
            { abbr: 'WIN', full: 'Sliding Window', desc: 'Kastar gammal kontext för att tillåta oändliga sessioner.' },
            { abbr: 'RES', full: 'Session Resumption', desc: 'Återansluter med sparad biljett vid nätverksavbrott.' },
            { abbr: 'RST', full: 'Hard Reset', desc: 'Kritisk fallback om återanslutning misslyckas.' }
        ]
    },
    'MODULE_SCENARIOS': {
        title: 'Fysiska Ljudscenarier (Modul 58)',
        description: 'Dokumentation av fysiskt och virtuellt ljudflöde i olika hårdvaru-setups.',
        params: [
            { abbr: 'MOB', full: 'Mobiler', desc: 'Flera mobiler i samma rum. Inbyggd AEC.' },
            { abbr: 'PUC', full: 'Ljudpuck', desc: 'Mac + Jabra/Polycom. Hårdvaru-AEC.' },
            { abbr: 'PRO', full: 'Pro Mode', desc: 'vMix/Tesira. StereoPannerNode för V/H split.' }
        ]
    },
    'MODULE_ROLES_VS_HW': {
        title: 'Roller vs Hårdvarulägen (Modul 59)',
        description: 'Kritisk separering mellan vem du är (Roll) och vilken maskin du sitter vid (Hårdvaruläge).',
        params: [
            { abbr: 'ROL', full: 'Användarroll', desc: 'Styrs via URL. Ger UI-rättigheter (t.ex. byta möte).' },
            { abbr: 'SMP', full: 'Simple Mode', desc: 'Standardljud. För mobiler och ljudpuckar.' },
            { abbr: 'PRO', full: 'Pro Mode', desc: 'Pro Split & AEC av. Endast för Tesira/vMix PC.' }
        ]
    },
    'MODULE_ZOOM_MASTERGUIDE': {
        title: 'Zoom Audio Masterguide (Modul 97)',
        description: 'Driftmanual för ljudhantering och AEC i Zoom för administratörer och lärare.',
        params: [
            { abbr: 'AEC', full: 'Local AEC', desc: 'AEC är klientbaserat. Undvik dubbel-AEC.' },
            { abbr: 'TES', full: 'Tesira (Pro)', desc: 'Använd "Original Sound" för att stänga av Zooms AEC.' },
            { abbr: 'JAB', full: 'Jabra (Auto)', desc: 'Använd "Auto" för smart fallback.' }
        ]
    },
    'MODULE_BYOK_UX': {
        title: 'Multi-Tenant BYOK & UX (Modul 93)',
        description: 'Väg 3-arkitektur, hierarki, behörigheter och väntrums-logik för kostnadsskydd.',
        params: [
            { abbr: 'BYO', full: 'Bring Your Own Key', desc: 'Organisationer betalar sin egen AI/Egress.' },
            { abbr: 'WAI', full: 'Väntrum', desc: 'Låser AI tills en Leader ansluter.' },
            { abbr: 'ROL', full: 'Roller', desc: 'Main-Admin, Leader, Visitor.' }
        ]
    },
    'MODULE_BFF_SECURITY': {
        title: 'Säkerhet & BFF (Modul 94)',
        description: 'Zero Trust, Netlify Functions som proxy och tidslås (Kill Switch).',
        params: [
            { abbr: 'BFF', full: 'Backend-For-Frontend', desc: 'Döljer API-nycklar från klienten.' },
            { abbr: 'JWT', full: 'Firebase Auth', desc: 'Verifierar användare via Admin SDK.' },
            { abbr: 'KIL', full: 'Kill Switch', desc: 'Tvingar stängning via expiresAt.' }
        ]
    },
    'MODULE_SFU_MUNGING': {
        title: 'SFU Adapters & Munging (Modul 95)',
        description: 'SFU-agnostisk design och server-side SDP-modifiering för Cloudflare-skydd.',
        params: [
            { abbr: 'SFU', full: 'Adapter Pattern', desc: 'Stöd för LiveKit, Daily, Cloudflare.' },
            { abbr: 'SDP', full: 'SDP Munging', desc: 'Tvingar 24kbps bandbredd på serversidan.' },
            { abbr: 'CFL', full: 'Cloudflare Calls', desc: 'Kräver skydd mot obegränsad egress.' }
        ]
    },
    'MODULE_CRITICAL_GOTCHAS': {
        title: 'Kritiska Gotchas & Akustik (Modul 98)',
        description: 'Skyddsnätet: Fysiska och tekniska lagar som aldrig får brytas.',
        params: [
            { abbr: 'AEC', full: 'Dubbel AEC', desc: 'Mjukvaru- och hårdvaru-AEC får aldrig köras samtidigt.' },
            { abbr: 'REF', full: 'AEC Ref', desc: 'Allt takljud måste routas till Tesirans AEC Ref.' },
            { abbr: 'CPU', full: 'Tråd-svält', desc: 'UI-lagg kan orsaka ljudsprak. Framtid: AudioWorklet.' }
        ]
    },
    'MODULE_CRITICAL_GOTCHAS_LESSONS': {
        title: 'Kritiska Gotchas & Lärdomar (Modul 96)',
        description: 'Våra viktigaste tekniska "blodiga läxor" kring React, Firebase, WebRTC och infrastruktur.',
        params: [
            { abbr: 'KEY', full: 'React Key', desc: 'Styr komponentens identitet, inte bara listor.' },
            { abbr: 'PLY', full: 'Autoplay', desc: 'Kräv användarinteraktion innan WebRTC startar.' },
            { abbr: 'RDB', full: 'Realtime DB', desc: '10-20x snabbare än Firestore för signallering.' }
        ]
    },
    'MODULE_INTERACTIVE_ONBOARDING': {
        title: 'Interactive Onboarding Engine (Modul 97)',
        description: 'CSS-driven motor för dynamiska onboarding-guider utan statiska bilder.',
        params: [
            { abbr: 'VIW', full: 'MagnifierViewer', desc: 'Ritar ringar och förstoringsglas med ren CSS.' },
            { abbr: 'EDT', full: 'MagnifierEditor', desc: 'Drag-and-drop-verktyg för att skapa JSON-förslag.' },
            { abbr: 'JSN', full: 'JSON Data', desc: 'Styr position, storlek och zoom-nivå.' }
        ]
    },
    'MODULE_FUTURE_VISIONS': {
        title: 'Framtidsvisioner (Modul 99)',
        description: 'Långsiktig roadmap (Phase 5) för AI Director, SFU-expansion och bildoptimering.',
        params: [
            { abbr: 'SFU', full: 'Ersätta Zoom', desc: 'Fjärrdeltagare ansluter direkt via Cloudflare WebRTC.' },
            { abbr: 'CAM', full: 'AI Director', desc: 'Multimodal AI styr PTZ-kameror via VISCA över IP.' },
            { abbr: 'IMG', full: 'Ken Burns', desc: 'Smarta stillbilder (5-10s) med AI-klippning för gratisnivån.' }
        ]
    }
};

// --- NEW ENTRIES FOR TRI-VELOCITY & PROTOCOLS ---
const PROTOCOL_ENTRIES: Record<string, KnowledgeEntry> = {
    'TAPE': {
        title: 'The Tape Recorder Protocol',
        text: 'Den nya kärnfilosofin. Vi hanterar AI:n som en linjär bandspelare istället för en konversationspartner. Inga upprepningar, ingen "smart" kontextåterhämtning. Bara flöde.',
        good: 'LINEAR',
        tags: ['AI', 'LOGIC'],
        affects: [{ id: 'FLOW', desc: 'Säkrar' }],
        affectedBy: [{ id: 'PRMPT', desc: 'Definieras av' }],
        x: 55, y: 70
    },
    'PRMPT': {
        title: 'Simultaneous Prompt',
        text: 'Den avskalade systeminstruktionen. "NEVER BACKTRACK", "IGNORE GRAMMAR". Tar bort behovet av komplexa text-injektioner.',
        good: 'SIMPLE',
        tags: ['CONFIG', 'AI'],
        affects: [{ id: 'TAPE', desc: 'Styr' }],
        affectedBy: [{ id: 'SYS_P', desc: 'Ingår i' }],
        x: 45, y: 75
    },
    'VEL_PER': {
        title: 'Velocity 1: Persona (Server)',
        text: 'Styr AI:ns attityd baserat på TOTALT systemtryck (Dam + Jitter).\n\n• 0-15s: NORMAL (Comfort)\n• 15-25s: FAST (Catch-up)\n• >25s: ROCKET (Urgent)\n\nDetta handlar om att minska pauser mellan ord, inte pitch-shift.',
        good: 'Dynamic',
        tags: ['AI', 'LOGIC'],
        affects: [{id: 'RX', desc: 'Ökar densitet'}],
        affectedBy: [{id: 'DAM', desc: 'Triggas av'}],
        x: 65, y: 85
    },
    'VEL_WSO': {
        title: 'Velocity 2: WSOLA (Macro)',
        text: 'Den tunga motorn. Tidssträckning (Time-Stretch) utan att ändra tonhöjd.\n\n• 0-5s: 1.00x\n• 5-15s: 1.05-1.10x\n• 15-25s: 1.20x\n• >25s: 1.30x (Panik)',
        good: 'Buffer < 5s',
        tags: ['AUDIO'],
        affects: [{id: 'SPK', desc: 'Uppspelning'}],
        affectedBy: [{id: 'GAP', desc: 'Styrs av'}],
        x: 75, y: 85
    },
    'VEL_LRP': {
        title: 'Velocity 3: Lerp (Micro)',
        text: 'Finjustering med Pitch-shift. Aktiveras ENDAST i nödläge (>15s totalt tryck).\n\nAtt lägga på upp till 1.03x (3%) pitch gör rösten marginellt "krispigare" och tydligare när den spelas upp snabbt via WSOLA.',
        good: 'OFF (<15s)',
        tags: ['AUDIO'],
        affects: [{id: 'SPK', desc: 'Klarhet'}],
        affectedBy: [{id: 'GAP', desc: 'Triggas >15s'}],
        x: 85, y: 85
    },
    'BUG1': {
        title: 'Shield Puncture (Bugg 40)',
        text: 'Kritiskt logikfel där VAD ignorerade skölden vid tystnad. Fixad genom att köa "TurnComplete"-signalen om SHLD är aktiv.',
        good: 'FIXED',
        tags: ['LOGIC', 'NET'],
        affects: [{id: 'SHLD', desc: 'Respekterar'}],
        affectedBy: [{id: 'VAD', desc: 'Triggas av'}],
        x: 75, y: 25
    },
    'BUG2': {
        title: 'Visual Deception (Bugg 41)',
        text: 'TX-indikatorn visade när vi buffrade, inte när vi sände. Fixad genom att flytta mätpunkten till faktiskt nätverksanrop.',
        good: 'TRUE',
        tags: ['NET'],
        affects: [{id: 'TX', desc: 'Visualiserar'}],
        affectedBy: [],
        x: 85, y: 70
    },
    'BLIND': {
        title: 'The Blind Spot (Modul 46)',
        text: 'Servern är döv i 200-400ms efter TurnComplete. Detta svalde starten på buffrade meningar ("Verse 1"). Fixad med 450ms "Deep Breath" delay.',
        good: '450ms',
        tags: ['NET', 'LOGIC'],
        affects: [{id: 'SHLD', desc: 'Fördröjer öppning'}],
        affectedBy: [{id: 'RX', desc: 'Upptäckt vid'}],
        x: 65, y: 50
    },
    'WAKE': {
        title: 'Wake Up Protocol (Modul 47)',
        text: 'Kallstart av sessionen kan leda till paketförlust. Manuell "väckning" (Handshake) innan långa stycken säkrar anslutningen.',
        good: 'Warm',
        tags: ['AI', 'NET'],
        affects: [{id: 'RTT', desc: 'Kalibrerar'}],
        affectedBy: [],
        x: 95, y: 25
    },
    'DPI': {
        title: 'Dynamic Persona (Modul 48)',
        text: 'Server-side hastighetskontroll. Injicerar "Speak Faster" om det Totala Trycket (Dam + Jitter) överstiger 15s (Fast) eller 25s (Rocket).',
        good: 'Rocket',
        tags: ['AI', 'LOGIC'],
        affects: [{id: 'RX', desc: 'Ökar takt'}],
        affectedBy: [{id: 'DAM', desc: 'Mäter'}],
        x: 75, y: 40
    },
    'ECO': {
        title: 'Eco Mode (Modul 49)',
        text: 'Batterisparläge. Om ljudmotorn är tyst i mer än 3 sekunder, försätts AudioContext i suspend-läge för att spara CPU. Väcks omedelbart vid anrop.',
        good: 'SLEEP',
        tags: ['AUDIO'],
        affects: [{id: 'CTX', desc: 'Stänger av'}],
        affectedBy: [{id: 'RMS', desc: 'Mäter tystnad'}],
        x: 5, y: 85
    },
    'VEL': {
        title: 'Hybrid Velocity (Modul 50)',
        text: 'Ljudmotorns hastighetskontroll. Använder WSOLA för att sträcka ut ljud utan pitch-fel vid höga hastigheter (1.2x+).',
        good: '1.30x',
        tags: ['AUDIO'],
        affects: [{id: 'SPK', desc: 'Driver'}],
        affectedBy: [{id: 'GAP', desc: 'Styrd av'}],
        x: 95, y: 90
    },
    // --- PROMPT ENGINEERING NODES ---
    'LANG': {
        title: 'Language Selector',
        text: 'UI för att välja käll- och målspråk. Sparar historik lokalt. Valet här driver hela prompt-bygget.',
        good: 'Select',
        tags: ['CONFIG', 'UI'],
        affects: [{ id: 'P_BUILD', desc: 'Ger variabler' }],
        affectedBy: [],
        x: 10, y: 30
    },
    'P_BUILD': {
        title: 'Prompt Builder',
        text: 'utils/promptBuilder.ts. Tar en mall (t.ex. "Tape Recorder") och injicerar {{L1}} och {{L2}} dynamiskt vid anslutning.',
        good: 'Dynamic',
        tags: ['LOGIC'],
        affects: [{ id: 'SYS_P', desc: 'Genererar' }],
        affectedBy: [{ id: 'LANG', desc: 'Styrd av' }],
        x: 25, y: 35
    },
    'SYS_P': {
        title: 'System Prompt',
        text: 'Den slutgiltiga textsträngen som skickas till AI:n vid "live.connect". Innehåller roll, regler (Tape Recorder) och säkerhetsspärrar.',
        good: 'Active',
        tags: ['AI', 'NET'],
        affects: [{ id: 'WS', desc: 'Initierar' }],
        affectedBy: [{ id: 'P_BUILD', desc: 'Byggd av' }],
        x: 40, y: 40
    }
};

// --- AGGREGATED KNOWLEDGE BASE (For Doctor & Map) ---
export const KNOWLEDGE_BASE: Record<string, KnowledgeEntry> = {
    ...NETWORK_ENTRIES,
    ...LOGIC_ENTRIES,
    ...AUDIO_ENTRIES,
    ...CONFIG_ENTRIES,
    ...PROTOCOL_ENTRIES
};
