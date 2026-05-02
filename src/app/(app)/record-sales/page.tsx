"use client";

import PageContainer from "@/components/layout/PageContainer";
import RecordSalesOnboarding from "./components/RecordSalesOnboarding";
import RecordSalesFull from "./components/RecordSalesFull";
import { useFetch } from "@/lib/usefetch";
import { Product } from "./types";

function RecordSalesSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-0 animate-pulse space-y-6">
      <div className="h-8 w-40 bg-gray-200 dark:bg-[#2E2E2E] rounded-lg" />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-xl p-4 space-y-3">
            <div className="h-4 w-28 bg-gray-200 dark:bg-[#2E2E2E] rounded" />
            <div className="h-10 w-full bg-gray-200 dark:bg-[#2E2E2E] rounded-lg" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-16 w-full bg-gray-100 dark:bg-[#1C1C1C] rounded-lg"
              />
            ))}
          </div>
          <div className="h-12 w-full bg-gray-200 dark:bg-[#2E2E2E] rounded-lg" />
          <div className="h-12 w-full bg-gray-200 dark:bg-[#2E2E2E] rounded-lg" />
          <div className="h-24 w-full bg-gray-200 dark:bg-[#2E2E2E] rounded-lg" />
        </div>
        <div className="w-full lg:w-64 space-y-4">
          <div className="border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-xl p-5 space-y-4">
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
    </div>
  );
}

export default function RecordSalesPage() {
  const {
    data: products,
    loading,
    refetch,
  } = useFetch<Product[]>("/api/products");

  return (
    <PageContainer>
      {loading || products === null ?
        <RecordSalesSkeleton />
      : products.length === 0 ?
        <RecordSalesOnboarding />
      : <RecordSalesFull products={products} onSaleRecorded={refetch} />}
    </PageContainer>
  );
}
