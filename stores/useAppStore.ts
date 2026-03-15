import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'teacher' | 'listener';
export type HardwareMode = 'simple' | 'pro';

export interface RoomState {
  roomId: string | null;
  meetingState: string | null;
  allowSelfUnmute: boolean;
}

export interface ParticipantState {
  isMuted: boolean;
  handRaised: boolean;
}

export interface AppState {
  // 1. Separation of Role and Hardware
  userRole: UserRole;
  hardwareMode: HardwareMode;
  setUserRole: (role: UserRole) => void;
  setHardwareMode: (mode: HardwareMode) => void;

  // 2. Room and Meeting Logic
  roomState: RoomState;
  setRoomId: (roomId: string | null) => void;
  setMeetingState: (state: string | null) => void;
  setAllowSelfUnmute: (allow: boolean) => void;

  // 4. Participant & Permission State
  participantState: ParticipantState;
  setIsMuted: (isMuted: boolean) => void;
  setHandRaised: (handRaised: boolean) => void;
  
  // Admin actions
  adminMuteAll: () => void;
  // Note: Admin cannot force unmute, so no adminUnmuteAll

  // 5. Security and Recovery
  autoReconnect: boolean;
  setAutoReconnect: (auto: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      userRole: 'listener',
      hardwareMode: 'simple',
      
      setUserRole: (role) => set({ userRole: role }),
      setHardwareMode: (mode) => set({ hardwareMode: mode }),

      roomState: {
        roomId: null,
        meetingState: null,
        allowSelfUnmute: true,
      },
      setRoomId: (roomId) => set((state) => ({ roomState: { ...state.roomState, roomId } })),
      setMeetingState: (meetingState) => set((state) => ({ roomState: { ...state.roomState, meetingState } })),
      setAllowSelfUnmute: (allowSelfUnmute) => set((state) => ({ roomState: { ...state.roomState, allowSelfUnmute } })),

      participantState: {
        isMuted: true,
        handRaised: false,
      },
      setIsMuted: (isMuted) => {
        const { roomState, participantState, userRole } = get();
        // If trying to unmute, check permissions (Admin/Teacher can always unmute themselves)
        if (!isMuted && !roomState.allowSelfUnmute && userRole === 'listener') {
          console.warn("Self-unmute is disabled by admin.");
          return;
        }
        set({ participantState: { ...participantState, isMuted } });
      },
      setHandRaised: (handRaised) => set((state) => ({ participantState: { ...state.participantState, handRaised } })),

      adminMuteAll: () => {
        const { userRole } = get();
        if (userRole === 'admin' || userRole === 'teacher') {
          // In a real app, this would also broadcast a WebRTC signal to other clients
          // Locally, we just mute ourselves if we are part of the "all" or handle it via signaling later
          set((state) => ({ participantState: { ...state.participantState, isMuted: true } }));
        }
      },

      autoReconnect: true,
      setAutoReconnect: (autoReconnect) => set({ autoReconnect }),
    }),
    {
      name: 'hardware-mode-storage',
      // Only persist hardwareMode to localStorage per device as per requirements
      partialize: (state) => ({ hardwareMode: state.hardwareMode }),
    }
  )
);
