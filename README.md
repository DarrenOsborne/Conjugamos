# Conjugamos Planner

A unit-focused Spanish verb learning app now powered by **Vite + TypeScript** with runtime lesson schema validation.

## What's improved

- **TypeScript + Vite** project setup for safer refactors and modern dev/build workflows.
- **Strict lesson schema** (via Zod) that validates every lesson file when curriculum is assembled.
- **Route-scoped lesson state** (`#/lesson/<unit-id>/module/<module-id>`) so lesson activity state is isolated per unit.
- 26-unit curriculum progression across five phases with modular lesson content files.

## Project structure

- `src/main.ts` — app rendering, routing, and route-scoped runtime state.
- `src/data/schema.ts` — strict lesson schema and validation helper.
- `src/data/curriculum.ts` — imports all lesson files, validates them, and builds curriculum.
- `src/data/drillGenerator.ts` — generated drills expansion logic.
- `src/data/lessons/lesson01.js` ... `lesson26.js` — one file per lesson.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in terminal (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```
