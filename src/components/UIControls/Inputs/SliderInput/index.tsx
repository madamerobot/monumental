"use client"

import React, { useRef, useState } from 'react';
import styles from './SliderInput.module.css';

interface SliderInputProps {
    label: string;
    position: string | number; // e.g. '30%' or 0.3
}

const TRACK_HEIGHT = 180;
const INDICATOR_SIZE = 44;

export default function SliderInput({ label, position }: SliderInputProps) {
    // Convert initial position to percent (0-100)
    const initialPercent = typeof position === 'number'
        ? position * 100
        : parseFloat(position);
    const [percent, setPercent] = useState(initialPercent);
    const trackRef = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);

    const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

    const getPercentFromY = (clientY: number) => {
        const rect = trackRef.current?.getBoundingClientRect();
        if (!rect) return percent;
        let y = clientY - rect.top;
        // Clamp y to [0, TRACK_HEIGHT]
        y = clamp(y, 0, TRACK_HEIGHT);
        // Convert y to percent (0 at top, 100 at bottom)
        return (y / TRACK_HEIGHT) * 100;
    };

    const onPointerDown = (e: React.PointerEvent) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!dragging.current) return;
        const newPercent = getPercentFromY(e.clientY);
        setPercent(newPercent);
    };

    const onPointerUp = (e: React.PointerEvent) => {
        dragging.current = false;
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    };

    // Calculate indicator position
    const top = `calc(${percent}% - ${INDICATOR_SIZE / 2}px)`;

    return (
        <div className={styles.sliderWrapper}>
            <div
                className={styles.sliderTrack}
                ref={trackRef}
                style={{ height: TRACK_HEIGHT }}
            >
                <div
                    className={styles.sliderIndicator}
                    style={{ top, width: INDICATOR_SIZE, height: INDICATOR_SIZE, position: 'absolute', cursor: 'pointer' }}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                />
            </div>
            <div className={styles.sliderLabel}>{label}</div>
        </div>
    );
}
