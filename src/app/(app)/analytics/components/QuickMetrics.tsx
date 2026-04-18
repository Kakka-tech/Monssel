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
    <div className="bg-white border border-[#ECEDEE] rounded-xl p-5 space-y-3">
      <h3 className="text-sm font-semibold text-[#1E1F20]">Quick Metrics</h3>
      <div className="space-y-2">
        {METRICS.map(({ key, dot }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-sm transition-all ${
              active === key ?
                "border-[#155DFC] border-2 bg-[#EFF6FF]"
              : "border-[#ECEDEE] hover:bg-gray-50"
            }`}
          >
            <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
            <span
              className={`font-medium ${active === key ? "text-[#155DFC]" : "text-[#1E1F20]"}`}
            >
              {key}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
