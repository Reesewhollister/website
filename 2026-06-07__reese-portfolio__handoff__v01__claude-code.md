# Claude Code Handoff - Reese Portfolio

## Current State

- GitHub PR: `https://github.com/Reesewhollister/website/pull/1`
- PR branch: `codex/portfolio-site`
- Base branch: `main`
- Local workspace: `/Users/reesehollister/Documents/reese-portfolio`
- Working build path: `npm run check`, `npm run build`, `npm run preview`
- Current generator: `src/build-static.cjs`

The GitHub repo previously contained only a placeholder README. PR #1 imports the working Reese Hollister portfolio site with source assets, project data, design documentation, and a deployable static build.

## Source Of Truth

- Site-wide copy, nav, contact, publications, resume resources: `src/data/site.ts`
- Project case-study data and asset references: `src/data/projects.ts`
- Working renderer/build script: `src/build-static.cjs`
- Visual system and responsive styles: `src/styles/global.css`
- Production assets: `public/assets/`
- Source/reference assets: `design-assets/`

Astro files and MDX files still exist, but they are not the reliable build path right now. Use `npm run astro:*` only when intentionally restoring the Astro pipeline.

## Important Imported Assets

The ignored `design-assets/incoming/` drop zone contained useful source material. These files were copied into tracked asset folders so future Claude Code sessions can inspect and reuse them:

- Morocco fieldwork/source photos:
  - `design-assets/images/P1060276.jpeg`
  - `design-assets/images/P1060278.jpeg`
  - `design-assets/images/P1060279.jpeg`
- Western Sahara source/reference materials:
  - `design-assets/western-sahara/capstone-slides.pdf`
  - `design-assets/western-sahara/mural-band-01.png`
  - `design-assets/western-sahara/mural-band2-01.png`
  - `design-assets/western-sahara/mural-photo-02.png`
  - `design-assets/western-sahara/mural-photo-tight-02.png`
  - `design-assets/western-sahara/slide2full-02.png`

Do not publish source/reference assets directly unless they are curated and copied into `public/assets/` as optimized production assets.

## Validation

Last verified before handoff:

```bash
npm run check
npm run build
```

Expected result:

- `npm run check` validates 15 pages and local assets.
- `npm run build` writes 15 pages to `dist/`.
- `dist/` is generated output and should stay untracked.

## Next Technical Priorities

1. Deploy PR #1 after review.
2. Add a real `robots.txt`, `sitemap.xml`, and final Open Graph image.
3. Decide whether to keep the custom static generator or restore Astro as the sole build pipeline.
4. Reduce duplication between `src/data/projects.ts` and `src/content/projects/*.mdx`.
5. Add final public CV/resume PDFs when approved.
6. Replace temporary Huruf La'b, Fulbright, and teaching-support SVGs with real cleared artifacts.

## Paste-Ready Message To Claude Code

Claude Code, you are working in `/Users/reesehollister/Documents/reese-portfolio` on the Reese Hollister website. The current GitHub PR is `https://github.com/Reesewhollister/website/pull/1` from branch `codex/portfolio-site` into `main`.

Use the working static build path, not Astro, unless the task is explicitly to restore Astro. The important commands are `npm run check`, `npm run build`, and `npm run preview`. The source of truth is `src/data/site.ts`, `src/data/projects.ts`, `src/build-static.cjs`, and `src/styles/global.css`. Treat `dist/` as disposable generated output.

Before designing or redesigning pages, inspect `design-assets/`, `public/assets/`, and `src/assets/`. Important source/reference assets have been imported from the old incoming drop zone into `design-assets/images/` and `design-assets/western-sahara/`; production-ready assets live in `public/assets/`. Do not use every asset. Curate aggressively and document major asset choices in `DESIGN_SYSTEM.md` and `ASSET_INVENTORY.md`.

The site goal is a serious digital-history and public-scholarship portfolio for Reese Hollister: historian of North Africa, educator/writing consultant, and builder of public-facing historical media. Prioritize credibility for PhD committees, employers, coaching clients, collaborators, and YouTube/public-history viewers.
