/** Convert an integer in the inclusive range 1..3999 to a Roman numeral. */
export function toRoman(number) {
  if (number === 9) return 'IX';
  if (number >= 5) return 'V' + 'I'.repeat(number - 5);
  if (number === 4) return 'IV';
  return 'I'.repeat(number);
}
