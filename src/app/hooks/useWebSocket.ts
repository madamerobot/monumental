import { useEffect, useRef, useCallback } from 'react';
import { useRobotState } from '../context/RobotStateContext';

export function useWebSocket(url: string) {
    const ws = useRef<WebSocket | null>(null);
    const { setRobotState } = useRobotState();

    // Connect on mount
    useEffect(() => {
        ws.current = new WebSocket(url);

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // Update robot state with new joint angles
            setRobotState(data);
        };

        return () => {
            ws.current?.close();
        };
    }, [url, setRobotState]);

    // Function to send a message
    const send = useCallback((msg: any) => {
        ws.current?.send(JSON.stringify(msg));
    }, []);

    return { send };
}
