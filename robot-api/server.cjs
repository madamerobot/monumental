require('dotenv').config();

const { Server } = require('ws');
const { moveRobot } = require('./lib/robotControl.cjs');
const { returnMotionTrajectory } = require('./lib/motionTrajectory.cjs');

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
    position: { x: 0, y: 0, z: 0 }
};

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        try {
            const { type, payload } = JSON.parse(message);

            if (type === 'updateJoint') {
                // Generate motion trajectory
                const trajectory = returnMotionTrajectory(currentState, payload.angles);

                // Update current state with final position
                currentState.angles = trajectory[trajectory.length - 1].angles;

                console.log('🟢___Trajectory generated:', trajectory.length, 'states');
                console.log('🟢___First state:', trajectory[0].angles);
                console.log('🟢___Last state:', trajectory[trajectory.length - 1].angles);

                // Send the entire trajectory to the client
                ws.send(JSON.stringify({
                    type: 'jointUpdate',
                    payload: {
                        trajectory,
                        finalAngles: currentState.angles
                    }
                }));
            } else if (type === 'updatePose') {
                // Calculate IK for the target position
                const targetAngles = moveRobot(payload);

                // Generate motion trajectory
                const trajectory = returnMotionTrajectory(currentState, targetAngles);

                // Update current state
                currentState.angles = trajectory[trajectory.length - 1].angles;
                currentState.position = payload;

                console.log('🟢___Trajectory generated for pose:', trajectory.length, 'states');
                console.log('🟢___First state:', trajectory[0].angles);
                console.log('🟢___Last state:', trajectory[trajectory.length - 1].angles);

                // Send the trajectory to the client
                ws.send(JSON.stringify({
                    type: 'poseUpdate',
                    payload: {
                        trajectory,
                        finalAngles: currentState.angles,
                        position: currentState.position
                    }
                }));
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
        payload: { state: currentState }
    }));
});

console.log(`WebSocket server running on ws://localhost:${process.env.NEXT_PUBLIC_SOCKET_PORT}`);