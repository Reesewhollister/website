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
- **From Colonies to Carriers**: real African Airlines source-folder imagery now overrides the older title/atlas placeholder. The project and atlas hero use `public/assets/projects/from-colonies-to-carriers/2026-06-13__reese-portfolio__asset__v01__african-airlines-routes-from-europe.png`; the app uses a unified Time, Country, Network, Institution, and Sources atlas shell with a six-image archive strip.
- **Fulbright Morocco**: real fieldwork photography now carries this project instead of placeholder
  SVGs. Hero is the Essaouira Atlantic harbor (`atlantic-harbor-essaouira.jpg`); the "What to notice"
  mosaic pairs place and evidence — the painted Sahara border map (`merzouga-sahara-map.jpg`), Jebel
  Shams in Oman (`jebel-shams-oman.jpg`), the Essaouira rampart wall (`essaouira-atlantic-wall.jpg`),
  and two archive-grounding shots sourced from the Substack fieldwork dispatches: the Mohammed VI
  Library display case at Al-Akhawayn University (`aui-archive-display-web.jpg`) and the AUI campus
  (`aui-campus-reese-web.jpg`). The two AUI images were downsized from ~4MB originals to 1200px-wide
  web copies with `sharp`. These connect the project's stated archive (colonial-era postcards, letters,
  advertisements, maps) to a verifiable physical research site.
- Source decks rasterized with `pdftoppm` from `design-assets/incoming/capstone-slides.pdf`.

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

## Asset & Motion System integration (Hybrid)

The "Asset & Motion System" handoff (`design_handoff_asset_system`) is being integrated
in **Hybrid** mode: home + about keep the current Huruf-derived palette and Source Serif 4 /
Work Sans type; the new system applies to the **research surfaces** (project pages, datasets,
From Colonies to Carriers, covers, OG) and converges over time.

**Scoping mechanism.** The new register lives behind a `.system` / `[data-system]` wrapper
class. Its tokens are prefixed `--sys-*` (ink `#15130F`, terracotta `#B0512B`, brass `#C2913D`,
zellige-green `#1E5E50`, parchment `#F1E9D9`) with **Spectral** (body) + **IBM Plex Mono**
(labels) + Newsreader (display). Base pages are untouched. See `global.css` top + `:root`/`.system`
blocks. New fonts added via `@fontsource/spectral` + `@fontsource/ibm-plex-mono`.

**Assets.** The four new animated SVGs (compass, atlas-grid, zellige-strip, diamond-divider)
are staged under `public/assets/ui/system/` so the home-register originals at
`public/assets/ui/` stay intact. The signature route map is `system/maps/ram-network.svg`
(to be made data-driven in Phase 2). Line icons live in `public/assets/ui/icons/`.

### Phase 1 (done) — Foundation kit
- Added Spectral + IBM Plex Mono (`@fontsource`); scoped `.system` token + type block in `global.css`.
- Staged the 4 new animated ornaments + route map into `public/assets/ui/system/`.
- Replaced home-page "What are you here to see?" **emoji with the line-icon set** (inline SVG,
  `currentColor`, kept in the home register: olive default → rust on hover) in `ChoosePath.astro`.

### Phase 2 (done) — RAM route map
- `src/data/ramNetwork.ts` — the real early Royal Air Maroc network (24 destinations with
  lon/lat, hub CMN, region, opening year) + equirectangular projection helpers and coastlines.
  This is the map's data source; the Guttery 16-field CSV is airline-level and has no route coords.
- `src/components/RouteMap.astro` — server-renders the projected SVG (graticule, coastlines,
  24 draw-on arcs colored by region brass/ember/zellige, 24 traveling planes, destination
  nodes + IATA labels, pulsing CMN hub, legend). Scoped `.system` (dark ink section).
- Motion is **CSS-driven, not SMIL**: arcs draw via `@keyframes` on `stroke-dashoffset`,
  planes travel via `offset-path` + `offset-distance`, hub pulses via transform scale — all
  inside `@media (prefers-reduced-motion: no-preference)`. Resting state = fully drawn/static
  (freeze-safe). `@supports not (offset-path)` hides planes where unsupported (older Safari).
- Wired via a `routeMap?: boolean` flag on `Project` (set on `from-colonies-to-carriers`);
  `ProjectLayout` renders it after the hero + adds a "Route map" subnav anchor.

### Phase 3 (done) — Covers + chart language
- `src/components/CoverFrame.astro` — the brass corner-brackets + zellige-diamond overlay
  (literal colors, works in any register).
- `src/components/ProjectCover.astro` — the reusable framed 16:10 cover: image + ink gradient
  + CoverFrame + IBM Plex Mono ember eyebrow + Newsreader title. `showText` toggles the title
  overlay. This is the one template for card thumbnails now and project headers / OG / PDF
  covers later (OG raster generation deferred — that's an export step).
- `ProjectCard` gained a `framed` prop → renders the media via `ProjectCover` (showText=false).
  The `/projects` index passes `framed`, so every project card carries the cover frame; home
  cards stay in the base register. Hover zoom + reduced-motion handled in `global.css`.
- `src/components/Sparkline.astro` — reusable draw-on mini line chart (reduced-motion safe).
- Route map now carries a **stat strip** (chart language): a sparkline of cumulative RAM
  destinations 1957–1970 computed from `ramNetwork` data, plus stat cards (24 destinations,
  723 airlines [zellige], 1956 independence [terracotta]).

### Home page reinvention (done)
The front page hero was rebuilt in the new system register (a deliberate step beyond the
original Hybrid line, which kept home in the base register). `src/pages/index.astro` hero is
now `.system home-hero`: the Hassan II mosque video darkened behind an animated route-fan
backdrop (`src/components/HeroMap.astro`) + the rotating system compass; an IBM Plex Mono
brass coordinate eyebrow; a Newsreader title with the final word in ember italic; Spectral
lead; mono pill tags; terracotta CTA; and a lat/long footer. Page ornaments (zellige strip,
diamond divider, atlas/compass deco) now point at the `system/` animated SVGs. `home-hero`
was added to the reveal-exemption list in `BaseLayout.astro` so the hero paints solid on first
load (handoff rule: resting state visible). `HeroMap` motion is CSS-driven + reduced-motion safe.
The sections below the hero (proof strip, ChoosePath, featured, projects, CTA) keep their
structure and the existing scroll-reveal; converging them into `.system` can come later.

### Phase 4 (planned)
4. Cinematic scroll-reveal motion (freeze-safe, `prefers-reduced-motion`-gated): section
   fade-rise, hero parallax behind the Hassan II video. Plus, when ready: OG raster export
   from `ProjectCover`, and rolling `.system` chrome deeper into project bodies.

## Professional portfolio hierarchy — 2026-09-07

This revision supersedes the homepage composition described above. The route map, cover-frame system, and YouTube companion hub remain available. The map is labeled as an illustrative reconstruction with approximate years.

This pass preserves Newsreader, Source Serif 4, Work Sans, the warm paper/ink palette, rust and map-blue accents, geographic motifs, and existing project materials. New capability, experience, and contact sections use the existing editorial language.

- Homepage: existing high-resolution Chefchaouen fieldwork photo (`public/assets/fieldwork/heroes/chefchaouen-blue-plaza-hero-16x9.webp`) with a dark text scrim. A still image keeps the longer professional introduction readable and avoids automatic motion; original video files remain intact.
- University support: existing real classroom photo (`public/assets/projects/teaching-writing-support/teaching-presentation.jpg`). The generic teaching diagram is retained on disk but not presented as a real work artifact.
- Huruf La’b: existing tile hero, product photographs, demonstrations, and VenturePack award photo. No new product or people imagery.
- Airlines: existing historical route-map hero and all decks, maps, data, and paper assets retained.
- Public history: existing Mohammed VI Library archive display (`public/assets/projects/fulbright-morocco/aui-archive-display-web.jpg`), explicitly captioned as research context; no museum employment implied. The local presentation-poster file is invalid image data and was rejected.
- About: AUI portrait and Morocco fieldwork grid retained. Homepage social image already contains only fieldwork photography, so no obsolete identity text needs replacing.
- Case-study objective/actions/deliverables/result now appear before long decks. Role and skills remain in the opening overview.
- Primary navigation has six portfolio destinations and a distinct rust College Essay Coaching button. Square is the single booking destination. Mobile navigation wraps with full-size tap targets and does not occupy a sticky block while scrolling.
- Existing uncommitted design-system additions, ChoosePath changes, new icon/system assets, and dependency edits have been preserved.

- A secondary Digital Research and Process Design case study preserves the live website’s workflow URLs and four proposed process examples. It uses the existing airline atlas screenshot as research context and is not featured.

## Map hero (home)

`src/components/MapHero.astro` renders an atlas plate beside a catalogue rail. The plate is
projected at **build time** with `d3-geo` + `topojson-client` over `world-atlas` 110m — no map
library, tiles, or runtime fetch reach the browser; only a small interaction script does.

- Geography, roles, and project links live in `src/data/places.ts` — the only file to edit when
  places change. The index, nodes, dossier, prev/next order, and counts all derive from it.
- Two vocabularies, never mixed: solid rust marks are **places worked or studied**; a pale blue
  diagonal hatch is **what a project studies** (Africa, Western Sahara, Morocco), shown on a
  related-work hover/focus or via the legend toggle.
- Morocco is drawn once, as a merged 504 + 732 silhouette with the shared border omitted.
- The place index is the canonical text alternative; map nodes are real buttons with arrow-key
  roving and Escape to collapse a cluster zoom.
- Images: Morocco uses `chefchaouen-blue-plaza-hero-16x9.webp`, Ifrane uses
  `mohammed-vi-library-aui-hero-16x9.webp`. Everything else renders a designed "Image needed"
  placeholder, and a broken path degrades into the same placeholder rather than a broken image.

### Pinned evidence

Selecting a place lifts its photograph or film **out of the pin** on a hairline leader: a 0.52s
rise that overshoots slightly, then a 5.5s float of ±6px while it stays selected. The card reads
as a physical thing pulled up from the map rather than a panel that faded in.

- Cards hang from the side that keeps them on the plate (`cardSide`, derived from the pin's
  position, overridable per place where the automatic side would cover a neighbouring pin).
- They counter-scale with a cluster zoom, so a card is the same size at world scale and at 7×.
- Video is a **facade**: the poster is a local JPEG and nothing is requested from YouTube until
  someone presses play, at which point a `youtube-nocookie` embed replaces the poster. Changing
  place tears the embed down, so a hidden card can never keep playing audio.
- Below 900px the cards are suppressed — there is no room to float one over a 46vh plate — and
  the same media, play button included, appears in the dossier.
- On desktop the plate opens with Manah already pinned after 700ms, so the first look is a map
  and a film still rather than a paragraph. It is cancelled by the first pointer or key input,
  and Manah is used because selecting a cluster would zoom away the world view.

## Home page, below the plate

**Credential band.** The proof strip is now four facts on ink (`.credential-band`), full-bleed,
directly under the map. Each carries a small drawn pin whose outline strokes on when the section
reveals. It breaks the page's rhythm exactly where the eye leaves the plate, and it reads in one
pass rather than as a paragraph. Four columns on desktop, two below 900px, one below 560px.

**Wide work cards.** Featured work on the home page uses `<ProjectCard wide />`: a half-width
photographic plate on the left, the writing on the right, gold corner brackets inset over the
image, and a 4px lift with a 1.055 image scale on hover. One card per row, so each case study gets
a photograph at a size worth looking at. `/projects` and `/research` keep the existing grid — the
variant is opt-in, so nothing else changed.

**Prose moved.** `homeIntro` now runs as the Capabilities section intro rather than sitting under
the hero, which keeps the first screen to a map, a name, and four words.

## The research atlas

The plate is now a **world** map (`MAP.frame` in `src/data/places.ts`, Equal Earth,
rotate 14°, cropped to lat −50…76 with Antarctica excluded). It has to be: the published
work is set in Vietnam, Japan, South Africa and the American West, none of which fit the
old Atlantic frame.

Three vocabularies, and keeping them distinct is the whole point of the map:

| Meaning | Mark |
|---|---|
| Lived or worked there | Solid rust dot |
| Travelled through | Hollow rust ring |
| Wrote about it | Blue paper-sheet marker + a permanently hatched region |

A **sheet** rather than a pin, because it is a different kind of claim: it says a paper
exists about this place, not that Reese stood there. Paper regions are always lit;
project subject regions (Africa, Western Sahara, Morocco) stay on-demand behind the
legend toggle, so the two never compete.

`src/data/papers.ts` is the single source for the five published articles — used by the
map, `/research` and `/writing`. Links go to the open-access journal, never to a
re-hosted PDF. Two journals publish per issue rather than per article, so those cite page
numbers against the issue page. Every `summary` paraphrases a thesis sentence from the
author's own manuscript.

The rail puts the **record above the lists** on desktop (`order` in the `min-width: 901px`
block): with two indexes, a dossier underneath them sits far enough down that selecting a
place would update something off-screen.

Places with no photograph render **no frame at all** in production. The designed
"Image needed" placeholder is dev-only (`import.meta.env.DEV`), though the broken-image
fallback still swaps to it at runtime — a placeholder beats a broken image icon.

## Atlas hero + chronology rail — 2026-09-13

**The map is the hero, and the timeline drives it.** `MapHero.astro` opens the home page.
Inside it, above the plate, sits a chronology rail (`.chrono`): one stop per chapter of
`aboutTimelineFull`, newest first, so stepping "Earlier" walks backwards through time.
Choosing a stop calls the atlas's own `select()` — the plate flies to the place that
chapter happened in and the dossier fills with that place's record. It is a second way
into the same map, not a second component: there is one selection state, and it syncs
both directions. Driving the map directly lights the matching stop; selecting a place
that belongs to no chapter (Doylestown, the paper markers) clears the rail rather than
leaving a stale one lit.

Each chapter carries a `place` id in `src/data/site.ts`. Three chapters point at Raleigh,
which is accurate — the rail tracks which stop the visitor last moved to rather than
guessing from the place alone.

Two constraints worth keeping: the plate is capped at `max-width:52rem` on
`.map-plate__stage` (an Equal Earth world at full width is mostly empty ocean), and the
hero grid is row-ordered heading / layer controls / chronology / rail+plate — the rail and
plate are pinned to `grid-row:4`, so inserting anything above them means moving that row.
Never give `.map-hero` a `max-height`: the catalogue rail overflows underneath the next
section and silently swallows clicks on the place index.

**Institutions are set as type, not logos.** The five hand-drawn logo approximations in
`public/assets/ui/partners/` were deleted. `partnerInstitutions` now carries `wordmark` and
`wordmarkSub` strings, rendered on `/about` as Newsreader over letter-spaced uppercase Work
Sans in a fixed 52px box so the row aligns. This avoids trademark questions, keeps the
strip on-brand, and gives crawlers real text instead of image alt attributes. If real
licensed logo artwork is ever approved, it replaces the wordmark inside the same card.
