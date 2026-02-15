/** Format numeric input for pace field (mm:ss) in real-time */
export function formatPaceInput(input: string): string {
  // Remove all non-digit characters
  const digits = input.replace(/\D/g, '');

  if (digits.length === 0) return '';
  if (digits.length <= 2) return digits;

  // Insert colon: 440 -> 4:40, 530 -> 5:30
  const minutes = digits.slice(0, -2);
  const seconds = digits.slice(-2);

  return `${minutes}:${seconds}`;
}

/** Format numeric input for duration field (hh:mm:ss or mm:ss) in real-time */
export function formatDurationInput(input: string): string {
  // Remove all non-digit characters
  const digits = input.replace(/\D/g, '');

  if (digits.length === 0) return '';
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) {
    // mm:ss format: 440 -> 4:40
    const minutes = digits.slice(0, -2);
    const seconds = digits.slice(-2);
    return `${minutes}:${seconds}`;
  }

  // hh:mm:ss format: 12030 -> 1:20:30
  const hours = digits.slice(0, -4);
  const minutes = digits.slice(-4, -2);
  const seconds = digits.slice(-2);

  return `${hours}:${minutes}:${seconds}`;
}
