export function isTriangular(
  min: number,
  mode: number,
  max: number,
  sd: number,
) {
  return min <= mode && mode <= max && min < max && sd === 0;
}

function isTruncatedNormal(min: number, mean: number, max: number, sd: number) {
  return min <= mean && mean <= max && min < max && sd > 0;
}

function isUniform(min: number, mode: number, max: number, sd: number) {
  return min < max && mode === 0 && sd === 0;
}

function isNormal(min: number, mode: number, max: number, sd: number) {
  return min === 0 && max === 0 && mode > 0 && sd > 0;
}

export function determineDistribution(
  min: number,
  mode: number,
  max: number,
  sd: number,
) {
  if (isTriangular(min, mode, max, sd)) {
    return "triangular";
  } else if (isTruncatedNormal(min, mode, max, sd)) {
    return "truncated normal";
  } else if (isUniform(min, mode, max, sd)) {
    return "uniform";
  } else if (isNormal(min, mode, max, sd)) {
    return "normal";
  } else {
    return null;
  }
}

export function isPercent(num: number) {
  return num >= 0 && num <= 1;
}

export function isAllZero(...args: number[]) {
  return args.every((arg) => arg === 0);
}
