# Conjugamos Planner

A unit-focused Spanish verb learning app built with plain HTML, CSS, and modular JavaScript.

## Features

- 26-unit curriculum progression across five phases.
- Itemized lesson structure with 8 parts:
  1. Unit focus objectives
  2. Lesson step checklist
  3. Pattern lesson
  4. Core verb set (10 verbs per unit)
  5. Recognition drills (expanded card sets)
  6. Conjugation drills (typed answer)
  7. Sentence building (typed answer)
  8. Mini-dialogue/story
- Lesson number badges and per-unit metadata.
- Phase filter and clickable unit list.
- Accent-insensitive checking for typed answers.
- Curriculum organized into separate files under `data/`.

## Project structure

- `data/phase1.js` — fully authored Phase 1 units.
- `data/templateUnits.js` — generated template units for later phases.
- `data/curriculum.js` — merged curriculum export with lesson IDs.
- `app.js` — app logic and rendering.

## Run locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. In **Settings → Pages**, choose deployment from your main branch root.
3. Save and open the generated Pages URL.
