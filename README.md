# nesturelabs-site

Production build of the Nesture Labs home page (nesturelabs.com).

- `design/` — approved Claude Design prototype and motion spec (source of truth)
- `docs/` — the design prompts the prototype was built from
- `public/brand/` — logo, icon and favicon files
- `CLAUDE.md` — build spec: read this first

## Getting started
```bash
npx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir --import-alias "@/*"
npm install gsap lenis
npm run dev
```
