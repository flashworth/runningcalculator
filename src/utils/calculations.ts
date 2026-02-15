import type {
  ParsedInputs,
  CalculationResult,
  RacePrediction,
  PaceUnit,
  DistanceUnit,
} from "../types";
import { parsePace, parseDistance } from "./parsing";
import { formatPace, formatDistance } from "./formatting";

export const KM_PER_MILE = 1.60934;

export function convertPaceToPerKm(
  paceSeconds: number,
  unit: "per_km" | "per_mi",
): number {
  return unit === "per_km" ? paceSeconds : paceSeconds / KM_PER_MILE;
}

export function convertPaceToPerMi(
  paceSeconds: number,
  unit: "per_km" | "per_mi",
): number {
  return unit === "per_mi" ? paceSeconds : paceSeconds * KM_PER_MILE;
}

export function convertDistanceToKm(value: number, unit: "km" | "mi"): number {
  return unit === "km" ? value : value * KM_PER_MILE;
}

export function convertDistanceToMi(value: number, unit: "km" | "mi"): number {
  return unit === "mi" ? value : value / KM_PER_MILE;
}

function buildResult(
  durationSeconds: number,
  distanceKm: number,
): CalculationResult | null {
  if (durationSeconds <= 0 || distanceKm <= 0) return null;

  const distanceMi = distanceKm / KM_PER_MILE;
  const paceSecondsPerKm = durationSeconds / distanceKm;
  const paceSecondsPerMi = paceSecondsPerKm * KM_PER_MILE;
  const speedKmh = distanceKm / (durationSeconds / 3600);
  const speedMph = speedKmh / KM_PER_MILE;

  const values = [
    durationSeconds,
    distanceMi,
    paceSecondsPerKm,
    paceSecondsPerMi,
    speedKmh,
    speedMph,
  ];
  if (values.some((v) => !isFinite(v) || isNaN(v))) return null;

  return {
    durationSeconds,
    paceSecondsPerKm,
    paceSecondsPerMi,
    distanceKm,
    distanceMi,
    speedKmh,
    speedMph,
  };
}

/** Returns a hint string like "7:31 /mi" for the opposite unit, or null if input is empty/invalid. */
export function getConvertedPaceHint(
  rawPace: string,
  unit: PaceUnit,
): string | null {
  const seconds = parsePace(rawPace);
  if (seconds === null) return null;
  if (unit === "per_km") {
    return `${formatPace(convertPaceToPerMi(seconds, "per_km"))} /mi`;
  }
  return `${formatPace(convertPaceToPerKm(seconds, "per_mi"))} /km`;
}

/** Returns a hint string like "3.11 mi" for the opposite unit, or null if input is empty/invalid. */
export function getConvertedDistanceHint(
  rawDistance: string,
  unit: DistanceUnit,
): string | null {
  const value = parseDistance(rawDistance);
  if (value === null) return null;
  if (unit === "km") {
    return `${formatDistance(convertDistanceToMi(value, "km"))} mi`;
  }
  return `${formatDistance(convertDistanceToKm(value, "mi"))} km`;
}

export function calculate(parsed: ParsedInputs): CalculationResult | null {
  const {
    durationSeconds,
    paceSeconds,
    paceUnit,
    distanceValue,
    distanceUnit,
  } = parsed;

  const hasDuration = durationSeconds !== null;
  const hasPace = paceSeconds !== null;
  const hasDistance = distanceValue !== null;

  const filledCount = [hasDuration, hasPace, hasDistance].filter(
    Boolean,
  ).length;
  if (filledCount < 2) return null;

  // Distance + duration (also covers all-three-filled: duration+distance take priority)
  if (hasDuration && hasDistance) {
    const distanceKm = convertDistanceToKm(distanceValue, distanceUnit);
    if (distanceKm <= 0) return null;
    return buildResult(durationSeconds, distanceKm);
  }

  // Pace + duration → derive distance
  if (hasPace && hasDuration) {
    const pacePerKm = convertPaceToPerKm(paceSeconds, paceUnit);
    if (pacePerKm <= 0) return null;
    const distanceKm = durationSeconds / pacePerKm;
    return buildResult(durationSeconds, distanceKm);
  }

  // Pace + distance → derive duration
  if (hasPace && hasDistance) {
    const pacePerKm = convertPaceToPerKm(paceSeconds, paceUnit);
    const distanceKm = convertDistanceToKm(distanceValue, distanceUnit);
    if (pacePerKm <= 0 || distanceKm <= 0) return null;
    const duration = pacePerKm * distanceKm;
    return buildResult(duration, distanceKm);
  }

  return null;
}

const RACE_DISTANCES = [
  { name: "5K", distanceKm: 5 },
  { name: "10K", distanceKm: 10 },
  { name: "8 Mile", distanceKm: 8 * KM_PER_MILE },
  { name: "Half Marathon", distanceKm: 21.0975 },
  { name: "Marathon", distanceKm: 42.195 },
];

/** Given a calculation result, predict finish times for common race distances. */
export function getRacePredictions(
  result: CalculationResult,
): RacePrediction[] {
  return RACE_DISTANCES.map(({ name, distanceKm }) => ({
    name,
    distanceKm,
    durationSeconds: result.paceSecondsPerKm * distanceKm,
  }));
}
