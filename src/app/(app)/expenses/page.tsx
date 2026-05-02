"use client";

import PageContainer from "@/components/layout/PageContainer";
import ExpensesForm from "./components/ExpensesForm";
import { useFetch } from "@/lib/usefetch";
import { Expense } from "./types";

function ExpensesSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-32 bg-gray-200 dark:bg-[#2E2E2E] rounded-lg" />
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-xl p-6 space-y-6">
          <div className="h-4 w-28 bg-gray-200 dark:bg-[#2E2E2E] rounded" />
          <div className="h-10 w-full bg-gray-200 dark:bg-[#2E2E2E] rounded-lg" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-9 bg-gray-200 dark:bg-[#2E2E2E] rounded-lg"
              />
            ))}
          </div>
          <div className="h-24 bg-gray-200 dark:bg-[#2E2E2E] rounded-lg" />
        </div>
        <div className="w-full xl:w-72 border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-xl p-5 space-y-4">
          <div className="h-4 w-20 bg-gray-200 dark:bg-[#2E2E2E] rounded" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className="h-3 w-16 bg-gray-200 dark:bg-[#2E2E2E] rounded" />
              <div className="h-3 w-16 bg-gray-200 dark:bg-[#2E2E2E] rounded" />
            </div>
          ))}
          <div className="h-10 w-full bg-gray-200 dark:bg-[#2E2E2E] rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default function ExpensesPage() {
  const {
    data: expenses,
    loading,
    refetch,
  } = useFetch<Expense[]>("/api/expenses");

  const handleDelete = async (id: string) => {
    await fetch(`/api/expenses/${id}`, { method: "DELETE" });
    refetch();
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-[#1E1F20] dark:text-white">
          Expenses
        </h1>
        {loading || expenses === null ?
          <ExpensesSkeleton />
        : <ExpensesForm
            expenses={expenses}
            onSaved={refetch}
            onDelete={handleDelete}
          />
        }
      </div>
    </PageContainer>
  );
}
