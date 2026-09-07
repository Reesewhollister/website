# Professional portfolio revision — 2026-09-07

Implemented in the opened repository. No deployment or Square account changes performed.

## Positioning and architecture

The homepage now leads with “Complex work, made clear and useful.” and program support, research, education, and public engagement. It presents credentials, four capabilities, four case studies, an experience preview, and separate professional-contact and paid-coaching panels.

Primary navigation: Home, Experience, Selected Work, About, Resume, Contact, College Essay Coaching. Square is the direct destination for coaching in navigation, the hero, homepage family CTA, coaching bridge, teaching, writing, contact, the teaching case study, and the footer.

Nine projects are now available. The leading four are university teaching/student support, Huruf La’b, From Colonies to Carriers, and public history/audience engagement. Western Sahara, Tazmamart, Fulbright, and Oman remain in the broader collection. Papers, publications, decks, datasets, images, and videos are retained. The six video IDs in the older built YouTube page all remain in the Huruf/Fulbright source records; `/youtube` redirects to the public-history case study.

The checkout lacked the AI-centered project present on the live website. Live `/workflows` and `/projects/applied-ai-workflows` were inspected during link QA. Their four process examples are retained in a secondary “Digital Research and Process Design” case study at the same project slug, with `/workflows` redirected there. The wording preserves their proposed nature and does not claim deployment or measured outcomes. One AI mention remains in that page’s broader tools/review context. No AI-centered identity appears in the homepage, primary navigation, or reusable metadata.

Source context: [live workflow descriptions](https://www.reesehollister.com/workflows) and [live project](https://www.reesehollister.com/projects/applied-ai-workflows). This checkout differs from the currently published website; deployment should use the repaired, verified source build rather than assume existing `dist/` is current.

## Changed files

- `src/data/site.ts`: professional copy, navigation/footer links, credentials, capabilities, six functional experience groups, Square URL and resume request.
- `src/data/projects.ts`: four featured cases, evidence-backed summaries for all nine cases, new public history record, precise dataset scope.
- `src/pages/index.astro`, `experience.astro` (new), `about.astro`, `resume.astro`, `coaching.astro`, `contact.astro`, `teaching.astro`, `writing.astro`, `projects/index.astro`.
- `src/components/SiteHeader.astro`, `ProjectCard.astro`, `ProjectFilters.astro`: external navigation handling, current-page state, meaningful card action labels, accessible filter state and initialization across Astro transitions.
- `src/layouts/BaseLayout.astro`, `ProjectLayout.astro`: metadata, structured data, case-study summary before long materials, retained evidence imagery, user-controlled project clips.
- `src/styles/global.css`: appended responsive rules using the existing design tokens; no wholesale style replacement.
- `astro.config.mjs`: legacy YouTube and workflow redirects.
- `INDEX.md`, `TODO_CONTENT.md`, `DESIGN_SYSTEM.md`: canonical outputs, evidence gaps, asset decisions.
- `2026-09-07__reese-portfolio__check__v01__portfolio-links.py`: repeatable production-output and link audit.

Pre-existing changes to `package.json`, `package-lock.json`, `ChoosePath.astro`, the earlier CSS/design-system additions, and untracked icon/system assets were preserved. No files or folders were moved. All newly authored files stay within existing folders or the workspace root.

## Evidence and missing inputs

- Current public resume/CV files are absent. `/resume` provides an email request action; it does not label an old file as current or invent a download.
- Museum/tour/visitor roles, Moodle/LMS duties, referrals, consultation documentation, and precise university employment dates need direct evidence. They were not invented. The public-history case study presently covers documented teaching, BrainLyne, presentations, and media.
- `public/african-airlines/data/airlines.json`: **723** records. Downloadable Guttery CSV: **59** rows, **16** fields. These are now explicitly distinguished.
- The existing role data supports PS 331’s 80-student course and CRLA Level III certification. No student-impact, consultation-count, or current YouTube-audience metrics were introduced.
- [NC State’s May 5, 2026 article](https://chass.ncsu.edu/news/2026/05/05/puzzle-project-aims-to-make-learning-arabic-a-fun-hands-on-experience/) confirms the Huruf La’b $4,000 VenturePack result and co-founder contributions. The earlier 100+ teachers claim was corrected; the project record says 100+ interested people, including at least two dozen teachers.
- [Square coaching site](https://reesehollister.square.site/) was reachable through a live web check and identified as Reese Hollister’s writing/college-essay service. No services, booking, or account data was changed.
- `yt-wiq-s7y4Jss-poster.jpg` is an existing 21-byte text file, not valid image data; it was rejected for the new case study. The existing library archive photograph is used instead.

## Verification

Initial browser audit used the repository’s existing `dist/` build at 1440×900 and 390×844 while Astro dependencies were restoring from iCloud. The initial build differs slightly from current source (for example, its YouTube navigation item); it is not treated as the rebuilt final result.

- Direct Astro compiler validation: **27 templates, zero compilation errors**.
- Content assertions: correct four featured projects, nine available projects, six experience groups, exact Square URL and SEO title, all case-study summaries and hero paths present, 723-record count confirmed.
- `git diff --check`: passed after whitespace corrections.
- Project asset audit before the additional process case: **114 references checked, zero missing files, zero invalid images among referenced images**.
- Dependency hydration: read 10,811 existing dependency files, zero read failures; no package install or lockfile change performed.
- `npm run build`: **blocked by the installed dependency state**. A clean sequential attempt discovers zero modules and fails with `TypeError: Cannot read properties of undefined (reading 'catch')` in Astro’s CLI error handling.
- `node_modules/astro/dist/core/config/settings.js` contains a pre-existing “Lightweight static settings shim for this portfolio” and empty `contentEntryTypes`/`dataEntryTypes`; this contradicts the project guidance that installed-package patches were removed. The dev server starts but returns `Cannot GET /` and HTTP 404 for `/about`.
- An earlier concurrent startup also encountered a shared Astro cache-file rename collision; the separate sequential build still fails as described above. That cache error is not attributed to the source edits.
- `npm run check`: **47 files checked, 0 errors, 0 warnings, 17 hints** (existing airline global/type suggestions and inline-script hints).
- Final browser/production-link validation remains incomplete. Do not treat template compilation or the old built-site screenshots as final end-to-end verification.
- Dependency repair needs approval: the user-provided workspace instructions explicitly prohibit package installs without approval. Proposed repair: `npm ci --ignore-scripts --no-audit --no-fund --cache .astro/npm-cache`, preserving the manifest/lockfile and keeping the npm cache in the workspace. Then run check/build sequentially and finish responsive/keyboard/link QA.

### Reproduce

```sh
npm run check
npm run build
python3 2026-09-07__reese-portfolio__check__v01__portfolio-links.py --external
npm run preview
```

The package defines no separate lint or test command. Browser review should cover the homepage, Experience, Selected Work filters (including navigation back to the page), all four leading case studies, About, Resume request, contact/coaching separation, and legacy routes at desktop, tablet, and mobile widths.

## Source-data external-link audit

HTTP GET checks via curl with normal TLS verification. These cover canonical site/project/works data, including secondary archive links; final rendered-page coverage remains pending. HTTP access restrictions are not proof that a page was deleted.

| Destination | HTTP result |
|---|---|
| https://chass.ncsu.edu/news/2026/05/05/puzzle-project-aims-to-make-learning-arabic-a-fun-hands-on-experience/ | 200 |
| https://cupola.gettysburg.edu/ghj/vol21/iss1/6/ | 200 |
| https://digitalcommons.georgiasouthern.edu/aujh/vol13/iss1/5/ | 200 |
| https://ncsu.academia.edu/ReeseHollister | 403 |
| https://reesehollister.square.site/ | 200 |
| https://reesewhollister.substack.com | 200 |
| https://reesewhollister.substack.com/p/fes-and-ifrane-weekend | 200 |
| https://reesewhollister.substack.com/p/fes-and-ifrane-weekend-part-two | 200 |
| https://reesewhollister.substack.com/p/marrakech-and-ben-guerir | 200 |
| https://reesewhollister.substack.com/p/new-friends | 200 |
| https://reesewhollister.substack.com/p/online-conference-presentation-tomorrow | 200 |
| https://reesewhollister.substack.com/p/projects-old-and-new | 200 |
| https://reesewhollister.substack.com/p/promoting-a-project | 200 |
| https://reesewhollister.substack.com/p/settling-in | 200 |
| https://reesewhollister.substack.com/p/teaching-modern-united-states-history | 200 |
| https://reesewhollister.substack.com/p/transition | 200 |
| https://sites.google.com/ncsu.edu/reese/history-research | 200 |
| https://sites.google.com/ncsu.edu/reese/teaching-arabic | 200 |
| https://sites.google.com/ncsu.edu/reese/welcome?pli=1 | 200 |
| https://us.fulbrightonline.org/ | 200 |
| https://www.alc.org.ma/ | unverified: curl: (6) Could not resolve host: www.alc.org.ma |
| https://www.aui.ma/ | 200 |
| https://www.h-net.org/ | unverified: curl: (47) Maximum (50) redirects followed |
| https://www.linkedin.com/in/reese-h-13b09519a/ | 999 |
| https://www.ncsu.edu/ | 202 |
| https://www.youtube.com/@HistoricalMethodMan/featured | 404 |
| https://www.youtube.com/channel/UCCRhHuIxYd3wyzYuaCNH3AA/ | 200 |
| https://www.youtube.com/watch?v=JJDS0yMyJgU | 200 |
| https://www.youtube.com/watch?v=LAC1ZccTSk0 | 200 |
| https://www.youtube.com/watch?v=dcMU990QZew | 200 |
| https://www.youtube.com/watch?v=rL2kn87Bz2M | 200 |
| https://www.youtube.com/watch?v=wiq-s7y4Jss | 200 |
| https://www.youtube.com/watch?v=yM_sz5yexpo | 200 |

### Link corrections after the initial audit

- ALC Rabat: replaced the nonresolving `www.alc.org.ma` with [the verified official site](https://alcrabat.org/).
- Historical Method Man: replaced the 404 handle/featured URL with [the verified channel-ID URL](https://www.youtube.com/channel/UCCRhHuIxYd3wyzYuaCNH3AA/), already present in the repository. YouTube’s result identifies that channel as Historical Method Man.
- Academia (403), LinkedIn (999), and the NC State homepage (202) need interactive verification; those responses do not establish broken destinations. H-Net’s homepage redirect loop remains an unresolved external-link limitation.
- A search surfaced an older Square-hosted resume PDF, but its direct URL returns 404. No current resume download was added.

- The corrected ALC and channel-ID destinations each returned HTTP 200 in a follow-up check.
