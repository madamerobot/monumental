export type WsCommand = {
    type: 'updateJoint' | 'updatePose' | 'updateGripper' | 'updateLift';
    payload: {
        joint?: string;
        x?: number;
        y?: number;
        z?: number;
    };
}