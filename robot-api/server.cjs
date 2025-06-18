require('dotenv').config();

const { Server } = require('ws');
const { moveRobot } = require('./lib/robotControl.cjs');
const { returnMotionTrajectory } = require('./lib/motionTrajectory.cjs');

const wss = new Server({ port: process.env.NEXT_PUBLIC_SOCKET_PORT });

// Store current robot state and active intervals
let currentState = {
    angles: {
        base: 0,
        lift: 0,
        elbow: 0,
        wrist: 0,
        gripper: 0
    },
    position: { x: 0, y: 0, z: 0 }
};

// Map to store active intervals for each client
const clientIntervals = new Map();

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        try {
            const { type, payload } = JSON.parse(message);

            if (type === 'updateJoint') {
                // Clear any existing interval for this client
                if (clientIntervals.has(ws)) {
                    clearInterval(clientIntervals.get(ws));
                    clientIntervals.delete(ws);
                }

                // Generate motion trajectory
                const trajectory = returnMotionTrajectory(currentState, payload);
                let currentIndex = 0;

                // Start sending incremental updates
                const interval = setInterval(() => {
                    if (currentIndex < trajectory.length) {
                        // Send current state
                        ws.send(JSON.stringify({
                            type: 'jointUpdate',
                            payload: { ...trajectory[currentIndex].angles }
                        }));

                        // Update current state
                        currentState.angles = trajectory[currentIndex].angles;
                        currentIndex++;
                    } else {
                        // Clean up when trajectory is complete
                        clearInterval(interval);
                        clientIntervals.delete(ws);
                    }
                }, 50); // Match the interval from motionTrajectory

                // Store the interval reference
                clientIntervals.set(ws, interval);
            }
        } catch (error) {
            console.error('Error processing message:', error);
            ws.send(JSON.stringify({
                type: 'error',
                payload: { message: error.message }
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