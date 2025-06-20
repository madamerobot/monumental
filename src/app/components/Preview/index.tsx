'use client';

import { Scene } from './Scene';
import styles from './Preview.module.css';

export default function Preview() {
    return (
        <div className={styles.previewContainer}>
            <Scene />
        </div>
    )

} 