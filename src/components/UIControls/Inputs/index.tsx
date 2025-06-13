import styles from './Inputs.module.css';
import DialInput from './DialInput';
import SliderInput from './SliderInput';

export default function Inputs() {
    return (
        <div className={styles.inputsContainer}>
            <div className={styles.dialsSection}>
                <DialInput degrees={45} label="Swing" indicatorAngle={45} />
                <DialInput degrees={23} label="Elbow" indicatorAngle={30} />
                <DialInput degrees={90} label="Wrist" indicatorAngle={90} />
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