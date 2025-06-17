import { inverse } from 'kinematics-js';

export function calculateIK(x: number, y: number, z: number, config: any) {
    // Returns joint angles for a given pose
    const [base, shoulder, elbow, wrist] = inverse(x, y, z, 0, 0, 0, config);
    return { base, shoulder, elbow, wrist };
}