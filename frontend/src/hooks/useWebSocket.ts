import { useState, useEffect, useRef, useCallback } from 'react';

interface UseWebSocketReturn<T> {
  data: T | null;
  isConnected: boolean;
  error: Event | null;
  sendMessage: (msg: any) => void;
}

export function useWebSocket<T>(url: string): UseWebSocketReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Event | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        setError(null);
        console.log(`[WebSocket] Connected: ${url}`);
      };

      ws.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          setData(parsed);
        } catch (e) {
          setData(event.data as any);
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        console.log(`[WebSocket] Disconnected: ${url}. Reconnecting in 3s...`);
        reconnectTimeoutRef.current = setTimeout(connect, 3000);
      };

      ws.onerror = (err) => {
        setError(err);
        ws.close();
      };
    } catch (err) {
      console.error("[WebSocket] Setup Error:", err);
    }
  }, [url]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) {
        wsRef.current.onclose = null; // Cegah auto-reconnect saat komponen di-unmount
        wsRef.current.close();
      }
    };
  }, [connect]);

  const sendMessage = useCallback((msg: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(typeof msg === 'string' ? msg : JSON.stringify(msg));
    } else {
      console.warn("[WebSocket] Not connected. Message not sent.");
    }
  }, []);

  return { data, isConnected, error, sendMessage };
}
