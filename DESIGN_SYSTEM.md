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

## Asset Choices

Current production assets are intentionally restrained:

- Homepage/about portrait: `public/assets/ui/2026-03-31__reese-portfolio__asset__v01__reese-public-profile.jpg`
- Homepage hero/Morocco visual: `public/assets/ui/2026-03-31__reese-portfolio__asset__v02__google-site-welcome-photo.jpg`
- Publication thumb: `public/assets/ui/2026-03-31__reese-portfolio__asset__v01__history-matters-publication-thumb.jpg`
- Sitewide texture/motif candidates: `paper-grain.svg`, `atlas-grid.svg`, `og-placeholder.svg`
- Strongest project-specific assets: Western Sahara map, dual timeline, Dakhla port photo, contract-programmes diagram, and roads one-pager
- Placeholder/editorial assets: Huruf La'b, Fulbright Morocco, and teaching-support SVG boards/posters

The Western Sahara assets are the strongest current production visuals because they are specific, high-resolution, and tied to real work. The Huruf/Fulbright/teaching SVGs are acceptable temporary placeholders but should be replaced with approved real artifacts when available.

## Asset Rejection Rules

Ignore or replace assets that are visibly AI-generated, distorted, low-resolution, inconsistent with the paper/archive/map identity, or too generic to carry the site. Do not use every asset just because it exists.

## Animation Direction

Pass 3 should be restrained:

- page transitions should be subtle
- scroll reveals should be short and non-blocking
- project-card hover states should lift gently
- route-line/map motifs should be background texture, not the main content
- every animation must respect `prefers-reduced-motion`
