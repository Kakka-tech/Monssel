"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter} from "next/navigation";

export interface TourStep {
  target: string; // CSS selector
  title: string;
  description: string;
  page: string; // route to navigate to
  position?: "top" | "bottom" | "left" | "right";
}

const TOUR_STEPS: TourStep[] = [
  {
    target: "[data-tour='dashboard']",
    title: "Your Dashboard",
    description:
      "This is your business overview. See your sales, profit, and alerts at a glance.",
    page: "/dashboard",
    position: "right",
  },
  {
    target: "[data-tour='inventory']",
    title: "Inventory",
    description:
      "Add and manage your products here. Stock levels update automatically when you record a sale.",
    page: "/dashboard",
    position: "right",
  },
  {
    target: "[data-tour='record-sales']",
    title: "Record Sales",
    description:
      "Record every sale you make. Your inventory and profit are calculated instantly.",
    page: "/dashboard",
    position: "right",
  },
  {
    target: "[data-tour='expenses']",
    title: "Expenses",
    description:
      "Track your business expenses to see your real profit after costs.",
    page: "/dashboard",
    position: "right",
  },
  {
    target: "[data-tour='settings']",
    title: "Settings",
    description:
      "Set your currency, connect Paystack to receive payments, and manage your profile.",
    page: "/dashboard",
    position: "top",
  },
];

interface TourContextValue {
  active: boolean;
  currentStep: number;
  steps: TourStep[];
  next: () => void;
  prev: () => void;
  skip: () => void;
  startTour: () => void;
}

const TourContext = createContext<TourContextValue>({
  active: false,
  currentStep: 0,
  steps: TOUR_STEPS,
  next: () => {},
  prev: () => {},
  skip: () => {},
  startTour: () => {},
});

export function TourProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const completed = localStorage.getItem("monssel_tour_completed");
    if (!completed) {
      // Small delay so the page renders first
      const t = setTimeout(() => setActive(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const completeTour = useCallback(() => {
    setActive(false);
    localStorage.setItem("monssel_tour_completed", "true");
  }, []);

  const next = useCallback(() => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      completeTour();
    }
  }, [currentStep, completeTour]);

  const prev = useCallback(() => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }, [currentStep]);

  const skip = useCallback(() => {
    completeTour();
  }, [completeTour]);

  const startTour = useCallback(() => {
    setCurrentStep(0);
    setActive(true);
    router.push("/dashboard");
  }, [router]);

  return (
    <TourContext.Provider
      value={{
        active,
        currentStep,
        steps: TOUR_STEPS,
        next,
        prev,
        skip,
        startTour,
      }}
    >
      {children}
    </TourContext.Provider>
  );
}

export function useTour() {
  return useContext(TourContext);
}
