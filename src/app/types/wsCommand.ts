export type WsCommand = {
    type: 'updateJoint' | 'updatePose' | 'updateGripper' | 'updateLift';
    payload: {
        // For updateJoint: full robot state with all joint angles
        base?: number;
        lift?: number;
        elbow?: number;
        wrist?: number;
        gripper?: number;
        // For updatePose: x, y, z coordinates
        x?: number;
        y?: number;
        z?: number;
    };
}