# Reese Hollister Personal Website - Claude Instructions

## Project Purpose

This site is the main professional website for Reese W. Hollister at reesehollister.com: historian, educator, writing consultant, public scholarship creator, and Master of International Studies graduate (NC State, 2026).

The site should be credible for PhD admissions committees, employers in education and international affairs, nonprofit and public history organizations, writing coaching clients, research collaborators, and YouTube viewers.

## Operating Rules

- Work inside this project folder only.
- Default to a short plan before substantial edits.
- Do not invent credentials, publications, awards, jobs, or dates.
- Track missing details in `TODO_CONTENT.md`; do not show raw placeholders on public pages.
- Keep source/reference assets in `design-assets/`.
- Put production-ready assets in `public/assets/` or `src/assets/`.
- Do not overwrite original source assets. Create optimized copies when needed.
- Use `withBase()` from `src/utils/paths.ts` for local route and asset paths.

## Current Handoff

- Current GitHub PR: `https://github.com/Reesewhollister/website/pull/1`
- Current PR branch: `codex/portfolio-site`
- Detailed handoff file: `2026-06-07__reese-portfolio__handoff__v01__claude-code.md`
- The ignored `design-assets/incoming/` drop zone was imported into tracked source folders. Use `design-assets/images/` and `design-assets/western-sahara/` for those source/reference assets.

## Tech Stack

- Working static build script: `src/build-static.cjs`
- Astro 5 source retained for future framework work
- TypeScript
- Canonical content data in `src/data/site.ts` and `src/data/projects.ts`
- MDX reference copies retained in `src/content/projects/`
- Custom CSS in `src/styles/global.css`
- No Tailwind in this project unless the stack is intentionally changed later
- React islands only for genuinely interactive pieces
- Motion and Astro View Transitions are reserved for Pass 3 animation work

## Design Direction

Build a serious digital-history portfolio with creator polish, not a generic academic CV site. The visual language is archive, map, notebook, North Africa, fieldwork, and public scholarship.

Use warm off-white paper, near-black ink, rust, and map blue. Typography is Newsreader for headings, Source Serif 4 for body text, and Work Sans for labels/navigation.

## Local Assets Access

Claude Code has access to the files in this project folder and any local asset folders explicitly added or referenced.

Important asset locations:

- `design-assets/claude/`
- `design-assets/images/`
- `design-assets/logos/`
- `design-assets/mockups/`
- `design-assets/reference-sites/`
- `design-assets/google-sites-screenshots/`
- `public/assets/`
- `src/assets/`

Before designing or redesigning anything, inspect the asset folders and use them as the design source of truth. Do not create a generic website without first reviewing the assets. Build the visual identity from the strongest assets already present. Curate them, optimize them, rename copies if needed, and document how they are used.

Use local assets for hero images, project cards, background textures, logos, Open Graph/social preview images, visual references, screenshots from the old Google Sites portfolio, and design-system inspiration.

Rules:

1. Do not assume every asset should be used.
2. Curate aggressively.
3. Prefer the strongest, cleanest, most professional assets.
4. Reject anything visibly AI-generated, inconsistent, low-resolution, distorted, or off-brand.
5. If an asset is useful but needs editing, create an optimized copy rather than overwriting the original.
6. Put production-ready assets in `public/assets/` or `src/assets/`.
7. Keep source/reference assets in `design-assets/`.
8. Use descriptive filenames.
9. Document major asset choices in `DESIGN_SYSTEM.md`.

Before designing a page, scan the relevant asset folders and summarize:

- what assets exist
- which assets are usable
- which assets should be ignored
- where each selected asset will be used

## Animation Rules

Use animation only to clarify and elevate. Respect `prefers-reduced-motion`. Avoid cursor trails, spinning icons, decorative gimmicks, and over-animated text.

Pass 3 targets:

- Astro page transitions
- scroll reveals for sections
- project card hover lift
- subtle map/grid background motif
- animated route-line motif
- publication-card hover details

## Build Commands

```bash
npm run dev
npm run check
npm run build
npm run preview
```

These commands use the working static generator. Use `npm run astro:build`, `npm run astro:check`, and `npm run astro:dev` only when intentionally returning to the Astro framework pipeline.

Run `npm run build` before finalizing substantial changes.
