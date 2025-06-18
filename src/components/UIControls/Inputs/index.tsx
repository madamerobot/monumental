import styles from './Inputs.module.css';
import DialInput from './DialInput';
import SliderInput from './SliderInput';
import { useUIState } from '@/app/context/UIStateContext';
import type { UIControlsProps } from '../index';

export default function Inputs({ sendCommand }: UIControlsProps) {
    const { uiState, setUIState } = useUIState();

    const handleUpdateJoint = (joint: string, value: number, isFinished: boolean = false) => {
        setUIState({ ...uiState, [joint]: value });
        if (isFinished) {
            sendCommand({ type: 'updateJoint', payload: { angles: { ...uiState, [joint]: value } } });
        }
    };

    const handleUpdatePose = (x: number, y: number, z: number) => {
        setUIState({ ...uiState, position: { x, y, z } });
        sendCommand({ type: 'updatePose', payload: { x, y, z } });
    };

    return (
        <div className={styles.inputsContainer}>
            <div className={styles.dialsSection}>
                <DialInput
                    degrees={uiState.base}
                    label="Base"
                    onChange={(value, isFinished) => handleUpdateJoint('base', value, isFinished)}
                />
                <DialInput
                    degrees={uiState.elbow}
                    label="Elbow"
                    onChange={(value, isFinished) => handleUpdateJoint('elbow', value, isFinished)}
                />
                <DialInput
                    degrees={uiState.wrist}
                    label="Wrist"
                    onChange={(value, isFinished) => handleUpdateJoint('wrist', value, isFinished)}
                />
            </div>
            <div className={styles.slidersSection}>
                <SliderInput
                    label="Lift"
                    minValue={0}
                    maxValue={100}
                    value={uiState.lift}
                    onChange={(newValue, isFinished) => handleUpdateJoint('lift', newValue, isFinished)}
                />
                <SliderInput
                    label="Gripper"
                    minValue={0}
                    maxValue={100}
                    value={uiState.gripper}
                    onChange={(newValue, isFinished) => handleUpdateJoint('gripper', newValue, isFinished)}
                />
            </div>
            <div className={styles.coordinatesSection}>
                <div className={styles.coordinatesWrapper}>
                    <div className={styles.coordinatesValues}>
                        <div>100</div>
                        <div>130</div>
                        <div>130</div>
                    </div>
                    <div className={styles.coordinatesCircle} />
                </div>
                <div className={styles.coordinatesLabel}>Coordinates</div>
            </div>
        </div>
    );
}