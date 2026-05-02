"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTheme } from "next-themes";
import { ChartDataPoint } from "../types";
import { useCurrency } from "@/lib/currency-context";

interface ProfitChartProps {
  data: ChartDataPoint[];
}

export default function ProfitChart({ data }: ProfitChartProps) {
  const { resolvedTheme } = useTheme();
  const { symbol } = useCurrency();
  const dark = resolvedTheme === "dark";
  const tickColor = dark ? "#A0A0A0" : "#707375";
  const gridColor = dark ? "#2E2E2E" : "#F3F4F6";
  const tooltipBg = dark ? "#1E1F20" : "#ffffff";
  const tooltipBorder = dark ? "#2E2E2E" : "#ECEDEE";
  const tooltipText = dark ? "#ffffff" : "#1E1F20";
  const cursorColor = dark ? "#252525" : "#F9FAFB";

  const formatY = (value: number) => {
    if (value >= 1000) return `${symbol}${(value / 1000).toFixed(0)}k`;
    return `${symbol}${value}`;
  };

  return (
    <div className="bg-white dark:bg-[#1E1F20] border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-xl p-5 space-y-1">
      <h3 className="text-sm font-semibold text-[#1E1F20] dark:text-white">
        Profit Analysis
      </h3>
      <p className="text-xs text-[#707375] dark:text-[#A0A0A0]">
        Net profit breakdown by period
      </p>
      <div className="h-52 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
            barSize={28}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: tickColor }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatY}
              tick={{ fontSize: 11, fill: tickColor }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value: number | undefined) => [
                `${symbol}${(value ?? 0).toLocaleString()}`,
                "Profit",
              ]}
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: 8,
                fontSize: 12,
                color: tooltipText,
              }}
              cursor={{ fill: cursorColor }}
            />
            <Bar dataKey="profit" radius={[4, 4, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={index} fill="#22C55E" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
