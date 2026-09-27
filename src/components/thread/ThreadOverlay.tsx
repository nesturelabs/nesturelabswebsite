"use client";

import { useEffect, useRef } from "react";
import type { ThreadPath } from "@/lib/thread/path";
import { getThreadPathSnapshot, initThreadPath, subscribeThreadPath } from "@/lib/thread/threadPathStore";
import { SpiderRig } from "./SpiderRig";

const HOT_WINDOW = 260;
const HOT_STEP = 12;

function subPathString(path: ThreadPath, dEnd: number, windowLen: number, step: number): string {
  const dStart = Math.max(0, dEnd - windowLen);
  if (dEnd <= 0) return "";
  const parts: string[] = [];
  for (let s = dStart; s < dEnd; s += step) {
    const p = path.at(s);
    parts.push(`${p.x.toFixed(1)} ${p.y.toFixed(1)}`);
  }
  const end = path.at(dEnd);
  parts.push(`${end.x.toFixed(1)} ${end.y.toFixed(1)}`);
  return "M" + parts.join("L");
}

export function ThreadOverlay() {
  const svgRef = useRef<SVGSVGElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const hotRef = useRef<SVGPathElement>(null);
  const rafRef = useRef<number | null>(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = media.matches;

    function update() {
      const path = getThreadPathSnapshot();
      if (!path || path.len <= 0) return;

      if (reducedRef.current) {
        // Static: fully drawn, no hot window, no walking.
        if (trailRef.current) trailRef.current.style.strokeDashoffset = "0";
        return;
      }

      const playY = window.scrollY + window.innerHeight * 0.5;
      const d = path.dAtY(playY);

      if (trailRef.current) {
        trailRef.current.style.strokeDashoffset = String(path.len - d);
      }
      if (hotRef.current) {
        hotRef.current.setAttribute("d", subPathString(path, d, HOT_WINDOW, HOT_STEP));
      }
    }

    function draw() {
      const path = getThreadPathSnapshot();
      if (svgRef.current) {
        svgRef.current.setAttribute("height", String(document.documentElement.scrollHeight));
      }
      if (trailRef.current) {
        trailRef.current.setAttribute("d", path.d);
        trailRef.current.style.strokeDasharray = reducedRef.current ? "" : String(path.len);
      }
      if (hotRef.current) {
        hotRef.current.style.display = reducedRef.current ? "none" : "";
      }
      update();
    }

    function onScroll() {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    }

    initThreadPath();
    draw();
    const unsubscribe = subscribeThreadPath(draw);
    const onReducedChange = () => {
      reducedRef.current = media.matches;
      draw();
    };
    media.addEventListener("change", onReducedChange);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      unsubscribe();
      media.removeEventListener("change", onReducedChange);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-[1] w-full overflow-visible"
    >
      <path ref={trailRef} fill="none" stroke="#E50914" strokeWidth={1.1} strokeLinecap="round" opacity={0.25} />
      <path ref={hotRef} fill="none" stroke="#FF2323" strokeWidth={1.2} strokeLinecap="round" opacity={0.9} />
      <SpiderRig />
    </svg>
  );
}
