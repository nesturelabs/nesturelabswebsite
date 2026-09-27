import { buildPath, type PathPoint, type ThreadPath } from "./path";
import { getLaneSnapshot, subscribeLane, type Lane } from "./laneStore";

/**
 * One waypoint per section, in document order. This is the thread's spine —
 * the per-section hub/web/serpentine choreography described in the design
 * handoff (including the single left-to-right lane crossing, which the
 * spec places as a *horizontal wire above the Trusted section's tiles*, not
 * a diagonal through them) is a later "beats" pass, layered on top of this
 * path once the rig exists to walk it.
 *
 * `xFraction` is 0 (left lane) to 1 (right lane); mobile ignores it and
 * always uses the left lane. Every fraction is 0 for now — deliberately, not
 * an oversight: a plain diagonal crossing was tried and rejected. Spread
 * thin enough to respect rule 3 (no 150px scroll step may move the mascot
 * >~350px), it cuts straight through Trusted's heading and stat tiles,
 * violating rule 4. Spread thin enough to dodge rule 4, it violates rule 3.
 * The real design resolves this by having the mascot ride a horizontal wire
 * *above* the tiles during Trusted, not by moving the spine's x through the
 * section's own content band — that's section-aware beat logic, not
 * something a generic waypoint interpolation can do safely. Single-lane
 * throughout is safe now (every section already reserves both gutters) and
 * honest about what's not yet built.
 */
const SECTION_ANCHORS: { id: string; edge?: "top" | "bottom"; xFraction: number }[] = [
  // The hero anchor is the H1 itself, not #nl-hero's outer edge — the
  // section's own padding-top means its outer top sits right at the very
  // top of the page (≈0, indistinguishable from the nav origin), which is
  // useless both as a path waypoint and as the reduced-motion parked spot.
  { id: "nl-h1", xFraction: 0 },
  { id: "nl-services", xFraction: 0 },
  { id: "nl-trusted", xFraction: 0 },
  { id: "nl-why", xFraction: 0 },
  { id: "nl-process", xFraction: 0 },
  { id: "nl-results", xFraction: 0 },
  { id: "nl-portfolio", xFraction: 0 },
  { id: "nl-testi", xFraction: 0 },
  { id: "nl-stack", xFraction: 0 },
  { id: "nl-faq", xFraction: 0 },
  { id: "nl-cta", xFraction: 0 },
  { id: "nl-footer", xFraction: 0 },
];

const NAV_ORIGIN_Y = 40;

function measureDocY(id: string, edge: "top" | "bottom"): number | null {
  const el = document.getElementById(id);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return (edge === "top" ? rect.top : rect.bottom) + window.scrollY;
}

function buildWaypoints(lane: Lane): PathPoint[] {
  const pts: PathPoint[] = [[lane.LX, NAV_ORIGIN_Y]];
  for (const anchor of SECTION_ANCHORS) {
    const edge = anchor.edge ?? "top";
    const y = measureDocY(anchor.id, edge);
    if (y == null) continue;

    const x = lane.mobile ? lane.LX : lane.LX + (lane.RX - lane.LX) * anchor.xFraction;
    pts.push([x, y]);
  }
  return pts;
}

// Placeholder until the first real measurement — near-origin and tiny, so
// anything that reads it before `ready` is a bug, not a plausible position.
let current: ThreadPath = buildPath([
  [0, 0],
  [0, 2],
]);
let ready = false;
const listeners = new Set<() => void>();

export function rebuildThreadPath() {
  if (typeof window === "undefined") return;
  const lane = getLaneSnapshot();
  current = buildPath(buildWaypoints(lane));
  ready = true;
  listeners.forEach((l) => l());
}

export function subscribeThreadPath(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Distance-along-path of the hero anchor (waypoint index 1, right after the
 * nav origin at index 0) — the reduced-motion parked position. Reads it off
 * the already-built path instead of re-measuring the DOM independently, so
 * it can never disagree with where the hero waypoint actually is.
 */
export function getHeroAnchorD(): number {
  return current.cum[1] ?? 0;
}

export function getThreadPathSnapshot(): ThreadPath {
  return current;
}

/**
 * False until the path has been built from real DOM measurements at least
 * once. A continuous-rAF consumer (the rig) MUST gate on this — polling the
 * placeholder path during the settle wait computes real-looking positions
 * from garbage coordinates, and a "stance foot never slides" lock would
 * then freeze onto that garbage until its next gait cycle.
 */
export function isThreadPathReady(): boolean {
  return ready;
}

let initialized = false;
let scheduledRaf: number | null = null;

function scheduleRebuild() {
  if (scheduledRaf != null) return;
  scheduledRaf = requestAnimationFrame(() => {
    scheduledRaf = null;
    rebuildThreadPath();
  });
}

/**
 * Idempotent: safe to call from every consumer's mount effect. Only the
 * first call wires up the settle-wait, resize and mutation observers.
 */
export function initThreadPath() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  // Never measure a settling DOM: wait for the same non-zero width on two
  // consecutive checks before the first authoritative layout.
  let lastWidth = -1;
  let stableChecks = 0;
  function waitForStableLayout() {
    const w = document.documentElement.clientWidth;
    stableChecks = w > 0 && w === lastWidth ? stableChecks + 1 : 0;
    lastWidth = w;
    if (stableChecks >= 2) {
      rebuildThreadPath();
      return;
    }
    setTimeout(waitForStableLayout, 120);
  }
  waitForStableLayout();

  subscribeLane(scheduleRebuild);
  window.addEventListener("resize", scheduleRebuild, { passive: true });
  const ro = new ResizeObserver(scheduleRebuild);
  ro.observe(document.body);
}
