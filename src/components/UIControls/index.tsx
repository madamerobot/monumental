import Inputs from "./Inputs";
import Terminal from "./Terminal";

export type UIControlsProps = {
    sendCommand: (msg: any) => void;
}

export default function UIControls({ sendCommand }: UIControlsProps) {

    return (
        <div>
            <Inputs sendCommand={sendCommand} />
            <Terminal message="All systems operational." type="success" />
        </div>
    )
} 