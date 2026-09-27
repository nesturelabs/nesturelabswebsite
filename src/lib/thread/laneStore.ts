import { computeLane, type Lane } from "./lane";

export type { Lane };

const DESKTOP_DEFAULT_WIDTH = 1440;

// Must be a stable reference — useSyncExternalStore re-invokes the snapshot
// getter on every render and warns (risking an infinite loop) if a static
// snapshot's identity changes each call.
const SERVER_SNAPSHOT: Lane = computeLane(DESKTOP_DEFAULT_WIDTH);

let current: Lane = SERVER_SNAPSHOT;
const listeners = new Set<() => void>();
let initialized = false;
let rafId: number | null = null;

function recompute() {
  const next = computeLane(window.innerWidth);
  if (next.laneW !== current.laneW || next.mobile !== current.mobile || next.RX !== current.RX) {
    current = next;
    listeners.forEach((l) => l());
  }
}

function onResize() {
  if (rafId != null) return;
  rafId = requestAnimationFrame(() => {
    rafId = null;
    recompute();
  });
}

function ensureInit() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  recompute();
  window.addEventListener("resize", onResize, { passive: true });
}

export function subscribeLane(listener: () => void) {
  ensureInit();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getLaneSnapshot(): Lane {
  ensureInit();
  return current;
}

export function getLaneServerSnapshot(): Lane {
  return SERVER_SNAPSHOT;
}
