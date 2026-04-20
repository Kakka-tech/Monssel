"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { category: "Electronics", sales: 1200 },
  { category: "Fashion", sales: 900 },
  { category: "Home & Kitchen", sales: 750 },
  { category: "Books", sales: 500 },
  { category: "Toys", sales: 650 },
];

export default function SalesByCategory() {
  const formatTooltipValue = (value?: number) => {
    if (value === undefined) return "";
    return `$${value}`;
  };

  return (
    <div className="bg-white dark:bg-[#1C1C1C] border border-neutral-200 dark:border-[#2E2E2E] rounded-xl p-6">
      <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-1">
        Sales by Category
      </h3>
      <p className="text-sm text-neutral-500 dark:text-[#A0A0A0] mb-6">
        Product performance breakdown
      </p>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" />
            <XAxis
              dataKey="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#A0A0A0", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#A0A0A0", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "none",
                backgroundColor: "#1C1C1C",
                color: "#ffffff",
              }}
              formatter={formatTooltipValue}
            />
            <Bar dataKey="sales" fill="#3B82F6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
