"use client";

import { useEffect, useState } from "react";

const STEPS = [
  "Setting up your workspace…",
  "Configuring your preferences…",
  "Preparing your dashboard…",
  "Almost there…",
];

export default function PreparingDashboard({ onDone }: { onDone: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000;
    const interval = 30;
    const increment = 100 / (duration / interval);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }, duration / STEPS.length);

    const doneTimer = setTimeout(() => {
      onDone();
    }, duration + 500);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-[#121212] px-8">
      {/* Logo / icon */}
      <div className="mb-8 relative">
        <div className="w-20 h-20 rounded-2xl bg-[#1E1F20] dark:bg-white flex items-center justify-center shadow-xl">
          <span className="text-3xl">📦</span>
        </div>
        <div className="absolute -inset-2 rounded-3xl border-2 border-[#1E1F20]/10 dark:border-white/10 animate-ping" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-[#1E1F20] dark:text-white mb-2 text-center">
        Preparing your dashboard
      </h2>

      {/* Animated step text */}
      <p
        key={currentStep}
        className="text-sm text-[#707375] dark:text-[#A0A0A0] mb-8 text-center animate-fade-in"
      >
        {STEPS[currentStep]}
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-xs h-1.5 bg-gray-100 dark:bg-[#2E2E2E] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#1E1F20] dark:bg-white rounded-full transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs text-[#A0A0A0] mt-4">
        {Math.round(progress)}%
      </p>
    </div>
  );
}