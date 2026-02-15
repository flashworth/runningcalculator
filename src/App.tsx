import { useState } from "react";
import "./App.css";
import type { InputState, DistanceUnit, PaceUnit } from "./types";
import { parseAllInputs, validateInputs } from "./utils/parsing";
import {
  calculate,
  getConvertedPaceHint,
  getConvertedDistanceHint,
  getRacePredictions,
} from "./utils/calculations";
import InputField from "./components/InputField";
import UnitToggle from "./components/UnitToggle";
import ResultsPanel from "./components/ResultsPanel";
import ResetButton from "./components/ResetButton";
import ToggleSwitch from "./components/ToggleSwitch";
import ConversionHint from "./components/ConversionHint";
import RacePredictions from "./components/RacePredictions";
import { formatPaceInput, formatDurationInput } from "./utils/inputFormatting";

const STORAGE_KEY = "runningcalc_inputs";

const defaultState: InputState = {
  duration: "",
  pace: "",
  paceUnit: "per_km",
  distance: "",
  distanceUnit: "km",
  showConversions: true,
  showRacePredictions: true,
};

function saveToSession(state: InputState): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadFromSession(): InputState | null {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as InputState;
    // Handle sessions saved before these toggles existed
    if (typeof parsed.showConversions !== "boolean") {
      parsed.showConversions = true;
    }
    if (typeof parsed.showRacePredictions !== "boolean") {
      parsed.showRacePredictions = true;
    }
    return parsed;
  } catch {
    return null;
  }
}

function clearSession(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}

const paceOptions = [
  { value: "per_km", label: "/km" },
  { value: "per_mi", label: "/mi" },
];

const distanceOptions = [
  { value: "km", label: "km" },
  { value: "mi", label: "mi" },
];

function App() {
  const [input, setInput] = useState<InputState>(
    () => loadFromSession() ?? defaultState,
  );

  const parsed = parseAllInputs(input);
  const result = calculate(parsed);
  const errors = validateInputs(input);

  const predictions = result ? getRacePredictions(result) : null;

  const paceHint = input.showConversions
    ? getConvertedPaceHint(input.pace, input.paceUnit)
    : null;
  const distanceHint = input.showConversions
    ? getConvertedDistanceHint(input.distance, input.distanceUnit)
    : null;

  function updateField<K extends keyof InputState>(
    key: K,
    value: InputState[K],
  ) {
    setInput((prev) => {
      const next = { ...prev, [key]: value };
      saveToSession(next);
      return next;
    });
  }

  function handleReset() {
    setInput(defaultState);
    clearSession();
  }

  return (
    <div className="app">
      <div className="app__header">
        <h1 className="app__title">Open Running Calculator</h1>
        <ToggleSwitch
          id="show-conversions"
          label="Show conversions"
          checked={input.showConversions}
          onChange={(v) => updateField("showConversions", v)}
        />
        <p className="app__info">
          Enter any two of pace, distance, and duration to automatically
          calculate the third. Use the unit toggles to switch between kilometers
          and miles, and enable &ldquo;Show conversions&rdquo; to see values in
          both units at once.
        </p>
      </div>
      <div className="app__inputs">
        <div>
          <InputField
            id="pace"
            label="Pace"
            value={input.pace}
            onChange={(v) => updateField("pace", v)}
            placeholder="mm:ss"
            error={errors.pace}
            formatter={formatPaceInput}
            unitToggle={
              <UnitToggle
                options={paceOptions}
                selected={input.paceUnit}
                onChange={(v) => updateField("paceUnit", v as PaceUnit)}
                ariaLabel="Pace unit"
              />
            }
          />
          <ConversionHint hint={paceHint} />
        </div>
        <div>
          <InputField
            id="distance"
            label="Distance"
            value={input.distance}
            onChange={(v) => updateField("distance", v)}
            placeholder="10"
            error={errors.distance}
            unitToggle={
              <UnitToggle
                options={distanceOptions}
                selected={input.distanceUnit}
                onChange={(v) => updateField("distanceUnit", v as DistanceUnit)}
                ariaLabel="Distance unit"
              />
            }
          />
          <ConversionHint hint={distanceHint} />
        </div>
        <InputField
          id="duration"
          label="Duration"
          value={input.duration}
          onChange={(v) => updateField("duration", v)}
          placeholder="hh:mm:ss"
          error={errors.duration}
          formatter={formatDurationInput}
        />
      </div>
      <div className="app__actions">
        <ResetButton onClick={handleReset} />
      </div>
      <ResultsPanel result={result} />
      {predictions && (
        <RacePredictions
          predictions={predictions}
          show={input.showRacePredictions}
          onToggle={(v) => updateField("showRacePredictions", v)}
        />
      )}
      <footer className="app__footer">
        <a
          href="https://github.com/flashworth/runningcalculator"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View source on GitHub"
          className="app__github-link"
        >
          <svg
            className="app__github-icon"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </footer>
    </div>
  );
}

export default App;
