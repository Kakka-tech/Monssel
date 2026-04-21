import { TrendingUp, TrendingDown } from "lucide-react";
import { StatCard } from "../types";

const STATS: StatCard[] = [
  {
    label: "Total Sales",
    value: "$215.6k",
    change: "+12.5% from last period",
    changePositive: true,
  },
  {
    label: "Total Expenses",
    value: "$86.3k",
    change: "+8.5% from last period",
    changePositive: false,
  },
  {
    label: "Net Profit",
    value: "$129.3k",
    change: "+60.0% profit margin",
    changePositive: true,
    highlight: true,
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-xl p-5 border ${
            stat.highlight ?
              "bg-green-50 dark:bg-green-950/30 border-green-100 dark:border-green-900/50"
            : "bg-white dark:bg-[#1E1F20] border-[#ECEDEE] dark:border-[#2E2E2E]"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-[#707375] dark:text-[#A0A0A0]">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-[#1E1F20] dark:text-white mt-1">
                {stat.value}
              </p>
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                stat.highlight ? "bg-green-500 dark:bg-green-600"
                : stat.changePositive ? "bg-blue-50 dark:bg-blue-950/40"
                : "bg-red-50 dark:bg-red-950/40"
              }`}
            >
              {stat.changePositive ?
                <TrendingUp
                  className={`w-4 h-4 ${stat.highlight ? "text-white" : "text-blue-500 dark:text-blue-400"}`}
                />
              : <TrendingDown className="w-4 h-4 text-red-400 dark:text-red-400" />
              }
            </div>
          </div>
          <p
            className={`text-xs mt-2 ${
              stat.changePositive ?
                "text-green-600 dark:text-green-400"
              : "text-red-500 dark:text-red-400"
            }`}
          >
            {stat.change}
          </p>
        </div>
      ))}
    </div>
  );
}
