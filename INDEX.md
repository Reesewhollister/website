# Reese Portfolio Index

## Latest

- Site source: `/Users/reesehollister/dev/reese-portfolio`
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
