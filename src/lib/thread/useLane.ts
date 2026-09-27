"use client";

import { useSyncExternalStore } from "react";
import { getLaneServerSnapshot, getLaneSnapshot, subscribeLane } from "./laneStore";

export function useLane() {
  return useSyncExternalStore(subscribeLane, getLaneSnapshot, getLaneServerSnapshot);
}
