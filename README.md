# Conjugamos Lite

A very simple Spanish verb learning app built with plain HTML, CSS, and JavaScript.

## Features

- 26-unit progression across five phases.
- Unit layout with 6 parts:
  1. Pattern lesson
  2. Core verb set
  3. Recognition drills
  4. Conjugation drills (typed answer)
  5. Sentence building (typed answer)
  6. Mini-dialogue/story
- Phase filter and clickable unit list.
- Accent-insensitive checking for typed answers.
- Easy to host on GitHub Pages.

## Run locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. In **Settings → Pages**, choose deployment from your main branch root.
3. Save and open the generated Pages URL.

## Next upgrades

- Voice input (Web Speech API)
- Audio playback for dialogue lines
- Unit-by-unit custom content (replace template units with your own drills)
