export function calculateScore(durationInBed: number, durationAsleep: number) {
  const score: number = (100 * durationAsleep) / durationInBed;

  return score;
}
