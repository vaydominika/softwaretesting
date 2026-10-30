# Assignment 3: BankAccount and JUnit 5

The [`BankAccount`](./src/main/java/com/example/BankAccount.java) class provides:

```java
void deposit(double amount)
void withdraw(double amount)
double getBalance()
```

New accounts start at zero. Deposits and withdrawals must be positive, finite amounts. Withdrawals cannot exceed the current balance. Invalid amounts, insufficient funds and a deposit producing a non-finite public balance throw `IllegalArgumentException` before modifying the balance.

Amounts are stored internally as `BigDecimal` created with `BigDecimal.valueOf`, while preserving the required `double` public API. This allows `0.1` plus `0.2` to be withdrawn as `0.3` without a residual balance. No currency rounding policy is imposed. This exercise models a single-threaded account.

## Run the tests

Install JDK 17 or newer and Maven 3.9 or newer. Set `JAVA_HOME` to the JDK and put Maven on `PATH`.

From the repository root:

```sh
mvn -pl 03-bankszamla clean test
```

Alternatively, from this folder:

```sh
mvn clean test
```

To run both Java assignments from the repository root, use `mvn clean test`.

## Coverage of the required cases

| Requirement | Test method |
| --- | --- |
| Initial zero balance | `newAccountHasZeroBalance` |
| Deposit 1000 | `depositIncreasesBalance` |
| Multiple deposits | `multipleDepositsAccumulate` |
| Withdrawal after deposit | `withdrawalDecreasesBalance` |
| Withdraw full balance | `entireBalanceCanBeWithdrawn` |
| Excessive withdrawal | `excessiveWithdrawalThrowsAndPreservesBalance` |
| Negative and zero deposits | `invalidDepositThrowsAndPreservesBalance` |
| Negative and zero withdrawals | `invalidWithdrawalThrowsAndPreservesBalance` |

The parameterized tests include separate executions for negative, zero, signed-zero and non-finite inputs. Every rejected operation test verifies that the balance is unchanged. Additional cases cover an empty account, decimal amounts, overflow and recovery after a rejected operation.

JUnit XML and text reports are generated under `target/surefire-reports/`.
