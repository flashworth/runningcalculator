# Running Calculator

## What This Is

A single-page running calculator built with React, Vite, and TypeScript. Given any two of duration/pace/distance, it computes the missing values and displays results in both km and miles.

See `PRD.md` for full product requirements.

## Tech Stack

- **React 18+** with TypeScript
- **Vite** for build/dev
- **CSS** with custom properties (no CSS framework)
- **JetBrains Mono** font via Google Fonts

## Project Structure

```
src/
  main.tsx            — Entry point
  App.tsx             — Root component, state management
  App.css             — App-level styles
  index.css           — Global styles, CSS variables, font import
  components/         — UI components (InputField, UnitToggle, ResultsPanel, ResetButton)
  utils/
    calculations.ts   — Pure math: pace, speed, distance, duration derivation
    parsing.ts        — Parse time strings (MM:SS, HH:MM:SS) and numeric input
    formatting.ts     — Format seconds to time strings, numbers to display strings
  types/
    index.ts          — Shared TypeScript types
```

## Key Conventions

- Mobile-first responsive design (breakpoint at 640px)
- All calculation logic lives in `utils/` as pure functions — no side effects
- Conversion factor: 1 mile = 1.60934 km
- Time is stored internally as seconds (number)
- Distance is stored internally in the user's selected unit, converted for display
- Pace is stored internally as seconds per unit
- Results update in real-time on input change
- All input state persisted to `sessionStorage` (cleared when the tab closes)
- Reset button clears both UI state and sessionStorage
- No external runtime dependencies beyond React
- No data leaves the browser — no backend, no cookies, no analytics

## Computation Priority

When all three fields are filled, **duration + distance** take priority and pace is recalculated.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build
