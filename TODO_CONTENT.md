# Open Content Items

These items should be resolved before a final public launch. They are tracked here so raw placeholders do not appear on public pages.

## Publications

- Add direct links for every publication currently routed through the old research archive.
- Decide whether to include the full undergraduate publication list or only a curated selected list.
- Add any post-2023 publications or presentations only after verifying exact titles, venues, dates, and links.
- DONE (2026-06-11): Added a dedicated `presentations` array + "Conference talks & presentations"
  section on Research and Writing pages. Currently lists two verified talks — the H-Grad/H-Net
  Lightning Talk "Occidentalism & Selfhood" (2023, sourced from the Substack post) and the Western
  Sahara capstone at the NC State Graduate History Conference. Conference talks are kept separate
  from the peer-reviewed `publications` list so a lightning talk is never mislabeled as a journal article.
- Verify and add the From Colonies to Carriers and Truth After Tazmamart presentation venues/dates
  before listing them as formal presentations (decks exist; venues not yet documented).

## Resume / CV

- Add approved public resume and CV PDFs to `public/assets/` when ready.
- Update `src/data/site.ts` to make those downloads available after files are approved.
- Confirm exact dates for writing consultant and PS 331 TA roles before showing them publicly.

## Verification Tooling

- The working verification path is `npm run check`, `npm run build`, and browser review against `npm run dev`.
- Current deck-first rollout verified on 2026-06-09: `npm run check` passed, `npm run build` produced 16 pages, and From Colonies to Carriers plus Truth After Tazmamart were browser-checked on desktop and mobile widths.

## Assets

- From Colonies to Carriers now has a self-hosted deck, rendered slides, paper excerpt, dataset, and three artifacts in `public/assets/projects/from-colonies-to-carriers/`.
- Truth After Tazmamart now has a self-hosted deck, rendered slides, and paper in `public/assets/projects/tazmamart/`.
- Add source assets to `design-assets/` before any further visual redesign.
- Add Google Sites screenshots to `design-assets/google-sites-screenshots/`.
- Fulbright Morocco now uses real fieldwork photography (Essaouira harbor hero + a six-image mosaic
  including the AUI Mohammed VI Library archive display and AUI campus, sourced from the Substack
  dispatches). The placeholder SVG for this project is retired.
- Replace temporary Huruf La'b and teaching-support SVGs with approved real artifacts when available.

## Content Migration

- Migrate more material from the old Google Sites pages into MDX case studies.
- Add fuller public-method notes for From Colonies to Carriers if publishing a methods appendix beyond the current deck, paper excerpt, and dataset.
- Add approved teaching statement excerpts, workshop materials, or anonymized handouts when cleared for publication.

## Professional portfolio pass — 2026-09-07

- Current public resume and academic CV PDFs are absent. `/resume` offers a real email request action; add approved files before enabling downloads.
- Museum employment, tours, visitor services, LMS/Moodle duties, consultation documentation, and referral responsibilities were requested but not supported by this checkout. Confirm role, organization, dates, and actual duties before adding claims. The public-history case study currently uses documented Rabat teaching, BrainLyne, presentations, and media.
- This checkout originally lacked the Applied AI Workflows project present on the live website. The live process descriptions were read and retained as a secondary Digital Research and Process Design case study at the original project slug; `/workflows` redirects there. Its examples are explicitly described as process designs rather than deployed systems. The AI skills phrase in the teaching project was removed.
- Airline scope checked locally: `public/african-airlines/data/airlines.json` has 723 records; the downloadable Guttery CSV has 59 rows and 16 columns. They must not be described as the same complete dataset.
- Huruf La’b source distinction: project record says more than 100 interested people, including at least two dozen teachers; the prior About timeline incorrectly said 100+ teachers. Timeline copy now avoids that claim. NC State’s May 5, 2026 article verifies the $4,000 award and co-founder contributions.
- Oman timeline conflicted internally (2022 vs 2023). The dated 2023 dispatches and project record support summer 2023 in Manah; the unused full-timeline data has been aligned.
- Existing `public/assets/projects/fulbright-morocco/video/yt-wiq-s7y4Jss-poster.jpg` is text, not an image. Not used for the new public-history case study. Existing archive photography is used instead.

- Link repairs: old ALC domain did not resolve; replaced with verified `https://alcrabat.org/`. The Historical Method Man handle URL returned 404; YouTube identified the existing channel-ID URL as Historical Method Man, so shared links now use that stable destination.

## Map hero (home) — open items

- **Formspree**: confirmed working (form `xppzyndl`, in `src/components/InquiryForm.astro`).
  Optional hardening: restrict submissions to reesehollister.com in the Formspree settings.
- **Photographs**: the dossier shows a designed "Image needed" placeholder for The Bronx /
  Manhattan College and Fez. Add files and fill in the `media` field in
  `src/data/places.ts` when they exist. Morocco uses the Chefchaouen hero, Ifrane the Mohammed VI
  Library hero, Raleigh the VenturePack cheque photograph, and Doylestown / Rabat / Manah use
  video posters.
- **Doylestown dates**: the Mercer Museum & Fonthill Castle role is now on the map (confirmed by
  the front-desk video) but `period` is still null. Add the dates. It is also left out of the
  dashed journey line, which only connects places with confirmed dates.
- **Video posters**: the Rabat and Oman stills are YouTube's 320×180 `mqdefault` frames — the
  only size those two uploads expose — so they are slightly soft on retina. Replacing
  `public/assets/fieldwork/video-posters/{rabat-alc,oman-manah}.jpg` with real 1280×720 stills
  would sharpen both cards. The Mercer poster is already 1280×720.
- **Unlisted videos**: the three films are unlisted on YouTube, and embedding them on the public
  home page makes them viewable by anyone who visits. That is the intent, but worth knowing.
- **Coaching**: Square (reesehollister.square.site) is removed sitewide and stays removed.
  Coaching is a topic in the single inquiry form; `/coaching` links to `/contact?topic=essay`.
- **Pre-existing**: `src/data/site.ts` links to `/projects/public-history-engagement`, which is
  not a slug in `src/data/projects.ts`.

## Research atlas — open items

- **Jackson volume number.** Google Scholar lists *Photography, Identity, Power* as
  History Matters vol. 19; App State's own archive lists vol. 20 as the 2023 issue.
  `src/data/papers.ts` currently says vol. 20 and carries a `verify` note. Confirm.
- **Travelled places.** Chefchaouen and Merzouga are marked as travelled because the repo
  already holds photographs of both. Fez stayed a *worked* place: `src/data/site.ts`
  records "Field-based research in Ifrane, Rabat, Fez", so it is fieldwork, not a visit.
  Send the rest of the travel list and it goes straight into `src/data/places.ts`.
- **LinkedIn assets** — still unavailable. The Claude-in-Chrome extension is not connected
  to this account, so LinkedIn is behind its sign-in wall. Either connect the extension or
  send the files.
- **Drive "Field Trip #2"** — ~30 HEIC photos from March 2022, location unidentified.
  Needs a name before any of it is used, and HEIC→WebP conversion.
- **Photographs still missing** for The Bronx / Manhattan College and Fez. These now render
  no image frame at all rather than a placeholder.
