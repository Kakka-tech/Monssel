"use client";

import { useFetch } from "@/lib/usefetch";
import DashboardHeader from "../DashboardHeader";
import StatsGrid from "../StatsGrid";
import RevenueSection from "../RevenueSection";
import SalesByCategory from "../SalesByCategory";
import RecentTransactions from "../RecentTransactions";

interface DashboardData {
  stats: {
    totalSales: number;
    totalExpenses: number;
    netProfit: number;
    totalStock: number;
    profitMargin: number;
  };
  recentTransactions: {
    id: string;
    title: string;
    type: "Income" | "Expense";
    amount: number;
    created_at: string;
  }[];
  revenueData: { label: string; value: number }[];
  hasProducts: boolean;
  hasSales: boolean;
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-10 w-64 bg-gray-200 dark:bg-[#2E2E2E] rounded-lg" />
      <div className="grid md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-28 bg-gray-200 dark:bg-[#2E2E2E] rounded-xl"
          />
        ))}
      </div>
      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="h-72 bg-gray-200 dark:bg-[#2E2E2E] rounded-xl" />
          <div className="h-64 bg-gray-200 dark:bg-[#2E2E2E] rounded-xl" />
        </div>
        <div className="h-96 bg-gray-200 dark:bg-[#2E2E2E] rounded-xl" />
      </div>
    </div>
  );
}

export default function DashboardFull() {
  const { data, loading } = useFetch<DashboardData>("/api/dashboard");

  if (loading || data === null) return <DashboardSkeleton />;

  return (
    <div className="space-y-8">
      <DashboardHeader />
      <StatsGrid
        totalSales={data.stats.totalSales}
        totalStock={data.stats.totalStock}
        netProfit={data.stats.netProfit}
        profitMargin={data.stats.profitMargin}
      />
      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <RevenueSection data={data.revenueData} />
          <SalesByCategory />
        </div>
        <RecentTransactions transactions={data.recentTransactions} />
      </div>
    </div>
  );
}
