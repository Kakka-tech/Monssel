"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useCurrency } from "@/lib/currency-context";

type RangeType = "weekly" | "monthly" | "yearly";

interface DataPoint {
  label: string;
  value: number;
}

interface RevenueSectionProps {
  data: DataPoint[];
}

export default function RevenueSection({ data }: RevenueSectionProps) {
  const { format } = useCurrency();
  const [range, setRange] = useState<RangeType>("monthly");

  // For now range toggle filters the passed data visually
  // (real range filtering can be added when API supports it)
  const currentData = data.length > 0 ? data : [{ label: "—", value: 0 }];

  const firstValue = currentData[0]?.value ?? 0;
  const lastValue = currentData[currentData.length - 1]?.value ?? 0;
  const isPositive = lastValue >= firstValue;
  const percentageChange =
    firstValue === 0 ? 0 : (
      (((lastValue - firstValue) / firstValue) * 100).toFixed(1)
    );
  const trendColor = isPositive ? "#10B981" : "#EF4444";
  const total = currentData.reduce((a, b) => a + b.value, 0);

  return (
    <div className="bg-white dark:bg-[#1C1C1C] border border-neutral-200 dark:border-[#2E2E2E] rounded-xl p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4 sm:gap-0">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white">
            Revenue Flow
          </h3>
          <div className="flex items-center gap-3 mt-2 flex-wrap sm:flex-nowrap">
            <p className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white">
              {format(total)}
            </p>
            <span
              className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}
            >
              {isPositive ?
                <ArrowUpRight size={14} />
              : <ArrowDownRight size={14} />}
              {Math.abs(Number(percentageChange))}%
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 text-sm">
          {(["weekly", "monthly", "yearly"] as RangeType[]).map((item) => {
            const isActive = range === item;
            return (
              <button
                key={item}
                onClick={() => setRange(item)}
                className={`px-3 sm:px-4 py-1.5 rounded-md transition-all duration-200 ${
                  isActive ?
                    "bg-neutral-900 dark:bg-white text-white dark:text-[#121212] shadow-sm"
                  : "bg-neutral-100 dark:bg-[#252525] border border-[#E4E6E7] dark:border-[#2E2E2E] text-neutral-600 dark:text-[#A0A0A0] hover:bg-neutral-200 dark:hover:bg-[#2E2E2E]"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            );
          })}
        </div>
      </div>
      <div className="h-48 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={trendColor} stopOpacity={0.35} />
                <stop offset="95%" stopColor={trendColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 6"
              vertical
              horizontal={false}
              stroke="#2E2E2E"
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#A0A0A0", fontSize: 10 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={trendColor}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              activeDot={{
                r: 5,
                stroke: trendColor,
                strokeWidth: 3,
                fill: "#ffffff",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
