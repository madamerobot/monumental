import styles from './Inputs.module.css';
import DialInput from './DialInput';
import SliderInput from './SliderInput';
import { useUIState } from '@/app/context/UIStateContext';
import { useSystemHealthState } from '@/app/context/SystemHealthContext';
import CoordinatesInput from './CoordinatesInput';

interface InputsProps {
    sendCommand: (msg: any) => void;
}

export default function Inputs({ sendCommand }: InputsProps) {
    const { uiState, setUIState } = useUIState();
    const { setSystemState } = useSystemHealthState();

    const handleUpdateJoint = (joint: string, value: number, isFinished: boolean = false) => {
        setUIState({ ...uiState, [joint]: value });
        if (isFinished) {
            sendCommand({ type: 'updateJoint', payload: { ...uiState, [joint]: value } });
        }
    };

    const handleUpdatePose = (x: number, y: number, z: number, isFinished: boolean = false) => {
        setUIState({ ...uiState, position: { x, y, z } });

        // To DO: Update isFinished on MouseUp
        if (isFinished) {
            sendCommand({ type: 'updatePose', payload: { x, y, z } });
        }
    };

    const handleUpdateUnsupported = () => {
        setSystemState({ errors: ['This control is not supported yet'], webSocketConnection: 'connected' })
    }

    return (
        <div className={styles.inputsContainer}>
            <div className={styles.dialsSection}>
                <DialInput
                    degrees={uiState.base}
                    label="Base Rotation"
                    onChange={(value, isFinished) => handleUpdateJoint('base', value, isFinished)}
                />
                <DialInput
                    degrees={uiState.elbow}
                    label="Elbow Rotation"
                    onChange={(value, isFinished) => handleUpdateJoint('elbow', value, isFinished)}
                />
                <DialInput
                    degrees={uiState.wrist}
                    label="Wrist Rotation"
                    onChange={(value, isFinished) => handleUpdateJoint('wrist', value, isFinished)}
                />
            </div>
            <div className={styles.layoutWrapper}>
                <div className={styles.sliderSection}>
                    <SliderInput label="Gripper Opening" minValue={0} maxValue={10} onChange={handleUpdateUnsupported} value={uiState.gripper} />
                    <SliderInput label="Lift Height" minValue={0} maxValue={10} onChange={handleUpdateUnsupported} value={uiState.lift} />
                </div>
                <CoordinatesInput
                    onChange={handleUpdatePose}
                />
            </div>
        </div >
    );
}