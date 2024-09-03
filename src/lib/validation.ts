export function isTriangular(min: number, mean: number, max: number) {
  return min <= mean && mean <= max && min < max;
}

export function isTruncatedNormal(
  min: number,
  mean: number,
  max: number,
  sd: number,
) {
  return min <= mean && mean <= max && min < max && sd > 0;
}

export function isUniform(min: number, max: number) {
  return min < max;
}

export function isNormal(sd: number) {
  return sd >= 0;
}

export function determineDistribution(
  min?: number,
  mean?: number,
  max?: number,
  sd?: number,
) {
  if (min && mean && max && sd && isTruncatedNormal(min, mean, max, sd)) {
    return "truncated normal";
  } else if (min && mean && max && isTriangular(min, mean, max)) {
    return "triangular";
  } else if (min && max && isUniform(min, max)) {
    return "uniform";
  } else if (sd && isNormal(sd)) {
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
