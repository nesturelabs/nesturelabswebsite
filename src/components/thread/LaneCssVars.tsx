"use client";

import { useEffect } from "react";
import { useLane } from "@/lib/thread/useLane";

/**
 * Writes the current lane as CSS custom properties on the root element, so
 * server-rendered sections can reserve the gutter with plain CSS
 * (`padding-left: var(--lane-pl)`) instead of becoming client components.
 * Sections ship with a static fallback (globals.css) that matches the
 * pre-thread static build; this only widens the gutter once the lane is
 * known on the client.
 */
export function LaneCssVars() {
  const lane = useLane();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--lane-w", `${lane.laneW}px`);
    root.style.setProperty("--lane-pl", `${lane.laneW}px`);
    root.style.setProperty("--lane-pr", lane.mobile ? "20px" : `${lane.laneW}px`);
  }, [lane]);

  return null;
}
