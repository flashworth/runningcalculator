import type { CalculationResult } from "../types";
import {
  formatDuration,
  formatPace,
  formatDistance,
  formatSpeed,
} from "../utils/formatting";

interface ResultsPanelProps {
  result: CalculationResult | null;
}

export default function ResultsPanel({ result }: ResultsPanelProps) {
  return (
    <div aria-live="polite" aria-label="Calculation results">
      {result && (
        <section className="results-panel">
          <div className="results-panel__row">
            <span className="results-panel__label">Duration</span>
            <span className="results-panel__value">
              {formatDuration(result.durationSeconds)}
            </span>
          </div>
          <div className="results-panel__row">
            <span className="results-panel__label">Pace</span>
            <span className="results-panel__value">
              {formatPace(result.paceSecondsPerKm)} /km
              <span className="results-panel__separator">|</span>
              {formatPace(result.paceSecondsPerMi)} /mi
            </span>
          </div>
          <div className="results-panel__row">
            <span className="results-panel__label">Distance</span>
            <span className="results-panel__value">
              {formatDistance(result.distanceKm)} km
              <span className="results-panel__separator">|</span>
              {formatDistance(result.distanceMi)} mi
            </span>
          </div>
          <div className="results-panel__row">
            <span className="results-panel__label">Speed</span>
            <span className="results-panel__value">
              {formatSpeed(result.speedKmh)} km/h
              <span className="results-panel__separator">|</span>
              {formatSpeed(result.speedMph)} mph
            </span>
          </div>
        </section>
      )}
    </div>
  );
}
