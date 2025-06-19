import { useUIState } from '@/app/context/UIStateContext';
import styles from './CoordinatesInput.module.css'

interface CoordinatesInputProps {
    onChange: (x: number, y: number, z: number, isFinished?: boolean) => void;
}

export default function CoordinatesInput({ onChange }: CoordinatesInputProps) {

    const { uiState } = useUIState();

    const handleXChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value) || 0;
        onChange(value, uiState.position.y, uiState.position.z, true);
    };

    const handleYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value) || 0;
        onChange(uiState.position.x, value, uiState.position.z, true);
    };

    const handleZChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value) || 0;
        onChange(uiState.position.x, uiState.position.y, value, true);
    };

    return (
        <div className={styles.coordinatesSection}>
            <div className={styles.coordinatesWrapper}>
                <div className={styles.coordinatesContainer}>
                    <input
                        type="number"
                        defaultValue={uiState.position.x}
                        aria-label="xPos"
                        name="xPos"
                        onChange={handleXChange}
                    />
                    xPos
                </div>
                <div className={styles.coordinatesContainer}>
                    <input
                        type="number"
                        defaultValue={uiState.position.y}
                        aria-label="yPos"
                        name="yPos"
                        onChange={handleYChange}
                    />
                    yPos
                </div>
                <div className={styles.coordinatesContainer}>
                    <input
                        type="number"
                        defaultValue={uiState.position.z}
                        aria-label="zPos"
                        name="zPos"
                        onChange={handleZChange}
                    />
                    zPos
                </div>
            </div>
        </div>
    );
}