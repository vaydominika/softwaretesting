package com.example;

import java.math.BigDecimal;

/** A single-threaded account with decimal arithmetic and a double-based public API. */
public class BankAccount {
    private BigDecimal balance = BigDecimal.ZERO;

    public void deposit(double amount) {
        validateAmount(amount);
        BigDecimal updatedBalance = balance.add(BigDecimal.valueOf(amount));
        if (!Double.isFinite(updatedBalance.doubleValue())) {
            throw new IllegalArgumentException("The resulting balance must be finite.");
        }
        balance = updatedBalance;
    }

    public void withdraw(double amount) {
        validateAmount(amount);
        BigDecimal withdrawal = BigDecimal.valueOf(amount);
        if (withdrawal.compareTo(balance) > 0) {
            throw new IllegalArgumentException("Insufficient balance.");
        }
        balance = balance.subtract(withdrawal);
    }

    public double getBalance() {
        return balance.doubleValue();
    }

    private static void validateAmount(double amount) {
        if (!Double.isFinite(amount) || amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive and finite.");
        }
    }
}
