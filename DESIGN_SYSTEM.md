# Reese Hollister Portfolio Design System

## Visual Direction

The site should read as an academic/public-scholarship portfolio: archive, map, notebook, North Africa, infrastructure, fieldwork, and designed explanation. It should feel serious and editorial, not generic startup or template academic.

## Core Palette (updated 2026-06 — adopted from Reese's own Hurūf La'b brand system)

The portfolio palette is now derived directly from the official Hurūf La'b brand palette
(`design-assets/brand/huruf-palette-01.png`), which also matches Reese's Fulbright Scholar
business card (cream stock, gold rule, navy/espresso serif type). Using his own established
brand makes the site distinctive and authentically his.

- Paper (cream): `#fff4ea`
- Deep paper: `#f4e7d6`
- Ink (espresso): `#281d15`
- Soft ink: `rgba(40, 29, 21, 0.74)`
- Rule line: `rgba(40, 29, 21, 0.16)`
- Rust / clay accent (primary warm): `#9e1c1f`
- Map / Moroccan blue (primary cool): `#006191`
- Gold (highlight, hero kicker, CTA hover): `#f7941d`
- Olive (secondary): `#61692d`
- Sky (soft tint): `#c4dae9`

Implemented as CSS variables in `src/styles/global.css`. Gold is used sparingly (hero kicker,
CTA hover); clay + blue + espresso on cream carry the serious core.

## Signature Hero Imagery (real fieldwork/project assets)

- **Home**: full-bleed cinematic hero using a Chefchaouen (blue city) panorama from Reese's
  Fulbright fieldwork — `public/assets/ui/chefchaouen-01.jpg` (02/03 used in the intro strip).
- **Western Sahara**: the Sidi Ifni Green March mural photo, cropped text-free from the capstone
  deck — `public/assets/projects/western-sahara/ws-mural-hero.jpg`. Case-study artifacts include
  the dual-track timeline and the four-panel "Where is Western Sahara?" map (also from the deck).
- **Hurūf La'b**: the gold-on-blue laʿb brand mark — `public/assets/projects/huruf-lab/huruf-logo.jpg`.
- **From Colonies to Carriers**: real African Airlines source-folder imagery now overrides the older atlas placeholder. The project hero uses `public/assets/projects/from-colonies-to-carriers/2026-06-13__reese-portfolio__asset__v01__african-airlines-routes-from-europe.png`; the case study also uses the 1960 administrative map, Air Afrique advertisement, and RAM ridership chart as source artifacts.
- **Fulbright Morocco**: optimized Chefchaouen fieldwork panorama — `public/assets/ui/2026-06-07__reese-portfolio__asset__v01__chefchaouen-fieldwork-panorama.jpg`.
- Source decks rasterized with `pdftoppm` from `design-assets/western-sahara/capstone-slides.pdf`.

## Typography

- Headings: Newsreader
- Body: Source Serif 4
- Navigation, labels, metadata: Work Sans
- Use large type for page heroes only. Cards, panels, and metadata should stay compact and scannable.

## Layout And Components

- Use full-width page flow with constrained `.site-shell` content.
- Cards should stay simple, editorial, and lightly bordered.
- Avoid nested cards and decorative section containers.
- Use project cards for repeated project entries, resume cards for professional highlights, and proof/support cards for outside links.
- Homepage positioning now uses a proof strip, a large thesis line ("I make difficult ideas clear without making them shallow."), and three service cards. This should remain the primary first-page narrative before adding more animation.

## Asset Choices

Current production assets are intentionally restrained:

- Homepage/about portrait: `public/assets/ui/2026-03-31__reese-portfolio__asset__v01__reese-public-profile.jpg`
- Homepage hero/Morocco visual: `public/assets/ui/2026-03-31__reese-portfolio__asset__v02__google-site-welcome-photo.jpg`
- Publication thumb: `public/assets/ui/2026-03-31__reese-portfolio__asset__v01__history-matters-publication-thumb.jpg`
- Sitewide texture/motif candidates: `paper-grain.svg`, `atlas-grid.svg`, `og-placeholder.svg`
- Strongest project-specific assets: Western Sahara map, dual timeline, Dakhla port photo, contract-programmes diagram, roads one-pager, and the African Airlines route/source-image set
- Placeholder/editorial assets: teaching-support SVG board/poster and the Huruf/Fulbright editorial boards where used as supporting figures

The Western Sahara assets and imported Chefchaouen fieldwork panorama are the strongest current production visuals because they are specific, high-resolution, and tied to real work. The Huruf brand mark is usable, but real product photography should replace it once the blue-tile/prototype frame is available. Teaching-support SVGs remain temporary until an approved classroom or workshop photo is added.

## Asset Rejection Rules

Ignore or replace assets that are visibly AI-generated, distorted, low-resolution, inconsistent with the paper/archive/map identity, or too generic to carry the site. Do not use every asset just because it exists.

## Animation Direction

Pass 3 should be restrained:

- page transitions should be subtle
- scroll reveals should be short, non-blocking, and implemented in the static build path
- project-card hover states should lift gently
- route-line/map motifs should be background texture, not the main content
- every animation must respect `prefers-reduced-motion`

Current static implementation includes a reduced-motion-safe hero entrance, card hover treatment, and scroll reveal script inside `src/build-static.cjs`.

## Interaction Direction (2026-06-12)

The current static build path now uses lightweight interaction to make the site stickier without changing the serious academic/public-scholarship tone.

- Homepage visitor-lens selector: routes admissions committees, employers, coaching clients, public-scholarship viewers, and collaborators toward the strongest proof first.
- Homepage African Airlines sampler: reuses `public/african-airlines/data/stats.json` for a compact country lookup and project stats preview before sending visitors into `/african-airlines/`.
- African Airlines exploratory atlas: the standalone app now leads with question-first views — Time, Country, Network, Institution, and Sources — inside a unified atlas tab shell while preserving legacy Visualize/Statistics hash routes. The view uses copied source imagery from the African Airlines project folder, including the European route-map image as the hero visual and a six-image archive strip.
- Projects page filters: combines topic filtering with a visitor-lens filter so the same project set can be scanned by audience need.
- Writing page filters: lets visitors isolate academic writing, presentations, public scholarship, and Morocco fieldwork dispatches.
- Coaching quiz handoff: completed quiz results now generate a prefilled email with project type, stuck point, and recommended session.

The interaction layer reuses the existing Chefchaouen imagery, African Airlines atlas screenshot, selected African Airlines source images, project assets, app-local ECharts maps, and site palette.
