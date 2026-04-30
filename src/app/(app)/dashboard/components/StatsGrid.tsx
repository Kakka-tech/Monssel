"use client";

import { ShoppingCart, Package, TrendingUp } from "lucide-react";
import StatCard from "./StatCard";
import { useCurrency } from "@/lib/currency-context";

export default function StatsGrid() {
  const { format } = useCurrency();

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <StatCard
        title="Total Sales"
        value={format(1200)}
        subtitle="All Categories"
        icon={<ShoppingCart size={18} className="text-[#FC4736]" />}
        iconBg="bg-red-50 dark:bg-red-950/40"
      />
      <StatCard
        title="Stocks"
        value="15"
        subtitle="Current Tracking"
        icon={<Package size={18} className="text-[#4758E0]" />}
        iconBg="bg-blue-50 dark:bg-blue-950/40"
      />
      <StatCard
        title="Net Profit"
        value={format(800)}
        subtitle="5% margin"
        icon={<TrendingUp size={18} className="text-green-500" />}
        iconBg="bg-green-50 dark:bg-green-950/40"
      />
    </div>
  );
}
