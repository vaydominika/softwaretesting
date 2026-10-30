# Software Testing

Four completed software testing assignments. Assignment folders have Hungarian names; code, comments, test names, reports and documentation are in English. Standard Maven `src/main/java` and `src/test/java` paths are retained for tool compatibility.

| Folder | Assignment | Contents |
| --- | --- | --- |
| [01-hibakereses](./01-hibakereses/) | JavaScript defect analysis | Original programs, detailed defect report, corrected implementations and QUnit regression tests |
| [02-romai-szamok](./02-romai-szamok/) | Roman numeral converter using TDD | JavaScript implementation, QUnit tests and actual Red–Green–Refactor Git history |
| [03-bankszamla](./03-bankszamla/) | BankAccount | Java implementation and JUnit 5 tests |
| [04-mock-objektumok](./04-mock-objektumok/) | Mock objects | Constructor injection, Mockito notification verification and exchange-rate stubbing |

## Prerequisites

- Node.js 20 or newer, with npm.
- JDK 17 or newer, with `JAVA_HOME` configured.
- Maven 3.9 or newer on `PATH`.
- Git for cloning and inspecting the TDD history.

## Run all tests

From the repository root:

```sh
npm ci
npm test
mvn clean test
```

The JavaScript command runs both QUnit suites. The Maven reactor builds assignment 3 before assignment 4, so the latter uses the original `BankAccount` class without copying it.

## Run individual assignments

```sh
npm run test:defects
npm run test:roman
mvn -pl 03-bankszamla clean test
mvn -pl 04-mock-objektumok -am clean test
```

For a usage example, run:

```sh
node --input-type=module -e "import { toRoman } from './02-romai-szamok/src/romanNumerals.js'; console.log(toRoman(1994));"
```

Expected output: `MCMXCIV`.

## TDD evidence

The Roman numeral assignment was developed with failing tests committed before their minimal implementations, followed by a separate refactoring. See the [recorded TDD history](./02-romai-szamok/dokumentacio/tdd-history.md), or inspect it directly:

```sh
git log --reverse --oneline -- 02-romai-szamok
```

Historical Red commits intentionally fail their new tests. The final branch contains the completed passing solution.

## Continuous integration

GitHub Actions runs QUnit and Maven tests for pushes and pull requests. Maven reports are available locally in each Java module's `target/surefire-reports/` directory. Dependencies, compiled output, local verification logs and downloaded development tools are excluded from Git.

## Specifications and attribution

Assignment 1 explicitly documents its interpretations of parking billing, daily caps and the 3D surcharge for children. These clarify details left implicit in the supplied text.

Teaching references:

- [University of Miskolc: detecting defects in code](https://edu.iit.uni-miskolc.hu/tanszek:oktatas:hiba_felismeres_kodban).
- [University of Miskolc: Mockito](https://edu.iit.uni-miskolc.hu/tanszek:oktatas:mockito).

The source pages identify their teaching content as [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Attribution and licensing for the reproduced/adapted teaching examples are recorded in the relevant assignment READMEs and the defect report.
