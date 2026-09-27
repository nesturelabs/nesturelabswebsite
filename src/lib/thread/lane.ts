export interface Lane {
  /** Width of the reserved gutter the thread travels in. */
  laneW: number;
  /** Left lane centre. */
  LX: number;
  /** Right lane centre. */
  RX: number;
  mobile: boolean;
  /** Base rig scale for this viewport (before any per-section beat override). */
  rigScale: number;
}

const MOBILE_BREAKPOINT = 760;
// Responsive table (design/design_handoff.../README.md): laneW/rigScale are
// tuned together so the rig's ~±95px footprint always fits the lane with
// margin. Confirmed against the running prototype at 390px width — its
// computed #nl-hero padding-left is genuinely 112px, and the hero H1 wraps
// cleanly around it, so this is not a placeholder.
const MOBILE_LANE = 112;
const MOBILE_RIG_SCALE = 0.4;
const LANE_MIN = 150;
const LANE_MAX = 230;
const SCALE_AT_LANE_MIN = 0.6;
const SCALE_AT_LANE_MAX = 0.9;

/**
 * Desktop: laneW = clamp(round((W - 760) / 2), 150, 230), rigScale linearly
 * interpolated between the table's documented endpoints (150px -> 0.60,
 * 230px -> 0.90). Mobile: fixed 112px / 0.40, per the table's mobile row.
 */
export function computeLane(width: number): Lane {
  const mobile = width < MOBILE_BREAKPOINT;
  if (mobile) {
    const laneW = MOBILE_LANE;
    const LX = Math.round(laneW / 2);
    return { laneW, LX, RX: width - LX, mobile, rigScale: MOBILE_RIG_SCALE };
  }
  const laneW = Math.min(LANE_MAX, Math.max(LANE_MIN, Math.round((width - MOBILE_BREAKPOINT) / 2)));
  const LX = Math.round(laneW / 2);
  const t = (laneW - LANE_MIN) / (LANE_MAX - LANE_MIN);
  const rigScale = SCALE_AT_LANE_MIN + (SCALE_AT_LANE_MAX - SCALE_AT_LANE_MIN) * t;
  return { laneW, LX, RX: width - LX, mobile, rigScale };
}
