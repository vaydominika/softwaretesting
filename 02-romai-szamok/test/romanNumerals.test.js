import QUnit from 'qunit';
import { toRoman } from '../src/romanNumerals.js';

QUnit.module('Roman numerals');

QUnit.test('converts one', (assert) => {
  assert.strictEqual(toRoman(1), 'I');
});

QUnit.test('repeats one for two and three', (assert) => {
  assert.strictEqual(toRoman(2), 'II');
  assert.strictEqual(toRoman(3), 'III');
});

QUnit.test('supports five and subtractive units', (assert) => {
  for (const [number, expected] of [[4, 'IV'], [5, 'V'], [8, 'VIII'], [9, 'IX']]) {
    assert.strictEqual(toRoman(number), expected, String(number));
  }
});

QUnit.test('supports every denomination and the upper boundary', (assert) => {
  const examples = [
    [10, 'X'], [39, 'XXXIX'], [40, 'XL'], [50, 'L'], [90, 'XC'],
    [100, 'C'], [400, 'CD'], [500, 'D'], [900, 'CM'], [1000, 'M'],
    [944, 'CMXLIV'], [1994, 'MCMXCIV'], [2026, 'MMXXVI'], [3999, 'MMMCMXCIX'],
  ];
  for (const [number, expected] of examples) {
    assert.strictEqual(toRoman(number), expected, String(number));
  }
});

QUnit.test('rejects numbers outside the integer range 1 through 3999', (assert) => {
  for (const number of [0, -1, 4000, 1.5, 3998.5, NaN, Infinity, -Infinity]) {
    assert.throws(() => toRoman(number), RangeError, String(number));
  }
});

QUnit.test('rejects values that are not numbers without coercion', (assert) => {
  for (const value of ['1', '', null, undefined, true, {}, [], 1n]) {
    assert.throws(() => toRoman(value), TypeError, String(value));
  }
});

QUnit.test('every supported number has a unique canonical representation', (assert) => {
  const canonical = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
  const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  const seen = new Set();
  for (let number = 1; number <= 3999; number += 1) {
    const roman = toRoman(number);
    assert.true(canonical.test(roman), 'Canonical: ' + number);
    assert.false(seen.has(roman), 'Unique: ' + number);
    seen.add(roman);
    let parsed = 0;
    for (let index = 0; index < roman.length; index += 1) {
      const current = values[roman[index]];
      parsed += current < (values[roman[index + 1]] ?? 0) ? -current : current;
    }
    assert.strictEqual(parsed, number, 'Round trip: ' + number);
  }
});
