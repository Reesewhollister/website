# Reese Portfolio Index

## Latest

- Site source: `/Users/reesehollister/Documents/reese-portfolio`
- Primary project brief: `AGENTS.md`
- Claude-specific instructions: `CLAUDE.md`
- Design system: `DESIGN_SYSTEM.md`
- Asset inventory: `ASSET_INVENTORY.md`
- Open content list: `TODO_CONTENT.md`
- Claude handoff: `2026-06-07__reese-portfolio__handoff__v01__claude-code.md`
- GitHub draft PR: `https://github.com/Reesewhollister/website/pull/1`
- Working static build script: `src/build-static.cjs`
- Active homepage positioning: `src/data/site.ts`, `src/build-static.cjs`, `src/styles/global.css`
- Public pages: `/`, `/about`, `/research`, `/projects`, `/writing`, `/teaching`, `/coaching`, `/resume`, `/contact`
- African Airlines encyclopedia app: served at `/african-airlines/` from `public/african-airlines/` — a snapshot synced from `~/Documents/colonies-to-carriers` via `npm run sync:airlines` (`src/sync-airlines.cjs`); do not edit the snapshot directly
- Project case-study data: `src/data/projects.ts`
- Production assets: `public/assets/`
- Source/reference assets: `design-assets/`
- Latest production Fulbright image: `public/assets/ui/2026-06-07__reese-portfolio__asset__v01__chefchaouen-fieldwork-panorama.jpg`
- Imported source photos: `design-assets/images/P1060276.jpeg`, `design-assets/images/P1060278.jpeg`, `design-assets/images/P1060279.jpeg`
- Imported Western Sahara source assets: `design-assets/western-sahara/capstone-slides.pdf`, `design-assets/western-sahara/mural-*.png`, `design-assets/western-sahara/slide2full-02.png`

## Current Canonical Outputs

- Working static site source lives in `src/build-static.cjs`, `src/data/site.ts`, `src/data/projects.ts`, and `src/styles/global.css`.
- Astro page and MDX files remain in `src/` as framework source/reference for a future Astro pass.
- Shared site copy and links live in `src/data/site.ts`.
- Generated build output lives in `dist/` and should be treated as disposable build output.
- Homepage now includes the thesis/proof/service-card structure and reduced-motion-safe reveal behavior in the static generator.

## Deprecated Paths

- No files were moved or deprecated in this cleanup pass.
