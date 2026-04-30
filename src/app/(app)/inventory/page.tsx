"use client";

import { useState, useCallback } from "react";
import PageContainer from "@/components/layout/PageContainer";
import InventoryOnboarding from "./components/InventoryOnboarding";
import InventoryFull from "./components/InventoryFull";
import { Product } from "./types";

async function fetchProductsFromAPI(): Promise<Product[]> {
  const res = await fetch("/api/products");
  if (!res.ok) return [];
  return res.json();
}

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
      <div className="w-5 h-5 rounded-full border-2 border-neutral-200 dark:border-[#2E2E2E] border-t-neutral-900 dark:border-t-white animate-spin" />
      <p className="text-xs text-neutral-400 dark:text-[#A0A0A0]">
        Loading inventory…
      </p>
    </div>
  );
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[] | null>(null);

  const loadProducts = useCallback(() => {
    fetchProductsFromAPI().then(setProducts);
  }, []);

  if (products === null) {
    loadProducts();
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {products.length === 0 ?
        <InventoryOnboarding onProductAdded={loadProducts} />
      : <InventoryFull products={products} onRefresh={loadProducts} />}
    </PageContainer>
  );
}
