# Recorded TDD history

All listed test runs used QUnit. Red runs returned exit code 1; Green and Refactor runs returned exit code 0. The history was built in this order during implementation, not reconstructed by splitting an already completed solution.

| Cycle | Red commit and new requirement | Green commit and implementation |
| --- | --- | --- |
| 1 | `6f11089` — convert 1 to `I`; 1 failing test | `4cc369d` — return `I`; 1 passing test |
| 2 | `3dfae99` — convert 2 and 3 using repetition; 1 failing test | `6d895fc` — repeat `I`; 2 passing tests |
| 3 | `4434425` — cover 4, 5, 8 and 9; 1 failing test | `195c635` — support five and subtractive units; 3 passing tests |
| 4 | `d61e650` — higher denominations, mixed values and 3999; 1 failing test | `0876132` — descending denomination selection; 4 passing tests |
| 5 | `4953ac1` — reject invalid numbers and non-number inputs; failing run | `e8ec509` — explicit type/range validation; 6 passing tests |

After cycle 4, `ef0302c` refactored the repeated branches into a denomination table. All four tests remained green. Earlier cycles kept their minimal implementations because no structural refactoring was needed yet.

After cycle 5, `7350797` added exhaustive verification for every supported input. All seven tests passed, including 11997 assertions in the exhaustive test. This was an additional verification step, not an invented Red cycle.

Run only the Roman numeral suite when examining these commits:

```sh
npm ci
npm run test:roman
```

Other assignment test folders do not yet exist in the early TDD commits, so the final root `npm test` command is not intended for replaying those early snapshots.
