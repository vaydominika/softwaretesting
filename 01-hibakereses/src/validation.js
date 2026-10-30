export function requireNumber(value, name, minimum, maximum = Infinity) {
  if (typeof value !== 'number') {
    throw new TypeError(`${name} must be a number.`);
  }
  if (!Number.isFinite(value) || value < minimum || value > maximum) {
    throw new RangeError(`${name} is outside the allowed range.`);
  }
}

export function requireBoolean(value, name) {
  if (typeof value !== 'boolean') {
    throw new TypeError(`${name} must be a boolean.`);
  }
}
