import { inverseKinematics } from "ts-kinematics";

export interface RobotConfig {
    base?: number;
    v1: number;
    v2: number;
    v3: number;
    v4: number;
    v5: number;
    v6: number;
    flip?: boolean;
}

type IKResult = {
    base: number;
    shoulder: number;
    elbow: number;
    wrist: number;
}

export function calculateIK(
    x: number,
    y: number,
    z: number,
    config: RobotConfig,
): IKResult {
    // Call the ts-kinematics inverseKinematics function
    const [theta1, theta2, theta3, theta4] = inverseKinematics({
        x,
        y,
        z,
        r1: 0, // orientation angles, set to 0 as not needed
        r2: 0, // orientation angles, set to 0 as not needed
        r3: 0, // orientation angles, set to 0 as not needed
        config,
    });

    return {
        base: theta1,
        shoulder: theta2,
        elbow: theta3,
        wrist: theta4,
    };
}