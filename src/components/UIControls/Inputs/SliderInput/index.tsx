import styles from './SliderInput.module.css';

interface SliderInputProps {
    label: string;
    position: string | number; // e.g. '30%' or 0.3
}

export default function SliderInput({ label, position }: SliderInputProps) {
    // If position is a number between 0 and 1, convert to percent string
    const top = typeof position === 'number' ? `${position * 100}%` : position;
    return (
        <div className={styles.sliderWrapper}>
            <div className={styles.sliderTrack}>
                <div className={styles.sliderIndicator} style={{ top }} />
            </div>
            <div className={styles.sliderLabel}>{label}</div>
        </div>
    );
}
