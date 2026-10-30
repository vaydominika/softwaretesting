/** Convert an integer in the inclusive range 1..3999 to a Roman numeral. */
export function toRoman(number) {
  let remaining = number;
  let result = '';
  while (remaining > 0) {
    let value;
    let symbol;
    if (remaining >= 1000) { value = 1000; symbol = 'M'; }
    else if (remaining >= 900) { value = 900; symbol = 'CM'; }
    else if (remaining >= 500) { value = 500; symbol = 'D'; }
    else if (remaining >= 400) { value = 400; symbol = 'CD'; }
    else if (remaining >= 100) { value = 100; symbol = 'C'; }
    else if (remaining >= 90) { value = 90; symbol = 'XC'; }
    else if (remaining >= 50) { value = 50; symbol = 'L'; }
    else if (remaining >= 40) { value = 40; symbol = 'XL'; }
    else if (remaining >= 10) { value = 10; symbol = 'X'; }
    else if (remaining >= 9) { value = 9; symbol = 'IX'; }
    else if (remaining >= 5) { value = 5; symbol = 'V'; }
    else if (remaining >= 4) { value = 4; symbol = 'IV'; }
    else if (remaining >= 1) { value = 1; symbol = 'I'; }
    result += symbol;
    remaining -= value;
  }
  return result;
}
