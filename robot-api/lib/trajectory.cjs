const { trapezoidalProfile } = require('./trapezoidalProfile.cjs');

/**
 * Plans a motion trajectory between two positions using a trapezoidal profile.
 * @param {number} from - The starting position
 * @param {number} to - The target position
 * @param {number} maxVelocity - The maximum velocity
 * @param {number} maxAcceleration - The maximum acceleration
 * @returns {object} An object containing the profile generator and direction
 */
function planTrajectory(from, to, maxVelocity, maxAcceleration) {
    const distance = Math.abs(to - from);
    const direction = to > from ? 1 : -1;
    const profile = trapezoidalProfile(from, to, maxVelocity, maxAcceleration);
    return { profile, direction };
}

module.exports = { planTrajectory };