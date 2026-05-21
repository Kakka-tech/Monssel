"use client";

import { ShoppingCart, Package, TrendingUp } from "lucide-react";
import StatCard from "./StatCard";
import { useCurrency } from "@/lib/currency-context";

interface StatsGridProps {
  totalSales: number;
  totalStock: number;
  netProfit: number;
  profitMargin: number;
}

export default function StatsGrid({
  totalSales,
  totalStock,
  netProfit,
  profitMargin,
}: StatsGridProps) {
  const { format } = useCurrency();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
      <StatCard
        title="Total Sales"
        value={format(totalSales)}
        subtitle="All time"
        icon={<ShoppingCart size={18} className="text-[#FC4736]" />}
        iconBg="bg-red-50 dark:bg-red-950/40"
      />
      <StatCard
        title="Total Stock"
        value={String(totalStock)}
        subtitle="Units across all products"
        icon={<Package size={18} className="text-[#4758E0]" />}
        iconBg="bg-blue-50 dark:bg-blue-950/40"
      />
      <StatCard
        title="Net Profit"
        value={format(netProfit)}
        subtitle={`${profitMargin}% margin`}
        icon={<TrendingUp size={18} className="text-green-500" />}
        iconBg="bg-green-50 dark:bg-green-950/40"
      />
    </div>
  );
}
