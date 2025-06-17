require('dotenv').config();
const { Server } = require('ws');

const wss = new Server({ port: process.env.NEXT_PUBLIC_SOCKET_PORT });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // const { type, payload } = JSON.parse(message);
        console.log('🟢___ws__incoming__');
        // console.log({ type, payload });
        // handle message
    });
    ws.send('Hello from WebSocket server!');
});

console.log('WebSocket server running on ws://localhost:3001');