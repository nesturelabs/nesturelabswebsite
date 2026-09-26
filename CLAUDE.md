# Nesture Labs — website build

## What this repo is
A production build of the Nesture Labs home page from an approved Claude Design prototype.
The prototype is the source of truth for layout, copy, colour and motion.

**Read first, in full, before writing code:**
1. `design/Nesture Labs Home v2.dc.html` — the approved home page prototype (HTML/CSS/JS, ~161KB).
2. `design/Nesture Labs Motion Spec v2.dc.html` — the motion spec.
3. `design/support.js` — the prototype runtime. Do NOT port it; it is Claude Design's harness.

The prototype is a mock-up, not production code. Recreate its visual output and motion
in this stack; do not copy its internal structure.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- GSAP ScrollTrigger + Lenis for the scroll journey (no video, no heavy 3D)
- Deployed on Vercel

## Brand
- Logo files in `public/brand/` — `logo-dark.svg` is the mark. Never redraw or recolour it.
- Background `#050505`, surface `#0E0E0F`, surface-2 `#17171A`, border `#26262B`
- Primary red `#E50914`, glow `#FF2323`, deep `#8B0000`
- Text `#F5F5F5` / `#A1A1AA` / `#71717A`
- Headings Poppins 600–700, body Inter, mono JetBrains Mono
- Red is accents, CTAs and highlights only — never long body text. WCAG AA everywhere.

## The scroll journey — the hard requirement
One spider and one unbroken thread run the whole page: nav logo → hero → services web →
trusted marquee → why-us → process timeline → results → portfolio → testimonials → tech →
FAQ → CTA landing → footer perch.

Non-negotiable rules (all were bugs in an earlier build and are fixed in the prototype):
1. The spider's position is a point on the thread path at the current scroll position. It is
   never animated on a timer and never pinned in a way that rewinds it.
2. Document-Y is strictly monotonic with scroll. The spider never moves backward while
   scrolling down, and everything reverses exactly when scrolling up.
3. The spider is visible in every 150px scroll sample — never off-screen, never teleporting.
   No single 150px step may move it more than ~350px.
4. No thread, web, branch, hanger or spider ink may overlap live text or buttons.
5. One base scale for the whole journey; the only deliberate changes are the process-timeline
   fit and the small footer perch.
6. The ending: glide into the CTA, land below the card with a small ripple, then a calm
   descent down the CTA's own centre line to the footer perch. The last 600px of scroll has
   no new motion.
7. `prefers-reduced-motion`: thread drawn statically, spider parked at the hero anchor, no
   pinning, no walking. The page must read as a normal site.

## Content rules
- All stats are placeholders (`[X+]`, `[X%]`) and all projects are Project A–F with striped
  placeholder slots. Do NOT invent numbers, clients, logos or testimonials. Wire them to a
  content file so real values drop in later.
- Real contact details: info@nesturelabs.com, Colombo, Sri Lanka. WhatsApp number is a
  placeholder until supplied.

## Definition of done for the first milestone
- Home page, desktop 1440 and mobile 390, matching the prototype.
- Real HTML text (never text baked into images), one H1, WCAG AA contrast, 44px tap targets,
  animation layer `aria-hidden`.
- Hero headline and CTAs render immediately; animation is additive and lazy-initialised below
  the fold. 60fps target; animate transform, opacity and stroke-dashoffset only.
- Lighthouse: performance ≥ 90 on mobile, accessibility ≥ 95.
- A test that samples the scroll and asserts rules 2, 3 and 4 above (Playwright is fine).

## Out of scope for now
Blog, CMS/admin, client portal, other pages. Home page only.
