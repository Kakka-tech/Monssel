"use client";

import PageContainer from "@/components/layout/PageContainer";
import DashboardOnboarding from "./components/DashboardOnboarding";
import DashboardFull from "./components/DashboardFull";
import SetupReminderBanner from "./components/SetupReminderBanner";
import { useFetch } from "@/lib/usefetch";

interface DashboardCheck {
  hasProducts: boolean;
  hasSales: boolean;
}

export default function DashboardPage() {
  const { data, loading } = useFetch<DashboardCheck>("/api/dashboard");

  if (loading || data === null) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-5 h-5 rounded-full border-2 border-neutral-200 dark:border-[#2E2E2E] border-t-neutral-900 dark:border-t-white animate-spin" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {!data.hasProducts ?
        <DashboardOnboarding />
      : <>
          {!data.hasSales && <SetupReminderBanner />}
          <DashboardFull />
        </>
      }
    </PageContainer>
  );
}
