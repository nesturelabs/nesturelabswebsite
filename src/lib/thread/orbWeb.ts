export interface OrbWeb {
  cx: number;
  cy: number;
  R: number;
  hub: number;
  ang: number[];
  anchor: [number, number][];
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function polyPath(pts: [number, number][]): string {
  return "M" + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L");
}

/**
 * cx/cy/R come from the caller already fitted to the lane (the reference
 * design's wide corridor gave the orb room to spread ~2.4R in every
 * direction; our lane is ~230px wide at most, so R here is deliberately
 * small — geometry algorithm ported closely, footprint re-sized to fit).
 */
export function buildOrbWeb(cx: number, cy: number, R: number, radialCount: number): OrbWeb {
  const hub = R * 0.12;
  let seed = 7321;
  const rn = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const ang: number[] = [];
  const anchor: [number, number][] = [];
  for (let i = 0; i < radialCount; i++) {
    const a = (i / radialCount) * Math.PI * 2 - Math.PI / 2 + (rn() - 0.5) * 0.12;
    ang.push(a);
    const rr = R * (0.92 + rn() * 0.1);
    anchor.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
  }
  return { cx, cy, R, hub, ang, anchor };
}

export function bridgePathD(w: OrbWeb): string {
  return polyPath([
    [w.cx - w.R * 0.55, w.cy - w.R * 1.05],
    [w.cx + w.R * 0.5, w.cy - w.R * 0.92],
  ]);
}

export function yFramePathD(w: OrbWeb): string {
  return polyPath([
    [w.cx - w.R * 0.36, w.cy - w.R * 0.98],
    [w.cx, w.cy],
    [w.cx + w.R * 0.34, w.cy - w.R * 0.9],
  ]);
}

export function yStemPathD(w: OrbWeb): string {
  return polyPath([
    [w.cx, w.cy],
    [w.cx, w.cy + w.R * 1.05],
  ]);
}

export function frameOutlinePathD(w: OrbWeb): string {
  const pts: [number, number][] = w.ang.map((a, i) => {
    const rr = w.R * (1.04 + (i % 3) * 0.012);
    return [w.cx + Math.cos(a) * rr, w.cy + Math.sin(a) * rr];
  });
  return polyPath(pts) + "Z";
}

export function radialPathD(w: OrbWeb, i: number): string {
  const a = w.ang[i];
  const hx = w.cx + Math.cos(a) * w.hub;
  const hy = w.cy + Math.sin(a) * w.hub;
  return polyPath([
    [hx, hy],
    w.anchor[i],
  ]);
}

export function auxSpiralPathD(w: OrbWeb, loops = 2.6, steps = 90): string {
  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = -Math.PI / 2 + t * Math.PI * 2 * loops;
    const rr = lerp(w.hub + 4, w.R * 0.78, t);
    pts.push([w.cx + Math.cos(a) * rr, w.cy + Math.sin(a) * rr]);
  }
  return polyPath(pts);
}

export interface CaptureSpiral {
  d: string;
  nodes: { x: number; y: number; t: number }[];
}

export function captureSpiralPathD(w: OrbWeb, loops = 5, stepsPerLoop = 22): CaptureSpiral {
  const steps = Math.round(loops * stepsPerLoop);
  const pts: [number, number][] = [];
  const nodes: { x: number; y: number; t: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = -Math.PI / 2 - t * Math.PI * 2 * loops;
    const rr = lerp(w.R * 0.9, w.hub + 8, t);
    const x = w.cx + Math.cos(a) * rr;
    const y = w.cy + Math.sin(a) * rr;
    pts.push([x, y]);
    if (i % 5 === 0) nodes.push({ x, y, t });
  }
  return { d: polyPath(pts), nodes };
}

export interface BugFlight {
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  a: number;
  impactAt: number;
}

/**
 * Bugs fly in mostly vertically (from above/below the hub, within the lane)
 * rather than radiating in all directions — the reference's R*2.4 radial
 * fly-in works in a wide corridor, but a bug approaching from the content
 * side in our narrow lane would cross straight over the service cards.
 */
export function buildBugFlights(cx: number, cy: number, R: number, n: number): BugFlight[] {
  const out: BugFlight[] = [];
  for (let i = 0; i < n; i++) {
    const fromAbove = i % 2 === 0;
    const spread = n > 1 ? (i - (n - 1) / 2) / n : 0; // roughly -0.5..0.5
    const jitterX = spread * R * 0.7;
    const sx = cx + jitterX;
    const sy = cy + (fromAbove ? -R * 2.7 : R * 2.7);
    const targetA = Math.atan2(fromAbove ? -1 : 1, spread * 1.4 || 0.001);
    const tx = cx + Math.cos(targetA) * R * 0.6;
    const ty = cy + Math.sin(targetA) * R * 0.6;
    out.push({ sx, sy, tx, ty, a: targetA, impactAt: 0.16 + i * (0.7 / Math.max(1, n)) });
  }
  return out;
}
