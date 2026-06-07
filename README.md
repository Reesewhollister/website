# Reese Hollister Portfolio

Static portfolio site for Reese Hollister. The site is designed to feel editorial, calm, and distinct rather than template-driven, with case-study pages that foreground research, teaching, and building work.

## Stack

- Lightweight static build script in `src/build-static.cjs`
- Astro source files retained for future framework work
- Canonical project/content data in `src/data/`
- Self-hosted typography via `@fontsource`
- No backend, database, or client framework

## Local Development

Use Node 22. This repo includes `.nvmrc` and `.node-version` so version managers and deployment platforms can pick the intended runtime.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the local dev server:

   ```bash
   npm run dev
   ```

3. Run project checks:

   ```bash
   npm run check
   ```

4. Build the static output:

   ```bash
   npm run build
   ```

5. Preview the production build:

   ```bash
   npm run preview
   ```

## Content and Asset Structure

- `src/data/projects.ts`
  - Canonical data for the five current project pages.
- `src/data/site.ts`
  - Shared site metadata, public profile links, homepage proof blocks, and resume / CV resource slots.
- `src/content/projects/`
  - MDX reference copies retained from the Astro pass; the working static build currently uses `src/data/projects.ts`.
- `CLAUDE.md`
  - Claude Code standing instructions and local asset access rules.
- `INDEX.md`
  - Latest canonical files and output locations.
- `DESIGN_SYSTEM.md`
  - Current visual system, asset use, and animation direction.
- `ASSET_INVENTORY.md`
  - Current asset audit and curation notes.
- `TODO_CONTENT.md`
  - Non-public list of unresolved content items.
- `design-assets/`
  - Source/reference assets. Keep originals here instead of publishing them directly.
- `public/assets/projects/western-sahara/`
  - Imported capstone visuals and one-pager PDF from the approved `Capstone` workspace.
- `public/assets/ui/`
  - Public-facing profile image, original Google Site Morocco photo, publication thumbnail, and sitewide texture assets.
- `public/assets/projects/huruf-lab/`
  - Placeholder visual system pending real prototype photos.
- `public/assets/projects/teaching-writing-support/`
  - Placeholder visual system pending real teaching artifacts.

## Updating Content

- Edit homepage, about, resume, contact, and shared site copy in `src/data/site.ts` and `src/build-static.cjs`.
- Edit project case-study data in `src/data/projects.ts`.
- Keep MDX reference copies in `src/content/projects/*.mdx` synchronized only if returning to the Astro pipeline.
- Update public links, contact routes, and proof-section content in `src/data/site.ts`.
- Replace temporary art with approved public files by copying them into `public/assets/projects/<project>/` or `public/assets/ui/` and updating `src/data/projects.ts`.
- Copy for several sections is informed by connected Google Drive source documents, but raw Drive documents are not published by default.

## Vercel Deployment

- Build command: `npm run build`
- Output directory: `dist`
- Optional environment variable:
  - `SITE_URL=https://reesehollister.com`
- Leave `SITE_BASE_PATH` unset for the root domain.

## GitHub Pages Deployment

For a project site such as `https://<username>.github.io/reese-portfolio/`, build with an explicit base path:

```bash
SITE_URL='https://<username>.github.io' SITE_BASE_PATH='/reese-portfolio/' npm run build
```

Then deploy the contents of `dist/` to the `gh-pages` branch or via a GitHub Actions workflow.

If you instead use a user site root such as `https://<username>.github.io/`, build with:

```bash
SITE_URL='https://<username>.github.io' npm run build
```

## Netlify Deployment

- Build command: `npm run build`
- Publish directory: `dist`
- Optional environment variable:
  - `SITE_URL=https://<your-netlify-domain>`
- Leave `SITE_BASE_PATH` unset for a root deploy.

## Current Content Gaps

- Export public resume and CV PDFs if you want local downloads instead of email-request language.
- Replace temporary Huruf La'b and teaching-support visuals with actual project artifacts.
- Add more approved public-facing slides, photos, or teaching materials as they are selected.
- Keep unresolved content details in `TODO_CONTENT.md` rather than showing placeholders on public pages.
