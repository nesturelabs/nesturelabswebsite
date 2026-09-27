"use client";

import { useEffect, useRef } from "react";
import {
  LEGS,
  FEMUR,
  TIBIA,
  STRIDE,
  solveKnee,
  gaitPhase,
  easeInOutQuad,
  shortestAngleDiff,
  rotateVec,
  type Vec2,
} from "@/lib/thread/rig";
import {
  getHeroAnchorD,
  getThreadPathSnapshot,
  initThreadPath,
  isThreadPathReady,
} from "@/lib/thread/threadPathStore";
import { getLaneSnapshot } from "@/lib/thread/laneStore";
import { getServicesHub } from "@/lib/thread/servicesHubStore";
import { computeHoldF } from "@/lib/thread/beats";

// Eased per-frame convergence rates (locked — design/design_handoff.../README.md).
const HEADING_EASE = 0.14;
const SCALE_EASE = 0.12;
// Blends gait vs. a held stance pose during a beat's hold (e.g. the
// services web build) — the rig never snaps into or out of standing still.
const MOVING_EASE = 0.12;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Body: the three nested rects + inner core rect from logo-dark.svg,
// excluding the two decorative leg-trace groups (real IK legs replace those).
const BODY_PATHS = [
  "M925 545H1075V650H925Z",
  "M905 650H1095L1185 740V990L1095 1080H905L815 990V740Z",
  "M915 730H1085L1115 760V970L1085 1000H915L885 970V760Z",
];
const CORE_PATH = "M940 775H1060V955H940Z";
// Recentres the logo's raw coordinate space (bbox centre ~(1000, 865)) to
// local origin, at a scale that puts the body roughly hip-to-hip.
const BODY_RECENTER = "scale(0.16) translate(-1000, -865)";
const BODY_STROKE = 2.4;

interface LegRuntime {
  plantedFoot: Vec2 | null;
  liftoff: Vec2 | null;
  wasStance: boolean;
}

// HIPS/FEET are authored with local +Y as "forward" (legs run front-to-back
// along Y, offset sideways along X) — a top-down-vehicle convention, not the
// atan2 standard where angle 0 = +X. `heading` below is always the raw path
// tangent (standard atan2), so every rotation applied to body-local
// geometry needs this -90° correction to align local +Y with it.
const FORWARD_OFFSET = -Math.PI / 2;

function computeWorld(local: Vec2, bodyPos: Vec2, heading: number, scale: number): Vec2 {
  const r = rotateVec(local, heading + FORWARD_OFFSET);
  return { x: bodyPos.x + r.x * scale, y: bodyPos.y + r.y * scale };
}

export function SpiderRig() {
  const bodyGroupRef = useRef<SVGGElement>(null);
  const coreRef = useRef<SVGPathElement>(null);
  const legRefs = useRef<Array<SVGPathElement | null>>([]);
  const rafRef = useRef<number | null>(null);

  const stateRef = useRef({
    heading: -Math.PI / 2,
    scale: 1,
    moving: 1,
    inited: false,
    legs: LEGS.map(
      (): LegRuntime => ({ plantedFoot: null, liftoff: null, wasStance: true })
    ),
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    function setLegPath(i: number, hip: Vec2, knee: Vec2, foot: Vec2, opacity: number) {
      const el = legRefs.current[i];
      if (!el) return;
      el.setAttribute(
        "d",
        `M${hip.x.toFixed(1)} ${hip.y.toFixed(1)}L${knee.x.toFixed(1)} ${knee.y.toFixed(1)}L${foot.x.toFixed(1)} ${foot.y.toFixed(1)}`
      );
      el.style.opacity = String(opacity);
    }

    function setBodyTransform(pos: Vec2, heading: number, scale: number) {
      if (!bodyGroupRef.current) return;
      const deg = ((heading + FORWARD_OFFSET) * 180) / Math.PI;
      bodyGroupRef.current.setAttribute(
        "transform",
        `translate(${pos.x.toFixed(2)} ${pos.y.toFixed(2)}) rotate(${deg.toFixed(2)}) scale(${scale.toFixed(3)})`
      );
    }

    /** One-time static pose at the hero anchor — rule 7: parked, no walking. */
    function drawParkedAtHero() {
      if (!isThreadPathReady()) {
        rafRef.current = requestAnimationFrame(drawParkedAtHero);
        return;
      }
      const path = getThreadPathSnapshot();
      const d = getHeroAnchorD();
      const at = path.at(d);
      const heading = -Math.PI / 2;
      const scale = getLaneSnapshot().rigScale;

      setBodyTransform(at, heading, scale);
      LEGS.forEach((leg, i) => {
        const hip = computeWorld(leg.hip, at, heading, scale);
        const foot = computeWorld(leg.footNeutral, at, heading, scale);
        const knee = solveKnee(hip, foot, leg.side, FEMUR * scale, TIBIA * scale);
        setLegPath(i, hip, knee, foot, 1);
      });
    }

    function frame() {
      rafRef.current = requestAnimationFrame(frame);

      if (!isThreadPathReady()) return;
      const path = getThreadPathSnapshot();
      if (path.len <= 0) return;

      const scrollY = window.scrollY;
      const st = stateRef.current;

      // Beat table, evaluated top-down — first match wins. Only the services
      // web hold exists so far; everything else is the default (walking).
      //
      // The playhead itself is untouched by any beat: `playY = scrollY +
      // vh/2` always. That's not a simplification that happens to work here
      // — `path.at(path.dAtY(y)).y` is an exact identity for a piecewise-
      // linear path (dAtY and at are exact inverses), so the mascot's
      // document-Y from this formula is *always* exactly `scrollY + vh/2`,
      // meaning its viewport position is always exactly mid-viewport,
      // holdF or not. A hold that instead blends toward a fixed "hub" (tried
      // first) has to fight that identity and — provably, for any smooth
      // ramp — cannot do so without either a brief reverse step or drifting
      // off the sticky content it's meant to sit beside. Centering the web
      // at that same mid-viewport offset (see ServicesBeat) means no
      // position override is needed at all: only the cosmetic parts of the
      // hold (heading, gait settling) key off holdF.
      const hub = getServicesHub();
      const holdF = hub.ready ? computeHoldF(scrollY, hub.zone) : 0;

      let headingOverride: number | null = null;
      let movingTarget = 1;
      if (holdF > 0.001) {
        headingOverride = -Math.PI / 2;
        movingTarget = holdF < 0.6 ? 1 : 0;
      }

      const playY = scrollY + window.innerHeight * 0.5;
      const d = path.dAtY(playY);
      const at = path.at(d);

      const headingTarget = headingOverride ?? at.angle;
      // Base viewport scale from the lane table; per-section beat overrides
      // (process/footer) are a later pass, layered on top of this baseline.
      const scaleTarget = getLaneSnapshot().rigScale;

      if (!st.inited) {
        st.heading = headingTarget;
        st.scale = scaleTarget;
        st.moving = movingTarget;
        st.inited = true;
      } else {
        st.heading += shortestAngleDiff(headingTarget, st.heading) * HEADING_EASE;
        st.scale += (scaleTarget - st.scale) * SCALE_EASE;
        st.moving += (movingTarget - st.moving) * MOVING_EASE;
      }

      // Body bob, perpendicular to heading, two cycles per stride — fades
      // out as the mascot settles into a hold.
      const bob = Math.sin((d / STRIDE) * 4 * Math.PI) * 2.5 * st.moving;
      const perp = { x: -Math.sin(st.heading), y: Math.cos(st.heading) };
      const bodyPos: Vec2 = { x: at.x + perp.x * bob, y: at.y + perp.y * bob };

      setBodyTransform(bodyPos, st.heading, st.scale);
      if (coreRef.current) {
        coreRef.current.style.animationPlayState = "running";
      }

      const femurWorld = FEMUR * st.scale;
      const tibiaWorld = TIBIA * st.scale;
      // A locked foot more than this far from the current neutral position
      // can't be a normal mid-stance hold — the body jumped underneath it
      // (a scroll teleport, e.g. an anchor link, or just a fast flick) —
      // relock instead of stretching a leg across the whole page.
      const maxPlantDrift = (FEMUR + TIBIA) * st.scale * 1.5;

      LEGS.forEach((leg, i) => {
        const legState = st.legs[i];
        const hip = computeWorld(leg.hip, bodyPos, st.heading, st.scale);
        const neutralFoot = computeWorld(leg.footNeutral, bodyPos, st.heading, st.scale);

        const phase = gaitPhase(d, leg.phaseOffset);
        const stance = phase < 0.5;
        let foot: Vec2;
        let opacity = 1;

        if (stance) {
          const drift = legState.plantedFoot
            ? Math.hypot(legState.plantedFoot.x - neutralFoot.x, legState.plantedFoot.y - neutralFoot.y)
            : Infinity;
          if (!legState.wasStance || !legState.plantedFoot || drift > maxPlantDrift) {
            // Just landed (or resyncing after a jump): lock the world
            // position now, don't slide for the rest of stance even as the
            // body keeps walking forward.
            legState.plantedFoot = neutralFoot;
          }
          foot = legState.plantedFoot;
        } else {
          const liftoffDrift = legState.liftoff
            ? Math.hypot(legState.liftoff.x - neutralFoot.x, legState.liftoff.y - neutralFoot.y)
            : 0;
          if (legState.wasStance || liftoffDrift > maxPlantDrift * 2) {
            legState.liftoff = legState.plantedFoot ?? neutralFoot;
            legState.plantedFoot = null;
          }
          const swingT = (phase - 0.5) / 0.5;
          const eased = easeInOutQuad(swingT);
          const base = legState.liftoff ?? neutralFoot;
          const x0 = base.x + (neutralFoot.x - base.x) * eased;
          const y0 = base.y + (neutralFoot.y - base.y) * eased;
          // Pulls 16% toward the hip at mid-swing (a lift arc), tapering to
          // zero at both ends of the swing.
          const lift = Math.sin(swingT * Math.PI) * 0.16;
          foot = { x: x0 + (hip.x - x0) * lift, y: y0 + (hip.y - y0) * lift };
          opacity = 0.6;
        }
        legState.wasStance = stance;

        // At moving=1 the foot is exactly the gait position above; the
        // blend only engages settling into a hold, easing all 8 feet down
        // to a calm standing pose instead of freezing mid-stride.
        const displayFoot: Vec2 =
          st.moving >= 0.999
            ? foot
            : { x: lerp(neutralFoot.x, foot.x, st.moving), y: lerp(neutralFoot.y, foot.y, st.moving) };
        const displayOpacity = lerp(1, opacity, st.moving);

        const knee = solveKnee(hip, displayFoot, leg.side, femurWorld, tibiaWorld);
        setLegPath(i, hip, knee, displayFoot, displayOpacity);
      });
    }

    function start() {
      if (media.matches) {
        initThreadPath();
        // Give the thread store a beat to build before parking.
        requestAnimationFrame(drawParkedAtHero);
        return;
      }
      initThreadPath();
      rafRef.current = requestAnimationFrame(frame);
    }

    function stop() {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }

    function onReducedChange() {
      stop();
      stateRef.current.inited = false;
      start();
    }

    start();
    media.addEventListener("change", onReducedChange);

    return () => {
      stop();
      media.removeEventListener("change", onReducedChange);
    };
  }, []);

  return (
    <g aria-hidden="true">
      {LEGS.map((_, i) => (
        <path
          key={i}
          ref={(el) => {
            legRefs.current[i] = el;
          }}
          fill="none"
          stroke="#FF2323"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.9}
        />
      ))}
      <g ref={bodyGroupRef}>
        <g transform={BODY_RECENTER}>
          {BODY_PATHS.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="#FF2323" strokeWidth={BODY_STROKE / 0.16} strokeLinejoin="miter" />
          ))}
          <path
            ref={coreRef}
            d={CORE_PATH}
            fill="#FF2323"
            stroke="none"
            style={{ animation: "nlCore 2.4s ease-in-out infinite" }}
          />
        </g>
      </g>
    </g>
  );
}
