"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  buildOrbWeb,
  bridgePathD,
  yFramePathD,
  yStemPathD,
  frameOutlinePathD,
  radialPathD,
  auxSpiralPathD,
  captureSpiralPathD,
  buildBugFlights,
  type OrbWeb,
  type BugFlight,
} from "@/lib/thread/orbWeb";
import { setServicesHub } from "@/lib/thread/servicesHubStore";
import type { HoldZone } from "@/lib/thread/beats";
import { getLaneSnapshot } from "@/lib/thread/laneStore";

const RADIAL_COUNT = 8;
const RAMP = 260;
/** Must match the `top` value on the sticky container below. */
const STICKY_TOP = 84;

function seg(p: number, a: number, b: number) {
  if (p <= a) return 0;
  if (p >= b) return 1;
  return (p - a) / (b - a);
}
function easeOutCubic(t: number) {
  const c = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - c, 3);
}

interface PathEl {
  el: SVGPathElement | null;
  len: number;
}

export function ServicesBeat({ serviceCount, children }: { serviceCount: number; children: ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const bridge = useRef<PathEl>({ el: null, len: 0 });
  const yFrame = useRef<PathEl>({ el: null, len: 0 });
  const yStem = useRef<PathEl>({ el: null, len: 0 });
  const frame = useRef<PathEl>({ el: null, len: 0 });
  const radials = useRef<PathEl[]>([]);
  const aux = useRef<PathEl>({ el: null, len: 0 });
  const capture = useRef<PathEl>({ el: null, len: 0 });
  const nodeGroupRef = useRef<SVGGElement>(null);
  const rippleRef = useRef<SVGCircleElement>(null);
  const bugGroupRefs = useRef<Array<SVGGElement | null>>([]);

  const webRef = useRef<OrbWeb | null>(null);
  const bugsRef = useRef<BugFlight[]>([]);
  const nodesRef = useRef<{ x: number; y: number; t: number }[]>([]);
  const rafRef = useRef<number | null>(null);
  const pinZoneRef = useRef<{ start: number; end: number }>({ start: 0, end: 1 });

  useEffect(() => {
    // Rule 7: under reduced motion the page must read as a normal site — no
    // pin, no 900px dwell, no scroll-gated reveal. Release the sticky hold
    // and show every card immediately instead of wiring up the beat at all.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (stickyRef.current) stickyRef.current.style.position = "static";
      if (spacerRef.current) spacerRef.current.style.height = "0px";
      for (let i = 0; i < serviceCount; i++) {
        const card = document.getElementById(`nl-svc-card-${i}`);
        if (card) {
          card.style.opacity = "1";
          card.style.transform = "none";
        }
      }
      const counterEl = document.getElementById("nl-svc-counter");
      if (counterEl) counterEl.textContent = String(serviceCount);
      return;
    }

    function setPath(ref: React.RefObject<PathEl>, d: string) {
      const el = ref.current.el;
      if (!el) return;
      el.setAttribute("d", d);
      const L = el.getTotalLength();
      ref.current.len = L;
      el.setAttribute("stroke-dasharray", String(L));
      el.setAttribute("stroke-dashoffset", String(L));
    }
    function setOff(ref: React.RefObject<PathEl>, t: number) {
      const { el, len } = ref.current;
      if (!el) return;
      el.setAttribute("stroke-dashoffset", String(len * (1 - Math.max(0, Math.min(1, t)))));
    }

    function rebuild() {
      const sticky = stickyRef.current;
      const spacer = spacerRef.current;
      const svg = svgRef.current;
      if (!sticky || !spacer || !svg) return;

      const stickyRect = sticky.getBoundingClientRect();
      svg.setAttribute("width", String(stickyRect.width));
      svg.setAttribute("height", String(stickyRect.height));
      svg.setAttribute("viewBox", `0 0 ${Math.max(1, stickyRect.width)} ${Math.max(1, stickyRect.height)}`);

      const lane = getLaneSnapshot();
      const hubLocalX = lane.LX;
      const R = Math.min(70, lane.laneW * 0.4);
      // The rig doesn't aim for a fixed hub position (see SpiderRig — a
      // lerp-toward-a-fixed-point can't stay monotonic); it just slows down
      // wherever it naturally is and settles near mid-viewport. Center the
      // web there too so it roughly lines up with wherever the mascot ends
      // up, without needing the two to coordinate through shared state.
      const hubLocalY = window.innerHeight * 0.5 - STICKY_TOP;

      const web = buildOrbWeb(hubLocalX, hubLocalY, R, RADIAL_COUNT);
      webRef.current = web;
      bugsRef.current = buildBugFlights(hubLocalX, hubLocalY, R, serviceCount);

      setPath(bridge, bridgePathD(web));
      setPath(yFrame, yFramePathD(web));
      setPath(yStem, yStemPathD(web));
      setPath(frame, frameOutlinePathD(web));
      web.ang.forEach((_, i) => setPath({ current: radials.current[i] }, radialPathD(web, i)));
      setPath(aux, auxSpiralPathD(web));
      const cap = captureSpiralPathD(web);
      setPath(capture, cap.d);
      nodesRef.current = cap.nodes;

      const nodeGroup = nodeGroupRef.current;
      if (nodeGroup) {
        nodeGroup.textContent = "";
        cap.nodes.forEach((n) => {
          const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          c.setAttribute("cx", n.x.toFixed(1));
          c.setAttribute("cy", n.y.toFixed(1));
          c.setAttribute("r", "1.6");
          c.setAttribute("fill", "#FF2323");
          c.setAttribute("opacity", "0");
          nodeGroup.appendChild(c);
        });
      }

      // The pin lasts while position:sticky keeps `sticky` stuck — which is
      // NOT the same span as the spacer's own document position. The sticky
      // element occupies its own natural height in flow first; only once
      // that's scrolled past does the spacer's "extra" height start being
      // consumed. Pin duration = spacerHeight, but it STARTS as soon as the
      // sticky content's natural top would cross `STICKY_TOP`, well before
      // the spacer's own natural document position.
      // T (sticky's natural, unstuck top) is derived from the spacer's own
      // position (never sticky, so always reliable) minus the sticky
      // element's own height (also reliable regardless of stuck state) —
      // this works no matter what the current scroll position is, unlike
      // reading `sticky`'s own rect, which only reports its natural top
      // when it happens to be unstuck at measurement time.
      const spacerRect = spacer.getBoundingClientRect();
      const stickyOwnHeight = sticky.getBoundingClientRect().height;
      const spacerNaturalDocY = spacerRect.top + window.scrollY;
      const T = spacerNaturalDocY - stickyOwnHeight;
      const pinStartDoc = T - STICKY_TOP;
      const pinEndDoc = T + spacerRect.height - STICKY_TOP;
      pinZoneRef.current = { start: pinStartDoc, end: pinEndDoc };

      const zone: HoldZone = {
        rampInStart: pinStartDoc,
        rampInEnd: pinStartDoc + RAMP,
        rampOutStart: pinEndDoc - RAMP,
        rampOutEnd: pinEndDoc,
      };
      setServicesHub({ ready: true, zone });

      update();
    }

    function update() {
      const web = webRef.current;
      if (!web) return;

      const { start, end } = pinZoneRef.current;
      const p = Math.max(0, Math.min(1, (window.scrollY - start) / Math.max(1, end - start)));

      setOff(bridge, seg(p, 0, 0.08));
      setOff(yFrame, seg(p, 0.08, 0.14));
      setOff(yStem, seg(p, 0.12, 0.18));
      setOff(frame, seg(p, 0.18, 0.3));
      web.ang.forEach((_, i) => setOff({ current: radials.current[i] }, seg(p, 0.3 + i * 0.012, 0.4 + i * 0.012)));
      const auxP = seg(p, 0.5, 0.64);
      setOff(aux, auxP);
      aux.current.el?.setAttribute(
        "opacity",
        (0.5 * auxP * (1 - seg(p, 0.75, 0.92) * 0.9)).toFixed(2)
      );
      const capP = seg(p, 0.64, 0.9);
      setOff(capture, capP);
      capture.current.el?.setAttribute("opacity", Math.min(1, 0.7 + capP * 0.3).toFixed(2));
      const nodeGroup = nodeGroupRef.current;
      if (nodeGroup) {
        nodesRef.current.forEach((n, i) => {
          const el = nodeGroup.children[i] as SVGCircleElement | undefined;
          el?.setAttribute("opacity", capP > n.t ? "0.9" : "0");
        });
      }

      const bugs = bugsRef.current;
      let caught = 0;
      let ripple: { x: number; y: number; tau: number } | null = null;
      let bestAmp = 0;

      bugs.forEach((b, i) => {
        const fly = seg(p, b.impactAt - 0.1, b.impactAt);
        const hit = p >= b.impactAt;
        if (hit) caught++;
        const tau = hit ? (p - b.impactAt) / 0.05 : 0;
        const vib = hit && tau < 3 ? Math.exp(-3.4 * tau) * Math.sin(tau * 13) : 0;
        if (hit && tau < 1.5 && Math.abs(vib) >= bestAmp) {
          bestAmp = Math.abs(vib);
          ripple = { x: b.tx, y: b.ty, tau };
        }
        const x = b.sx + (b.tx - b.sx) * easeOutCubic(fly);
        const y = b.sy + (b.ty - b.sy) * easeOutCubic(fly);
        const jx = hit ? vib * 4 : 0;
        const jy = hit ? vib * 4 : 0;
        const g = bugGroupRefs.current[i];
        if (g) {
          g.setAttribute("opacity", fly > 0.02 ? Math.min(1, fly * 1.4).toFixed(2) : "0");
          g.setAttribute(
            "transform",
            `translate(${(x + jx).toFixed(1)} ${(y + jy).toFixed(1)}) scale(${(1 + Math.abs(vib) * 0.15).toFixed(3)})`
          );
        }
        const card = document.getElementById(`nl-svc-card-${i}`);
        if (card) {
          const revealT = easeOutCubic(seg(p, b.impactAt, b.impactAt + 0.06));
          card.style.opacity = String(revealT);
          card.style.transform = `translateY(${((1 - revealT) * 22).toFixed(1)}px)`;
        }
      });

      if (ripple) {
        const r: { x: number; y: number; tau: number } = ripple;
        rippleRef.current?.setAttribute("cx", r.x.toFixed(1));
        rippleRef.current?.setAttribute("cy", r.y.toFixed(1));
        rippleRef.current?.setAttribute("r", (8 + Math.min(1, r.tau) * 30).toFixed(1));
        rippleRef.current?.setAttribute("opacity", Math.max(0, 1 - r.tau).toFixed(2));
      } else {
        rippleRef.current?.setAttribute("opacity", "0");
      }

      const counterEl = document.getElementById("nl-svc-counter");
      if (counterEl && counterEl.textContent !== String(caught)) counterEl.textContent = String(caught);
    }

    function onScroll() {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    }
    function onResize() {
      rebuild();
    }

    // Give layout (fonts, lane) a beat to settle before the first measurement.
    const t = setTimeout(rebuild, 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    const ro = new ResizeObserver(onResize);
    if (stickyRef.current) ro.observe(stickyRef.current);

    return () => {
      clearTimeout(t);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [serviceCount]);

  return (
    <div ref={sectionRef} style={{ position: "relative" }}>
      <div ref={stickyRef} style={{ position: "sticky", top: STICKY_TOP, zIndex: 2 }}>
        <svg
          ref={svgRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] overflow-visible"
        >
          <path ref={(el) => { bridge.current.el = el; }} fill="none" stroke="#E50914" strokeWidth={1} opacity={0.85} />
          <path ref={(el) => { yFrame.current.el = el; }} fill="none" stroke="#E50914" strokeWidth={1} opacity={0.85} />
          <path ref={(el) => { yStem.current.el = el; }} fill="none" stroke="#E50914" strokeWidth={1} opacity={0.85} />
          <path ref={(el) => { frame.current.el = el; }} fill="none" stroke="#E50914" strokeWidth={0.9} opacity={0.75} />
          {Array.from({ length: RADIAL_COUNT }, (_, i) => (
            <path
              key={i}
              ref={(el) => { radials.current[i] = { el, len: 0 }; }}
              fill="none"
              stroke="#E50914"
              strokeWidth={1}
              opacity={0.8}
            />
          ))}
          <path ref={(el) => { aux.current.el = el; }} fill="none" stroke="#8B0000" strokeWidth={0.9} />
          <path ref={(el) => { capture.current.el = el; }} fill="none" stroke="#FF2323" strokeWidth={1.1} />
          <g ref={nodeGroupRef} />
          <circle ref={rippleRef} r={8} fill="none" stroke="#FF2323" strokeWidth={1.4} opacity={0} />
          {Array.from({ length: serviceCount }, (_, i) => (
            <g key={i} ref={(el) => { bugGroupRefs.current[i] = el; }} opacity={0}>
              <g fill="none" stroke="#A1A1AA" strokeWidth={1.1}>
                <rect x={-6} y={-6} width={12} height={12} />
                <path d="M-6 -2h-4M-6 2h-4M6 -2h4M6 2h4M-2 -6v-4M2 -6v-4M-2 6v4M2 6v4" />
              </g>
              <circle r={1.6} fill="#71717A" stroke="none" />
            </g>
          ))}
        </svg>
        <div className="relative z-[2]">{children}</div>
      </div>
      <div ref={spacerRef} aria-hidden="true" className="h-[900px] max-[759px]:h-[560px]" />
    </div>
  );
}
