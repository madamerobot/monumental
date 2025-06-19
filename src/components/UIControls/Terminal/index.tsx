import classNames from 'classnames';
import styles from './Terminal.module.css';

type TerminalMessage = {
    message: string;
    wsConnection: 'connected' | 'error' | 'waiting';
}

function generateStatusMessage({ message, wsConnection }: TerminalMessage) {
    switch (wsConnection) {
        case 'connected':
            return "All systems operational";
        case 'waiting':
            return "Waiting for WebSockets to start connection";
        case 'error':
            return message;
        default:
            return 'System status unknown'
    }
}

export default function Terminal({ message, wsConnection }: TerminalMessage) {

    const indicatorClass = {
        [styles.success]: wsConnection === 'connected',
        [styles.waiting]: wsConnection === 'waiting',
        [styles.error]: wsConnection === 'error'
    }

    return <div className={styles.terminalContainer}>
        <div className={styles.terminal}>
            <div className={classNames(styles.terminalMessage, indicatorClass)}>
                {generateStatusMessage({ message, wsConnection })}
            </div>
        </div>
    </div >;
}
