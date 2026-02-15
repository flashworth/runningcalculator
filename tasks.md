# Open Running Calculator - Tasks

## Phase 1: Project Scaffolding

- [x] 1.1 Initialize Vite + React + TypeScript project (`npm create vite@latest . -- --template react-ts`)
- [x] 1.2 Install dependencies and verify dev server starts
- [x] 1.3 Clean out default Vite boilerplate (strip App.tsx, empty CSS, remove logos)
- [x] 1.4 Create directory skeleton (`src/components/`, `src/utils/`, `src/types/`)
- [x] 1.5 Add favicon SVG and set page title
- [x] 1.6 Add JetBrains Mono Google Fonts link to index.html

## Phase 2: Global Styles

- [x] 2.1 Write `src/index.css` — CSS custom properties (light/dark), global reset, body styles
- [x] 2.2 Write `src/App.css` — app container, title, inputs wrapper, 640px media query

## Phase 3: Types

- [x] 3.1 Define all shared types in `src/types/index.ts` (InputState, ParsedInputs, CalculationResult, ValidationErrors, DistanceUnit, PaceUnit)

## Phase 4: Utility Functions

- [x] 4.1 Write `src/utils/parsing.ts` — parseDuration, parsePace, parseDistance, parseAllInputs, validateInputs
- [x] 4.2 Write `src/utils/calculations.ts` — KM_PER_MILE, unit converters, calculate() with all 3 computation paths
- [x] 4.3 Write `src/utils/formatting.ts` — formatDuration, formatPace, formatDistance, formatSpeed

## Phase 5: Components

- [x] 5.1 Build `src/components/UnitToggle.tsx` — segmented control with role="radiogroup"
- [x] 5.2 Build `src/components/InputField.tsx` — labeled input with optional unit toggle and validation error
- [x] 5.3 Build `src/components/ResultsPanel.tsx` — result rows with dual-unit display
- [x] 5.4 Build `src/components/ResetButton.tsx` — calls reset handler

## Phase 6: App Integration

- [x] 6.1 Implement sessionStorage helpers (save, load, clear)
- [x] 6.2 Wire up App.tsx — state, derived calculations, handlers, JSX tree

## Phase 7: Styling

- [x] 7.1 Style input fields (full-width, error state, hint text)
- [x] 7.2 Style unit toggle (segmented control, active highlight)
- [x] 7.3 Style results panel (distinct background, label/value rows, dual-unit separator)
- [x] 7.4 Style reset button (subtle, responsive width)
- [x] 7.5 Responsive adjustments at 640px breakpoint

## Phase 8: Polish

- [x] 8.1 Accessibility — labels, aria-live, aria-invalid, focus-visible, contrast
- [x] 8.2 Edge case handling — guard zero/Infinity/NaN, large numbers
- [x] 8.3 Results panel fade-in animation
- [x] 8.4 HTML meta tags — description, viewport, theme-color

## Phase 9: Verification

- [x] 9.1 Manual test all computation paths with known values
- [x] 9.2 Test sessionStorage — persist on refresh, clear on reset
- [x] 9.3 Test responsive layout and dark/light mode
- [x] 9.4 Production build — `npm run build` + `npm run preview`

## Phase 10: Inline Unit Conversion Hints

- [x] 10.1 Add `showConversions` to InputState type and sessionStorage persistence
- [x] 10.2 Add inline conversion utility functions to `calculations.ts`
- [x] 10.3 Build `ConversionHint` component — small muted text showing converted value
- [x] 10.4 Build `ToggleSwitch` component — rocker switch for show/hide conversions
- [x] 10.5 Wire into App.tsx — pass conversion hints to pace/distance fields, add toggle to header
- [x] 10.6 Style ToggleSwitch and ConversionHint components
- [x] 10.7 Test conversions (4:40/km → 7:31/mi, 5km → 3.11mi) and toggle persistence

## Phase 11: Race Time Predictions

- [x] 11.1 Add `showRacePredictions` to InputState type and sessionStorage persistence
- [x] 11.2 Add `RacePrediction` type and `getRacePredictions()` to calculations.ts
- [x] 11.3 Build `RacePredictions` component with its own toggle switch
- [x] 11.4 Wire into App.tsx — render below ResultsPanel when results exist
- [x] 11.5 Style RacePredictions component (card, rows, responsive)
- [x] 11.6 Test predictions (5:00/km → 5K 25:00, 10K 50:00, HM 1:45:29, Marathon 3:30:59)
