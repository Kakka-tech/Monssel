"use client";
import { useState } from "react";
import { QuickMetric } from "../types";

const METRICS: { key: QuickMetric; dot: string }[] = [
  { key: "Sales", dot: "bg-blue-500" },
  { key: "Expenses", dot: "bg-red-400" },
  { key: "Profit", dot: "bg-green-500" },
];

export default function QuickMetrics() {
  const [active, setActive] = useState<QuickMetric>("Sales");

  return (
    <div className="bg-white dark:bg-[#1E1F20] border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-xl p-5 space-y-3">
      <h3 className="text-sm font-semibold text-[#1E1F20] dark:text-white">
        Quick Metrics
      </h3>
      <div className="space-y-2">
        {METRICS.map(({ key, dot }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-sm transition-all ${
              active === key ?
                "border-[#155DFC] border-2 bg-[#EFF6FF] dark:bg-[#155DFC]/10"
              : "border-[#ECEDEE] dark:border-[#2E2E2E] hover:bg-gray-50 dark:hover:bg-[#252525]"
            }`}
          >
            <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
            <span
              className={`font-medium ${
                active === key ? "text-[#155DFC]" : (
                  "text-[#1E1F20] dark:text-[#A0A0A0]"
                )
              }`}
            >
              {key}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
