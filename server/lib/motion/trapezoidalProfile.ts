/**
 * Simple trapezoidal motion profile generator.
 * Assumes the move is long enough to reach max speed (no triangular case).
 * Yields the position at each time step.
 */
export function* trapezoidalProfile(
    q0: number,         // Start position
    q1: number,         // End position
    vmax: number,       // Max speed
    amax: number,       // Max acceleration
    dt: number = 0.05   // Time step (seconds)
) {
    const delta = Math.abs(q1 - q0);      // Total distance to move
    const sign = Math.sign(q1 - q0);      // Direction (+1 or -1)

    // Time to accelerate to vmax
    const t_accel = vmax / amax;
    // Distance covered during acceleration
    const d_accel = 0.5 * amax * t_accel ** 2;

    // Time at constant speed
    const d_const = delta - 2 * d_accel;
    const t_const = d_const / vmax;

    // Total time for the move
    const t_total = 2 * t_accel + t_const;

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