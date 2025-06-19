import { useWebSocket } from "@/app/hooks/useWebSocket";
import Inputs from "./Inputs";
import Terminal from "./Terminal";
import styles from './UIControls.module.css';
import { SystemHealthState, useSystemHealthState } from "@/app/context/SystemHealthContext";

export type UIControlsProps = {
    sendCommand: (msg: any) => void;
}

export default function UIControls() {

    const { send } = useWebSocket();
    const { systemState } = useSystemHealthState();

    return (
        <div className={styles.uiContainer}>
            <Inputs sendCommand={send} />
            <Terminal message={systemState.errors.length ? JSON.stringify(systemState.errors) : 'All systems operational'} wsConnection={systemState.webSocketConnection} />
        </div>
    )
} 