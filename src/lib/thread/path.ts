export type PathPoint = [number, number];

export interface ThreadPath {
  pts: PathPoint[];
  len: number;
  cum: number[];
  /** Point + heading at distance `d` along the path. */
  at(d: number): { x: number; y: number; angle: number };
  /** Distance along the path at document-Y `y`. The path is monotonic in y,
   * so this maps a scroll position to exactly one point — the entire
   * continuity mechanism the mascot will ride on. */
  dAtY(y: number): number;
  /** SVG path `d` attribute for the polyline through `pts`. */
  d: string;
}

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Forces each point at least `minStep` below the previous one. Required so
 * `dAtY` can map a scroll position to exactly one point — without this, two
 * waypoints at (or near) the same y would make the lookup ambiguous.
 */
function enforceMonotonicY(points: PathPoint[], minStep = 2): PathPoint[] {
  const out: PathPoint[] = [];
  let prevY = -Infinity;
  for (const [x, y] of points) {
    const fixedY = Math.max(y, prevY + minStep);
    out.push([x, fixedY]);
    prevY = fixedY;
  }
  return out;
}

export function buildPath(rawPoints: PathPoint[]): ThreadPath {
  const pts = enforceMonotonicY(rawPoints);
  const cum: number[] = [0];
  for (let i = 1; i < pts.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  }
  const len = cum[cum.length - 1] ?? 0;

  function at(d: number) {
    if (pts.length === 0) return { x: 0, y: 0, angle: 0 };
    if (pts.length === 1) return { x: pts[0][0], y: pts[0][1], angle: 0 };
    d = clamp(d, 0, len);
    let i = 1;
    while (i < cum.length - 1 && cum[i] < d) i++;
    const segLen = Math.max(1e-6, cum[i] - cum[i - 1]);
    const t = (d - cum[i - 1]) / segLen;
    const a = pts[i - 1];
    const b = pts[i];
    return {
      x: lerp(a[0], b[0], t),
      y: lerp(a[1], b[1], t),
      angle: Math.atan2(b[1] - a[1], b[0] - a[0]),
    };
  }

  function dAtY(y: number) {
    if (pts.length === 0) return 0;
    if (y <= pts[0][1]) return 0;
    if (y >= pts[pts.length - 1][1]) return len;
    let i = 1;
    while (i < pts.length - 1 && pts[i][1] < y) i++;
    const segY = Math.max(1e-6, pts[i][1] - pts[i - 1][1]);
    const t = (y - pts[i - 1][1]) / segY;
    return cum[i - 1] + (cum[i] - cum[i - 1]) * t;
  }

  const d = pts.length ? "M" + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L") : "";

  return { pts, len, cum, at, dAtY, d };
}
