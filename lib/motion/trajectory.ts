import { trapezoidalProfile } from './trapezoidalProfile';

export function planTrajectory(from: number, to: number, maxVelocity: number, maxAcceleration: number) {
    const distance = Math.abs(to - from);
    const direction = to > from ? 1 : -1;
    const profile = trapezoidalProfile(from, to, maxVelocity, maxAcceleration);
    return { profile, direction };
}