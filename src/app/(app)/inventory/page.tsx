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

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[] | null>(null);

  const loadProducts = useCallback(() => {
    fetchProductsFromAPI().then(setProducts);
  }, []);

  if (products === null) {
    loadProducts();
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-6 h-6 border-2 border-[#1E1F20] dark:border-white border-t-transparent rounded-full animate-spin" />
        </div>
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
