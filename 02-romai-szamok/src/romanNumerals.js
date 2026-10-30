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
  let remaining = number;
  let result = '';
  for (const [value, symbol] of DENOMINATIONS) {
    const count = Math.floor(remaining / value);
    result += symbol.repeat(count);
    remaining %= value;
  }
  return result;
}
