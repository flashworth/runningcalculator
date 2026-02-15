export type DistanceUnit = "km" | "mi";
export type PaceUnit = "per_km" | "per_mi";

/** Raw input state — all strings because they come from text fields */
export interface InputState {
  duration: string;
  pace: string;
  paceUnit: PaceUnit;
  distance: string;
  distanceUnit: DistanceUnit;
  showConversions: boolean;
  showRacePredictions: boolean;
}

/** A single race prediction entry */
export interface RacePrediction {
  name: string;
  distanceKm: number;
  durationSeconds: number;
}

/** Parsed numeric values (null means empty or invalid) */
export interface ParsedInputs {
  durationSeconds: number | null;
  paceSeconds: number | null;
  paceUnit: PaceUnit;
  distanceValue: number | null;
  distanceUnit: DistanceUnit;
}

/** Fully resolved results for display */
export interface CalculationResult {
  durationSeconds: number;
  paceSecondsPerKm: number;
  paceSecondsPerMi: number;
  distanceKm: number;
  distanceMi: number;
  speedKmh: number;
  speedMph: number;
}

/** Validation error per field (null = no error) */
export interface ValidationErrors {
  duration: string | null;
  pace: string | null;
  distance: string | null;
}
