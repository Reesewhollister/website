# AGENTS.md — Reese Hollister Portfolio

## Project Purpose

This is the main professional website for Reese Hollister at reesehollister.com: historian, educator, writing consultant, public scholarship creator, and Master of International Studies graduate (NC State, 2026).

The site is a full redesign and migration of a Google Sites portfolio into a polished, animated, modern static site.

The site should be credible for:
- PhD admissions committees
- Employers in education, international affairs, nonprofits, and public history
- Private writing coaching clients
- Research collaborators
- YouTube viewers

## Site Structure

```
/           Home
/about      Bio, portrait, education, Fulbright, current direction
/research   North Africa, Morocco, aviation, infrastructure, digital history
/projects   Project cards and case studies
/writing    Publications, essays, public scholarship
/teaching   Teaching portfolio: Arabic, writing support, PS 331 TA
/coaching   Writing coaching landing page for parents/students
/resume     Web CV and downloadable PDF (also labels as CV in nav)
/contact    Email, LinkedIn, YouTube, inquiry CTA
```

## Tech Stack

- Working static build script: `src/build-static.cjs`
- Astro 5 source retained for future framework work
- TypeScript
- Canonical content data in `src/data/site.ts` and `src/data/projects.ts`
- MDX reference copies retained in `src/content/projects/`
- Custom CSS via `src/styles/global.css` (NO Tailwind — existing CSS is intentional)
- React islands only where genuinely interactive
- Motion (Framer Motion) for animation — Pass 3, not yet added
- Astro View Transitions — Pass 3, not yet added

## Design Direction

- Professional academic / public-scholarship portfolio
- Visual language: archive, map, notebook, North Africa
- Palette: warm off-white paper, near-black ink, rust accent, map-blue accent
- Typography: Newsreader (headings), Source Serif 4 (body), Work Sans (labels/nav)
- Subtle cinematic polish — serious, credible, not gimmicky
- Mobile-first, accessible, fast

## Animation Rules (Pass 3 — not yet implemented)

- Page transitions via Astro View Transitions / ClientRouter
- Scroll reveal for sections
- Project card hover lift
- Subtle map/grid background motif
- Animated route-line motif
- Publication cards with hover detail reveal
- ALWAYS respect `prefers-reduced-motion`
- No cursor trails, spinning icons, crypto-landing-page gimmicks

## Content Rules

- Do not invent publications, awards, jobs, or credentials
- Track missing details in `TODO_CONTENT.md`; do not expose raw placeholders on public pages
- Update stale language — Reese graduated in May 2026 (not "currently completing")
- Fix typos and polish prose
- Keep Reese's voice but make copy tighter and more professional
- Flagship project pages read as case studies, not resume entries

## Data Architecture

All site-wide copy lives in `src/data/site.ts`. Exports:
- `siteMeta` — title, description, position tagline
- `navLinks` — full nav (Home, About, Research, Projects, Writing, Teaching, CV, Contact)
- `homeIntro` — homepage bio paragraph
- `homePillars` — three-column pillars (Research, Teaching, Building)
- `proofItems` — "Elsewhere" section links
- `aboutTimeline` — three-item career arc
- `roleFit` — "kinds of work that fit best"
- `secondaryWork` — secondary work items for Writing page
- `resumeResources` — download/link list for CV page
- `contactMethods` — contact methods
- `researchAreas` — four research areas for Research page
- `publications` — curated publication list with verified titles/links
- `teachingRoles` — three teaching/consulting roles for Teaching page
- `coachingServices` — four coaching service descriptions for Coaching page

## Project Content

Projects are generated from `src/data/projects.ts`. MDX files in `src/content/projects/` are reference copies from the Astro pass and should be kept synchronized only if the Astro framework pipeline is restored.

Current projects:
- `huruf-lab.mdx` — Hurūf La'b, sortOrder: 1, featured
- `western-sahara-capstone.mdx` — Western Sahara roads, sortOrder: 2, featured
- `from-colonies-to-carriers.mdx` — African airlines digital history, sortOrder: 3, featured
- `fulbright-morocco.mdx` — Fulbright Morocco research, sortOrder: 4, featured
- `teaching-writing-support.mdx` — Teaching and writing support, sortOrder: 5, not featured

## Asset Rules

- Put project assets in `public/assets/projects/<project-slug>/`
- Put UI/shared assets in `public/assets/ui/`
- Use `withBase()` from `src/utils/paths.ts` for all local asset and route paths
- Production-ready assets go in `public/assets/` (source/reference assets in `design-assets/`)
- Prefer the strongest, cleanest, most professional assets
- Reject anything visibly AI-generated, low-resolution, or off-brand

## Local Asset Folders

When working on the website, inspect before inventing visual elements:
- `design-assets/claude/` — Claude-generated design assets
- `design-assets/images/` — raw image references
- `design-assets/logos/` — logo sources
- `design-assets/mockups/` — mockups and layout references
- `design-assets/reference-sites/` — reference site screenshots
- `design-assets/google-sites-screenshots/` — old Google Sites screenshots
- `src/assets/` — build-processed assets if needed later
- `public/assets/ui/` — production UI assets
- `public/assets/projects/` — production project assets

Before designing a page, scan relevant asset folders and summarize what exists, what is usable, and where each selected asset will be used. Document major asset choices in `DESIGN_SYSTEM.md`.

Current asset/process docs:
- `CLAUDE.md` — Claude Code instructions and local asset access rules
- `INDEX.md` — latest canonical files and output locations
- `DESIGN_SYSTEM.md` — current visual system and asset choices
- `ASSET_INVENTORY.md` — current asset audit
- `TODO_CONTENT.md` — non-public list of unresolved content items

## Development Phases

- **Pass 1 (done):** Static architecture — pages, routes, content collections, basic layout
- **Pass 2 (done):** Visual design — typography, color, spacing, cards, images, assets
- **Current working pass:** Static site is buildable through `src/build-static.cjs`; Astro CLI commands are retained separately but stalled locally during cleanup
- **Pass 3 (next):** Animation — restrained hover states and reduced-motion-safe enhancements, after visual QA
- **Pass 4:** Content migration — MDX content from Google Sites, biography update, typo fixes
- **Pass 5:** Deployment — build, preview, Vercel, connect reesehollister.com domain

## Build Commands

```bash
npm run dev      # local development
npm run build    # production build (run before finalizing major changes)
npm run preview  # local production preview
npm run check    # static site data/page/asset check
npm run astro:build # Astro framework build, currently not the reliable path
```

Always run `npm run build` before finalizing substantial changes.

## Component Rules

- Prefer reusable components in `src/components/`
- Keep canonical project and site content in `src/data/`
- Components: SiteHeader, SiteFooter, BaseLayout, ProjectLayout, ProjectCard, SectionHeading, ArtifactFigure, ProjectFilters

## Homepage Hero Target

```
REESE W. HOLLISTER

Historian of North Africa.
Educator and writing consultant.
Creator of public-facing historical media.

I study how states, infrastructures, languages, and archives
shape life after empire — from Moroccan mountain towns to
African airlines.

[View Research] [Read Writing] [Work With Me] [Download CV]
```
