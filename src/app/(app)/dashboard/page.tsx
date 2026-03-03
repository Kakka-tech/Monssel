"use client";

import PageContainer from "@/components/layout/PageContainer";
import DashboardOnboarding from "./components/DashboardOnboarding";

export default function DashboardPage() {
  const isSkipped = true;

  return (
    <PageContainer>
      {isSkipped && <DashboardOnboarding />}
    </PageContainer>
  );
}