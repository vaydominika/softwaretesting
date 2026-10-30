# Assignment 4: Mock objects with Mockito

This Maven module reuses `BankAccount` from assignment 3 through a normal module dependency.

- [`NotificationService`](./src/main/java/com/example/NotificationService.java) defines `void send(String message)`.
- [`BankService`](./src/main/java/com/example/BankService.java) receives its notification service through constructor injection. `deposit(account, amount)` first deposits the amount and then sends `"Deposit successful"`.
- [`ExchangeRateService`](./src/main/java/com/example/ExchangeRateService.java) defines `double getRate(String from, String to)`.

## Run the tests

Requires JDK 17 or newer and Maven 3.9 or newer. From the repository root:

```sh
mvn clean test
```

To select assignment 4 and automatically build its assignment 3 dependency:

```sh
mvn -pl 04-mock-objektumok -am clean test
```

The `-am` option is necessary for a clean checkout: it makes Maven build the required sibling module in the same reactor. Running `mvn clean test` inside this folder alone requires those sibling artifacts and the parent POM to have been installed first; the root command avoids that extra step.

## Mockito usage

The tests use actual Mockito mocks with no real email, SMS or exchange-rate service:

```java
NotificationService notifications = mock(NotificationService.class);
BankService service = new BankService(notifications);
BankAccount account = new BankAccount();

service.deposit(account, 1000);

assertEquals(1000.0, account.getBalance());
verify(notifications).send("Deposit successful");
verifyNoMoreInteractions(notifications);
```

Rejected deposits preserve the balance and are checked with `verifyNoInteractions(notifications)`. A callback also verifies that the balance has already changed when the notification is sent.

Exchange-rate stubbing is demonstrated with the teaching material's EUR/HUF example:

```java
ExchangeRateService rates = mock(ExchangeRateService.class);
when(rates.getRate("EUR", "HUF")).thenReturn(400.0);

assertEquals(400.0, rates.getRate("EUR", "HUF"));
verify(rates).getRate("EUR", "HUF");
```

The value 400.0 is a deterministic test fixture, not a live exchange rate.

If notification sending throws after a successful deposit, the exception propagates and the deposit remains committed in the account. This documented behavior follows the specified deposit-then-notify sequence; no transactional notification delivery is implied.

JUnit and Mockito versions are pinned in the root `pom.xml`. Reports are written to this module's `target/surefire-reports/`.

## Teaching reference

Based on the [University of Miskolc Mockito guide](https://edu.iit.uni-miskolc.hu/tanszek:oktatas:mockito), accessed October 30, 2026. The notification message and EUR/HUF fixture follow that guide; the implementation adds validation and additional tests. The adapted teaching examples in this assignment retain the source's [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) attribution and license.
