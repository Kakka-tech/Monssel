"use client";

import PageContainer from "@/components/layout/PageContainer";
import BusinessInfoSection from "./components/BusinessInfoSection";
import RegionalSection from "./components/RegionalSection";
import DisplaySection from "./components/DisplaySection";
import NotificationsSection from "./components/NotificationsSection";
import PaymentSection from "./components/PaymentSection";

export default function SettingsPage() {
  return (
    <PageContainer>
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-2xl font-semibold text-[#1E1F20]">Settings</h1>
        <BusinessInfoSection />
        <RegionalSection />
        <DisplaySection />
        <NotificationsSection />
        <PaymentSection />
      </div>
    </PageContainer>
  );
}