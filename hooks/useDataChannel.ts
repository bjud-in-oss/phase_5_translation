import { useEffect, useCallback, useRef } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, Timestamp, where, doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAppStore, UserRole } from '../stores/useAppStore';
import { useCloudflareSFU } from './useCloudflareSFU';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export type DataChannelMessage = 
  | { type: 'REQUEST_FULL_STATE'; senderId: string; senderRole: UserRole }
  | { type: 'SYNC_STATE'; senderId: string; senderRole: UserRole; payload: { meetingState: string | null; allowSelfUnmute: boolean } }
  | { type: 'ADMIN_MUTE_ALL'; senderId: string; senderRole: UserRole }
  | { type: 'SET_ALLOW_SELF_UNMUTE'; senderId: string; senderRole: UserRole; payload: boolean }
  | { type: 'MEETING_STATE_CHANGE'; senderId: string; senderRole: UserRole; payload: string | null }
  | { type: 'TRACK_AVAILABLE'; senderId: string; senderRole: UserRole; payload: { sessionId: string; trackName: string } };

// We use a random ID to identify this specific client instance
const CLIENT_ID = Math.random().toString(36).substring(2, 9);

export function useDataChannel(
  roomId: string | null,
  onMessageReceived?: (msg: DataChannelMessage) => void,
  onTranscriptReceived?: (transcript: any) => void
) {
  const mountTimeRef = useRef(Timestamp.now());
  const sendMessageRef = useRef<(msg: Omit<DataChannelMessage, 'senderId' | 'senderRole'>) => void>(() => {});
  const { status, connect, disconnect, publishAudio, subscribeToTrack, remoteStream, publishedTrackRef } = useCloudflareSFU(roomId);

  const announceTrack = useCallback((sessionId: string, trackName: string) => {
    if (!roomId) return;
    const { userRole } = useAppStore.getState();
    const messagesRef = collection(db, 'rooms', roomId, 'messages');
    addDoc(messagesRef, {
      type: 'TRACK_AVAILABLE',
      payload: { sessionId, trackName },
      senderId: CLIENT_ID,
      senderRole: userRole,
      timestamp: serverTimestamp()
    }).catch(err => handleFirestoreError(err, OperationType.WRITE, `rooms/${roomId}/messages`));
  }, [roomId]);

  const handleMessage = useCallback((msg: DataChannelMessage) => {
    if (msg.senderId === CLIENT_ID) return; // Ignore our own messages

    // STALE CLOSURE PREVENTION: Always get fresh state
    const state = useAppStore.getState();
    const { userRole, roomState, setMeetingState, setAllowSelfUnmute, setIsMuted } = state;

    if (onMessageReceived) {
      onMessageReceived(msg);
    }

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
    if (!roomId) return;
    const { userRole } = useAppStore.getState();
    
    const messagesRef = collection(db, 'rooms', roomId, 'messages');
    addDoc(messagesRef, {
      ...msg,
      senderId: CLIENT_ID,
      senderRole: userRole,
      timestamp: serverTimestamp()
    }).catch(err => handleFirestoreError(err, OperationType.WRITE, `rooms/${roomId}/messages`));
  }, [roomId]);

  const broadcastTranscript = useCallback(async (transcript: any) => {
    if (!roomId || !transcript || !transcript.id) return;
    try {
      const payload = {
        ...transcript,
        timestamp: transcript.timestamp instanceof Date ? transcript.timestamp.getTime() : transcript.timestamp,
        lastUpdated: transcript.lastUpdated instanceof Date ? transcript.lastUpdated.getTime() : transcript.lastUpdated,
      };
      await setDoc(doc(db, 'rooms', roomId, 'transcripts', transcript.id), payload);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `rooms/${roomId}/transcripts`);
    }
  }, [roomId]);

  useEffect(() => {
    sendMessageRef.current = sendMessage;
  }, [sendMessage]);

  useEffect(() => {
    if (!roomId) return;

    const messagesQuery = query(
      collection(db, `rooms/${roomId}/messages`),
      where('timestamp', '>=', mountTimeRef.current),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data() as DataChannelMessage;
          // Ignore messages that don't have a timestamp yet (local optimistic updates)
          // or handle them. Actually, local updates will have `hasPendingWrites`.
          // But we filter out our own messages via CLIENT_ID anyway.
          handleMessage(data);
        }
      });
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `rooms/${roomId}/messages`);
    });

    const transcriptsQuery = query(
      collection(db, `rooms/${roomId}/transcripts`),
      where('timestamp', '>=', mountTimeRef.current.toMillis()),
      orderBy('timestamp', 'asc')
    );

    const unsubscribeTranscripts = onSnapshot(transcriptsQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added' || change.type === 'modified') {
          const data = change.doc.data();
          if (onTranscriptReceived) {
            onTranscriptReceived({
              ...data,
              timestamp: typeof data.timestamp === 'number' ? new Date(data.timestamp) : data.timestamp,
              lastUpdated: typeof data.lastUpdated === 'number' ? new Date(data.lastUpdated) : data.lastUpdated,
            });
          }
        }
      });
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `rooms/${roomId}/transcripts`);
    });

    connect();

    return () => {
      unsubscribe();
      unsubscribeTranscripts();
      disconnect();
    };
  }, [roomId, connect, disconnect, handleMessage, onTranscriptReceived]);

  // LATE JOINER: Request full state when joining
  useEffect(() => {
    if (status === 'connected') {
      sendMessage({ type: 'REQUEST_FULL_STATE' });
    }
  }, [status, sendMessage]);

  return { sendMessage, announceTrack, remoteStream, publishAudio, connectSfu: connect, sfuStatus: status, broadcastTranscript };
}
