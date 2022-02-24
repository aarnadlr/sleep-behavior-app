export function calculateScore(durationInBed: number, durationAsleep: number) {
  const score = (100 * durationAsleep) / durationInBed;
  return score;
}
