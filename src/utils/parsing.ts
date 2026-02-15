import type { InputState, ParsedInputs, ValidationErrors } from '../types';

/** Parse duration from HH:MM:SS, MM:SS, or plain minutes. Returns total seconds or null. */
export function parseDuration(input: string): number | null {
  const trimmed = input.trim();
  if (trimmed === '') return null;

  const parts = trimmed.split(':');

  if (parts.length === 3) {
    const [h, m, s] = parts.map(Number);
    if (parts.some((p) => p === '' || isNaN(Number(p)))) return null;
    if (h < 0 || m < 0 || m > 59 || s < 0 || s > 59) return null;
    const total = h * 3600 + m * 60 + s;
    return total > 0 ? total : null;
  }

  if (parts.length === 2) {
    const [m, s] = parts.map(Number);
    if (parts.some((p) => p === '' || isNaN(Number(p)))) return null;
    if (m < 0 || s < 0 || s > 59) return null;
    const total = m * 60 + s;
    return total > 0 ? total : null;
  }

  if (parts.length === 1) {
    const minutes = Number(trimmed);
    if (isNaN(minutes) || minutes <= 0) return null;
    return minutes * 60;
  }

  return null;
}

/** Parse pace from MM:SS format. Returns total seconds or null. */
export function parsePace(input: string): number | null {
  const trimmed = input.trim();
  if (trimmed === '') return null;

  const parts = trimmed.split(':');
  if (parts.length !== 2) return null;

  const [m, s] = parts.map(Number);
  if (parts.some((p) => p === '' || isNaN(Number(p)))) return null;
  if (m < 0 || s < 0 || s > 59) return null;

  const total = m * 60 + s;
  return total > 0 ? total : null;
}

/** Parse distance as a positive number. Returns the value or null. */
export function parseDistance(input: string): number | null {
  const trimmed = input.trim();
  if (trimmed === '') return null;

  const value = Number(trimmed);
  if (isNaN(value) || value <= 0) return null;

  return value;
}

/** Parse all raw inputs into numeric values. */
export function parseAllInputs(state: InputState): ParsedInputs {
  return {
    durationSeconds: parseDuration(state.duration),
    paceSeconds: parsePace(state.pace),
    paceUnit: state.paceUnit,
    distanceValue: parseDistance(state.distance),
    distanceUnit: state.distanceUnit,
  };
}

/** Validate raw inputs. Returns error messages for non-empty but invalid fields. */
export function validateInputs(state: InputState): ValidationErrors {
  return {
    duration:
      state.duration.trim() !== '' && parseDuration(state.duration) === null
        ? 'Expected HH:MM:SS, MM:SS, or minutes'
        : null,
    pace:
      state.pace.trim() !== '' && parsePace(state.pace) === null
        ? 'Expected MM:SS'
        : null,
    distance:
      state.distance.trim() !== '' && parseDistance(state.distance) === null
        ? 'Expected a positive number'
        : null,
  };
}
