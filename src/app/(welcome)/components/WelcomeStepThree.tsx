"use client";

import { CreditCard,  FastForwardIcon } from "lucide-react";

export default function WelcomeStepThree({
  selected,
  setSelected,
  onBack,
  onComplete,
}: {
  selected: "yes" | "skip" | null;
  setSelected: (value: "yes" | "skip") => void;
  onBack: () => void;
  onComplete: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <div className="h-1 flex-1 bg-black rounded-full" />
        <div className="h-1 flex-1 bg-black rounded-full" />
        <div className="h-1 flex-1 bg-black rounded-full" />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[#1E1F20]">
          Welcome, Stephen! 👋
        </h2>
        <p className="text-sm text-[#707375]">
          Let&apos;s get you set up in 3 quick steps
        </p>
      </div>

      <div>
        <p className="text-sm font-medium mb-3 text-[#1E1F20]">
          Connect payment provider?
        </p>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setSelected("yes")}
            className={`group relative flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-200 text-center
              ${
                selected === "yes"
                  ? "border-black bg-gray-50/50 shadow-sm"
                  : "border-gray-100 hover:border-gray-200 bg-white"
              }`}
          >
            <div
              className={`mb-3 p-2.5 rounded-xl transition-colors
                ${
                  selected === "yes"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }`}
            >
              <CreditCard className="w-6 h-6" />
            </div>

            <p className="font-semibold text-[#101828] text-sm">Yes, later</p>
            <p className="text-xs leading-relaxed text-gray-500 mt-0.5">
              Set up in dashboard
            </p>

            <div
              className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                ${
                  selected === "yes"
                    ? "border-black bg-black"
                    : "border-gray-200 group-hover:border-gray-300"
                }`}
            >
              {selected === "yes" && (
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </div>
          </button>

          <button
            onClick={() => setSelected("skip")}
            className={`group relative flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-200 text-center
              ${
                selected === "skip"
                  ? "border-black bg-gray-50/50 shadow-sm"
                  : "border-gray-100 hover:border-gray-200 bg-white"
              }`}
          >
            <div
              className={`mb-3 p-2.5 rounded-xl transition-colors
                ${
                  selected === "skip"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }`}
            >
              <FastForwardIcon className="w-6 h-6" />
            </div>

            <p className="font-semibold text-[#101828] text-sm">Skip</p>
            <p className="text-xs leading-relaxed text-gray-500 mt-0.5">
              Cash only for now
            </p>

            <div
              className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                ${
                  selected === "skip"
                    ? "border-black bg-black"
                    : "border-gray-200 group-hover:border-gray-300"
                }`}
            >
              {selected === "skip" && (
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </div>
          </button>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-sm hover:bg-gray-50 transition-colors"
        >
          Back
        </button>

        <button
          disabled={!selected}
          onClick={onComplete}
          className={`flex-1 py-2 rounded-lg text-white text-sm font-medium flex items-center justify-center gap-2 transition-all
            ${
              selected
                ? "bg-[#4CAF82] hover:bg-[#3d9e72] shadow-sm"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Complete Setup
          {selected && <span>✓</span>}
        </button>
      </div>
    </div>
  );
}