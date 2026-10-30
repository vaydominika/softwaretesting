export function classifyPackage(weight, length, width, height) {
  const measurements = [weight, length, width, height];
  if (measurements.some((value) => typeof value !== 'number' || !Number.isFinite(value) || value <= 0)) {
    return 'INVALID';
  }

  const largestDimension = Math.max(length, width, height);
  if (weight <= 2 && largestDimension <= 30) return 'SMALL';
  if (weight <= 10 && largestDimension <= 60) return 'MEDIUM';
  if (weight <= 30 && largestDimension <= 120) return 'LARGE';
  return 'OVERSIZE';
}
