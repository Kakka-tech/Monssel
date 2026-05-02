"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { useCurrency } from "@/lib/currency-context";

interface StatCardsProps {
  totalSales: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
}

export default function StatCards({
  totalSales,
  totalExpenses,
  netProfit,
  profitMargin,
}: StatCardsProps) {
  const { format } = useCurrency();

  const stats = [
    {
      label: "Total Sales",
      value: totalSales,
      change: "All time",
      changePositive: true,
      highlight: false,
    },
    {
      label: "Total Expenses",
      value: totalExpenses,
      change: "All time",
      changePositive: false,
      highlight: false,
    },
    {
      label: "Net Profit",
      value: netProfit,
      change: `${profitMargin}% profit margin`,
      changePositive: netProfit >= 0,
      highlight: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
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
                {format(stat.value)}
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
              : <TrendingDown className="w-4 h-4 text-red-400" />}
            </div>
          </div>
          <p
            className={`text-xs mt-2 ${stat.changePositive ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}
          >
            {stat.change}
          </p>
        </div>
      ))}
    </div>
  );
}
