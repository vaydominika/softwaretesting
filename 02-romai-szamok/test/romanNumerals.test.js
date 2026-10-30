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
