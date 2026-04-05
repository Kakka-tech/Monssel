"use client";

import { useState } from "react";
import WelcomeStepOne from "../components/WelcomeStepOne";
import WelcomeStepTwo from "../components/WelcomeStepTwo";

export default function WelcomePage() {
  const [step, setStep] = useState(1);
  const [stockPreference, setStockPreference] = useState<"yes" | "no" | null>(null);

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
          onNext={() => {
            console.log("Stock:", stockPreference);
          }}
        />
      )}
    </>
  );
}