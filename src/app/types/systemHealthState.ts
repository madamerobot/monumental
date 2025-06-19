export interface SystemHealthState {
    errors: string[];
    webSocketConnection: 'connected' | 'waiting' | 'error';
}