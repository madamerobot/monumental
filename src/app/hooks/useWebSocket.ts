import { useEffect, useRef, useCallback, useState } from 'react';
import { useRobotState } from '../context/RobotStateContext';

export function useWebSocket() {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';

    const ws = useRef<WebSocket | null>(null);
    const { setRobotState } = useRobotState();
    const [isOpen, setIsOpen] = useState(false);

    // Connect on mount
    useEffect(() => {
        ws.current = new WebSocket(wsUrl);
        ws.current.onopen = () => setIsOpen(true);
        ws.current.onclose = () => setIsOpen(false);
        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // Update robot state with new joint angles
            setRobotState(data);
        };

        return () => {
            ws.current?.close();
        };
    }, [wsUrl, setRobotState]);

    // Function to send a message
    const send = useCallback((msg: any) => {
        console.log({ ws: ws.current })

        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(msg));
        } else {
            // Optionally: queue the message, show an error, or reconnect
            console.warn('WebSocket is not open. Message not sent.');
        }
    }, []);

    return { send, isOpen };
}
