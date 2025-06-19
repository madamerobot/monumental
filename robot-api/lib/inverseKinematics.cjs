// Robot configuration based on the 3D model structure
const robotConfig = {
    baseHeight: 0,      // Base height
    shoulderLength: 2.872,  // Shoulder to elbow (Bone002_02)
    forearmLength: 3.064,   // Elbow to wrist (Bone003_03)
    wristLength: 4.2,       // Wrist to end effector (Bone004_04)
};

/**
 * Calculate inverse kinematics for a given end-effector position
 * @param {Object} currentState - Current robot state
 * @param {Object} targetPosition - Target position {x, y, z}
 * @returns {Object} Calculated joint angles
 */
function returnInverseKinematics(currentState, targetPosition) {
    try {
        const { x, y, z } = targetPosition;
        const { baseHeight, shoulderLength, forearmLength, wristLength } = robotConfig;

        // Calculate base rotation (yaw) from x,y coordinates
        const baseAngle = Math.atan2(y, x) * (180 / Math.PI);

        // Calculate distance from base to target in XY plane
        const xyDistance = Math.sqrt(x * x + y * y);

        // Adjust Z for base height
        const adjustedZ = z - baseHeight;

        // Calculate target position relative to shoulder
        const targetDistance = Math.sqrt(xyDistance * xyDistance + adjustedZ * adjustedZ);

        // Check if target is reachable
        const maxReach = shoulderLength + forearmLength + wristLength;
        const minReach = Math.abs(shoulderLength - forearmLength - wristLength);

        if (targetDistance > maxReach || targetDistance < minReach) {
            console.warn('Target position not reachable:', targetPosition);
            return {
                base: currentState.angles.base,
                lift: currentState.angles.lift,
                elbow: currentState.angles.elbow,
                wrist: currentState.angles.wrist
            };
        }

        // Calculate shoulder and elbow angles using cosine law
        const cosShoulder = (shoulderLength * shoulderLength + targetDistance * targetDistance - forearmLength * forearmLength) / (2 * shoulderLength * targetDistance);
        const cosElbow = (shoulderLength * shoulderLength + forearmLength * forearmLength - targetDistance * targetDistance) / (2 * shoulderLength * forearmLength);

        // Clamp cosine values to valid range
        const clampedCosShoulder = Math.max(-1, Math.min(1, cosShoulder));
        const clampedCosElbow = Math.max(-1, Math.min(1, cosElbow));

        // Calculate angles
        const shoulderAngle = Math.acos(clampedCosShoulder) * (180 / Math.PI);
        const elbowAngle = Math.acos(clampedCosElbow) * (180 / Math.PI);

        // Calculate lift angle (shoulder angle relative to horizontal)
        const liftAngle = Math.atan2(adjustedZ, xyDistance) * (180 / Math.PI) + shoulderAngle;

        // Calculate wrist angle to maintain end-effector orientation
        const wristAngle = -liftAngle - elbowAngle;

        // Validate and clamp angles
        const angles = {
            base: validateAngle(baseAngle, -180, 180),
            lift: validateAngle(liftAngle, -90, 90),
            elbow: validateAngle(elbowAngle, -90, 90),
            wrist: validateAngle(wristAngle, -90, 90)
        };

        console.log('IK Solution:', {
            target: targetPosition,
            angles: angles
        });

        return angles;

    } catch (error) {
        console.error('IK calculation error:', error);
        return {
            base: currentState.angles.base,
            lift: currentState.angles.lift,
            elbow: currentState.angles.elbow,
            wrist: currentState.angles.wrist
        };
    }
}

/**
 * Validate and clamp angle to joint limits
 * @param {number} angle - Angle in degrees
 * @param {number} minAngle - Minimum angle in degrees
 * @param {number} maxAngle - Maximum angle in degrees
 * @returns {number} Validated angle in degrees
 */
function validateAngle(angle, minAngle, maxAngle) {
    // Clamp to joint limits
    const clamped = Math.max(minAngle, Math.min(maxAngle, angle));

    // Normalize to -180 to 180 range
    return ((clamped + 180) % 360 + 360) % 360 - 180;
}

module.exports = { returnInverseKinematics };
