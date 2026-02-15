import { useState } from "react";
import "./App.css";
import type { InputState, DistanceUnit, PaceUnit } from "./types";
import { parseAllInputs, validateInputs } from "./utils/parsing";
import {
  calculate,
  getConvertedPaceHint,
  getConvertedDistanceHint,
  getRacePredictionsFromInputs,
} from "./utils/calculations";
import InputField from "./components/InputField";
import UnitToggle from "./components/UnitToggle";
import ResultsPanel from "./components/ResultsPanel";
import ResetButton from "./components/ResetButton";
import ToggleSwitch from "./components/ToggleSwitch";
import ConversionHint from "./components/ConversionHint";
import RacePredictions from "./components/RacePredictions";
import Navbar from "./components/Navbar";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
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
  const [showFAQ, setShowFAQ] = useState(false);

  const parsed = parseAllInputs(input);
  const result = calculate(parsed);
  const errors = validateInputs(input);

  const predictions = getRacePredictionsFromInputs(parsed);

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

  function handleInfoClick() {
    setShowFAQ(true);
  }

  function handleCloseFAQ() {
    setShowFAQ(false);
  }

  return (
    <div className="app">
      <Navbar onInfoClick={handleInfoClick} />
      {showFAQ ? (
        <FAQ onClose={handleCloseFAQ} />
      ) : (
        <>
          <div className="app__header">
            <ToggleSwitch
              id="show-conversions"
              label="Show conversions"
              checked={input.showConversions}
              onChange={(v) => updateField("showConversions", v)}
            />
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
                    onChange={(v) =>
                      updateField("distanceUnit", v as DistanceUnit)
                    }
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
          <div className="app__panels">
            <ResultsPanel result={result} />
            {predictions && (
              <RacePredictions
                predictions={predictions}
                show={input.showRacePredictions}
                onToggle={(v) => updateField("showRacePredictions", v)}
              />
            )}
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
