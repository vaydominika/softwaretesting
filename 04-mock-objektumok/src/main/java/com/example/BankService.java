package com.example;

import java.util.Objects;

public class BankService {
    private final NotificationService notificationService;

    public BankService(NotificationService notificationService) {
        this.notificationService = Objects.requireNonNull(notificationService, "Notification service is required.");
    }

    public void deposit(BankAccount account, double amount) {
        Objects.requireNonNull(account, "Account is required.");
        account.deposit(amount);
        notificationService.send("Deposit successful");
    }
}
