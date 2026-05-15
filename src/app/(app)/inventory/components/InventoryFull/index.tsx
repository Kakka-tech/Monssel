"use client";

import { useState, useEffect } from "react";
import { Product } from "../../types";
import InventoryTable from "../InventoryTable";
import AddProductForm from "../AddProductForm";

interface InventoryFullProps {
  products: Product[];
  onRefresh: () => void;
}

export default function InventoryFull({
  products,
  onRefresh,
}: InventoryFullProps) {
  const [localProducts, setLocalProducts] = useState<Product[]>(products);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addingStock, setAddingStock] = useState<Product | null>(null);
  const [stockAmount, setStockAmount] = useState("");
  const [stockLoading, setStockLoading] = useState(false);
  const [stockError, setStockError] = useState<string | null>(null);

  // Sync when parent refetches
  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  const handleEdit = (updated: Product) => {
    setLocalProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p)),
    );
  };

  const handleDelete = (id: string) => {
    setLocalProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddStock = async () => {
    if (!addingStock || !stockAmount) return;
    setStockLoading(true);
    setStockError(null);

    const res = await fetch(`/api/products/${addingStock.id}/stock`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: parseInt(stockAmount) }),
    });

    if (!res.ok) {
      const data = await res.json();
      setStockError(data.error ?? "Failed to update stock");
      setStockLoading(false);
      return;
    }

    setAddingStock(null);
    setStockAmount("");
    setStockLoading(false);
    onRefresh();
  };

  if (showAddForm) {
    return (
      <AddProductForm
        onSuccess={() => {
          setShowAddForm(false);
          onRefresh();
        }}
        onCancel={() => setShowAddForm(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#1E1F20] dark:text-white">
          Inventory
        </h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-[#1E1F20] dark:bg-white text-white dark:text-[#121212] text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          <span className="text-base leading-none">+</span>
          Add Product
        </button>
      </div>

      <InventoryTable
        products={localProducts}
        onEdit={handleEdit}
        onAddStock={(product) => {
          setAddingStock(product);
          setStockAmount("");
          setStockError(null);
        }}
        onDelete={handleDelete}
      />

      {addingStock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white dark:bg-[#1C1C1C] border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-2xl p-6 space-y-4 shadow-2xl">
            <h2 className="text-sm font-semibold text-[#1E1F20] dark:text-white">
              Add Stock — {addingStock.name}
            </h2>
            <p className="text-xs text-[#707375] dark:text-[#A0A0A0]">
              Current stock: {addingStock.stock} units
            </p>

            {stockError && (
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs rounded-lg px-3 py-2">
                {stockError}
              </div>
            )}

            <input
              type="number"
              min={1}
              placeholder="Units to add"
              value={stockAmount}
              onChange={(e) => setStockAmount(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10 bg-white dark:bg-[#252525] text-[#1E1F20] dark:text-white placeholder:text-[#1E1F20]/40 dark:placeholder:text-white/30"
            />

            <div className="flex gap-3">
              <button
                onClick={handleAddStock}
                disabled={!stockAmount || stockLoading}
                className="flex-1 bg-[#1E1F20] dark:bg-white text-white dark:text-[#121212] text-sm font-medium py-2.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {stockLoading ? "Updating..." : "Add Stock"}
              </button>
              <button
                onClick={() => setAddingStock(null)}
                className="flex-1 border border-[#ECEDEE] dark:border-[#2E2E2E] text-sm text-[#707375] dark:text-[#A0A0A0] py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
