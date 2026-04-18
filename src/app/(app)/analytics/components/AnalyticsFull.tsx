"use client";

import StatCards from "./StatCards";
import RevenueChart from "./RevenueChart";
import ProfitChart from "./ProfitChart";
import QuickMetrics from "./QuickMetrics";
import StockAlerts from "./StockAlerts";
import { useRouter } from "next/navigation";

export default function AnalyticsFull() {
  const router = useRouter();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#1E1F20]">Analytics</h1>
        <button
          onClick={() => router.push("/notes")}
          className="flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <span className="text-base leading-none">+</span>
          Add Note
        </button>
      </div>

      <StatCards />

      <div className="flex flex-col xl:flex-row gap-5 items-start">
        <div className="w-full xl:flex-1 space-y-5">
          <RevenueChart />
          <ProfitChart />
        </div>

        <div className="w-full xl:w-64 shrink-0 space-y-4">
          <QuickMetrics />
          <StockAlerts onViewAll={() => router.push("/inventory")} />
        </div>
      </div>
    </div>
  );
}
