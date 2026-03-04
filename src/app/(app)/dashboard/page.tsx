"use client";

import PageContainer from "@/components/layout/PageContainer";
// import DashboardOnboarding from "./components/DashboardOnboarding";
import DashboardFull from "./components/DashboardFull";

export default function DashboardPage() {
  // const isSkipped = true;
  const isCompleted = true;

  return (
    <PageContainer>
      {isCompleted && <DashboardFull />}
    </PageContainer>
  );
}