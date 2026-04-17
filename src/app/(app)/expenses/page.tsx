"use client";

import PageContainer from "@/components/layout/PageContainer";
import ExpensesForm from "./components/ExpensesForm";

export default function ExpensesPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-[#1E1F20]">Expenses</h1>
        <ExpensesForm />
      </div>
    </PageContainer>
  );
}