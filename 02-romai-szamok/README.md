# Assignment 2: Roman numerals with TDD

`toRoman(number)` converts integers from 1 through 3999 to canonical Roman numerals. It supports `I`, `V`, `X`, `L`, `C`, `D`, `M` and all six subtractive pairs: `IV`, `IX`, `XL`, `XC`, `CD`, `CM`.

## Run and test

Requires Node.js 20 or newer. Run these commands from the repository root:

```sh
npm ci
npm run test:roman
node --input-type=module -e "import { toRoman } from './02-romai-szamok/src/romanNumerals.js'; console.log(toRoman(1994));"
```

The last command prints `MCMXCIV`.

```js
import { toRoman } from './src/romanNumerals.js';

toRoman(1);    // I
toRoman(4);    // IV
toRoman(9);    // IX
toRoman(58);   // LVIII
toRoman(1994); // MCMXCIV
toRoman(3999); // MMMCMXCIX
```

Non-number inputs, including numeric strings, throw `TypeError`. Numbers outside 1..3999, fractions, `NaN` and infinities throw `RangeError`. Values are never rounded or implicitly coerced.

## Test-driven development

[TDD history](./dokumentacio/tdd-history.md) lists the actual Red, Green and Refactor commits. Each Red commit was made after observing a failing QUnit run, and each Green/Refactor commit after observing a passing run.

The final suite covers normal values, every subtractive pair, lower and upper boundaries, invalid inputs, and an exhaustive check of all 3999 supported inputs. The exhaustive test checks canonical syntax, uniqueness and an independently parsed round trip.

Inspect the history from the repository root:

```sh
git log --reverse --oneline -- 02-romai-szamok
```

To replay a historical Red commit without disturbing the main checkout, create a separate worktree, run `npm ci`, then `npm run test:roman` there. A nonzero exit code is expected for a Red commit. Use the adjacent Green commit to see the same tests pass.
