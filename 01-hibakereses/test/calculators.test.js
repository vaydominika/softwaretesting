import QUnit from 'qunit';
import { calculateDiscountedPrice } from '../src/discountCalculator.js';
import { calculateParkingFee } from '../src/parkingFeeCalculator.js';
import { calculateTicketPrice } from '../src/cinemaTicketCalculator.js';
import { calculateGrade } from '../src/examGradeCalculator.js';
import { classifyPackage } from '../src/packageClassifier.js';

QUnit.module('Discount calculator');
for (const [value, regular, vip] of [
  [0, 0, 0], [9999, 9999, 9499.05], [10000, 9500, 9000],
  [24999, 23749.05, 22499.10], [25000, 22500, 21250],
  [49999, 44999.10, 42499.15], [50000, 42500, 40000], [50001, 42500.85, 40000.80],
]) {
  QUnit.test(`order value ${value}: regular and VIP`, (assert) => {
    assert.true(Math.abs(calculateDiscountedPrice(value, false) - regular) < 1e-8);
    assert.true(Math.abs(calculateDiscountedPrice(value, true) - vip) < 1e-8);
  });
}

QUnit.module('Parking fee calculator');
for (const [minutes, fee] of [
  [0, 0], [14, 0], [15, 0], [15.01, 600], [16, 600], [59, 600],
  [60, 600], [61, 1200], [480, 4800], [481, 5000], [1440, 5000],
  [1441, 5600], [1455, 5600], [2880, 10000],
]) {
  QUnit.test(`${minutes} minutes in every discount combination`, (assert) => {
    assert.strictEqual(calculateParkingFee(minutes, false, false), fee);
    assert.strictEqual(calculateParkingFee(minutes, true, false), fee * 0.5);
    assert.strictEqual(calculateParkingFee(minutes, false, true), fee * 0.8);
    assert.strictEqual(calculateParkingFee(minutes, true, true), fee * 0.4);
  });
}

QUnit.module('Cinema ticket calculator');
for (const [age, regular, student] of [
  [0, 0, 0], [5, 0, 0], [6, 2100, 2100], [17, 2100, 2100],
  [18, 3000, 2400], [64, 3000, 2400], [65, 1800, 1800], [120, 1800, 1800],
]) {
  QUnit.test(`age ${age}: largest discount and fixed 3D surcharge`, (assert) => {
    assert.strictEqual(calculateTicketPrice(age, false, false), regular);
    assert.strictEqual(calculateTicketPrice(age, true, false), student);
    assert.strictEqual(calculateTicketPrice(age, false, true), regular + 800);
    assert.strictEqual(calculateTicketPrice(age, true, true), student + 800);
  });
}

QUnit.module('Exam grade calculator');
for (const [theory, practice, grade] of [
  [0, 0, 1], [29, 40, 1], [60, 19, 1], [29, 19, 1], [30, 20, 2],
  [39, 20, 2], [40, 20, 3], [49, 20, 3], [50, 20, 4], [60, 24, 4],
  [60, 25, 5], [60, 40, 5], [39.5, 20, 2],
]) {
  QUnit.test(`theory ${theory}, practice ${practice}`, (assert) => {
    assert.strictEqual(calculateGrade(theory, practice), grade);
  });
}

QUnit.module('Numeric input validation');
for (const invalid of [-1, NaN, Infinity, -Infinity, '10', null, undefined]) {
  QUnit.test(`rejects invalid numeric input ${String(invalid)}`, (assert) => {
    assert.throws(() => calculateDiscountedPrice(invalid));
    assert.throws(() => calculateParkingFee(invalid));
    assert.throws(() => calculateTicketPrice(invalid));
    assert.throws(() => calculateGrade(invalid, 20));
    assert.throws(() => calculateGrade(30, invalid));
  });
}
QUnit.test('rejects out-of-range ages and individual exam scores', (assert) => {
  assert.throws(() => calculateTicketPrice(121), RangeError);
  assert.throws(() => calculateGrade(61, 20), RangeError);
  assert.throws(() => calculateGrade(30, 41), RangeError);
});
QUnit.test('rejects non-boolean flags', (assert) => {
  assert.throws(() => calculateDiscountedPrice(10000, 'true'), TypeError);
  assert.throws(() => calculateParkingFee(60, 1), TypeError);
  assert.throws(() => calculateParkingFee(60, false, 'yes'), TypeError);
  assert.throws(() => calculateTicketPrice(18, 'yes'), TypeError);
  assert.throws(() => calculateTicketPrice(18, false, 1), TypeError);
});

QUnit.module('Package classifier');
for (const [weight, length, width, height, category] of [
  [1, 10, 10, 10, 'SMALL'], [2, 30, 30, 30, 'SMALL'],
  [2.01, 30, 30, 30, 'MEDIUM'], [2, 30.01, 30, 30, 'MEDIUM'],
  [10, 60, 60, 60, 'MEDIUM'], [10.01, 60, 60, 60, 'LARGE'],
  [10, 61, 60, 60, 'LARGE'], [10, 60, 61, 60, 'LARGE'], [10, 60, 60, 61, 'LARGE'],
  [10, 200, 20, 20, 'OVERSIZE'], [10, 20, 200, 20, 'OVERSIZE'],
  [10, 20, 20, 200, 'OVERSIZE'], [30, 120, 120, 120, 'LARGE'],
  [30.01, 120, 120, 120, 'OVERSIZE'], [30, 120.01, 120, 120, 'OVERSIZE'],
]) {
  QUnit.test(`${weight} kg, ${length} x ${width} x ${height} cm`, (assert) => {
    assert.strictEqual(classifyPackage(weight, length, width, height), category);
  });
}
QUnit.test('rejects invalid values in every measurement position', (assert) => {
  for (const invalid of [0, -1, NaN, Infinity, -Infinity, '1', null, undefined]) {
    for (let position = 0; position < 4; position += 1) {
      const measurements = [1, 10, 10, 10];
      measurements[position] = invalid;
      assert.strictEqual(classifyPackage(...measurements), 'INVALID');
    }
  }
});
