import type { NextApiRequest, NextApiResponse } from 'next';
import { Server as WebSocketServer } from 'ws';
import { handleWSMessage } from '../../lib/ws/handler';

declare global {
    // Allow attaching wss to the socket server
    var wss: WebSocketServer | undefined;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // @ts-ignore: Custom property on socket
    if (res.socket.server.wss) {
        res.end();
        return;
    }

    // @ts-ignore: Custom property on socket
    const wss = new WebSocketServer({ server: res.socket.server });
    // @ts-ignore: Custom property on socket
    res.socket.server.wss = wss;

    wss.on('connection', (ws: any) => {
        ws.on('message', (message: string) => {
            const robotConfig = {
                maxVelocity: 10,
                maxAcceleration: 10,
            };
            const currentState = {
                base: 0,
                shoulder: 0,
            }
            handleWSMessage({ ws, message, robotConfig, currentState });
        });
    });

    res.end();
}