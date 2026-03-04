"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

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
    <div className="bg-white border border-neutral-200 rounded-xl p-6">
      <h3 className="text-base font-semibold text-neutral-900 mb-1">
        Sales by Category
      </h3>
      <p className="text-sm text-neutral-500 mb-6">
        Product performance breakdown
      </p>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#6B7280", fontSize: 12 }} 
            />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "none", backgroundColor: "#F9FAFB", color: "#11181C" }}
              formatter={formatTooltipValue}
            />
            <Bar dataKey="sales" fill="#3B82F6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}