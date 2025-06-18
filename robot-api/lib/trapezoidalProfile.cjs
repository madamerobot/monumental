/**
 * Generates a simple trapezoidal motion profile for moving from q0 to q1.
 * Assumes there is always enough distance to accelerate, cruise at max speed, and decelerate.
 * Yields the position at each time step.
 * @param {number} q0 - Start position
 * @param {number} q1 - End position
 * @param {number} vmax - Max speed
 * @param {number} amax - Max acceleration
 * @param {number} [dt=0.05] - Time step (seconds)
 * @yields {number} The position at each time step
 */
function* trapezoidalProfile(q0, q1, vmax, amax, dt = 0.05) {
    // 1. Calculate total distance and direction
    const delta = Math.abs(q1 - q0);      // How far to move
    const sign = Math.sign(q1 - q0);      // +1 if moving up, -1 if moving down

    // 2. Calculate time and distance to accelerate to max speed
    const t_accel = vmax / amax;          // Time to reach max speed
    const d_accel = 0.5 * amax * t_accel ** 2; // Distance covered during acceleration

    // 3. Calculate time spent at constant speed (cruise)
    const d_const = delta - 2 * d_accel;  // Distance at constant speed
    const t_const = d_const / vmax;       // Time at constant speed

    // 4. Total time for the move
    const t_total = 2 * t_accel + t_const;

    // 5. For each time step, calculate and yield the position
    for (let t = 0; t <= t_total; t += dt) {
        let pos;
        if (t < t_accel) {
            // Acceleration phase
            pos = q0 + sign * 0.5 * amax * t ** 2;
        } else if (t < t_accel + t_const) {
            // Constant speed phase
            pos = q0 + sign * (d_accel + vmax * (t - t_accel));
        } else {
            // Deceleration phase
            const t_dec = t - t_accel - t_const;
            pos = q1 - sign * 0.5 * amax * (t_total - t) ** 2;
        }
        yield pos;
    }
}

module.exports = { trapezoidalProfile };