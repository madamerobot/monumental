"use client"

import React, { useRef, useEffect, useState } from 'react';
import styles from './SliderInput.module.css';

interface SliderInputProps {
    label: string;
    minValue: number;
    maxValue: number;
    value: number;
    onChange: (newValue: number, isFinished: boolean) => void;
}

export default function SliderInput({ label, minValue, maxValue, value, onChange }: SliderInputProps) {
    const trackRef = useRef<HTMLDivElement>(null);

    const [trackWidth, setTrackWidth] = useState(0);
    const [trackLeft, setTrackLeft] = useState(0);
    const [sliderValue, setSliderValue] = useState(value);

    useEffect(() => {
        if (trackRef.current) {
            setTrackWidth(trackRef.current.getBoundingClientRect().width);
            setTrackLeft(trackRef.current.getBoundingClientRect().left);
        }
    }, [trackRef]);

    // Handle drag
    const handlePointerDown = (e: React.PointerEvent) => {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!(e.buttons & 1)) return; // Only drag with left mouse button

        // Calculate X position relative to track's left edge
        const x = e.clientX - trackLeft;
        const newValue = Math.round(minValue + (x / trackWidth) * (maxValue - minValue));
        // clamp the value between min and max
        const clampedValue = Math.max(minValue, Math.min(newValue, maxValue));

        setSliderValue(clampedValue);
        onChange(clampedValue, false);
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        onChange(sliderValue, true);
    };

    return (
        <div className={styles.sliderWrapper}>
            <div
                className={styles.sliderTrack}
                ref={trackRef}
            >
                <div
                    className={styles.sliderIndicator}
                    style={{
                        position: 'absolute',
                        left: `${(sliderValue - minValue) / (maxValue - minValue) * 100}%`,
                    }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                />
            </div>
            <div className={styles.valueWrapper}>
                <div className={styles.sliderLabel}>{label}</div>
                <div className={styles.sliderValue}>{sliderValue}</div>
            </div>

        </div>
    );
}
