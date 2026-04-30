"use client";

import { useState } from "react";

interface AddProductFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddProductForm({
  onSuccess,
  onCancel,
}: AddProductFormProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid = name.trim() !== "" && price !== "" && stock !== "";

  const handleSubmit = async () => {
    if (!isValid) return;
    setError(null);
    setSubmitting(true);

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        price: parseFloat(price),
        stock: parseInt(stock),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to add product");
      setSubmitting(false);
      return;
    }

    onSuccess();
  };

  const inputClass =
    "w-full px-3 py-2 text-sm border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10 focus:border-[#0A0A0A]/50 dark:focus:border-[#505050] transition bg-white dark:bg-[#121212] text-[#1E1F20] dark:text-white placeholder:text-[#1E1F20]/40 dark:placeholder:text-white/30";

  return (
    <div className="max-w-lg mx-auto mt-12 border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-xl p-6 bg-white dark:bg-[#1E1F20] space-y-5">
      <h2 className="text-base font-semibold text-[#1E1F20] dark:text-white">
        Add New Product
      </h2>

      {error && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs rounded-lg px-3 py-2.5">
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-[#1E1F20] dark:text-white">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g., Nike Air Max"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#1E1F20] dark:text-white">
            Default Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min={0}
            placeholder="0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#1E1F20] dark:text-white">
            Initial Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min={0}
            placeholder="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={handleSubmit}
          disabled={!isValid || submitting}
          className="bg-gray-900 dark:bg-white text-white dark:text-[#121212] text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Adding..." : "Add Product"}
        </button>
        <button
          onClick={onCancel}
          disabled={submitting}
          className="text-sm text-[#707375] dark:text-[#A0A0A0] hover:text-[#1E1F20] dark:hover:text-white transition-colors px-2 py-2.5"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
