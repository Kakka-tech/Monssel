"use client";

import PageContainer from "@/components/layout/PageContainer";
import InventoryOnboarding from "./components/InventoryOnboarding";
import InventoryFull from "./components/InventoryFull";
import { useFetch } from "@/lib/usefetch";
import { Product } from "./types";

function InventorySkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 bg-gray-200 dark:bg-[#2E2E2E] rounded-lg" />
        <div className="h-10 w-32 bg-gray-200 dark:bg-[#2E2E2E] rounded-lg" />
      </div>
      <div className="h-10 w-64 bg-gray-200 dark:bg-[#2E2E2E] rounded-lg" />
      <div className="border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-xl overflow-hidden">
        <div className="bg-gray-50 dark:bg-[#1C1C1C] px-4 py-3 flex gap-8">
          {["Product", "Status", "Stock", "Price", "Actions"].map((col) => (
            <div key={col} className="h-3 w-16 bg-gray-200 dark:bg-[#2E2E2E] rounded" />
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-8 px-4 py-4 border-t border-[#ECEDEE] dark:border-[#2E2E2E]">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-[#2E2E2E]" />
              <div className="h-3 w-28 bg-gray-200 dark:bg-[#2E2E2E] rounded" />
            </div>
            <div className="h-5 w-16 bg-gray-200 dark:bg-[#2E2E2E] rounded-full" />
            <div className="h-3 w-12 bg-gray-200 dark:bg-[#2E2E2E] rounded" />
            <div className="h-3 w-14 bg-gray-200 dark:bg-[#2E2E2E] rounded" />
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 bg-gray-200 dark:bg-[#2E2E2E] rounded-md" />
              <div className="h-7 w-24 bg-gray-200 dark:bg-[#2E2E2E] rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InventoryPage() {
  const { data: products, loading, refetch } = useFetch<Product[]>("/api/products");

  return (
    <PageContainer>
      {loading || products === null ? (
        <InventorySkeleton />
      ) : products.length === 0 ? (
        <InventoryOnboarding onProductAdded={refetch} />
      ) : (
        <InventoryFull products={products} onRefresh={refetch} />
      )}
    </PageContainer>
  );
}