# Handoff: Nesture Labs — Home Page (continuous spider scroll journey)

## Overview

A single-page marketing site for Nesture Labs (web, mobile and AI studio, Colombo SL). Thirteen content sections are bound together by **one continuous animation**: a single spider mascot walks one unbroken dragline thread from the nav logo at the top of the page to a perch on the footer rule at the bottom. Its position is driven purely by scroll offset, so the whole journey is deterministic and fully reversible.

The mascot's body is built from the actual paths in `assets/logo-dark.svg` — it is the company mark with legs, not a drawn spider.

---

## About the Design Files

The files in `design/` are **design references created in HTML**. They are prototypes that demonstrate the intended look, motion and behaviour — **they are not production code to copy directly**.

Your task is to **recreate these designs in the target codebase's existing environment** (React, Vue, Astro, SvelteKit, etc.) using its established component patterns, styling solution and animation library. If no environment exists yet, choose an appropriate framework and implement there.

Specifically:
- `Nesture Labs Home v2.dc.html` is the design itself, authored in a bespoke prototyping runtime (`support.js`). **Do not port `support.js`.** Read the markup for structure and the `class Component` block for animation logic, then rebuild both idiomatically.
- All styling in the prototype is **inline** — a constraint of the prototyping runtime, not a design intent. Move it into the target codebase's styling system (CSS modules, Tailwind, styled-components…).
- The animation logic in `class Component` **is** worth porting closely — the algorithms (inverse kinematics, gait phasing, path construction) are the design. See "Porting the animation" below.

### Opening the prototype
Open `design/Nesture Labs Home v2.dc.html` directly in a browser (it needs `support.js` as a sibling, which is included). Scroll slowly from top to bottom to see the full journey.

## Fidelity

**High-fidelity.** Final colours, typography, spacing, motion timings and copy. Recreate the UI pixel-perfectly using the codebase's existing libraries and patterns.

Two caveats on content:
- All statistics are intentional placeholders: `[X+]`, `[X%]`, `[X]`.
- Client names, project names (Project A–F), testimonial names/quotes, sector tags and the WhatsApp number are placeholders in `[SQUARE BRACKETS]`. Section headings, service copy, FAQ answers and CTA copy are **real, final copy**.

---

## Design Tokens

### Colour

| Token | Hex | Use |
|---|---|---|
| `bg` | `#050505` | Page background |
| `bg-raised` | `#0A0A0B` | Footer, timeline node fill, bug label grounds |
| `bg-slot` | `#0E0E0F` | Image placeholder fill |
| `surface` | `rgba(20,20,23,0.88)` | Card background (opaque enough to sit over the thread) |
| `surface-strong` | `rgba(12,12,14,0.94)` | CTA card |
| `surface-nav` | `rgba(14,14,15,0.66)` → `rgba(14,14,15,0.86)` on scroll | Nav pill |
| `border` | `#26262B` | All default borders/hairlines |
| `border-strong` | `#3A3A42` | Dashed borders, inactive accent edges, inactive slider dots |
| `rule` | `#1B1B1F` | Footer bottom rule |
| `brand` | `#E50914` | Primary red — CTAs, accents, active states |
| `brand-hover` | `#FF2323` | Hover, all mascot/thread strokes |
| `brand-deep` | `#8B0000` | Auxiliary web spiral, background glow |
| `brand-soft` | `#FF6B6B` | Counter numerals only |
| `text` | `#F5F5F5` | Body/heading text |
| `text-invert` | `#FFFFFF` | Text on red fills, bug labels |
| `text-muted` | `#A1A1AA` | Secondary text, mono labels |

> **Contrast note:** `#A1A1AA` on `#050505` is 7.4:1. Do not darken it — an earlier `#71717A` failed AA and was corrected.

### Typography

Google Fonts: `Poppins` (400/600/700), `Inter` (400/500), `JetBrains Mono` (400/500).

| Role | Family | Size | Weight | Tracking | Leading |
|---|---|---|---|---|---|
| H1 | Poppins | `clamp(46px, 5.6vw, 92px)` | 700 | `-0.035em` | 0.98 |
| H2 section | Poppins | `clamp(34px, 3.2vw, 50px)` | 600 | `-0.03em` | 1.05 |
| H2 CTA | Poppins | `clamp(34px, 3.4vw, 54px)` | 700 | `-0.03em` | 1.03 |
| H3 card | Poppins | 17–19px | 600 | `-0.02em` | — |
| Body lead | Inter | 16–17px | 400 | — | 1.65–1.7 |
| Body card | Inter | 13–13.5px | 400 | — | 1.55–1.6 |
| Eyebrow / label | JetBrains Mono | 9–11px | 400 | `.14em`–`.22em` | — |
| Stat numeral | Poppins | 32–34px | 700 | `-0.03em` | — |

`text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.

### Spacing, radius, effects

- Section padding: `100px clamp(20px, 5.5vw, 80px)`; max content width `1440px`.
- Grid gaps: `14px` (chips), `16px` (stats/pillars), `18px` (cards).
- Radius: `999px` pills/buttons · `24px` CTA card · `18px` cards · `16px` stat tiles · `14px` chips/FAQ rows · `12px` image slots · `10px` inputs/social · `8px` chip icons · `6px` tech tags.
- Glass: `backdrop-filter: blur(16px)` (nav, hero cards), `blur(20px)` (CTA card).
- Red glow: `box-shadow: 0 0 22–46px rgba(229,9,20,0.45–0.66)`.
- Card hover: `translateY(-4px)`, border → `#E50914`, `transition: .2s ease`.
- Button hover: `translateY(-2px)`, background → `#FF2323`, `transition: .18s ease`.
- Minimum tap target: **44px** (enforced on all buttons, dots, social links, filter chips).

---

## Layout system — the lane

The page uses a **centred content column with clear vertical lanes down each side**. The mascot travels in a lane; content never occupies it. This is what keeps the animation from colliding with text.

```
laneW   = mobile ? 112 : clamp(round((W - 760) / 2), 150, 230)
LX      = round(laneW / 2)        // left lane centre
RX      = W - LX                  // right lane centre
rigScale is solved from laneW so the rig's ±95px span always fits:
          LX - 95*scale > 2  AND  RX + 95*scale < W - 2
```

Sections get `padding-left: laneW` and `padding-right: laneW` (desktop). **On mobile only the left is padded** (`padding-right: 20px`) — at 390px, padding both sides left only 166px of content.

### Responsive table

| Viewport | laneW | rig scale | Layout |
|---|---|---|---|
| 1440 | 230 | 0.90 | Full — 4-up pillars, 4-up services, 6-up chips, 3-up projects, centre timeline |
| 1120–1439 | 180–230 | 0.75–0.90 | Grids reflow by auto-fit; timeline column tracks content width |
| 760–1119 | 150–180 | 0.60–0.75 | Nav links collapse to logo + WhatsApp + Get a Quote; timeline stacks if the corridor cannot hold the rig |
| < 760 (390) | 112 | 0.40 | Single **left** lane the whole way (no lane switch), left-only padding, 4 bugs instead of 7, 1-up stacks, two-column timeline, 124px marquee tiles, no cursor effects |

---

## The animation system

> This is the heart of the design. Port the algorithms; restyle everything else.

### Architecture

One `<svg>` overlay spans the **full document height**, positioned `absolute; top:0; left:0; width:100%`, at **`z-index: 1` — behind all content** (sections sit at `z-index: 2`). This is load-bearing: it guarantees the animation can never obscure text. The mascot stays visible because it travels in the empty lane.

Child groups render in this order: `trail`, `hot`, `hooks`, `web`, `bugs`, `branches`, `procNodes`, `net`, `hang`, `beads`, `circuit`, `land`, `rig`.

Two SVG filters provide the glow: `nlGlowS` (`stdDeviation 2.4`, `#FF2323` @ 0.85) for the mascot, `nlGlowW` (`stdDeviation 1.6`, `#E50914` @ 0.7) for threads and webs.

### The thread

A single polyline path built from **live DOM measurements** of every section's anchor element, in document order:

nav logo → hero headline → pillar cards → services orb hub → marquee wire → stat tiles → why-choose hub → six process nodes → results band → portfolio hub → testimonial bead wire → tech serpentine → FAQ rail → CTA landing point → footer perch.

Because anchors are measured rather than hard-coded, layout changes cannot break the connection. Rules:

- The path is **monotonic in y** — each waypoint is forced at least 2px below the previous, so a scroll position maps to exactly one point (`dAtY(y)`).
- Horizontal travel must be paid for with vertical travel, or the spider appears to slide sideways in place.
- Rendered as two paths: `#nl-trail` (the full path, `opacity 0.25`, `stroke-dashoffset` revealing it as you scroll) and `#nl-hot` (a 260px bright window riding with the mascot).
- **Rebuild the path object after any mutation of its points** — the footer perch block adjusts the final point, and a stale snapshot of `d`/`len`/`cum` was a real bug here.

### Playhead

```
playY  = scrollY + viewportHeight * 0.5
d      = path.dAtY(playY)     // distance along the path
```

The mascot is placed at `path.at(d)`. That is the entire continuity mechanism — no timers, no tweens, no scroll listeners with state.

### The rig (locked — do not alter the maths)

```
HIPS  = [[-26,-16], [-30,-4], [-30,10], [-26,22]]
FEET  = [[-70,-86], [-100,-38], [-97,33], [-68,78]]
femur = 44,  tibia = 46,  stride C = 96
mirrored for the right side; leg i uses side = i < 4 ? -1 : 1
```

- **Body**: three nested rounded rects from `logo-dark.svg` plus an inner core rect that pulses `opacity .45 → 1` over 2.4s.
- **IK**: two-bone analytic solve per leg; knee direction is `side`, so knees always bend outward. Clamp reach to `[|a-b|+0.5, a+b-0.5]` before `acos` or it produces NaN.
- **Gait**: alternating tetrapod. Group A (L1,R2,L3,R4) and group B (L2,L4,R1,R3 — indices `[1,3,4,6]`) are offset by 0.5 phase. Phase = `(d / C + offset) mod 1`; `< 0.5` is stance, `>= 0.5` is swing.
- **Stance feet plant in world space and never slide** — they are computed from the path position at the phase's start, not from the current body position.
- **Swing** eases `2q²` / `1-(-2q+2)²/2`, dims to 60% opacity, and pulls 16% toward the hip at mid-swing.
- **Body bob**: `sin(d / C * 4π) * 2.5px` perpendicular to heading, scaled by the movement factor.
- **Breathing**: when idle, `1 + sin(t/900) * 0.012`.

### Eased transitions (important)

Three per-beat properties are eased so no beat boundary pops:

| Property | Rate | Note |
|---|---|---|
| `heading` | `0.14`/frame | Shortest-angle interpolation; never snaps direction |
| `scale` | `0.12`/frame | Prevents size pop entering process (procScale) and footer (0.6) |
| `moving` | `0.12`/frame | Blends foot position between gait and planted stance |

At `moving = 1` the foot is **exactly** the locked tetrapod position — the blend only engages as the mascot slows into a hold.

### Beat table

Evaluated top-down; first match wins. `inSec(id)` tests whether the playhead is inside a section.

| Condition | Movement | Heading | Scale |
|---|---|---|---|
| `holdF > 0.001` (services web hold) | moving while `holdF < 0.6` | `-π/2` (faces up) | 1 |
| in process | walking | `+π/2` | `procScale` |
| in why, within 70px of hub | held, idle | `+π/2` | 1 |
| in portfolio, within 80px of hub | held, idle | `+π/2` | 1 |
| in FAQ | held, idle, **leg sway** | `-π/2` | 1 |
| in CTA, past landing − 40px | held, idle | `+π/2` | 1 |
| in footer | held, idle | `+π/2` | 0.6 |
| *(default)* | walking | path tangent | 1 |

### Lane routing

Left lane from the nav to the services web → **one crossing** → right lane to the end. On mobile the crossing is skipped entirely (left lane throughout).

### The services pin

The only beat that pins in place. The mascot is held at the orb hub while the web is built and the bugs are caught:

```
dwellPlan = 214 * (desktop ? 7 : 4) + 380      // spacer height
RAMP      = 520                                 // enter/exit ramp
holdF     = easeOut(rampIn * (1 - rampOut))     // 0..1 hold factor
pin       = ((scrollY + orbHoldVY) - orbHubY) * holdF
```

The hub's x is **derived from the path** (`path.at(path.dAtY(bandY)).x`) rather than computed independently — otherwise the mascot sits beside its own web.

On viewports under 760px tall the services heading collapses (sub-paragraph hidden, H2 down to `clamp(24px,3vw,32px)`) so the web is not crushed to a thumbnail.

---

## Screens / Sections

All one page. Each has a content spec and a motion beat.

### 1 — Header / Nav
Fixed pill, `top: 18px`, centred, `z-index: 20`. Logo mark (26px, from `icon-dark.svg` geometry) + wordmark "NESTURE LABS" (Poppins 700, 13px, `.2em`). Links: Home (with red dot), About, Services, Portfolio, Blog, Contact. Right: circular 38px WhatsApp icon button, then "Get a Quote" (red, glow).
**On scroll > 40px:** padding `10px 12px 10px 18px` → `6px 8px 6px 14px`, background opacity `.66` → `.86`.
**Beat:** thread origin — the mascot sits on the logo at scroll 0.

### 2 — Hero
Eyebrow pill "● NESTURE LABS". H1 "Building Tomorrow's AI Systems that **Scale.**" where the final word types/deletes through **Scale. → Convert. → Never Sleep.** (95ms per char typing, 45ms deleting, 1800ms hold, 2200ms initial delay) with a 3px caret blinking at 1s steps. Sub: "Ready to transform your ideas into reality? Let's discuss your project and create something amazing together." CTAs: "Start Your Project →" (red) and "Watch Our Demo" (glass, play icon). Then 4 pillar cards: Web App Development, Mobile App Development, AI Solutions Development, Digital Marketing — each icon + one line.
**Beat:** mascot walks in on the dragline; each pillar card gets a thread stub hooking it to the main line as the mascot passes.

### 3 — Services
Eyebrow "OUR SERVICES". H2 "Our Services Tailored for Your Success". Sub: "Comprehensive technology solutions designed to accelerate your digital transformation." Heading block is `position: sticky; top: 84px` inside its own wrapper (`#nl-svcStage`) so it releases when the spacer ends — **not** scoped to the whole section, or it never unsticks.

A lit counter readout: label "PROBLEMS CAUGHT" + `n / 7`, red border, `0 0 30px rgba(229,9,20,0.28)` glow, count in `#FF6B6B`.

7 service cards (4-up grid) + one dashed "Not sure which you need?" card with a "Get Started Today" button. Each card: number `01`–`07`, icon, problem kicker (`Slow website →`), title, description, 4 feature bullets, "Learn more →".

| # | Problem kicker | Service |
|---|---|---|
| 01 | Slow website | Web Development |
| 02 | No mobile app | Mobile Development |
| 03 | Manual work | AI & Automation |
| 04 | Confusing UX | UI/UX Design |
| 05 | Downtime | Cloud & DevOps |
| 06 | Breakages | Support & Maintenance |
| 07 | No leads | Digital Marketing |

**Beat (the centrepiece):** the mascot pins at the hub and builds an orb web in correct biological order — bridge thread → Y-frame → frame threads → radials → auxiliary spiral → capture spiral, with nodes lighting along the capture spiral. Then 7 glitching bug glyphs fly in from `R*2.4` to `R*0.66` and strike the web; each impact triggers a decaying spring (`e^(-3.4τ) · sin(13τ)`) that shakes the whole web, plus an expanding ripple ring. Bug labels sit on dark pills **outside** the web edge (`R*0.42 + 26` radially) with a leader line back to the bug — inside the web they were illegible. Each caught bug increments the counter, then the mascot wraps it and the matching service card fades up.

### 4 — Trusted in the Global Sector
Eyebrow + H2 "Teams in Colombo and beyond ship on our stack." Infinite marquee of 7 client placeholder tiles (172×66, duplicated for seamless loop, 34s linear, edge mask). Then 4 stat tiles: Projects Completed, Happy Clients, Success Rate, Years Experience — each with a 2px progress rule.
**Beat:** the thread runs horizontally as a wire; logo tiles hang from droppers and sway (`sin(t/900)`, ±2.4px, ±0.5deg). The mascot rides left-to-right, then taps each stat tile — tile border lights, tile lifts 4px, numeral fades in, rule fills.

### 5 — Why Choose Nesture Labs
H2 "One team wired into every layer." 6 cards in 3-up, each with a 2px left accent edge (`#3A3A42` → `#E50914` when powered): Full-Stack Expertise, Startup Friendly, Agile Methodology, AI-Driven Solutions, 24/7 Support, Enterprise Security.
**Beat:** the thread splits into 6 quadratic branches from a hub above the grid. A data pulse travels out along each branch, the card powers on (accent edge lights, card shifts 4px right), and the pulse returns.

### 6 — How We Work
H2 "Six steps, no surprises." 6 steps alternating left/right around a centre column of 44px numbered nodes: Discover, Design, Develop, Test, Deploy, Support.
**Beat:** **the timeline is the dragline** — the thread spine sits on the node column itself (`spineX = badge column centre`). The mascot rappels straight down it; each node lights (border → `#E50914`, `0 0 18px` glow) and its card slides in from ±26px as the mascot passes, with a ring expanding from the node. Scrolling up walks it back up the same line. Below 760px (or when the corridor cannot hold the rig) the timeline drops to two columns with the spine back in the lane.

### 7 — Results band
4 count-up tiles: Projects Delivered, Happy Clients, Years Experience, Countries Served.
**Beat:** the single thread multiplies into a small connected network across the band — nodes appear above each tile, links draw between them, numerals fade in as each node lights.

### 8 — Portfolio
Eyebrow "SELECTED WORK", H2 "Built to carry weight.", "View all work →". Filter chips: ALL / WEB / MOBILE / AI / CLOUD (44px min height, active = red border + `rgba(229,9,20,0.12)` fill). 6 project cards in 3-up: striped placeholder image slot (`repeating-linear-gradient(135deg, rgba(229,9,20,0.14) 0 10px, transparent 10px 20px)`, 16:10), title Project A–F, `[SECTOR]` tag, one-line description.
**Beat:** the mascot's lair — it sits at a hub above the grid while cards hang from thread hangers and swing into place (`sin(t/520)`, decaying with entry progress). Filtering re-runs layout so the hangers re-attach.

### 9 — Testimonials
H2 "Reviewed by the people we shipped for." 3 Google-style review cards: 5 red stars, "GOOGLE REVIEW" label, quote, avatar placeholder, `[Client name]` / `[ROLE, COMPANY]`. Slider dots below (44×44 tap targets, 26×3px bars, active red).
**Beat:** cards are beads threaded on a horizontal wire, dropping in on bead threads. The mascot sits on the wire and turns toward the active card.

### 10 — Tech Stack
H2 "Chips we solder on." 12 chips in 6-up: React, Next.js, Node.js, Python, Flutter, TensorFlow, MongoDB, PostgreSQL, AWS, Docker, Kubernetes, Firebase. Each: 34px monogram tile, name, category label (FRONTEND / BACKEND / MOBILE / AI / CLOUD / DATABASE).
**Beat:** the thread becomes a serpentine circuit trace through the grid (reversing direction each row). Each chip gets a solder pad that lights as the mascot reaches it; the card border turns red and lifts 3px.

### 11 — FAQ
H2 "Answers before you ask." 6-row accordion, right-aligned to `max-width: 900px`. Rows: pricing, timelines, post-launch support, code/account ownership, week-to-week process, time zones. Header is a 60px-min button; marker is a 10px square that rotates 45° and fills red when open. Answer animates `max-height` over `.45s cubic-bezier(.2,.8,.2,1)` with opacity over `.35s`.
**Beat:** the mascot hangs upside down beside the accordion on a vertical rail, with leg sway. Opening a row draws a short thread from the rail to that row.

### 12 — Final CTA
Full-width block with a **red/black** radial + linear gradient (explicitly not purple/blue). Centred card: H2 "Let's Build the Future Together", the transform-your-ideas paragraph, "Book a Free Consultation →" (red) and "View Our Work" (glass), then 3 trust badges: FREE CONSULTATION, NO OBLIGATION QUOTE, 24/7 SUPPORT.
**Beat:** the end of the thread. The mascot rappels down the final segment and lands in the middle of the card; on landing a ripple spreads (r 10 → 160) and the card, then buttons, then badges fade up in sequence.

### 13 — Footer
Logo + description; columns Services / Company / Resources + Legal / Contact (info@nesturelabs.com, WhatsApp `[+94 XX XXX XXXX]`, Colombo, Sri Lanka). Social row (44px targets), newsletter email input + Subscribe, copyright rule.
**Beat — the ending:** a second small rig (scale 0.22) perches on the footer's top border. The **handover is driven by the perch's position on screen, not by scroll distance** — the travelling rig holds full opacity until the perch has risen to mid-viewport, so there is never a frame without a spider. On arrival the end node tightens and a single ring pulses outward along the copyright rule, then goes quiet. Clicking the perch (or the back-to-top button) smooth-scrolls to the top.

**Floating, `z-index: 20`:** WhatsApp button (52px, red, `nlWhats` pulse every 2.6s) and back-to-top (52px, glass, appears after one viewport).

---

## Interactions & Behaviour

| Interaction | Behaviour |
|---|---|
| Scroll | Drives the entire animation; fully reversible |
| Nav scroll > 40px | Pill shrinks and darkens |
| Card hover | `translateY(-4px)`, border → `#E50914` |
| Button hover | `translateY(-2px)`, background → `#FF2323`, glow expands |
| Portfolio filter | Filters cards by `data-cat`, re-runs layout to re-attach hangers |
| Testimonial dots | Sets active card (lifts 6px, red border) |
| FAQ row click | Accordion — opening one closes the others |
| Footer spider / back-to-top click | Smooth scroll to top (instant under reduced motion) |
| Headline | Auto-cycling type/delete loop |

### State

| State | Purpose |
|---|---|
| `scrollY` (read per frame) | The only animation driver |
| `filter` | Active portfolio category |
| `activeDot` | Active testimonial |
| `faqOpen` | Open accordion index, `-1` for none |
| typing loop: `wordIndex`, `charIndex`, `deleting` | Headline cycle |
| `mob`, `laneW`, `rigScale`, `path` | Derived from layout; recomputed on resize |

### Lifecycle rules (these were real bugs — please preserve)

1. **Never measure a settling DOM.** Wait until the root reports the same non-zero width on two consecutive checks before the first authoritative layout. Use a timer *alongside* `requestAnimationFrame` (rAF is throttled in hidden frames) with a hard try-cap so the measure always happens.
2. **Layout must end with a synchronous render pass**, or the first paint shows an unpositioned rig and a fully-drawn thread.
3. **Self-heal counters must reset on success** — count *consecutive* failures, not lifetime attempts, and back retries off (frame → 120ms → 400ms → 1000ms).
4. **Clear all pending timers on unmount.**
5. **Exclude absolutely-positioned elements from the lane-padding pass** — the footer perch is a footer child and was being padded like a content column, which gave the document a horizontal scroll.
6. `overflow-x: clip` on the root as a backstop.

---

## Accessibility

- Real HTML text throughout; exactly one `<h1>`.
- The entire animation layer is `aria-hidden="true"` and `pointer-events: none`.
- All interactive targets ≥ 44px.
- Body text meets WCAG AA (`#A1A1AA` on `#050505` = 7.4:1).
- Star ratings carry `aria-label="5 out of 5"`; icon-only links carry `aria-label`.
- The footer perch is `role="button"`, `tabindex="0"`, responds to Enter/Space.
- **`prefers-reduced-motion: reduce`**: all CSS animations disabled; the thread draws statically, the mascot parks at the hero anchor, no pinning, no walking, instant scroll on the climb action.

## Performance

- Animate only `transform`, `opacity` and `stroke-dashoffset`.
- One rAF loop for the whole page; sections outside the viewport (±200px) skip their update work.
- Geometry rebuilds only on resize, never per frame.
- Target 60fps at 1440.

---

## Porting the animation

Recommended order:

1. **Static page first** — all 13 sections, responsive, correct type and colour, no animation. This should stand on its own.
2. **Thread infrastructure** — full-height SVG overlay behind content, anchor measurement, monotonic path construction, `dAtY` lookup, scroll → `stroke-dashoffset`.
3. **The rig** — body from the logo paths, IK, gait, the three eased properties. Verify in isolation against the motion spec before wiring it to the page.
4. **Beats** — one at a time, starting with the services web (most complex, and it validates the pin mechanism).
5. **Reduced-motion path** and lifecycle guards.

If the target stack uses GSAP + ScrollTrigger, the beat structure maps cleanly onto a single pinned timeline — but keep the playhead derived from scroll position rather than tweened, or reversibility is lost.

---

## Assets

| File | Use |
|---|---|
| `assets/logo-dark.svg` | Full lockup. **Source of the mascot body geometry** — the three rounded rects and core rect are lifted from here. |
| `assets/icon-dark.svg` | Icon mark, used in the nav and footer at 24–26px. |
| `assets/favicon.svg` | Favicon. |

Everything else is inline SVG drawn in code (service icons, bug glyphs, stars, social, WhatsApp, play, arrows). Project images and client logos are **striped placeholders** awaiting real assets. Fonts load from Google Fonts.

## Files

| File | What it is |
|---|---|
| `design/Nesture Labs Home v2.dc.html` | **The design.** Markup = structure/content; `class Component` = animation logic. |
| `design/Nesture Labs Motion Spec v2.dc.html` | Companion motion spec — 13 storyboard frames, journey map, rig skeleton and gait diagrams, timing tables, the fit/shed table. Open it alongside the design. |
| `design/support.js` | Prototyping runtime. **Reference only — do not port.** |
| `assets/*.svg` | Brand assets. |

## Outstanding

- Real statistics for every `[X+]` / `[X%]` / `[X]`.
- Real client logos, project screenshots, sectors and descriptions (A–F).
- Real testimonial quotes, names, roles, avatars.
- Real WhatsApp number.
- Blog section — currently the nav "Blog" link points at the FAQ; either build the section or repoint the link.
