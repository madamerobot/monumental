/**
 * Generates a sequence of intermediate joint angles for smooth motion
 * @param {Object} currentState - Current state of the robot { angles: { base: number, lift: number, elbow: number, wrist: number, gripper: number } }
 * @param {Object} targetAngles - Target angles for each joint
 * @param {Object} options - Motion parameters
 * @param {number} options.interval - Time between states in ms (default: 50)
 * @param {number} options.duration - Total duration of motion in ms (default: 1000)
 * @returns {Object[]} Array of states with timestamps and angles
 */
function returnMotionTrajectory(currentState, targetAngles, options = {}) {
    const {
        interval = 50,    // 50ms between states
        duration = 1000   // 1 second total duration
    } = options;

    console.log('🟡 Current State:', currentState.angles);
    console.log('🟡 Target Angles:', targetAngles);

    // Generate states at regular intervals
    const states = [];
    let currentTime = 0;

    // Add initial state
    states.push({
        timestamp: 0,
        angles: { ...currentState.angles }
    });

    // Generate intermediate states
    while (currentTime < duration) {
        currentTime += interval;

        // Calculate progress (0 to 1) with easing
        const progress = currentTime / duration;
        const easedProgress = easeInOutCubic(progress);

        const state = {
            timestamp: currentTime,
            angles: {}
        };

        // Interpolate each joint angle
        for (const [joint, targetAngle] of Object.entries(targetAngles)) {
            if (joint === 'position') {
                state.angles[joint] = targetAngles.position; // Copy position as is
                continue;
            }

            const currentAngle = currentState.angles[joint];
            // Linear interpolation with easing
            const interpolatedAngle = Math.round(currentAngle + (targetAngle - currentAngle) * easedProgress);
            state.angles[joint] = interpolatedAngle;

            // Debug log for first and last state
            if (currentTime === interval || currentTime >= duration - interval) {
                console.log(`🟡 ${joint} at ${currentTime}ms:`, {
                    current: currentAngle,
                    target: targetAngle,
                    progress: easedProgress,
                    interpolated: interpolatedAngle
                });
            }
        }

        states.push(state);
    }

    // Add final state
    states.push({
        timestamp: duration,
        angles: { ...targetAngles }
    });

    // Log first and last states
    console.log('🟡 First state:', states[0].angles);
    console.log('🟡 Last state:', states[states.length - 1].angles);

    return states;
}

/**
 * Cubic easing function for smooth acceleration and deceleration
 * @param {number} t - Progress from 0 to 1
 * @returns {number} Eased progress from 0 to 1
 */
function easeInOutCubic(t) {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

module.exports = { returnMotionTrajectory }; 