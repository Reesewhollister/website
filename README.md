# Reese Hollister Portfolio

Static Astro portfolio site for Reese Hollister. The site is designed to feel editorial, calm, and distinct rather than template-driven, with case-study pages that foreground research, teaching, and building work.

## Stack

- Astro static site
- MDX content collection for flagship project case studies
- Self-hosted typography via `@fontsource`
- No backend, database, or client framework

## Local Development

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

- `src/content/projects/`
  - MDX case studies for the four flagship projects.
- `src/data/site.ts`
  - Shared site metadata, public profile links, homepage proof blocks, and resume / CV resource slots.
- `public/assets/projects/western-sahara/`
  - Imported capstone visuals and one-pager PDF from the approved `Capstone` workspace.
- `public/assets/ui/`
  - Public-facing profile image, original Google Site Morocco photo, publication thumbnail, and sitewide texture assets.
- `public/assets/projects/huruf-lab/`
  - Placeholder visual system pending real prototype photos.
- `public/assets/projects/teaching-writing-support/`
  - Placeholder visual system pending real teaching artifacts.

## Updating Content

- Edit homepage, about, resume, and contact copy in the corresponding files under `src/pages/`.
- Edit case-study frontmatter and narrative content in `src/content/projects/*.mdx`.
- Update public links, contact routes, and proof-section content in `src/data/site.ts`.
- Replace placeholder art with approved public files by copying them into `public/assets/projects/<project>/` or `public/assets/ui/` and updating the MDX frontmatter/component references.
- Copy for several sections is informed by connected Google Drive source documents, but raw Drive documents are not published by default.

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

## Current TODOs

- Export public resume and CV PDFs if you want local downloads instead of the current placeholders.
- Replace placeholder Huruf La'b and teaching-support visuals with actual project artifacts.
- Add more approved public-facing slides, photos, or teaching materials as they are selected.
