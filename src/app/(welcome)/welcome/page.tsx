"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import WelcomeStepOne from "../components/WelcomeStepOne";
import WelcomeStepTwo from "../components/WelcomeStepTwo";
import WelcomeStepThree from "../components/WelcomeStepThree";
import PreparingDashboard from "../components/PreparingDashboard";

export default function WelcomePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [stockPreference, setStockPreference] = useState<"yes" | "no" | null>(null);
  const [paymentPreference, setPaymentPreference] = useState<"yes" | "skip" | null>(null);
  const [saving, setSaving] = useState(false);
  const [preparing, setPreparing] = useState(false);

  const handleStepTwoNext = async () => {
    if (!stockPreference) return;
    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        business_type: stockPreference === "yes" ? "product" : "service",
      }),
    });
    setStep(3);
  };

  const handleComplete = async () => {
    setSaving(true);
    setPreparing(true);
  };

  const handleDone = useCallback(() => {
    if (paymentPreference === "yes") {
      router.push("/settings?section=payment");
    } else if (stockPreference === "yes") {
      router.push("/add-product");
    } else {
      router.push("/dashboard");
    }
  }, [paymentPreference, stockPreference, router]);

  if (preparing) {
    return <PreparingDashboard onDone={handleDone} />;
  }

  return (
    <>
      {step === 1 && (
        <WelcomeStepOne onNext={() => setStep(2)} />
      )}
      {step === 2 && (
        <WelcomeStepTwo
          selected={stockPreference}
          setSelected={setStockPreference}
          onBack={() => setStep(1)}
          onNext={handleStepTwoNext}
        />
      )}
      {step === 3 && (
        <WelcomeStepThree
          selected={paymentPreference}
          setSelected={setPaymentPreference}
          onBack={() => setStep(2)}
          onComplete={handleComplete}
          saving={saving}
        />
      )}
    </>
  );
}