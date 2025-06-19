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

    const handleXChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value) || 0;
        handleUpdatePose(value, uiState.position.y, uiState.position.z, true);
    };

    const handleYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value) || 0;
        handleUpdatePose(uiState.position.x, value, uiState.position.z, true);
    };

    const handleZChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value) || 0;
        handleUpdatePose(uiState.position.x, uiState.position.y, value, true);
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
            <div className={styles.coordinatesSection}>
                <div className={styles.coordinatesWrapper}>
                    <div className={styles.coordinatesValues}>
                        <div>
                            <input
                                type="number"
                                defaultValue={uiState.position.x}
                                aria-label="xPos"
                                name="xPos"
                                onChange={handleXChange}
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                defaultValue={uiState.position.y}
                                aria-label="yPos"
                                name="yPos"
                                onChange={handleYChange}
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                defaultValue={uiState.position.z}
                                aria-label="zPos"
                                name="zPos"
                                onChange={handleZChange}
                            />
                        </div>
                    </div>
                    <div className={styles.coordinatesCircle} />
                </div>
                <div className={styles.coordinatesLabel}>Coordinates</div>
            </div>
        </div >
    );
}