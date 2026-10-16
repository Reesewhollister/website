# Fonthill mobile story v02 — review record

2026-10-16. Prepared under the user's approved plan. Production v01 remains live until this revision is reviewed and merged.

## What changed

- Sound On for a fresh visitor. Audio starts through the Start gesture. Explicit mute/unmute choices persist; unavailable storage/audio do not block the story.
- Gray/Ash removed from the Micro. Tan default with the actual black emblem/lettering mesh from the flush-inlay production package. Dedicated underside scene, upright/underside controls, corrected reading orientation and underside illumination.
- Nine story scenes: drawing, form, Micro printing, underside, Mini printing, Deluxe printing, Deluxe solo detail, castle/base assembly, collection.
- Separate production geometry for Micro and the detailed 3.5-inch editions. The newer v05 two-up gray Mini project contains byte-identical component meshes to the detailed Deluxe project, with all six parts assigned to gray. They intentionally share web geometry; Deluxe restores the three material regions and landscape. The older gray-matte Mini was rejected in favour of this newer production project.
- Printing illustration derives 90 sampled layers from each edition's geometry, with cross-section highlights, a moving nozzle, Skip/Replay and reduced-motion behavior. It does not replay executable G-code, claim exact toolhead motion, or represent actual elapsed printing time.
- Dedicated full-size Deluxe view with whole/tower/window camera choices, rotation/zoom/reset; separate castle/base lift and assembly scene. Roof/window regions remain in the castle.
- Corrected inventory/making imagery generated from the selected geometry. Progress resumes after reload. Native controls, pinch/drag handlers, page visibility/making pause, error recovery and bundled local dependencies retained.
- Geometry downloads use gzip where DecompressionStream is supported, with raw fallback. Shared Mini/Deluxe geometry is decoded/uploaded to GPU once. Micro compressed mesh ~0.66 MB; detailed castle compressed mesh ~7.17 MB plus its base, fonts, code and layer paths. Detailed geometry is prefetched after the story starts. Actual-phone performance is not established.
- Portrait/landscape controls; content clipping prevents zoomed models drawing under controls. Fixed app overflow that allowed focused landscape controls to scroll the header off-screen.

## Source mapping

| Edition | Authoritative source | Web treatment |
| --- | --- | --- |
| Micro | `MICRO_FONTHILL_MONOPRICE/2026-10-15__micro-fonthill-2in__white-black-10up__v02__a1-project.3mf` | Preserve body + actual flush black branding; recolour white body tan per user's current-print instruction. Single instance only. |
| Mini | `MICRO_FONTHILL_MONOPRICE/2026-10-14__fonthill-3_5in__v05__2up-grey__v01__a1-project.3mf` | All-gray detailed 3.5-inch castle; individual component XML bytes match the Deluxe source. Single instance only. |
| Deluxe | `MICRO_FONTHILL_MONOPRICE/2026-10-14__fonthill-3_5in__scaled-five-inch__v05__a1-project.3mf` | Preserve distinct wall, annex-fill, window/door and roof regions. Apply source slicer's z=0 bed cut to sub-bed fragments. |
| Landscape | `geometry/2026-10-10__fonthill__5in-design__v07__green-base.npz` | Matching detailed-design base scaled 70%; physical fit remains unverified. |

`web-models__v02__provenance.json` records exact source SHA256 values, original bounds, export counts and deterministic symmetric sampled surface-distance checks. This is a web-view derivative, not a manufacturing mesh. All retained parts have sampled p99 distance below 0.1 mm; the largest sampled outlier is about 0.59 mm in a small gray region. This is a sample-based screen, not a maximum-error guarantee. Main wall export uses 0.08 mm vertex clustering, duplicate-face removal and planar simplification; smaller regions use conservative planar/edge simplification. Black Micro lettering is retained without face decimation. No print projects, printer settings or running print were changed.

## Validation completed

- JavaScript syntax; all 49 local HTTP assets match disk bytes; manifest SHA256, ZIP CRC/readback and indexed-mesh bounds pass.
- Source-package component-byte equality checked for the newer gray Mini and Deluxe.
- Browser walk-through across all nine scenes. Printing progression, Skip/Replay, color choices (no Ash), underside/upright, close-up selector, castle/base lift/assemble, collection, explorer selection, zoom/reset, Notes/Escape and making/return checked.
- Fresh default Sound On observed; explicit mute persisted after reload. Saved scene resumes after reload.
- 390×844, 320×568 and 844×390 layouts inspected. Header position and non-overlapping landscape text/controls checked after focus changes.
- Simulated HTTP 503 for the Micro model: renderer stopped cleanly and the illustrated story, How it’s made and Retry 3D remained available.
- No normal-path browser console warnings/errors observed. gzip decompression route loaded successfully in local browser.

## Remaining acceptance

- Vercel branch build and deployed preview checks must be recorded after upload.
- Repository-wide `npm run check` was not run: this workspace contains the standalone static package rather than the website's Node 22 dependency checkout. No dependencies installed. Vercel's build is a separate check and must not be described as an Astro type check.
- Actual iPhone/Android multi-touch, Safari foreground rendering of this revision, low-memory/slow-cellular behavior, OS reduced motion, interrupted audio, and physical plastic-QR scanning remain acceptance tasks. Reduced motion, storage denial and context-loss branches are source-reviewed rather than OS/device-tested this round.
- Production merge is outside this review stage of the approved plan.

## Rebuild

Run `/Applications/Blender.app/Contents/MacOS/Blender -b --python scripts/2026-10-16__fonthill__web-build__v02__production-models.py`, then `.venv/bin/python scripts/2026-10-16__fonthill__web-package__v02__mobile.py`. Edit the dated `web-story__v02__mobile.js` source and use the packager's `--quick` option for code-only updates. The source ZIP and v01 upload ZIP remain preserved. Canonical package: `references/working/2026-10-16__fonthill__website-package__v02__production-models.zip`. Review sheet: `previews/2026-10-16__fonthill__web-models__v02__source-views.png`.
