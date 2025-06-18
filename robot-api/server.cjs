require('dotenv').config();

const { Server } = require('ws');
const { updateJoint } = require('./lib/joints.cjs');
const { calculateIK, robotConfig } = require('./lib/inverseKinematics.cjs');
// const { planTrajectory } = require('./lib/motion/trajectory.cjs');
// const { trapezoidalProfile } = require('./lib/motion/trapezoidalProfile.cjs');

const wss = new Server({ port: process.env.NEXT_PUBLIC_SOCKET_PORT });

// Store current robot state
let currentState = {
    angles: [0, 0, 0], // Initial joint angles
    position: { x: 0, y: 0, z: 0 } // Initial end-effector position
};

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        try {
            const { type, payload } = JSON.parse(message);

            if (type === 'updateJoint') {
                // Direct joint update
                const newAngles = updateJoint(currentState, payload.angles);
                currentState.angles = newAngles;
                console.log('🟢___newAngles, updateJoint', newAngles);
                ws.send(JSON.stringify({ type: 'jointUpdate', payload: { angles: newAngles } }));
            } else if (type === 'updatePose') {
                // IK for pose
                const newAngles = calculateIK(payload.x, payload.y, payload.z, robotConfig);
                currentState.angles = newAngles;
                console.log('🟢___newAngles, updatePose', newAngles);
                ws.send(JSON.stringify({ type: 'poseUpdate', payload: { angles: newAngles } }));
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
        console.log('Client disconnected');
    });

    // Send initial state
    ws.send(JSON.stringify({
        type: 'init',
        payload: {
            state: currentState,
            config: robotConfig
        }
    }));
});

console.log(`WebSocket server running on ws://localhost:${process.env.NEXT_PUBLIC_SOCKET_PORT}`);