# Nesture Labs — Claude Design Prompts

Run these one stage at a time. Approve each result before moving to the next.

**Upload with Prompt 1:** the AgentAI (jellyfish), OCTOVLAD and Octo SMM reference screenshots, plus the final logo: `Brand/logo/logo-dark.svg` (also upload `icon-dark.svg` and `favicon.svg`).

---

## Prompt 1 — Brand + Design System

```
Create a complete design system for Nesture Labs.

BRAND
- Name: Nesture Labs
- Tagline: "Web, Mobile, and AI Solutions that Scale with You."
- What we do: A remote-first technology studio from Colombo, Sri Lanka, building websites, mobile apps, AI agents and automation, cloud and DevOps, plus digital marketing for businesses worldwide.
- Personality: premium, technical, bold, precise. Dark tech with a single sharp red accent. Not playful, not corporate-generic.

LOGO
- The uploaded logo-dark.svg is the official mark: a geometric red circuit-board spider (octagonal microchip body, 8 angular circuit-trace legs, soft red glow) above the wordmark "NESTURE LABS" in bold white Poppins with wide letter-spacing, on black. Use it as supplied. Do not redraw it.
- Use icon-dark.svg (spider only) for compact spots (nav on mobile, app icon, avatars) and favicon.svg for the browser tab.
- Build a logo lockup: spider icon + "Nesture Labs" wordmark (icon left, wordmark right), plus icon-only, stacked, and light-background versions.
- Show clear-space and minimum-size rules, and a favicon/app-icon preview.
- Spider = a web builder. Use a subtle web/thread motif (fine connected lines, node points) as a secondary graphic element across the brand.

REFERENCES (uploaded)
- AgentAI: take the huge tight headline type, glowing red hero creature on pure black, glass stat cards floating over the visual, pill nav, bento-grid layout.
- OCTOVLAD: take the bold uppercase two-colour headline and the service strip under the hero.
- Octo SMM Studio: take the brand-identity board layout, numbered service cards, and results row.
- Change: use red (not pink/magenta), no purple. Keep it cleaner and less busy than the Octo references.

COLOUR TOKENS (dark mode is primary)
- Background: #050505, Surface: #0E0E0F, Surface-2: #17171A, Border: #26262B
- Primary red: #E50914, Red glow: #FF2A2A, Deep red: #8B0000
- Text: #F5F5F5 (primary), #A1A1AA (secondary), #71717A (muted)
- Success #22C55E, Warning #F59E0B, Error #EF4444, Info #3B82F6
- Neutrals 50–900, plus a light-mode variant for the admin system.
- All text must pass WCAG AA (4.5:1). Red is for accents, CTAs and highlights, never long body text.

TYPOGRAPHY (Google Fonts)
- Headings: Poppins 600–700 (matches the logo wordmark); tight letter-spacing (-0.02em) for display sizes.
- Body: Inter, 400–500.
- Mono/labels: JetBrains Mono for small tags, numbers and code snippets.
- Scale: Display, H1–H6, Body L/M/S, Caption, Overline.

SPACING, LAYOUT, SHAPE
- 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Grid: 12 columns desktop, 8 tablet, 4 mobile. Breakpoints 360, 768, 1024, 1280, 1536.
- Radius: 8, 16, 24, full pill. Cards use 24px.
- Glass cards: surface at 60% opacity, 16px backdrop blur, 1px border with a faint top highlight.
- Shadows: three elevation levels plus a red glow shadow for primary CTAs.
- Icons: Lucide, 1.5px stroke.

COMPONENTS
- Buttons: primary (red, glow on hover), secondary (dark glass), ghost, icon, pill.
- Badges/tags with a small red dot (like "● AI-Driven Studio").
- Pill navigation bar with active red pill, mobile menu.
- Cards: stat (big number + label), service (numbered 01–08), portfolio, pricing, testimonial, blog.
- Forms: input, select, checkbox, radio, toggle, file upload, multi-step form with progress bar.
- Accordion, tabs, slider, logo marquee, breadcrumbs, pagination, footer.
- System UI: sidebar, top bar, data table, kanban, calendar, charts, modal, drawer, toast, empty state, loading skeleton.

MOTION TOKENS
- Micro-interactions 150–200ms, scroll reveals 400–600ms (once), page transitions 300ms, hero 800ms–1.2s, counters 1.5s.
- Ease-out for entering, ease-in for leaving. Animate transform and opacity only. Respect prefers-reduced-motion.

Present it as a brand board: logo system, colour swatches with hex codes, type specimen, spacing, and a component sheet.
```

---

## Prompt 2 — Home Page

```
Using the Nesture Labs design system, design the Home page. Desktop (1440) and mobile (390).

1. Header: logo lockup left, pill nav centre (Home, Services, Work, Pricing, About, Blog, Contact), right: WhatsApp icon + red "Get a Quote" button. Shrinks with blur on scroll.
2. Hero:
   - Badge: "● AI-Driven Tech Studio"
   - Headline (huge, tight): "We Build What Scales." with "Scales" in red. Small side note: "From idea to launch".
   - Subtext: "Websites, mobile apps and AI agents engineered for growth — designed, built and deployed by one team."
   - CTAs: "Explore Services" (secondary), "Get a Quote" (primary red).
   - Visual: a glowing red 3D spider hanging on a luminous web thread on pure black, with faint web lines spreading behind the headline. Original render, cinematic, volumetric red light.
   - 3 glass stat cards bottom-left and 2 floating cards on the right. Use placeholder values marked [X+] for projects, clients, years — these will be replaced with real numbers.
   - Vertical social icons and a "Scroll down" line.
3. About statement: large sentence with red highlighted words: "We design and deploy web, mobile and AI systems with people at the core — so every product we ship works harder for your business."
4. Bento grid: "Based in Colombo, Sri Lanka — working worldwide" card with "Start a Project" button and team/workspace image placeholder; big stat card; testimonial card (placeholder quote and name).
5. Trust bar: "Trusted by" + infinite client-logo marquee (placeholders).
6. Services (numbered cards 01–08): Web Development, Mobile App Development, AI Solutions & Agents, UI/UX Design, Cloud & Hosting, DevOps, SEO & Content, Social Media Marketing. Each: icon, short line, tag chips, "Learn more →". Hover lift + red border glow.
7. Why Nesture Labs: 4 differentiators (AI-first, one team end to end, transparent pricing, long-term support).
8. Process: Discover → Design → Build → Launch → Grow, connected by a web-thread line that draws on scroll.
9. Selected Work: 4–6 project cards with image zoom on hover and service filter chips.
10. Results row: 3 count-up stats (placeholders).
11. Pricing teaser: 3 packages (Starter, Growth, Scale), middle one highlighted "Most popular". Prices as placeholders.
12. Testimonials slider.
13. Latest from the blog: 3 cards.
14. FAQ accordion (6 questions).
15. CTA banner: "Let's build your next product." with slow red gradient/web motion and "Book a Call" button.
16. Footer: logo, tagline, services, company links, contact (info@nesturelabs.com, WhatsApp, Colombo, Sri Lanka), socials (Facebook, X, LinkedIn, Instagram, GitHub, YouTube, TikTok), newsletter, Privacy/Terms/Cookies.
Floating: WhatsApp button with gentle pulse, back-to-top.

Rules: one H1, real text (never baked into images), 44px minimum tap targets, the heavy hero visual must not block first load (use a static image with lightweight CSS motion).
```

---

## Prompt 3 — Remaining Public Pages

```
Using the same design system and header/footer, design these pages (desktop + mobile):
1. Service detail template (hero, problem → solution, features, process, tech stack, related work, pricing, FAQ, CTA) — show it filled for "AI Solutions & Agents".
2. Work/Portfolio grid with service filters.
3. Case study (client, challenge, solution, results with numbers, screenshots, testimonial).
4. Pricing (monthly / one-off toggle, package cards, comparison table, FAQ).
5. Blog listing (search, categories, featured post) and Article (table of contents, author box, reading time, share, related posts, CTA).
6. About (story, founder, process, values, tech stack).
7. Contact (form, WhatsApp, emails, map of Colombo, hours, socials).
8. Get a Quote multi-step form: service → budget → timeline → details → submit, with progress bar and success state.
9. 404 page with a spider hanging from a broken web thread.
```

---

## Prompt 4 — Web System Shell

```
Design the Nesture Labs internal system using the design system. Light mode first, with a dark-mode variant. Motion is functional only.
1. Login and forgot-password screens (split layout: form left, dark brand panel with spider logo and web lines right).
2. App shell: collapsible sidebar (Overview, Leads & CRM, Inbox, Proposals, Projects, Clients, Content Studio, Social Analytics, Hosting & Domains, Invoices, Reports, Website CMS, Settings), top bar with search, notifications, user menu.
3. Admin dashboard: KPI cards (new leads, revenue, active projects, renewals due), activity feed, task list, revenue and lead-source charts.
Include empty states and loading skeletons.
```

---

## Prompt 5 — System Modules (one per run)

```
Using the Nesture Labs app shell, design the [MODULE] screen:
- Leads pipeline: kanban New → Contacted → Proposal → Won/Lost, source icons, quick actions, lead detail drawer.
- Unified inbox: channel filter (Web, WhatsApp, Facebook, Instagram, Email), conversation list, chat panel, AI reply suggestion, link to lead.
- Content Studio: month calendar, post composer with platform previews, "Generate with AI" button, approval status.
- Proposal builder: template picker, package blocks, pricing table, live preview, send and track.
- Hosting tracker: domains/sites table, expiry countdown, SSL and uptime status.
- Invoices & payments: list, status filters, invoice detail/preview.
Include empty, loading and error states.
```

---

## Prompt 6 — Client Portal

```
Design the Nesture Labs Client Portal (desktop + mobile), simpler than the admin system:
Dashboard (project progress bar, next steps, pending approvals, recent files, unpaid invoices), Projects & Approvals, Files, Invoices & Payments, Support Tickets, Content Approvals for social media clients.
```

---

## Review checklist (after each stage)

- Same components on every screen
- Mobile works on every page
- Contrast passes WCAG AA; red never used for long body text
- Every CTA leads somewhere
- Empty and loading states designed
- Motion follows the timing and easing rules
- All stats, logos and testimonials are real before launch (placeholders only in design)
