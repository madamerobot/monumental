import styles from './Terminal.module.css';

type TerminalMessage = {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
}

export default function Terminal({ message, type }: TerminalMessage) {
    return <div className={styles.terminalContainer}>
        <div className={styles.terminal}>
            <div className={styles.terminalMessage}>
                {message}
            </div>
        </div>

    </div>;
}
