"use client"

import React, { useRef } from 'react';
import styles from './SliderInput.module.css';

interface SliderInputProps {
    label: string;
    minValue: number;
    maxValue: number;
    value: number;
    onChange: (newValue: number) => void;
}

const TRACK_HEIGHT = 180;
const INDICATOR_SIZE = 24;

export default function SliderInput({ label, minValue, maxValue, value, onChange }: SliderInputProps) {
    const trackRef = useRef<HTMLDivElement>(null);

    // Ensure value is rounded
    const roundedValue = Math.round(value);

    // Calculate the indicator's position as a percentage of the track
    const percent = ((roundedValue - minValue) / (maxValue - minValue)) * 100;
    const top = `calc(${percent}% - ${INDICATOR_SIZE / 2}px)`;

    // Handle drag
    const handlePointerDown = (e: React.PointerEvent) => {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!(e.buttons & 1)) return; // Only drag with left mouse button
        const rect = trackRef.current?.getBoundingClientRect();
        if (!rect) return;
        let y = e.clientY - rect.top;
        y = Math.max(0, Math.min(y, TRACK_HEIGHT));
        const newPercent = y / TRACK_HEIGHT;
        const newValue = Math.round(minValue + newPercent * (maxValue - minValue));
        onChange(newValue);
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    };

    return (
        <div className={styles.sliderWrapper}>
            <div
                className={styles.sliderTrack}
                ref={trackRef}
                style={{ height: TRACK_HEIGHT }}
            >
                <div
                    className={styles.sliderIndicator}
                    style={{
                        top,
                        width: INDICATOR_SIZE,
                        height: INDICATOR_SIZE,
                        position: 'absolute',
                        cursor: 'pointer',
                    }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                />
            </div>
            <div className={styles.sliderLabel}>{label}</div>
            <div className={styles.sliderValue}>{roundedValue}</div>
        </div>
    );
}
