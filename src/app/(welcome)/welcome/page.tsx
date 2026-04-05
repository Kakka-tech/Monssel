"use client";

import { useState } from "react";
import WelcomeStepOne from "../components/WelcomeStepOne";
import WelcomeStepTwo from "../components/WelcomeStepTwo";
import WelcomeStepThree from "../components/WelcomeStepThree";

export default function WelcomePage() {
  const [step, setStep] = useState(1);
  const [stockPreference, setStockPreference] = useState<"yes" | "no" | null>(null);
  const [paymentPreference, setPaymentPreference] = useState<"yes" | "skip" | null>(null);

  const handleComplete = () => {
    console.log("Stock:", stockPreference);
    console.log("Payment:", paymentPreference);
  };

  return (
    <>
      {step === 1 && (
        <WelcomeStepOne
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <WelcomeStepTwo
          selected={stockPreference}
          setSelected={setStockPreference}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <WelcomeStepThree
          selected={paymentPreference}
          setSelected={setPaymentPreference}
          onBack={() => setStep(2)}
          onComplete={handleComplete}
        />
      )}
    </>
  );
}