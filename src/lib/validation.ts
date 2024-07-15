export function isTriangular(min: number, mode: number, max: number) {
  return min <= mode && mode <= max && min < max;
}

export function isPercent(num: number) {
  return num >= 0 && num <= 1;
}
