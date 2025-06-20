import classNames from 'classnames';
import styles from './Terminal.module.css';

type TerminalMessage = {
    message: string;
    wsConnection: 'connected' | 'error' | 'waiting';
    errors: string[];
}

type TerminalMessageWithPoseError = {
    message: string;
    wsConnection: 'connected' | 'error' | 'waiting';
    isPoseError: boolean;
    isControlError: boolean;
}

function generateStatusMessage({ message, wsConnection, isPoseError, isControlError }: TerminalMessageWithPoseError) {

    if (isPoseError) {
        return 'The x/y/z position you selected is not reachable by the robot'
    }
    if (isControlError) {
        return 'This control is not supported yet'
    }

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

function indicatorClass(wsConnection: 'connected' | 'error' | 'waiting', isPoseError: boolean, isControlError: boolean) {
    return classNames({
        [styles.error]: wsConnection === 'error' || isPoseError || isControlError,
        [styles.success]: wsConnection === 'connected' && !isPoseError && !isControlError,
        [styles.waiting]: wsConnection === 'waiting' && !isPoseError && !isControlError,
    })
}

export default function Terminal({ message, wsConnection, errors }: TerminalMessage) {

    const isPoseError = errors.length > 0 && errors.includes('This target position is not reachable');
    const isControlError = errors.length > 0 && errors.includes('This control is not supported yet');

    return <div className={styles.terminalContainer}>
        <div className={styles.terminal}>
            <div className={classNames(styles.terminalMessage, indicatorClass(wsConnection, isPoseError, isControlError))}>
                {generateStatusMessage({ message, wsConnection, isPoseError, isControlError })}
            </div>
        </div>
    </div >;
}
