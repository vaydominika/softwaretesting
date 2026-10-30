# Defect report

Each table identifies an original faulty fragment, explains the mismatch, and gives the required correction. Full original functions are preserved in [originalPrograms.js](../eredeti/originalPrograms.js). Run the regression tests with `npm run test:defects` from the repository root.

## 1. DiscountCalculator

Corrected function: [calculateDiscountedPrice](../src/discountCalculator.js).

| Faulty fragment | Explanation | Correct behavior or fix |
| --- | --- | --- |
| No check before `let discount = 0` | Negative order values are accepted. | Reject negative values before calculating the discount. |
| `orderValue > 10000` | Exactly 10000 is excluded from the 5% bracket. | Use `>= 10000`. |
| `orderValue <= 50000` and `orderValue > 50000` | Exactly 50000 receives 10% instead of 15%. | End the middle bracket below 50000; start the final bracket at `>= 50000`. |
| `discount += 5` | Rates are fractions, so adding 5 adds 500 percentage points. The cap then makes every VIP discount 20%. | Add `0.05`, meaning five percentage points. |
| `return orderValue - discount` | A rate is subtracted as a currency amount. | Return `orderValue * (1 - discount)` after applying the 20% cap. |

Examples of the combined original defects:

| Input `(orderValue, isVip)` | Original result | Required result |
| --- | ---: | ---: |
| `(10000, false)` | 10000 | 9500 |
| `(50000, false)` | 49999.9 | 42500 |
| `(10000, true)` | 9999.8 | 9000 |
| `(-100, false)` | -100 | Error |

The existing maximum-discount check is correct in isolation and is retained as `Math.min(discount, 0.20)`.

## 2. ParkingFeeCalculator

Corrected function: [calculateParkingFee](../src/parkingFeeCalculator.js).

| Faulty fragment | Explanation | Correct behavior or fix |
| --- | --- | --- |
| No validation before `if (minutes < 15)` | Negative durations are silently treated as free parking. | Reject negative durations first. |
| `minutes < 15` | The free interval excludes exactly 15. The separate rounding bug happens to mask this in the original result. | Use `minutes <= 15`. |
| `Math.floor(minutes / 60)` | Only completed hours are charged; started hours are lost. | After the grace-period check, use `Math.ceil(minutes / 60)` within each daily block. |
| `fee = fee - 20` | Subtracts 20 HUF instead of giving a 20% discount and may produce a negative fee. | Multiply by `0.8`. |
| Weekend/VIP reductions before `if (fee > 5000)` | Reduces an uncapped amount, potentially charging more than the discounted daily maximum. | Cap the normal daily fee first, then apply `0.5` and `0.8`. |
| A single final 5000 cap for any duration | A daily limit is treated as a limit for the entire stay. The input can exceed one day. | Cap each elapsed 24-hour block separately, under the documented multi-day interpretation. |

Examples under the interpretation documented in the assignment README:

| Input `(minutes, isWeekend, isVip)` | Original result | Required result |
| --- | ---: | ---: |
| `(16, false, false)` | 0 | 600 |
| `(61, false, false)` | 600 | 1200 |
| `(60, false, true)` | 580 | 480 |
| `(600, true, false)` | 3000 | 2500 |
| `(1440, true, true)` | 5000 | 2000 |
| `(2880, false, false)` | 5000 | 10000 |
| `(-1, false, false)` | 0 | Error |

The specification leaves the grace-period billing basis, daily boundary and cap/discount order implicit. The implementation states these assumptions explicitly instead of silently treating them as unambiguous requirements.

## 3. CinemaTicketCalculator

Corrected function: [calculateTicketPrice](../src/cinemaTicketCalculator.js).

| Faulty fragment | Explanation | Correct behavior or fix |
| --- | --- | --- |
| No age validation | Negative ages receive a free ticket; ages above 120 receive a senior discount. | Reject ages outside 0 through 120. |
| `age <= 6` | A six-year-old is incorrectly admitted for free. | Use `age < 6`; ages 6 through 17 receive 30% off. |
| `age > 65` | A 65-year-old misses the senior discount. | Use `age >= 65`. |
| `if (isStudent) { price = price * 0.8; }` | Applies a second discount after the age discount. | Use only `Math.max(ageDiscount, studentDiscount)`. |
| `price = price * 1.8` | Adds an 80% proportional surcharge instead of a fixed 800 HUF. It also makes the surcharge depend on previous discounts. | Add 800 after calculating the discounted base price. |

| Input `(age, isStudent, is3D)` | Original result | Required result |
| --- | ---: | ---: |
| `(6, false, false)` | 0 | 2100 |
| `(65, false, false)` | 3000 | 1800 |
| `(17, true, false)` | 1680 | 2100 |
| `(30, false, true)` | 5400 | 3800 |
| `(5, false, true)` | 0 | 800 |
| `(121, false, false)` | 1800 | Error |

## 4. ExamGradeCalculator

Corrected function: [calculateGrade](../src/examGradeCalculator.js).

| Faulty fragment | Explanation | Correct behavior or fix |
| --- | --- | --- |
| `let total = theory + practice` without validation | Negative, excessive or non-numeric component scores are accepted; string values may concatenate. | Validate theory within 0..60 and practice within 0..40 before addition. |
| `theory < 30 && practice < 20` | Forces failure only when both minimums are missed. Missing either minimum must fail the exam. | Use `theory < 30 || practice < 20`. |
| `total <= 60` | Gives grade 2 at 60 instead of grade 3. | Use `total < 60` for grade 2. |
| `total <= 70` | Gives grade 3 at 70 instead of grade 4. | Use `total < 70` for grade 3. |
| `total <= 85` | Gives grade 4 at 85 instead of grade 5. | Use `total < 85` for grade 4. |

| Input `(theory, practice)` | Original result | Required result |
| --- | ---: | ---: |
| `(29, 40)` | 3 | 1 |
| `(60, 19)` | 4 | 1 |
| `(40, 20)` | 2 | 3 |
| `(50, 20)` | 3 | 4 |
| `(60, 25)` | 4 | 5 |
| `(61, 20)` | 4 | Error |

After both component minimums are satisfied, the total is at least 50. Therefore the corrected function needs no further below-50 branch.

## 5. PackageClassifier

Corrected function: [classifyPackage](../src/packageClassifier.js).

| Faulty fragment | Explanation | Correct behavior or fix |
| --- | --- | --- |
| No validity check before the category checks | Zero and negative dimensions or weights may be classified as valid packages. | Return `INVALID` if any measurement is zero, negative or not a finite number. |
| `weight < 2` | Excludes the allowed 2 kg small-package boundary. | Use `weight <= 2`. |
| `length < 30 && width < 30 && height < 30` | Excludes allowed 30 cm small-package dimensions. | Use `<= 30` for every dimension. |
| `length <= 60 || width <= 60 || height <= 60` | One short side is sufficient, even if another side is enormous. | Require all three dimensions to be at most 60 using `&&`, or check the largest dimension. |

| Input `(weight, length, width, height)` | Original result | Required result |
| --- | --- | --- |
| `(2, 20, 20, 20)` | MEDIUM | SMALL |
| `(1, 30, 20, 20)` | MEDIUM | SMALL |
| `(10, 100, 20, 20)` | MEDIUM | LARGE |
| `(10, 200, 20, 20)` | MEDIUM | OVERSIZE |
| `(0, 10, 10, 10)` | SMALL | INVALID |

The original LARGE limits and final OVERSIZE fallback are correct once validity and earlier categories are fixed. Categories are checked from smallest to largest.

## Additional robustness

The original specifications explicitly mention negative or out-of-range values. The corrected functions additionally reject `NaN`, infinities and wrong numeric types, and check flag types. These are defensive API choices beyond the explicitly listed defects.

## Attribution

Based on the [University of Miskolc original examples and specifications](https://edu.iit.uni-miskolc.hu/tanszek:oktatas:hiba_felismeres_kodban). This report and the corrected adaptations are provided under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); the examples were translated, analyzed and corrected for this submission.
