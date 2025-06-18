const { createRequire } = require('module');
const { InverseKinematics } = createRequire(require.resolve('kinematics-js/dist/cjs'));

// Robot configuration
const robotConfig = {
    // Example configuration for a 3-DOF robot
    links: [
        { length: 100, minAngle: -90, maxAngle: 90 },
        { length: 100, minAngle: -90, maxAngle: 90 },
        { length: 100, minAngle: -90, maxAngle: 90 }
    ]
};

/**
 * Calculate inverse kinematics for a given end-effector position
 * @param {number} x - X coordinate of target position
 * @param {number} y - Y coordinate of target position
 * @param {number} z - Z coordinate of target position
 * @param {Object} config - Robot configuration
 * @returns {Object} Joint angles
 */
function calculateIK(x, y, z, config) {
    try {
        // Create IK solver instance
        const ik = new InverseKinematics(config);
        // Solve for joint angles
        const result = ik.solve([x, y, z]);
        return result;
    } catch (error) {
        console.error('Error in inverse kinematics calculation:', error);
        throw error;
    }
}

module.exports = {
    calculateIK,
    robotConfig
};