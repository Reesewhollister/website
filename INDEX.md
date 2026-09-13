# Reese Portfolio Index

## Latest

- UI/UX audit and editorial atlas redesign brief (2026-09-09): [Visual audit, verified findings, asset shortlist, papers, and release plan](2026-09-09__reese-portfolio__audit__v01__ui-ux-redesign.html). Review artifact only; production site unchanged by this audit. Refreshed against source commit `d51bd41`.

- Professional portfolio revision (2026-09-07): [Home](src/pages/index.astro), [Experience](src/pages/experience.astro), [Selected Work](src/pages/projects/index.astro), [About](src/pages/about.astro), [Resume](src/pages/resume.astro), and [Coaching bridge](src/pages/coaching.astro).
- Canonical professional copy and experience: [site data](src/data/site.ts); all nine case studies: [project data](src/data/projects.ts).
- Verification and evidence report: [2026-09-07 portfolio QA](2026-09-07__reese-portfolio__qa__v01__professional-portfolio.md).
- Outstanding public resume and experience evidence: [content checklist](TODO_CONTENT.md).
- Existing `/projects/*`, `/research`, `/teaching`, `/writing`, `/works`, `/african-airlines/`, `/coaching`, and `/resume` routes retained. The production `/youtube` companion hub and Royal Air Maroc route map are retained; `/workflows` redirects to the preserved `/projects/applied-ai-workflows` route, now a secondary process-design case study. No source assets moved.

- Site source for this revision: this opened repository (`/Users/reesehollister/Documents/reese-portfolio`). Prior migration notes describe a different checkout; it was not accessed or modified.
- From Colonies to Carriers deck-first page assets: `public/assets/projects/from-colonies-to-carriers/2026-06-09__from-colonies-to-carriers__deck__v01__african-airlines.pdf` and `public/assets/projects/from-colonies-to-carriers/slides/`
- From Colonies to Carriers published paper/dataset/artifacts: `public/assets/projects/from-colonies-to-carriers/2026-06-09__from-colonies-to-carriers__paper__v01__intro-conclusion.pdf`, `public/assets/projects/from-colonies-to-carriers/2026-06-09__from-colonies-to-carriers__dataset__v01__guttery-16-field.csv`, and `public/assets/projects/from-colonies-to-carriers/2026-06-09__from-colonies-to-carriers__artifact__v01__*.png`
- From Colonies to Carriers current hero/source-image set: `public/assets/projects/from-colonies-to-carriers/2026-06-13__reese-portfolio__asset__v01__african-airlines-routes-from-europe.png` plus the copied 2026-06-13 African Airlines source images.
- African Airlines encyclopedia overlay: `src/airlines-overlay/` reapplies the unified Time, Country, Network, Institution, and Sources atlas after `npm run sync:airlines`; live public app files are in `public/african-airlines/`.
- Truth After Tazmamart deck-first project assets: `public/assets/projects/tazmamart/2026-06-09__tazmamart__deck__v01__truth-after-tazmamart.pdf`, `public/assets/projects/tazmamart/slides/`, and `public/assets/projects/tazmamart/2026-06-09__tazmamart__paper__v01__truth-after-tazmamart.pdf`
- From Colonies to Carriers missing visuals/videos file map: `2026-06-09__from-colonies-to-carriers__file-map__v01__missing-visuals-videos.md`
- Claude Code deck/assets work order: `2026-06-09__reese-portfolio__work-order__v01__claude-code-deck-assets.md`
- Primary project brief: `AGENTS.md`
- Claude-specific instructions: `CLAUDE.md`
- Design system: `DESIGN_SYSTEM.md`
- Asset inventory: `ASSET_INVENTORY.md`
- Open content list: `TODO_CONTENT.md`
- Astro source: `src/pages/`, `src/layouts/`, `src/components/`, `src/data/site.ts`, and `src/data/projects.ts`
- Public pages: `/`, `/about`, `/research`, `/projects`, `/writing`, `/teaching`, `/coaching`, `/resume`, `/contact`
- Project case-study data: `src/data/projects.ts` (includes deck-first From Colonies to Carriers and Truth After Tazmamart pages)
- Production assets: `public/assets/`
- Source/reference assets: `design-assets/`

## Current Canonical Outputs

- Working Astro site source lives in `src/pages/`, `src/layouts/`, `src/components/`, `src/data/site.ts`, `src/data/projects.ts`, and `src/styles/global.css`.
- MDX files in `src/content/projects/` remain as reference copies; live project pages render from `src/data/projects.ts`.
- Shared site copy and links live in `src/data/site.ts`.
- Generated build output lives in `dist/` and should be treated as disposable build output.
- African Airlines app routes: `/african-airlines/#/atlas`, `#/countries`, `#/networks`, `#/institution`, and `#/sources`; legacy `#/viz` and `#/stats` routes remain available.

## Deprecated Paths

- `public/assets/projects/from-colonies-to-carriers/airlines-title.jpg` remains available but is deprecated as the canonical project hero.
