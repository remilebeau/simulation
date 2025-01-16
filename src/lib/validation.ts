export function isValidInput(
  min: number,
  mean: number,
  max: number,
  sd: number,
) {
  return min <= mean && mean <= max && min < max && sd >= 0;
}
