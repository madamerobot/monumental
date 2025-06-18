import styles from './Inputs.module.css';
import DialInput from './DialInput';
import SliderInput from './SliderInput';
import { useUIState } from '@/app/context/UIStateContext';
import type { UIControlsProps } from '../index';

export default function Inputs({ sendCommand }: UIControlsProps) {
    const { uiState, setUIState } = useUIState();

    const handleUpdateJoint = (joint: string, value: number) => {
        setUIState({ ...uiState, [joint]: value });
        sendCommand({ type: 'updateJoint', payload: { angles: uiState } });
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
                    onChange={value => handleUpdateJoint('base', value)}
                />
                <DialInput
                    degrees={uiState.elbow}
                    label="Elbow"
                    onChange={value => handleUpdateJoint('elbow', value)}
                />
                <DialInput
                    degrees={uiState.wrist}
                    label="Wrist"
                    onChange={value => handleUpdateJoint('wrist', value)}
                />
            </div>
            <div className={styles.slidersSection}>
                <SliderInput label="Lift" minValue={0} maxValue={100} value={uiState.lift} onChange={newValue => handleUpdateJoint('lift', newValue)} />
                <SliderInput label="Gripper" minValue={0} maxValue={100} value={uiState.gripper} onChange={newValue => handleUpdateJoint('gripper', newValue)} />
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