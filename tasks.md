# Running Calculator - Tasks

## Phase 1: Project Scaffolding
- [ ] 1.1 Initialize Vite + React + TypeScript project (`npm create vite@latest . -- --template react-ts`)
- [ ] 1.2 Install dependencies and verify dev server starts
- [ ] 1.3 Clean out default Vite boilerplate (strip App.tsx, empty CSS, remove logos)
- [ ] 1.4 Create directory skeleton (`src/components/`, `src/utils/`, `src/types/`)
- [ ] 1.5 Add favicon SVG and set page title
- [ ] 1.6 Add JetBrains Mono Google Fonts link to index.html

## Phase 2: Global Styles
- [ ] 2.1 Write `src/index.css` — CSS custom properties (light/dark), global reset, body styles
- [ ] 2.2 Write `src/App.css` — app container, title, inputs wrapper, 640px media query

## Phase 3: Types
- [ ] 3.1 Define all shared types in `src/types/index.ts` (InputState, ParsedInputs, CalculationResult, ValidationErrors, DistanceUnit, PaceUnit)

## Phase 4: Utility Functions
- [ ] 4.1 Write `src/utils/parsing.ts` — parseDuration, parsePace, parseDistance, parseAllInputs, validateInputs
- [ ] 4.2 Write `src/utils/calculations.ts` — KM_PER_MILE, unit converters, calculate() with all 3 computation paths
- [ ] 4.3 Write `src/utils/formatting.ts` — formatDuration, formatPace, formatDistance, formatSpeed

## Phase 5: Components
- [ ] 5.1 Build `src/components/UnitToggle.tsx` — segmented control with role="radiogroup"
- [ ] 5.2 Build `src/components/InputField.tsx` — labeled input with optional unit toggle and validation error
- [ ] 5.3 Build `src/components/ResultsPanel.tsx` — result rows with dual-unit display
- [ ] 5.4 Build `src/components/ResetButton.tsx` — calls reset handler

## Phase 6: App Integration
- [ ] 6.1 Implement sessionStorage helpers (save, load, clear)
- [ ] 6.2 Wire up App.tsx — state, derived calculations, handlers, JSX tree

## Phase 7: Styling
- [ ] 7.1 Style input fields (full-width, error state, hint text)
- [ ] 7.2 Style unit toggle (segmented control, active highlight)
- [ ] 7.3 Style results panel (distinct background, label/value rows, dual-unit separator)
- [ ] 7.4 Style reset button (subtle, responsive width)
- [ ] 7.5 Responsive adjustments at 640px breakpoint

## Phase 8: Polish
- [ ] 8.1 Accessibility — labels, aria-live, aria-invalid, focus-visible, contrast
- [ ] 8.2 Edge case handling — guard zero/Infinity/NaN, large numbers
- [ ] 8.3 Results panel fade-in animation
- [ ] 8.4 HTML meta tags — description, viewport, theme-color

## Phase 9: Verification
- [ ] 9.1 Manual test all computation paths with known values
- [ ] 9.2 Test sessionStorage — persist on refresh, clear on reset
- [ ] 9.3 Test responsive layout and dark/light mode
- [ ] 9.4 Production build — `npm run build` + `npm run preview`
