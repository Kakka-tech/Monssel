"use client";

import { useState } from "react";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo"

export default function SetupPage() {
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState<string | null>(null);

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-50">
      {step === 1 && <StepOne onNext={() => setStep(2)} />}
      
      {step === 2 && (
        <StepTwo
          selected={businessType}
          setSelected={setBusinessType}
          onBack={() => setStep(1)}
          onFinish={() => {
            console.log(businessType);
          }}
        />
      )}
    </div>
  );
}