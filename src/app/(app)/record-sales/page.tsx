"use client";

import PageContainer from "@/components/layout/PageContainer";
import RecordSalesOnboarding from "./components/RecordSalesOnboarding";
import RecordSalesFull from "./components/RecordSalesFull";

export default function RecordSalesPage() {
  // Replace with real check: does the user have any inventory products?
  const hasProducts = true;

  return (
    <PageContainer>
      {hasProducts ?
        <RecordSalesFull />
      : <RecordSalesOnboarding />}
    </PageContainer>
  );
}
