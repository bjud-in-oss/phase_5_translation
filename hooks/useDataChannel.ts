import { useEffect, useCallback, useRef } from 'react';
import { useAppStore, UserRole } from '../stores/useAppStore';
import { useCloudflareSFU } from './useCloudflareSFU';

export type DataChannelMessage = 
  | { type: 'REQUEST_FULL_STATE'; senderId: string; senderRole: UserRole }
  | { type: 'SYNC_STATE'; senderId: string; senderRole: UserRole; payload: { meetingState: string | null; allowSelfUnmute: boolean } }
  | { type: 'ADMIN_MUTE_ALL'; senderId: string; senderRole: UserRole }
  | { type: 'SET_ALLOW_SELF_UNMUTE'; senderId: string; senderRole: UserRole; payload: boolean }
  | { type: 'MEETING_STATE_CHANGE'; senderId: string; senderRole: UserRole; payload: string | null }
  | { type: 'TRACK_AVAILABLE'; senderId: string; senderRole: UserRole; payload: { sessionId: string; trackName: string } };

// We use a random ID to identify this specific client instance
const CLIENT_ID = Math.random().toString(36).substring(2, 9);

export function useDataChannel(roomId: string | null) {
  const sendMessageRef = useRef<(msg: Omit<DataChannelMessage, 'senderId' | 'senderRole'>) => void>(() => {});
  const bcRef = useRef<BroadcastChannel | null>(null);
  const { status, connect, disconnect, publishAudio, subscribeToTrack, remoteStream, publishedTrackRef } = useCloudflareSFU(roomId);

  const announceTrack = useCallback((sessionId: string, trackName: string) => {
    const { userRole } = useAppStore.getState();
    bcRef.current?.postMessage({
      type: 'TRACK_AVAILABLE',
      payload: { sessionId, trackName },
      senderId: CLIENT_ID,
      senderRole: userRole
    });
  }, []);

  const handleMessage = useCallback((msg: DataChannelMessage) => {
    if (msg.senderId === CLIENT_ID) return; // Ignore our own messages

    // STALE CLOSURE PREVENTION: Always get fresh state
    const state = useAppStore.getState();
    const { userRole, roomState, setMeetingState, setAllowSelfUnmute, setIsMuted } = state;

    // ZERO TRUST AUTHORIZATION: Verify sender role for admin commands
    const isAdminCommand = ['ADMIN_MUTE_ALL', 'SET_ALLOW_SELF_UNMUTE', 'MEETING_STATE_CHANGE', 'SYNC_STATE', 'TRACK_AVAILABLE'].includes(msg.type);
    if (isAdminCommand && msg.senderRole !== 'admin' && msg.senderRole !== 'teacher') {
      console.warn(`[DataChannel] Unauthorized ${msg.type} from role: ${msg.senderRole}`);
      return;
    }

    switch (msg.type) {
      case 'TRACK_AVAILABLE':
        subscribeToTrack(msg.payload.sessionId, msg.payload.trackName);
        break;

      case 'REQUEST_FULL_STATE':
        // If we are admin/teacher, we respond with the current state
        if (userRole === 'admin' || userRole === 'teacher') {
          sendMessageRef.current({
            type: 'SYNC_STATE',
            payload: {
              meetingState: roomState.meetingState,
              allowSelfUnmute: roomState.allowSelfUnmute
            }
          });
          
          if (publishedTrackRef.current) {
            announceTrack(publishedTrackRef.current.sessionId, publishedTrackRef.current.trackName);
          }
        }
        break;

      case 'SYNC_STATE':
        setMeetingState(msg.payload.meetingState);
        setAllowSelfUnmute(msg.payload.allowSelfUnmute);
        break;

      case 'ADMIN_MUTE_ALL':
        // Force mute locally
        setIsMuted(true);
        break;

      case 'SET_ALLOW_SELF_UNMUTE':
        setAllowSelfUnmute(msg.payload);
        // If self-unmute is disabled and we are a listener, force mute
        if (!msg.payload && userRole === 'listener') {
          setIsMuted(true);
        }
        break;

      case 'MEETING_STATE_CHANGE':
        setMeetingState(msg.payload);
        break;
    }
  }, [subscribeToTrack, announceTrack, publishedTrackRef]);

  const sendMessage = useCallback((msg: Omit<DataChannelMessage, 'senderId' | 'senderRole'>) => {
    const { userRole } = useAppStore.getState();
    const fullMessage: DataChannelMessage = {
      ...msg,
      senderId: CLIENT_ID,
      senderRole: userRole
    } as DataChannelMessage;
    
    bcRef.current?.postMessage(fullMessage);
  }, []);

  useEffect(() => {
    sendMessageRef.current = sendMessage;
  }, [sendMessage]);

  useEffect(() => {
    if (!roomId) return;

    bcRef.current = new BroadcastChannel('room-' + roomId);
    bcRef.current.onmessage = (event) => {
      handleMessage(event.data);
    };

    connect();

    return () => {
      if (bcRef.current) {
        bcRef.current.close();
        bcRef.current = null;
      }
      disconnect();
    };
  }, [roomId, connect, disconnect, handleMessage]);

  // LATE JOINER: Request full state when joining
  useEffect(() => {
    if (status === 'connected') {
      sendMessage({ type: 'REQUEST_FULL_STATE' });
    }
  }, [status, sendMessage]);

  return { sendMessage, announceTrack, remoteStream, publishAudio, connectSfu: connect, sfuStatus: status };
}
