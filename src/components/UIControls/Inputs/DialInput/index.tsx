"use client"

import React, { useRef, useState } from 'react';
import styles from './DialInput.module.css';

interface DialInputProps {
    degrees: number | string;
    label: string;
    indicatorAngle?: number; // in degrees
    onChange: (value: number, isFinished: boolean) => void;
}

const DIAL_SIZE = 100;
const DIAL_RADIUS = DIAL_SIZE / 2;
const INDICATOR_SIZE = 20;
const INDICATOR_RADIUS = INDICATOR_SIZE / 2;
const INDICATOR_DISTANCE = DIAL_RADIUS;

export default function DialInput({ degrees: initialDegrees, label, onChange }: DialInputProps) {
    const [degrees, setDegrees] = useState(Math.round(Number(initialDegrees)));
    const dialRef = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);

    // Helper to get angle from center to mouse
    const getAngle = (clientX: number, clientY: number) => {
        const rect = dialRef.current?.getBoundingClientRect();
        if (!rect) return degrees;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = clientX - cx;
        const dy = clientY - cy;
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
        angle = angle + 90;
        if (angle < 0) angle += 360;
        return Math.round(angle); // Round to nearest integer
    };

    // Calculate indicator position from degrees
    const getIndicatorPosition = (angle: number) => {
        const rad = (angle - 90) * (Math.PI / 180);
        const x = DIAL_RADIUS + INDICATOR_DISTANCE * Math.cos(rad);
        const y = DIAL_RADIUS + INDICATOR_DISTANCE * Math.sin(rad);
        return { left: x, top: y };
    };

    const onPointerDown = (e: React.PointerEvent) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!dragging.current) return;
        const angle = getAngle(e.clientX, e.clientY);
        setDegrees(angle);
        onChange(angle, false);
    };

    const onPointerUp = (e: React.PointerEvent) => {
        dragging.current = false;
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        onChange(degrees, true);
    };

    const indicatorPos = getIndicatorPosition(degrees);

    return (
        <div className={styles.dialWrapper}>
            <div
                className={styles.dial}
                ref={dialRef}
                style={{ width: DIAL_SIZE, height: DIAL_SIZE, position: 'relative' }}
            >
                <span className={styles.dialValue}>{degrees}°</span>
                <div
                    className={styles.dialIndicator}
                    style={{
                        ...indicatorPos,
                        position: 'absolute',
                        width: INDICATOR_SIZE,
                        height: INDICATOR_SIZE,
                        cursor: 'pointer',
                    }}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                />
            </div>
            <div className={styles.dialLabel}>{label}</div>
        </div>
    );
} 