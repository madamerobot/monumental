export interface RobotState {
    base: number;
    lift: number;
    elbow: number;
    wrist: number;
    gripper: number;
    position: {
        x: number;
        y: number;
        z: number;
    }
}