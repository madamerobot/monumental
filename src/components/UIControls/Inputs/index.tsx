import styles from './Inputs.module.css';
import DialInput from './DialInput';
import SliderInput from './SliderInput';

export default function Inputs() {
    return (
        <div className={styles.inputsContainer}>
            <div className={styles.dialsSection}>
                <DialInput degrees={0} label="Swing" indicatorAngle={0} />
                <DialInput degrees={0} label="Elbow" indicatorAngle={0} />
                <DialInput degrees={0} label="Wrist" indicatorAngle={0} />
            </div>
            <div className={styles.slidersSection}>
                <SliderInput label="Lift" position="30%" />
                <SliderInput label="Gripper" position="70%" />
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