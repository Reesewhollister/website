# Fonthill /fh website integration

This adds the self-contained Demo v4 mobile experience at /fh and /fh/. The six-stage story, colour choice, drawing-to-model reveal, Notes, making section and collection remain. The in-page explorer supports edition selection, rotation, tilt, zoom and reset.

## Files and routing

- Entry: [public/fh/index.html](public/fh/index.html).
- Behaviour: [story.js](public/fh/story.js), [ui.js](public/fh/ui.js).
- Brand and responsive layout: [styles.css](public/fh/styles.css).
- [Manifest](public/fh/manifest.json) records original export SHA-256 plus package file sizes and hashes.
- All fonts, images, Three.js and quantized model data are bundled under public/fh. Required licenses are included.

This isolated static companion uses its own Fonthill design, within the existing public directory. The flat public/fh structure preserves the approved package and folder-depth constraint. Its explicit /fh/ base makes the two root-domain URL forms resolve the same assets. Existing portfolio pages, navigation, framework dependencies and build settings are unchanged.

## Verification

JavaScript syntax checks pass. Local HTTP checks returned 200 for all 30 package files and correct JavaScript MIME types. ZIP integrity and manifest/readback checks pass. Browser checks exercised the six-stage story, colour selection, source notes, Escape, making navigation/restart, explorer selection/rotation/zoom/reset and a failed-model illustrated fallback. Portrait 390 x 844 / 320 x 568 and landscape 844 x 390 layouts were reviewed. No normal-preview console errors were observed.

Physical iOS Safari/Android Chrome multi-touch, interruption and notch handling remain acceptance tasks. Pinch and cancellation are implemented but not claimed physically tested. Larger 3D editions use scaled preview geometry and are labelled. No printer or original architectural mesh changed.

Repository-wide Astro check/build and Vercel preview status must be assessed on this branch before merge. Local standalone validation does not establish a production deployment.

## Release checklist

1. Confirm the Vercel preview build succeeds and open both /fh and /fh/.
2. Play through on real phones; test one-finger turning, pinch zoom, colour choices, landscape, Notes, making and replay.
3. Confirm failed binary downloads leave a usable illustrated story.
4. Merge only after reviewing the preview. Verify https://reesehollister.com/fh afterward.
5. Scan the actual printed plastic QR; digital QR decoding alone is not physical acceptance.

