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
