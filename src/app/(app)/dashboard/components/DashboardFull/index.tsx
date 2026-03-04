"use client";

import DashboardHeader from "../DashboardHeader";
import StatsGrid from "../StatsGrid";
import RevenueSection from "../RevenueSection";
import SalesByCategory from "../SalesByCategory";
import RecentTransactions from "../RecentTransactions";

export default function DashboardFull() {
  return (
    <div className="space-y-8">
      <DashboardHeader />
      <StatsGrid />

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <RevenueSection />
          <SalesByCategory />
        </div>

        <RecentTransactions />
      </div>
    </div>
  );
}