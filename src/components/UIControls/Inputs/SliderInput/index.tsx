"use client"

import React, { useRef } from 'react';
import styles from './SliderInput.module.css';

interface SliderInputProps {
    label: string;
    minValue: number;
    maxValue: number;
    value: number;
    onChange: (newValue: number, isFinished: boolean) => void;
}

const TRACK_HEIGHT = 20;
const INDICATOR_SIZE = 20;

export default function SliderInput({ label, minValue, maxValue, value, onChange }: SliderInputProps) {
    const trackRef = useRef<HTMLDivElement>(null);

    // Ensure value is rounded
    const roundedValue = Math.round(value);

    // Calculate the indicator's position as a percentage of the track
    const percent = ((roundedValue - minValue) / (maxValue - minValue)) * 100;

    // Calculate the Y position for the indicator (inverted since 0 is at top)
    const indicatorY = TRACK_HEIGHT - (percent / 100) * TRACK_HEIGHT;

    // Handle drag
    const handlePointerDown = (e: React.PointerEvent) => {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!(e.buttons & 1)) return; // Only drag with left mouse button
        const rect = trackRef.current?.getBoundingClientRect();
        if (!rect) return;

        // Calculate Y position relative to track's top edge
        let y = e.clientY - rect.top;
        y = Math.max(0, Math.min(y, TRACK_HEIGHT));

        // Invert the calculation since we want 0 at top, max at bottom
        const newPercent = 1 - (y / TRACK_HEIGHT);
        const newValue = Math.round(minValue + newPercent * (maxValue - minValue));
        onChange(newValue, false);
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        onChange(roundedValue, true);
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
            <div className={styles.valueWrapper}>
                <div className={styles.sliderLabel}>{label}</div>
                <div className={styles.sliderValue}>{roundedValue}</div>
            </div>

        </div>
    );
}
