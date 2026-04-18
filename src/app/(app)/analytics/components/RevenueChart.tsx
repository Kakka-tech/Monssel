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
import { ChartDataPoint } from "../types";

const DATA: ChartDataPoint[] = [
  { month: "Jan", sales: 28000, expenses: 18000, profit: 10000 },
  { month: "Feb", sales: 32000, expenses: 20000, profit: 12000 },
  { month: "Mar", sales: 30000, expenses: 19000, profit: 11000 },
  { month: "Apr", sales: 38000, expenses: 22000, profit: 16000 },
  { month: "May", sales: 42000, expenses: 24000, profit: 18000 },
  { month: "Jun", sales: 45600, expenses: 26300, profit: 19300 },
];

function formatY(value: number) {
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
  return `$${value}`;
}

export default function RevenueChart() {
  return (
    <div className="bg-white border border-[#ECEDEE] rounded-xl p-5 space-y-1">
      <h3 className="text-sm font-semibold text-[#1E1F20]">
        Revenue vs Expenses
      </h3>
      <p className="text-xs text-[#707375]">
        Compare income and operating expenses
      </p>
      <div className="h-52 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={DATA}
            margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gradSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#707375" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatY}
              tick={{ fontSize: 11, fill: "#707375" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value: number | undefined) => [
                `$${(value ?? 0).toLocaleString()}`,
                "",
              ]}
              contentStyle={{
                border: "1px solid #ECEDEE",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#gradSales)"
              name="Sales"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#EF4444"
              strokeWidth={2}
              fill="url(#gradExpenses)"
              name="Expenses"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
