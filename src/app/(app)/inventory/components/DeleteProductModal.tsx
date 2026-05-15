"use client";

import { useState } from "react";
import { Trash2, X } from "lucide-react";
import { Product } from "../types";

interface DeleteProductModalProps {
  product: Product | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export default function DeleteProductModal({
  product,
  onClose,
  onDelete,
}: DeleteProductModalProps) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!product) return null;

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);

    const res = await fetch(`/api/products/${product.id}`, {
      method: "DELETE",
    });

    if (!res.ok && res.status !== 204) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Failed to delete");
      setDeleting(false);
      return;
    }

    onDelete(product.id);
    onClose();
    setDeleting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm mx-4 rounded-2xl border border-neutral-200 dark:border-[#2E2E2E] bg-white dark:bg-[#1C1C1C] shadow-2xl p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-full bg-red-50 dark:bg-red-950/40 flex items-center justify-center">
            <Trash2 className="w-4 h-4 text-red-500" />
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-[#1E1F20] dark:text-white">
            Delete Product
          </h2>
          <p className="text-xs text-[#707375] dark:text-[#A0A0A0]">
            Are you sure you want to delete{" "}
            <span className="font-medium text-[#1E1F20] dark:text-white">
              {product.name}
            </span>
            ? This action cannot be undone.
          </p>
        </div>

        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}

        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {deleting ? "Deleting…" : "Yes, Delete"}
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