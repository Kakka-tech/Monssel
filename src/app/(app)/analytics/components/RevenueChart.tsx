"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";
import { ChartDataPoint, QuickMetric } from "../types";
import { useCurrency } from "@/lib/currency-context";

interface RevenueChartProps {
  data: ChartDataPoint[];
  activeMetric: QuickMetric | "All";
}

export default function RevenueChart({
  data,
  activeMetric,
}: RevenueChartProps) {
  const { resolvedTheme } = useTheme();
  const { symbol } = useCurrency();
  const dark = resolvedTheme === "dark";
  const tickColor = dark ? "#A0A0A0" : "#707375";
  const gridColor = dark ? "#2E2E2E" : "#F3F4F6";
  const tooltipBg = dark ? "#1E1F20" : "#ffffff";
  const tooltipBorder = dark ? "#2E2E2E" : "#ECEDEE";
  const tooltipText = dark ? "#ffffff" : "#1E1F20";

  const formatY = (value: number) => {
    if (value >= 1000) return `${symbol}${(value / 1000).toFixed(0)}k`;
    return `${symbol}${value}`;
  };

  const showSales = activeMetric === "All" || activeMetric === "Sales";
  const showExpenses = activeMetric === "All" || activeMetric === "Expenses";
  const showProfit = activeMetric === "All" || activeMetric === "Profit";

  return (
    <div className="bg-white dark:bg-[#1E1F20] border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-xl p-5 space-y-1">
      <h3 className="text-sm font-semibold text-[#1E1F20] dark:text-white">
        Revenue vs Expenses
      </h3>
      <p className="text-xs text-[#707375] dark:text-[#A0A0A0]">
        {activeMetric === "All" && "Showing all metrics"}
        {activeMetric === "Sales" && "Showing sales over the last 6 months"}
        {activeMetric === "Expenses" &&
          "Showing expenses over the last 6 months"}
        {activeMetric === "Profit" &&
          "Showing net profit over the last 6 months"}
      </p>
      <div className="h-52 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gradSales" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#3B82F6"
                  stopOpacity={dark ? 0.25 : 0.15}
                />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#EF4444"
                  stopOpacity={dark ? 0.2 : 0.12}
                />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradProfit" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#22C55E"
                  stopOpacity={dark ? 0.25 : 0.15}
                />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
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
                "",
              ]}
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: 8,
                fontSize: 12,
                color: tooltipText,
              }}
            />
            {showSales && (
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#gradSales)"
                name="Sales"
              />
            )}
            {showExpenses && (
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#EF4444"
                strokeWidth={2}
                fill="url(#gradExpenses)"
                name="Expenses"
              />
            )}
            {showProfit && (
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#22C55E"
                strokeWidth={2}
                fill="url(#gradProfit)"
                name="Profit"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
