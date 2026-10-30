package com.example;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class BankAccountTest {
    private BankAccount account;

    @BeforeEach
    void setUp() {
        account = new BankAccount();
    }

    @Test
    void newAccountHasZeroBalance() {
        assertEquals(0.0, account.getBalance());
    }

    @Test
    void depositIncreasesBalance() {
        account.deposit(1000);
        assertEquals(1000.0, account.getBalance());
    }

    @Test
    void multipleDepositsAccumulate() {
        account.deposit(1000);
        account.deposit(250);
        account.deposit(500);
        assertEquals(1750.0, account.getBalance());
    }

    @Test
    void withdrawalDecreasesBalance() {
        account.deposit(1000);
        account.withdraw(400);
        assertEquals(600.0, account.getBalance());
    }

    @Test
    void entireBalanceCanBeWithdrawn() {
        account.deposit(1000);
        account.withdraw(1000);
        assertEquals(0.0, account.getBalance());
    }

    @Test
    void excessiveWithdrawalThrowsAndPreservesBalance() {
        account.deposit(1000);
        assertThrows(IllegalArgumentException.class, () -> account.withdraw(1001));
        assertEquals(1000.0, account.getBalance());
    }

    @Test
    void withdrawalFromEmptyAccountThrowsAndPreservesBalance() {
        assertThrows(IllegalArgumentException.class, () -> account.withdraw(1));
        assertEquals(0.0, account.getBalance());
    }

    @ParameterizedTest
    @ValueSource(doubles = {-100, 0, -0.0, Double.NaN, Double.POSITIVE_INFINITY, Double.NEGATIVE_INFINITY})
    void invalidDepositThrowsAndPreservesBalance(double amount) {
        account.deposit(1000);
        assertThrows(IllegalArgumentException.class, () -> account.deposit(amount));
        assertEquals(1000.0, account.getBalance());
    }

    @ParameterizedTest
    @ValueSource(doubles = {-100, 0, -0.0, Double.NaN, Double.POSITIVE_INFINITY, Double.NEGATIVE_INFINITY})
    void invalidWithdrawalThrowsAndPreservesBalance(double amount) {
        account.deposit(1000);
        assertThrows(IllegalArgumentException.class, () -> account.withdraw(amount));
        assertEquals(1000.0, account.getBalance());
    }

    @Test
    void decimalDepositsCanBeWithdrawnCompletely() {
        account.deposit(0.1);
        account.deposit(0.2);
        assertEquals(0.3, account.getBalance());
        account.withdraw(0.3);
        assertEquals(0.0, account.getBalance());
    }

    @Test
    void overflowThrowsAndPreservesBalance() {
        account.deposit(Double.MAX_VALUE);
        assertThrows(IllegalArgumentException.class, () -> account.deposit(Double.MAX_VALUE));
        assertEquals(Double.MAX_VALUE, account.getBalance());
    }

    @Test
    void validOperationsStillWorkAfterARejectedOperation() {
        account.deposit(1000);
        assertThrows(IllegalArgumentException.class, () -> account.withdraw(1001));
        account.deposit(100);
        account.withdraw(200);
        assertEquals(900.0, account.getBalance());
    }
}
