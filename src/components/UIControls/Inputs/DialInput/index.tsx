import styles from './DialInput.module.css';

interface DialInputProps {
    degrees: number | string;
    label: string;
    indicatorAngle?: number; // in degrees
}

export default function DialInput({ degrees, label, indicatorAngle = 0 }: DialInputProps) {
    // The indicator is rotated by indicatorAngle degrees and then translated outward
    return (
        <div className={styles.dialWrapper}>
            <div className={styles.dial}>
                <span className={styles.dialValue}>{degrees}°</span>
                <div
                    className={styles.dialIndicator}
                    style={{ transform: `rotate(${indicatorAngle}deg) translateY(-110px)` }}
                />
            </div>
            <div className={styles.dialLabel}>{label}</div>
        </div>
    );
} 