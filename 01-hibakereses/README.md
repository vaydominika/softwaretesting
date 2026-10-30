# Assignment 1: Defect analysis

The five supplied JavaScript programs were reviewed against their specifications.

- [Defect report](./dokumentacio/defect-report.md): faulty expressions, explanations, corrections and concrete examples.
- [Original programs](./eredeti/originalPrograms.js): preserved defective examples, with exports added for inspection.
- [Corrected implementations](./src/).
- [QUnit regression tests](./test/calculators.test.js).

From the repository root:

```sh
npm ci
npm run test:defects
```

The suite covers discount thresholds, all parking discount combinations, age boundaries, examination pass requirements, package limits and invalid inputs.

## Interpretation of unspecified details

- Monetary results are numeric HUF amounts without forced integer rounding; fractional amounts remain valid. Floating-point comparisons in monetary tests use a tolerance where needed.
- Discount brackets are continuous: for example, values from 10000 inclusive to 25000 exclusive receive 5%.
- Parking is free through 15 minutes. Once a stay exceeds 15 minutes, started hours are counted from arrival, including those first minutes: 16 and 60 minutes cost 600 HUF; 61 minutes costs 1200 HUF. The first 15 minutes are a grace threshold, not a deduction from the billable duration.
- The parking cap applies to the normal daily fee before weekend and VIP reductions. A full day costs at most 5000 HUF, 2500 HUF on weekends, or 2000 HUF with both reductions.
- Because calendar dates are not supplied, multi-day parking uses consecutive 1440-minute blocks. Each block is capped separately, the initial free period applies once per stay, and the supplied flags apply to the whole stay. For example, 1441 minutes costs 5600 HUF before discounts. Calendar-based weekend changes would require a different API.
- A child under six pays no base cinema price but still pays the fixed 800 HUF 3D surcharge.
- Fractional ages and examination scores are accepted within their numeric ranges; grade bands use the next lower-bound threshold, for example 59.5 is grade 2. The task does not explicitly require integer values for these inputs.
- Boolean flags default to `false` and must otherwise be actual booleans. Numeric strings are not coerced. Invalid numeric types throw `TypeError`; non-finite or out-of-range values throw `RangeError`. The package classifier instead returns `INVALID`, as required.

## Source attribution

The specifications and original examples come from the [University of Miskolc teaching page](https://edu.iit.uni-miskolc.hu/tanszek:oktatas:hiba_felismeres_kodban), accessed October 30, 2026. That page identifies its content as [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The reproduced examples, corrected adaptations and accompanying defect report retain that attribution and license. The analysis and regression tests were prepared for this assignment.
