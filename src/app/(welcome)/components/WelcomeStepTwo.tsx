"use client";

import { Package, SparklesIcon } from "lucide-react";

export default function WelcomeStepTwo({
  selected,
  setSelected,
  onBack,
  onNext,
}: {
  selected: "yes" | "no" | null;
  setSelected: (value: "yes" | "no") => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <div className="h-1 flex-1 bg-black rounded-full" />
        <div className="h-1 flex-1 bg-black rounded-full" />
        <div className="h-1 flex-1 bg-gray-200 rounded-full" />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[#1E1F20]">
          Welcome, Stephen! 👋
        </h2>
        <p className="text-sm text-[#707375]">
          Let’s get you set up in 3 quick steps
        </p>
      </div>

      <div>
        <p className="text-sm font-medium mb-3 text-[#1E1F20]">
          Do you track stock?
        </p>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setSelected("yes")}
            className={`group relative flex flex-col items-start p-5 rounded-2xl border-2 transition-all duration-200 text-left
      ${
        selected === "yes" ?
          "border-black bg-gray-50/50 shadow-sm"
        : "border-gray-100 hover:border-gray-200 bg-white"
      }`}
          >
            <div
              className={`mb-4 p-2.5 rounded-xl transition-colors 
      ${selected === "yes" ? "bg-black text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"}
    `}
            >
              <Package className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <p className="font-semibold text-[#101828]">Product Based</p>
              <p className="text-xs leading-relaxed text-gray-500">
                I sell physical goods and manage inventory
              </p>
            </div>

            <div
              className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
      ${selected === "yes" ? "border-black bg-black" : "border-gray-200 group-hover:border-gray-300"}
    `}
            >
              {selected === "yes" && (
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </div>
          </button>

          <button
            onClick={() => setSelected("no")}
            className={`group relative flex flex-col items-start p-5 rounded-2xl border-2 transition-all duration-200 text-left
      ${
        selected === "no" ?
          "border-black bg-gray-50/50 shadow-sm"
        : "border-gray-100 hover:border-gray-200 bg-white"
      }`}
          >
            <div
              className={`mb-4 p-2.5 rounded-xl transition-colors 
      ${selected === "no" ? "bg-black text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"}
    `}
            >
              <SparklesIcon className="w-6 h-6" />{" "}
            </div>

            <div className="space-y-1">
              <p className="font-semibold text-[#101828]">Service Based</p>
              <p className="text-xs leading-relaxed text-gray-500">
                I offer services or digital products only
              </p>
            </div>

            <div
              className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
      ${selected === "no" ? "border-black bg-black" : "border-gray-200 group-hover:border-gray-300"}
    `}
            >
              {selected === "no" && (
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </div>
          </button>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="px-4 py-2 border rounded-lg text-gray-600"
        >
          Back
        </button>

        <button
          disabled={!selected}
          onClick={onNext}
          className={`flex-1 py-2 rounded-lg text-white
            ${selected ? "bg-black" : "bg-gray-300 cursor-not-allowed"}`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
