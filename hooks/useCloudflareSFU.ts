import { useState, useCallback, useRef } from 'react';

export type SFUStatus = 'disconnected' | 'connecting' | 'connected';

export function useCloudflareSFU(roomId: string | null, onMessage?: (msg: any) => void) {
  const [status, setStatus] = useState<SFUStatus>('disconnected');
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);

  const connect = useCallback(async () => {
    if (!roomId) return;
    
    const appId = import.meta.env.VITE_CLOUDFLARE_APP_ID;
    const appSecret = import.meta.env.VITE_CLOUDFLARE_APP_SECRET;

    if (!appId || !appSecret) {
      console.error("[SFU] Cloudflare credentials missing in environment variables");
      return;
    }

    try {
      setStatus('connecting');

      const pc = new RTCPeerConnection({
        iceServers: [
          {
            urls: 'stun:stun.cloudflare.com:3478'
          }
        ]
      });
      peerConnectionRef.current = pc;

      // Create DataChannel
      const dc = pc.createDataChannel('motesbryggan-data');
      dataChannelRef.current = dc;

      dc.onopen = () => {
        console.log("[SFU] DataChannel opened");
        setStatus('connected');
      };

      dc.onclose = () => {
        console.log("[SFU] DataChannel closed");
        setStatus('disconnected');
      };

      dc.onerror = (error) => {
        console.error("[SFU] DataChannel error:", error);
      };

      dc.onmessage = (event) => {
        if (onMessage) {
          try {
            const parsed = JSON.parse(event.data);
            onMessage(parsed);
          } catch (e) {
            console.error("[SFU] Failed to parse DataChannel message", e);
          }
        }
      };

      // Create an offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Send offer to Cloudflare Calls API
      const response = await fetch(`https://rtc.live.cloudflare.com/v1/apps/${appId}/sessions/new`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${appSecret}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionDescription: {
            type: offer.type,
            sdp: offer.sdp
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Cloudflare API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Set remote description from Cloudflare's answer
      if (data && data.sessionDescription) {
        await pc.setRemoteDescription(new RTCSessionDescription(data.sessionDescription));
      } else {
        throw new Error("No sessionDescription in Cloudflare response");
      }

    } catch (error) {
      console.error("[SFU] Failed to connect:", error);
      setStatus('disconnected');
    }
  }, [roomId, onMessage]);

  const disconnect = useCallback(() => {
    if (dataChannelRef.current) {
      dataChannelRef.current.close();
      dataChannelRef.current = null;
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    setStatus('disconnected');
  }, []);

  const sendData = useCallback((message: any) => {
    if (dataChannelRef.current && dataChannelRef.current.readyState === 'open') {
      dataChannelRef.current.send(JSON.stringify(message));
    } else {
      console.warn("[SFU] DataChannel not open, cannot send message");
    }
  }, []);

  return { status, connect, disconnect, sendData };
}
