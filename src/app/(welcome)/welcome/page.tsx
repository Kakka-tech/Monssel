"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import WelcomeStepOne from "../components/WelcomeStepOne";
import WelcomeStepTwo from "../components/WelcomeStepTwo";
import WelcomeStepThree from "../components/WelcomeStepThree";

export default function WelcomePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [stockPreference, setStockPreference] = useState<"yes" | "no" | null>(
    null,
  );
  const [paymentPreference, setPaymentPreference] = useState<
    "yes" | "skip" | null
  >(null);
  const [saving, setSaving] = useState(false);

  const handleStepTwoNext = async () => {
    if (!stockPreference) return;

    // Save business type to profile
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

    // If they want to connect payment, send to settings, else add-product or dashboard
    if (paymentPreference === "yes") {
      router.push("/settings?section=payment");
    } else {
      // Product-based → add first product; service-based → go straight to dashboard
      if (stockPreference === "yes") {
        router.push("/add-product");
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    <>
      {step === 1 && <WelcomeStepOne onNext={() => setStep(2)} />}

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
