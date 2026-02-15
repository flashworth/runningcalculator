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
- Placeholder text showing expected format (e.g., `MM:SS`)
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

## Out of Scope (v1)

- User accounts or saved calculations
- Splits / interval calculator
- Elevation or heart rate adjustments
- Share or export functionality
- PWA / service worker
