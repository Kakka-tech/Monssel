"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

const CURRENCY_SYMBOLS: Record<string, string> = {
  NGN: "₦",
  USD: "$",
  GBP: "£",
  EUR: "€",
};

interface CurrencyContextValue {
  currency: string;
  symbol: string;
  setCurrency: (currency: string) => void;
  format: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: "NGN",
  symbol: "₦",
  setCurrency: () => {},
  format: (amount) => `₦${amount.toFixed(2)}`,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState("NGN");

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.ok ? res.json() : null)
      .then((profile) => {
        if (profile?.currency) setCurrencyState(profile.currency);
      })
      .catch(() => {});
  }, []);

  const setCurrency = useCallback((newCurrency: string) => {
    setCurrencyState(newCurrency);
  }, []);

  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;

  const format = useCallback(
    (amount: number) => `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    [symbol],
  );

  return (
    <CurrencyContext.Provider value={{ currency, symbol, setCurrency, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}