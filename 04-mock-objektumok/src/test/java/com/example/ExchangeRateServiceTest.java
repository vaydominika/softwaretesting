package com.example;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

class ExchangeRateServiceTest {
    @Test
    void configuredCurrencyPairReturnsTheStubbedRate() {
        ExchangeRateService rates = mock(ExchangeRateService.class);
        when(rates.getRate("EUR", "HUF")).thenReturn(400.0);

        assertEquals(400.0, rates.getRate("EUR", "HUF"));

        verify(rates).getRate("EUR", "HUF");
        verifyNoMoreInteractions(rates);
    }
}
