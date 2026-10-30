const DENOMINATIONS = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
];

/** Convert an integer in the inclusive range 1..3999 to a Roman numeral. */
export function toRoman(number) {
  if (typeof number !== 'number') {
    throw new TypeError('Input must be a number.');
  }
  if (!Number.isInteger(number) || number < 1 || number > 3999) {
    throw new RangeError('Input must be an integer between 1 and 3999.');
  }

  let remaining = number;
  let result = '';
  for (const [value, symbol] of DENOMINATIONS) {
    const count = Math.floor(remaining / value);
    result += symbol.repeat(count);
    remaining %= value;
  }
  return result;
}
