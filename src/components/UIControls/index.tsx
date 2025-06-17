import { useWebSocket } from "@/app/hooks/useWebSocket";
import Inputs from "./Inputs";
import Terminal from "./Terminal";

export type UIControlsProps = {
    sendCommand: (msg: any) => void;
}

export default function UIControls() {

    const { send } = useWebSocket();

    return (
        <div>
            <Inputs sendCommand={send} />
            <Terminal message="All systems operational." type="success" />
        </div>
    )
} 