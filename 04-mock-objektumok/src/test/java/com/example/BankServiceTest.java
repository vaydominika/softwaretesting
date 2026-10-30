package com.example;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.verifyNoMoreInteractions;

class BankServiceTest {
    @Test
    void successfulDepositIncreasesBalanceAndSendsExactlyOneNotification() {
        NotificationService notifications = mock(NotificationService.class);
        BankService service = new BankService(notifications);
        BankAccount account = new BankAccount();

        service.deposit(account, 1000);

        assertEquals(1000.0, account.getBalance());
        verify(notifications).send("Deposit successful");
        verifyNoMoreInteractions(notifications);
    }

    @Test
    void notificationIsSentAfterTheBalanceHasChanged() {
        NotificationService notifications = mock(NotificationService.class);
        BankService service = new BankService(notifications);
        BankAccount account = new BankAccount();
        doAnswer(invocation -> {
            assertEquals(1000.0, account.getBalance());
            return null;
        }).when(notifications).send("Deposit successful");

        service.deposit(account, 1000);

        verify(notifications).send("Deposit successful");
    }

    @ParameterizedTest
    @ValueSource(doubles = {-100, 0, Double.NaN, Double.POSITIVE_INFINITY, Double.NEGATIVE_INFINITY})
    void rejectedDepositPreservesBalanceAndDoesNotNotify(double amount) {
        NotificationService notifications = mock(NotificationService.class);
        BankService service = new BankService(notifications);
        BankAccount account = new BankAccount();
        account.deposit(250);

        assertThrows(IllegalArgumentException.class, () -> service.deposit(account, amount));

        assertEquals(250.0, account.getBalance());
        verifyNoInteractions(notifications);
    }

    @Test
    void overflowingDepositPreservesBalanceAndDoesNotNotify() {
        NotificationService notifications = mock(NotificationService.class);
        BankService service = new BankService(notifications);
        BankAccount account = new BankAccount();
        account.deposit(Double.MAX_VALUE);

        assertThrows(IllegalArgumentException.class, () -> service.deposit(account, Double.MAX_VALUE));

        assertEquals(Double.MAX_VALUE, account.getBalance());
        verifyNoInteractions(notifications);
    }

    @Test
    void missingAccountDoesNotNotify() {
        NotificationService notifications = mock(NotificationService.class);
        BankService service = new BankService(notifications);

        assertThrows(NullPointerException.class, () -> service.deposit(null, 1000));

        verifyNoInteractions(notifications);
    }

    @Test
    void missingNotificationServiceIsRejected() {
        assertThrows(NullPointerException.class, () -> new BankService(null));
    }

    @Test
    void notificationFailureDoesNotUndoTheCompletedDeposit() {
        NotificationService notifications = mock(NotificationService.class);
        BankService service = new BankService(notifications);
        BankAccount account = new BankAccount();
        doThrow(new IllegalStateException("Notification unavailable"))
                .when(notifications).send("Deposit successful");

        assertThrows(IllegalStateException.class, () -> service.deposit(account, 1000));

        assertEquals(1000.0, account.getBalance());
        verify(notifications).send("Deposit successful");
    }
}
