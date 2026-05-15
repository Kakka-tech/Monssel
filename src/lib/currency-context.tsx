"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";

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
  convert: (amount: number) => number;
  ratesLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: "NGN",
  symbol: "₦",
  setCurrency: () => {},
  format: (amount) => `₦${amount.toFixed(2)}`,
  convert: (amount) => amount,
  ratesLoading: false,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState("NGN");
  const [rates, setRates] = useState<Record<string, number>>({ NGN: 1 });
  const [ratesLoading, setRatesLoading] = useState(false);
  const ratesCache = useRef<Record<string, Record<string, number>>>({});

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => (res.ok ? res.json() : null))
      .then((profile) => {
        if (profile?.currency) setCurrencyState(profile.currency);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (currency === "NGN" || ratesCache.current[currency]) {
      if (ratesCache.current[currency]) {
        setRates(ratesCache.current[currency]);
      }
      return;
    }

    setRatesLoading(true);
    fetch(`/api/rates?base=NGN`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        ratesCache.current["NGN"] = data;
        setRates(data);
      })
      .catch(() => {})
      .finally(() => setRatesLoading(false));
  }, [currency]);

  const setCurrency = useCallback((newCurrency: string) => {
    setCurrencyState(newCurrency);
  }, []);

  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;

  const convert = useCallback(
    (amount: number): number => {
      const rate = rates[currency] ?? 1;
      return amount * rate;
    },
    [rates, currency],
  );

  const format = useCallback(
    (amount: number): string => {
      const converted = convert(amount);
      return `${symbol}${converted.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    },
    [convert, symbol],
  );

  return (
    <CurrencyContext.Provider
      value={{ currency, symbol, setCurrency, format, convert, ratesLoading }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}