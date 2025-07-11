import { useEffect, useRef, useCallback, useState } from 'react';
import { useRobotState } from '../context/RobotStateContext';
import { useSystemHealthState } from '../context/SystemHealthContext'
import type { RobotState } from '../types/robotState';
import type { WsCommand } from '../types/wsCommand';

export function useWebSocket() {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';

    const ws = useRef<WebSocket | null>(null);
    const { setRobotState } = useRobotState();
    const [isOpen, setIsOpen] = useState(false);

    const { setSystemState, systemState } = useSystemHealthState();

    // Connect on mount
    useEffect(() => {
        ws.current = new WebSocket(wsUrl);
        ws.current.onopen = () => {
            setIsOpen(true);
            setSystemState({ errors: [], webSocketConnection: 'connected' })
        }
        ws.current.onclose = () => setIsOpen(false);
        ws.current.onmessage = (event) => {
            const { type, payload, error } = JSON.parse(event.data);

            switch (type) {
                case 'init':
                case 'jointUpdate':
                    // Update robot state with new joint angles
                    setRobotState((prevState: RobotState) => ({
                        ...prevState,
                        ...payload
                    }));
                    if (error) {
                        setSystemState({ errors: error, webSocketConnection: 'connected' })
                    } else {
                        setSystemState({ errors: [], webSocketConnection: 'connected' })
                    }
                    break;
                case 'poseUpdate':
                    // Update robot state with new joint angles
                    setRobotState((prevState: RobotState) => ({
                        ...prevState,
                        ...payload
                    }));
                    if (error) {
                        setSystemState({ errors: error, webSocketConnection: 'connected' })
                    } else {
                        setSystemState({ errors: [], webSocketConnection: 'connected' })
                    }
                    break;
                case 'error':
                    setSystemState({ errors: [`WebSocket error: ${payload.message}`], webSocketConnection: 'connected' })
                    break;
                default:
                    setSystemState({ errors: [`Unkown message type: ${type}`], webSocketConnection: 'connected' })
            }
        };

        return () => {
            ws.current?.close();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wsUrl, setRobotState]);

    // Function to send a message
    const send = useCallback((msg: WsCommand) => {

        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(msg));
            // Resetting error array should be improved, hacky temp solution
            setSystemState({ errors: [], webSocketConnection: 'connected' })
        } else {
            setSystemState({ errors: [...systemState.errors, 'WebSocket is not open. Message not sent.'], webSocketConnection: 'error' })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { send, isOpen };
}
