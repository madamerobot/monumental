require('dotenv').config();

const { Server } = require('ws');
const { returnMotionTrajectory } = require('./lib/motionTrajectory.cjs');
const { returnInverseKinematics } = require('./lib/inverseKinematics.cjs')

const wss = new Server({ port: process.env.NEXT_PUBLIC_SOCKET_PORT });

// Store current robot state
let currentState = {
    angles: {
        base: 0,
        lift: 0,
        elbow: 0,
        wrist: 0,
        gripper: 0
    },
    position: { x: 0, y: 0, z: 0 },
    error: ''
};

// Map to store active intervals for each client
const clientIntervals = new Map();

function sendInInterval(ws, type, trajectory) {
    // Clear any existing interval for this client
    if (clientIntervals.has(ws)) {
        clearInterval(clientIntervals.get(ws));
        clientIntervals.delete(ws);
    }

    let currentIndex = 0;
    // Start sending incremental updates
    const interval = setInterval(() => {
        if (currentIndex < trajectory.length) {
            // Send current state
            ws.send(JSON.stringify({
                type: type,
                payload: { ...trajectory[currentIndex].angles },
                error: currentState.error
            }));

            // Update current state
            currentState.angles = trajectory[currentIndex].angles;
            currentIndex++;
        } else {
            // Clean up when trajectory is complete
            clearInterval(interval);
            clientIntervals.delete(ws);
        }
    }, 50);

    // Store the interval reference
    clientIntervals.set(ws, interval);
}

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        try {
            const { type, payload } = JSON.parse(message);

            if (type !== 'updateJoint' && type !== 'updatePose') {
                ws.send(JSON.stringify({
                    type: 'error',
                    error: 'Control type not recognized.'
                }));
            }

            if (type === 'updateJoint') {
                const targetState = payload;
                const trajectory = returnMotionTrajectory(currentState, targetState);
                sendInInterval(ws, 'jointUpdate', trajectory);
            }
            if (type === 'updatePose') {
                const targetState = returnInverseKinematics(currentState, payload);
                const trajectory = returnMotionTrajectory(currentState, targetState);
                sendInInterval(ws, 'poseUpdate', trajectory);
            }

        } catch (error) {
            console.error('Error processing message:', error);
            ws.send(JSON.stringify({
                type: 'error',
                error: error.message
            }));
        }
    });

    ws.on('close', () => {
        // Clean up interval when client disconnects
        if (clientIntervals.has(ws)) {
            clearInterval(clientIntervals.get(ws));
            clientIntervals.delete(ws);
        }
        console.log('Client disconnected');
    });

    // Send initial state
    ws.send(JSON.stringify({
        type: 'init',
        payload: { ...currentState.angles }
    }));
});

console.log(`WebSocket server running on ws://localhost:${process.env.NEXT_PUBLIC_SOCKET_PORT}`);