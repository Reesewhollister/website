# PDFs — placement and naming

PDFs for the portfolio live alongside their project assets, not in this folder.
This folder exists as a placeholder; do not place PDFs here.

## Where PDFs actually live

```
public/assets/projects/{slug}/
```

For example:
- `public/assets/projects/from-colonies-to-carriers/2026-06-09__from-colonies-to-carriers__paper__v01__intro-conclusion.pdf`
- `public/assets/projects/western-sahara/capstone-deck.pdf`
- `public/assets/projects/tazmamart/2026-06-09__tazmamart__paper__v01__truth-after-tazmamart.pdf`

## Filename convention

```
YYYY-MM-DD__project-slug__type__vNN__short-description.pdf
```

| Segment | Values |
|---------|--------|
| `type` | `paper`, `deck`, `artifact`, `sample`, `teaching` |
| `vNN` | version number — `v01`, `v02` etc. |

## Adding a new PDF

1. Drop the file in `public/assets/projects/{slug}/` using the naming convention above.
2. Open `src/data/works.ts`.
3. Add an entry to the `works` array (copy an existing entry as a template).
4. Set `pdfPath` to the public path: `/assets/projects/{slug}/filename.pdf`.
5. Set `thumbnailPath` to an existing project image if you have one; otherwise omit it.
6. Remove the corresponding `TODO` comment if you were replacing a placeholder.
7. Run `npm run build` to confirm no errors.

## Thumbnail images

Project thumbnails for PDF cards should be JPEG or WebP, 16:9 aspect ratio, at least 480px wide.
Place them in `public/assets/projects/{slug}/` alongside the PDF.
The `thumbnailPath` field in `works.ts` takes the same `/assets/...` path format.
