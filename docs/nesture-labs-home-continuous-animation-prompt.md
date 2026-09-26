# Nesture Labs Home — Continuous Spider Journey (Claude Design continuation prompt)

Paste the block below into the same Claude Design project that holds `Nesture Labs Home.dc.html`.

---

```
Extend the Nesture Labs home page to the COMPLETE page, with ONE continuous spider animation that never breaks.

THE CORE RULE — ONE UNBROKEN THREAD
- There is exactly one spider and one dragline thread for the whole page. The thread starts at the logo in the nav and is drawn continuously as the user scrolls, passing through every section, and ends at the spider's landing point in the final CTA. It is never cut, never restarted, and every web, hub, node and section anchor on the page is attached to it.
- The spider is always somewhere on that thread: walking along it, hanging from it, sitting at a hub, or rappelling down it. It never teleports, fades out or disappears between sections. If a section needs it elsewhere, it travels there visibly.
- The thread persists behind sections already passed (dimmed to 25% opacity) so scrolling back shows one continuous connected web, not separate scenes.
- Keep the locked rig and gait exactly as built: chip body from logo-dark.svg, 8 legs with 2-bone IK, alternating tetrapod gait (L1,R2,L3,R4 / R1,L2,R3,L4), feet planted in world space, 2.5px body bob, core pulse, heading easing, all scroll-position driven and fully reversible.
- Movement style adapts to the section but the character stays one continuous being: walking (horizontal travel), rappelling (vertical drops between sections), hanging upside down (while a section is read), spinning (wrapping), scuttling fast (long empty gaps).

PAGE STRUCTURE — rebuild the home page with every section below, in this order, matching the existing site's content (screenshot supplied), restyled into the Nesture Labs dark red-on-black brand. Each section gets its beat in the single journey.

1. HEADER / NAV
- Sticky pill nav: logo lockup left; Home, About, Services, Portfolio, Blog, Contact; right: WhatsApp icon + "Get a Quote" (red, glow). Shrinks and blurs on scroll.
- Journey beat: the thread's origin. At scroll 0 the spider sits on the logo; as scrolling starts it drops off the nav on the first thread segment.

2. HERO
- Eyebrow "● NESTURE LABS". Headline: "Building Tomorrow's AI Systems that Scale." with a typing/cursor effect on the last phrase, rotating through: "Scale.", "Convert.", "Never Sleep." Subtext: "Ready to transform your ideas into reality? Let's discuss your project and create something amazing together."
- CTAs: "Start Your Project" (red, glow) and "Watch Our Demo" (glass, play icon).
- 4 pillar cards: Web App Development, Mobile App Development, AI Solutions Development, Digital Marketing — each with icon, one line, and a thread stub connecting it up to the main dragline.
- Journey beat (Scene 1, keep existing): spider walks in on its dragline, headline reveals in its wake, pillar cards hook onto the thread as it passes. Text renders immediately; animation is additive.

3. SERVICES — "Our Services Tailored for Your Success"
- Sub: "Comprehensive technology solutions designed to accelerate your digital transformation."
- 7 cards, each with icon, description, 4–6 feature bullets and "Learn more →": Web Development; Mobile Development; AI & Automation; UI/UX Design; Cloud & DevOps; Support & Maintenance; Digital Marketing.
- Button below: "Get Started Today".
- Journey beat (Scenes 2–4 rebuilt into this section): the spider builds the orb web in real order (bridge → Y-frame → frame → radials → aux spiral → capture spiral); 7 glitch bugs — "Slow website", "No mobile app", "Manual work", "Confusing UX", "Downtime", "Breakages", "No leads" — hit the web and vibrate it; the spider wraps each into a cocoon that becomes the matching service card. Keep the problem→solution kicker on every card.

4. TRUSTED — "Trusted in the Global Sector"
- Sub line, then an infinite marquee of client/tech logos, then 4 stat tiles: Projects Completed, Happy Clients, Success Rate, Years Experience — all as placeholders [X+] until real numbers are supplied.
- Journey beat: the thread runs horizontally through the marquee like a wire; logos hang from it and sway slightly. The spider rides the thread left-to-right with the marquee, then stops at the stats and taps each tile, making its number count up.

5. WHY CHOOSE NESTURE LABS
- 6 cards: Full-Stack Expertise, Startup Friendly, Agile Methodology, AI-Driven Solutions, 24/7 Support, Enterprise Security. Each: icon, title, 2 lines, coloured accent edge.
- Journey beat: the thread splits into 6 branch threads; the spider runs out along each branch and back to the hub, and each card powers on as its branch completes (a data pulse travels out, the card lights, the pulse returns).

6. HOW WE WORK — process timeline
- 6 steps alternating left/right along a vertical line: Discover, Design, Develop, Test, Deploy, Support. Each has a numbered node, title and description.
- Journey beat: the vertical line IS the dragline. The spider rappels down it, and each step's node lights and its card slides in as the spider passes. Scrolling up walks it back up the same line.

7. RESULTS / STATS BAND
- 4 count-up tiles: Projects Delivered, Happy Clients, Years Experience, Countries Served — placeholders until real numbers.
- Journey beat: one web multiplies into a small connected network across the band, nodes lighting as numbers count.

8. PORTFOLIO PREVIEW — "Selected Work"
- Filter chips by service; 6 project cards hanging from threads (striped placeholder image slots, Project A–F), hover: thread tightens, card lifts, image zooms. "View all work →".
- Journey beat: the spider's lair — it sits at the top hub while the cards hang and swing gently into place from the main thread.

9. TESTIMONIALS — "What Our Clients Say"
- Google-style review card with 5-star rating, quote, avatar, name, role, and slider dots. Placeholder names until real reviews are supplied.
- Journey beat: testimonial cards slide along a horizontal thread like beads; the spider sits on the thread and turns toward the active card.

10. TECH STACK — "Our Tech Stack"
- Grid of 12 tech cards with logos and short labels: React, Next.js, Node.js, Python, Flutter, TensorFlow, MongoDB, PostgreSQL, AWS, Docker, Kubernetes, Firebase. Grouped or tagged by Frontend / Backend / Mobile / AI / Cloud / Database.
- Journey beat: the thread becomes a circuit board grid; each tech card is a chip soldered onto a node, lighting up as a data pulse reaches it.

11. FAQ
- Accordion, 6 questions (pricing, timelines, support, ownership of code, process, working across time zones). Opening an item draws a short thread to the answer.
- Journey beat: the spider hangs upside down beside the accordion, reacting when an item opens.

12. FINAL CTA — "Let's Build the Future Together"
- Full-width block, red/black brand gradient (NOT purple/blue — replace the old gradient), text: "Ready to transform your ideas into reality? Let's discuss your project and create something amazing together." Buttons: "Book a Free Consultation" (red) and "View Our Work" (glass). Three trust badges: Free Consultation, No Obligation Quote, 24/7 Support.
- Journey beat: the end of the thread. The spider rappels down the final segment into the middle of the block and lands; on landing a ripple spreads and the buttons and badges appear.

13. FOOTER
- Logo + short description; columns: Services, Company, Resources, Legal; contact block (info@nesturelabs.com, WhatsApp, Colombo, Sri Lanka); social icons; newsletter input + subscribe; copyright.
- Journey beat: the spider sits small on the footer's top border; clicking it climbs the whole thread back to the top and scrolls the page with it.
- Floating: WhatsApp button (gentle pulse) and back-to-top.

CONTINUITY MECHANICS (build these as one system, not per scene)
- One master SVG overlay spans the full page height, holding the thread path, all hubs and the spider; sections scroll normally underneath it.
- The thread is a single SVG path; scroll progress drives stroke-dashoffset so it draws continuously from 0% to 100% across the whole page.
- The spider's position = a point on that path at the current scroll progress (motion path), so its travel is inherently continuous and reversible.
- Section beats are timeline segments on the same master timeline, not separate pinned stories; pin only where a beat needs to play in place (services build, process descent, final landing).
- Anchors: each section declares an attachment point; the thread is generated through those points, so layout changes don't break it.
- Keep the existing fit-scale and shed rules, and deliver them as one table (viewport height → scale → what is shed) instead of per-scene numbers.

PERFORMANCE / ACCESSIBILITY
- 60fps target; transform, opacity and stroke-dashoffset only; the thread path is simplified for long pages; sections below the fold are lazy-initialised.
- prefers-reduced-motion: the thread is drawn statically, the spider sits at each section's anchor, no pinning and no walking.
- Real HTML text, one H1, WCAG AA contrast, 44px tap targets, animation layer aria-hidden.
- All content placeholders where real data is missing: [X+] stats, Project A–F, testimonial names.

DELIVERABLE
Desktop 1440 full home page in one file, with the continuous journey working end to end. Mobile 390 after approval (spider travels the left edge, 4 bugs, no cursor effects). Then the motion spec and component sheet.
```

---

## After it delivers, check

1. Scroll from top to bottom without stopping — the spider must always be visible on the thread; no jumps between sections.
2. Scroll back up — the thread un-draws and the spider retraces the same path.
3. The thread visibly connects: nav → hero cards → services web → marquee → why-us branches → process line → stats network → portfolio hangers → testimonials → tech grid → FAQ → CTA landing → footer.
4. Section content is readable without the animation (refresh mid-page).
5. Frame rate stays smooth over the whole page, not just the hero.
