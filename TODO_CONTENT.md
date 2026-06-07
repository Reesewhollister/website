# Open Content Items

These items should be resolved before a final public launch. They are tracked here so raw placeholders do not appear on public pages.

## Publications

- Add direct links for every publication currently routed through the old research archive.
- Decide whether to include the full undergraduate publication list or only a curated selected list.
- Add any post-2023 publications or presentations only after verifying exact titles, venues, dates, and links.

## Resume / CV

- Add approved public resume and CV PDFs to `public/assets/` when ready.
- Update `src/data/site.ts` to make those downloads available after files are approved.
- Confirm exact dates for writing consultant and PS 331 TA roles before showing them publicly.

## Verification Tooling

- The working verification path is `npm run check`, `npm run build`, and `npm run preview`; these commands use `src/build-static.cjs`.
- Astro CLI commands remain available as `npm run astro:check`, `npm run astro:build`, and `npm run astro:dev`, but they stalled locally during this cleanup pass. Revisit only when returning to the Astro framework pipeline.

## Assets

- Add source assets to `design-assets/` before any further visual redesign.
- Add Google Sites screenshots to `design-assets/google-sites-screenshots/`.
- Replace temporary Huruf La'b, Fulbright Morocco, and teaching-support SVGs with approved real artifacts when available.

## Content Migration

- Migrate more material from the old Google Sites pages into MDX case studies.
- Add fuller public-method notes for From Colonies to Carriers when the dataset is ready.
- Add approved teaching statement excerpts, workshop materials, or anonymized handouts when cleared for publication.
