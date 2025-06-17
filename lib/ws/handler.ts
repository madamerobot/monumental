import { calculateIK } from '../motion/inversekinetics';
import { updateJoint } from '../motion/joints';
import { planTrajectory } from '../motion/trajectory';

type handleWSMessageProps = {
    ws: WebSocket;
    message: string;
    robotConfig: any;
    currentState: any;
}

export async function handleWSMessage({ ws, message, robotConfig, currentState }: handleWSMessageProps) {
    const { type, payload } = JSON.parse(message);

    if (type === 'updateJoint') {
        // Direct joint update
        const newAngles = updateJoint(currentState, payload.angles);
        // Plan and stream trajectory for each joint
        // (implement your streaming logic here)
    } else if (type === 'updatePose') {
        // IK for pose
        const newAngles = calculateIK(payload.x, payload.y, payload.z, robotConfig);
        // Plan and stream trajectory for each joint
        // (implement your streaming logic here)
    }
    // Send updates over ws.send(...)
}