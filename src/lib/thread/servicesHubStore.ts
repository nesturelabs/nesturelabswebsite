import type { HoldZone } from "./beats";

export interface ServicesHubState {
  ready: boolean;
  /**
   * Only the hold-timing zone is shared with the rig now — NOT a target
   * document position. The rig doesn't blend toward a fixed "hub" (that
   * formula can't guarantee monotonicity for any smooth ramp — see
   * SpiderRig's playhead accumulator); it just slows to (1 - holdF) speed
   * and settles wherever that leaves it. The web's own on-screen position
   * is this component's own concern (HUB_LOCAL_Y), not the rig's.
   */
  zone: HoldZone;
}

let current: ServicesHubState = {
  ready: false,
  zone: { rampInStart: 0, rampInEnd: 0, rampOutStart: 0, rampOutEnd: 0 },
};

const listeners = new Set<() => void>();

export function setServicesHub(next: ServicesHubState) {
  current = next;
  listeners.forEach((l) => l());
}

export function getServicesHub(): ServicesHubState {
  return current;
}

export function subscribeServicesHub(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
