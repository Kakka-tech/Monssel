"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Product } from "../types";

interface EditProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSave: (updated: Product) => void;
}

export default function EditProductModal({
  product,
  onClose,
  onSave,
}: EditProductModalProps) {
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(String(product?.price ?? ""));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!product) return null;

  const handleSave = async () => {
    if (!name.trim() || !price) return;
    setSaving(true);
    setError(null);

    const res = await fetch(`/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), price: parseFloat(price) }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to save");
      setSaving(false);
      return;
    }

    const updated = await res.json();
    onSave(updated);
    onClose();
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm mx-4 rounded-2xl border border-neutral-200 dark:border-[#2E2E2E] bg-white dark:bg-[#1C1C1C] shadow-2xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#1E1F20] dark:text-white">
            Edit Product
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#707375] dark:text-[#A0A0A0]">
              Product Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-sm rounded-lg border border-[#ECEDEE] dark:border-[#2E2E2E] bg-white dark:bg-[#252525] text-[#1E1F20] dark:text-white px-3 py-2 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
              placeholder="Product name"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#707375] dark:text-[#A0A0A0]">
              Price per Unit
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full text-sm rounded-lg border border-[#ECEDEE] dark:border-[#2E2E2E] bg-white dark:bg-[#252525] text-[#1E1F20] dark:text-white px-3 py-2 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
              placeholder="0.00"
            />
          </div>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={handleSave}
            disabled={saving || !name.trim() || !price}
            className="flex-1 bg-[#1E1F20] dark:bg-white text-white dark:text-[#121212] text-sm font-medium py-2 rounded-lg hover:bg-black dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 text-sm text-[#707375] dark:text-[#A0A0A0] border border-[#ECEDEE] dark:border-[#2E2E2E] py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-[#2A2A2A] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}