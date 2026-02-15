/** Format total seconds as HH:MM:SS */
export function formatDuration(totalSeconds: number): string {
  const rounded = Math.round(totalSeconds);
  const h = Math.floor(rounded / 3600);
  const m = Math.floor((rounded % 3600) / 60);
  const s = rounded % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/** Format total seconds as MM:SS */
export function formatPace(totalSeconds: number): string {
  const rounded = Math.round(totalSeconds);
  const m = Math.floor(rounded / 60);
  const s = rounded % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/** Format distance to 2 decimal places */
export function formatDistance(value: number): string {
  return value.toFixed(2);
}

/** Format speed to 2 decimal places */
export function formatSpeed(value: number): string {
  return value.toFixed(2);
}
