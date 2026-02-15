# Running Calculator - Product Requirements Document

## Overview

A single-page application that calculates running metrics from partial input. The user provides any two of three values — **duration**, **pace**, and **distance** — and the app derives the missing value along with additional metrics like speed. All values are displayed in both metric (km) and imperial (miles) units simultaneously.

## Problem Statement

Runners frequently need to convert between pace, distance, and time — especially across metric and imperial units. Existing tools are clunky, require navigating multiple pages, or don't show both unit systems at once. This app solves that with a single, clean interface that reacts instantly to input.

## Core Functionality

### Inputs

The user can fill in any combination of the following. A minimum of **two** fields is required to compute results.

| Field        | Format                                       | Examples                 |
| ------------ | -------------------------------------------- | ------------------------ |
| **Duration** | `HH:MM:SS` or `MM:SS` or minutes as a number | `1:30:00`, `25:00`, `25` |
| **Pace**     | `MM:SS` per km or per mile (unit toggle)     | `5:00` /km, `8:03` /mi   |
| **Distance** | Numeric with unit toggle (km or miles)       | `5`, `3.1`, `26.2`       |

### Computation Rules

- **Given distance + duration** → calculate pace (both /km and /mi) and speed (km/h and mph)
- **Given pace + duration** → calculate distance (km and miles)
- **Given pace + distance** → calculate duration and speed (km/h and mph)
- If all three are provided, duration + distance take priority (pace is recalculated)
- If fewer than two are provided, show no results — just the input fields

### Outputs

Once two or more inputs are provided, display a results panel showing:

| Output       | Format                      |
| ------------ | --------------------------- |
| **Duration** | `HH:MM:SS`                  |
| **Pace**     | `MM:SS /km` and `MM:SS /mi` |
| **Distance** | `X.XX km` and `X.XX mi`     |
| **Speed**    | `X.XX km/h` and `X.XX mph`  |

Results update in real-time as the user types.

### Unit Handling

- Distance input has a toggle: **km** / **miles**
- Pace input has a toggle: **per km** / **per mile**
- Outputs always show both unit systems regardless of input unit
- Conversion factor: `1 mile = 1.60934 km`

## UI/UX Requirements

### Design Principles

- **Mobile-first** responsive layout
- **Clean, minimal** interface — no clutter
- **Real-time** calculation as the user types
- Dark/light appearance matching system preference

### Typography

- Primary font: **JetBrains Mono** (loaded from Google Fonts)
- Monospace throughout for numeric alignment

### Layout

#### Mobile (< 640px)

- Single column
- Input fields stacked vertically
- Results panel below inputs
- Full-width fields and buttons

#### Tablet / Desktop (>= 640px)

- Centered card layout, max-width ~600px
- Same vertical flow but with more spacing
- Comfortable padding and readable sizing

### Input Fields

- Large, clearly labeled text inputs
- Unit toggle rendered as a segmented control adjacent to each relevant field
- Placeholder text showing expected format: `hh:mm:ss` for duration, `mm:ss` for pace
- Clear/reset button to empty all fields

### Results Panel

- Visually distinct from input area (subtle background or border)
- Each result on its own row with label and value
- Both unit variants shown side by side (e.g., `5:00 /km | 8:03 /mi`)
- Smooth transition when results appear/update
- Hidden or collapsed when insufficient input

### Validation & Error Handling

- Invalid input fields get a subtle red border
- Inline hint text for format errors (e.g., "Expected MM:SS")
- No modal dialogs or alert popups
- Graceful handling of edge cases: zero values, extremely large numbers

## Technical Stack

| Layer      | Technology                                        |
| ---------- | ------------------------------------------------- |
| Framework  | React 18+                                         |
| Build tool | Vite                                              |
| Language   | TypeScript                                        |
| Styling    | CSS Modules or vanilla CSS with custom properties |
| Font       | JetBrains Mono via Google Fonts CDN               |
| Deployment | Static site (Netlify-ready)                       |

### Project Structure

```
runningcalc/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── App.css
    ├── index.css          # Global styles, CSS variables, font import
    ├── components/
    │   ├── InputField.tsx
    │   ├── UnitToggle.tsx
    │   ├── ResultsPanel.tsx
    │   └── ResetButton.tsx
    ├── utils/
    │   ├── calculations.ts  # Pure math functions
    │   ├── parsing.ts       # Input parsing (time strings, numbers)
    │   └── formatting.ts    # Output formatting
    └── types/
        └── index.ts         # Shared types
```

## Data Persistence

- All input values and unit toggle states are persisted to **`sessionStorage`**
- State is restored on page load within the same browser session (tab)
- Closing the tab clears all data — no long-term storage
- The reset button clears both the UI state and sessionStorage

## Non-Functional Requirements

- First contentful paint < 1s on 4G
- No external runtime dependencies beyond React
- Accessible: proper labels, focus management, sufficient contrast
- Works offline after initial load (static SPA)
- No backend, no API calls, no analytics, no cookies — pure client-side
- No data leaves the browser — all computation and storage is local

## Inline Unit Conversion Hints

When the **Pace** or **Distance** input contains a valid value, a small hint line appears directly beneath the field showing the equivalent value in the other unit system. For example:

- Pace input `4:40` with unit `/km` → hint: `7:31 /mi`
- Pace input `8:00` with unit `/mi` → hint: `4:58 /km`
- Distance input `5` with unit `km` → hint: `3.11 mi`
- Distance input `3` with unit `mi` → hint: `4.83 km`

This feature is controlled by a **toggle switch** in the app header area. The toggle is labeled "Show conversions" and defaults to **on**. Its state is persisted in sessionStorage alongside the input state. When toggled off, the hint lines are hidden.

The hint text should be small, muted, and non-intrusive — it supplements the input without cluttering the UI.

## Race Time Predictions

Below the results panel, a **Race Predictions** section shows estimated finish times for common race distances based on the user's current pace. The predicted distances are:

| Race          | Distance           |
| ------------- | ------------------ |
| 5K            | 5 km               |
| 10K           | 10 km              |
| 8 Mile        | 8 miles (12.87 km) |
| Half Marathon | 21.0975 km         |
| Marathon      | 42.195 km          |

Predictions are calculated by multiplying the user's pace (seconds per km) by each race distance in km. They are displayed as `HH:MM:SS` finish times.

This section is only visible when a valid pace can be derived (i.e., the results panel is showing). It is controlled by its own **toggle switch** labeled "Show race predictions", positioned at the top of the section. The toggle defaults to **on** and its state is persisted in sessionStorage.

The section should be visually distinct from the results panel — same card-style treatment but clearly a separate block. Each race is shown on its own row with the race name on the left and the predicted time on the right.

## Future Enhancement: Progressive Web App (PWA)

**Status:** Not implemented in v1. Planned for future release.

Convert the app into a Progressive Web App to enable:

- **Add to Home Screen** — installable on mobile devices
- **Offline functionality** — works without network connection after first visit
- **Native app experience** — runs in standalone mode (no browser chrome)

### Requirements

1. **Web App Manifest** (`public/manifest.json`)
   - App name, short name, description
   - Icons at 192x192 and 512x512 (PNG, maskable)
   - Display mode: `standalone`
   - Background color: `#1a1a2e` (dark mode)
   - Theme color: `#4f8cff` (primary)
   - Orientation: `portrait`

2. **Service Worker** (`public/sw.js`)
   - Cache strategy: cache-first with network fallback
   - Cache static assets on install: `/`, `/index.html`, `/manifest.json`, CSS, JS bundles
   - Version the cache name for updates
   - Clean up old caches on activation

3. **Service Worker Registration** (`src/main.tsx`)
   - Register `/sw.js` on window load
   - Silent failure if service workers unsupported

4. **HTML Updates** (`index.html`)
   - `<link rel="manifest" href="/manifest.json" />`
   - Apple-specific meta tags for iOS compatibility:
     - `<meta name="apple-mobile-web-app-capable" content="yes" />`
     - `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />`
     - `<link rel="apple-touch-icon" href="/icon-192.png" />`

5. **Icon Generation**
   - Create 192x192 and 512x512 PNG icons from existing favicon or design new ones
   - Ensure icons meet maskable requirements for Android

6. **Deployment Requirements**
   - HTTPS is mandatory for service workers (production only — localhost works without HTTPS)
   - Verify PWA criteria with Lighthouse audit

### Testing Checklist

- Install prompt appears on supported browsers (Chrome, Edge, Safari 16.4+)
- App installs to home screen on mobile
- App launches in standalone mode (no URL bar)
- App works offline after first visit
- Service worker caches update on new deployments

## Future Enhancement: Smart Numeric Input Formatting

**Status:** Not implemented in v1. Planned for future release.

### Problem

On mobile devices, `inputMode="numeric"` displays a number pad without easy access to colons, making it difficult to enter time values (pace and duration) that require the `:` separator.

### Solution

Implement real-time smart formatting that automatically inserts colons as the user types numeric-only input.

### Requirements

**Pace Field (mm:ss format):**

- User types: `440` → auto-format to `4:40` in real-time
- User types: `5` → display as `5` (wait for more input)
- User types: `530` → auto-format to `5:30`
- Right-pad with zeros and insert colon at appropriate position
- Preserve existing manual colon input for power users

**Duration Field (hh:mm:ss format):**

- User types: `440` → auto-format to `4:40` in real-time
- User types: `12030` → auto-format to `1:20:30`
- Right-pad with zeros and insert colons at appropriate positions
- Handle both compact format (mm:ss) and full format (hh:mm:ss) intelligently

**Distance Field:**

- No special formatting beyond numeric validation
- Accept decimal input as-is

### Implementation Details

1. Add formatting logic to `onChange` handlers in `InputField` component or parent
2. Create utility functions:
   - `formatPaceInput(rawNumeric: string): string` — inserts colon for mm:ss
   - `formatDurationInput(rawNumeric: string): string` — inserts colons for hh:mm:ss or mm:ss
3. Update existing parsers (`parsePace`, `parseDuration`) to handle both formatted and unformatted input
4. Maintain cursor position during formatting to avoid UX issues
5. Keep `inputMode="numeric"` for mobile number pad

### Edge Cases to Handle

- Backspace/delete should work naturally
- Cursor position must be preserved during auto-formatting
- Partial input should display gracefully (e.g., `4` stays as `4` until more digits typed)
- Manual colon input should still be allowed and preserved
- Invalid sequences should be handled gracefully

### Testing

- Mobile: Verify number pad appears and formatting works on iOS Safari, Android Chrome
- Desktop: Verify manual input still works with keyboard
- Test sequences: `5`, `50`, `500`, `5000`, `50000` and verify correct formatting
- Test backspace behavior during formatted input

## Out of Scope (v1)

- User accounts or saved calculations
- Splits / interval calculator
- Elevation or heart rate adjustments
- Share or export functionality
