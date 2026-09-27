export interface Vec2 {
  x: number;
  y: number;
}

// Locked rig maths — do not alter (design/design_handoff.../README.md, "The rig").
export const FEMUR = 44;
export const TIBIA = 46;
export const STRIDE = 96; // "C"

const HIP_LOCAL_LEFT: Array<[number, number]> = [
  [-26, -16],
  [-30, -4],
  [-30, 10],
  [-26, 22],
];
const FOOT_LOCAL_LEFT: Array<[number, number]> = [
  [-70, -86],
  [-100, -38],
  [-97, 33],
  [-68, 78],
];
// Group B legs are offset by 0.5 phase from group A, producing the
// alternating-tetrapod gait. Indices are over the 8-leg array below
// (0-3 = left legs, 4-7 = mirrored right legs).
const GROUP_B = new Set([1, 3, 4, 6]);

export interface LegSpec {
  /** Hip attachment point, body-local space (pre-scale/rotate/translate). */
  hip: Vec2;
  /** Neutral standing foot position, body-local space. */
  footNeutral: Vec2;
  /** -1 = left (knee bends left/outward), 1 = right. Also the mirror side. */
  side: -1 | 1;
  phaseOffset: number;
}

export const LEGS: LegSpec[] = Array.from({ length: 8 }, (_, i) => {
  const localIndex = i % 4;
  const isRight = i >= 4;
  const [hx, hy] = HIP_LOCAL_LEFT[localIndex];
  const [fx, fy] = FOOT_LOCAL_LEFT[localIndex];
  return {
    hip: { x: isRight ? -hx : hx, y: hy },
    footNeutral: { x: isRight ? -fx : fx, y: fy },
    side: isRight ? 1 : -1,
    phaseOffset: GROUP_B.has(i) ? 0.5 : 0,
  };
});

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

/**
 * Two-bone analytic IK (law of cosines). `hip` and `foot` are in the same
 * (world) space; returns the knee in that space. `side` picks which way the
 * knee bends, so knees always point outward from the body.
 * Reach is clamped to [|femur-tibia|+0.5, femur+tibia-0.5] before `acos` —
 * without it, an over-extended or over-folded target produces NaN.
 */
export function solveKnee(hip: Vec2, foot: Vec2, side: -1 | 1, femur = FEMUR, tibia = TIBIA): Vec2 {
  const dx = foot.x - hip.x;
  const dy = foot.y - hip.y;
  const rawReach = Math.hypot(dx, dy);
  const reach = clamp(rawReach, Math.abs(femur - tibia) + 0.5, femur + tibia - 0.5);
  const baseAngle = Math.atan2(dy, dx);
  const cosHipAngle = clamp((femur * femur + reach * reach - tibia * tibia) / (2 * femur * reach), -1, 1);
  const hipAngle = Math.acos(cosHipAngle);
  const kneeAngle = baseAngle + side * hipAngle;
  return {
    x: hip.x + Math.cos(kneeAngle) * femur,
    y: hip.y + Math.sin(kneeAngle) * femur,
  };
}

/** Phase = (d / C + offset) mod 1, wrapped positive. <0.5 stance, >=0.5 swing. */
export function gaitPhase(d: number, phaseOffset: number): number {
  const v = ((d / STRIDE + phaseOffset) % 1) + 1;
  return v % 1;
}

export function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/** Shortest signed angular distance from `current` to `target`, in radians. */
export function shortestAngleDiff(target: number, current: number): number {
  const twoPi = Math.PI * 2;
  let diff = (target - current) % twoPi;
  if (diff > Math.PI) diff -= twoPi;
  if (diff < -Math.PI) diff += twoPi;
  return diff;
}

export function rotateVec(v: Vec2, angle: number): Vec2 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: v.x * c - v.y * s, y: v.x * s + v.y * c };
}
