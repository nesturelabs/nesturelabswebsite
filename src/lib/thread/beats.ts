export function easeOutCubic(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - c, 3);
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export interface HoldZone {
  /** Document-Y where the ramp into the hold begins. */
  rampInStart: number;
  /** Document-Y where the ramp into the hold completes (full hold). */
  rampInEnd: number;
  /** Document-Y where the ramp out of the hold begins. */
  rampOutStart: number;
  /** Document-Y where the ramp out of the hold completes (back to normal). */
  rampOutEnd: number;
}

/**
 * holdF = easeOut(rampIn * (1 - rampOut)), 0..1.
 * Rises smoothly entering the zone, sits at (or near) 1 through the flat
 * middle, and eases back to 0 leaving it — continuous at both edges so nothing
 * pops when the hold engages or releases.
 */
export function computeHoldF(playY: number, zone: HoldZone): number {
  const rampIn = clamp01((playY - zone.rampInStart) / Math.max(1, zone.rampInEnd - zone.rampInStart));
  const rampOut = clamp01((playY - zone.rampOutStart) / Math.max(1, zone.rampOutEnd - zone.rampOutStart));
  return easeOutCubic(rampIn * (1 - rampOut));
}
