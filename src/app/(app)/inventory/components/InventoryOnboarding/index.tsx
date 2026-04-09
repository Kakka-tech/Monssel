"use client";

import { useState } from "react";
import { Package } from "lucide-react";
import AddProductForm from "../AddProductForm";

interface InventoryOnboardingProps {
  onProductAdded: (data: {
    name: string;
    price: string;
    stock: string;
  }) => void;
}

export default function InventoryOnboarding({
  onProductAdded,
}: InventoryOnboardingProps) {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return (
      <AddProductForm
        onSubmit={(data) => {
          onProductAdded(data);
          setShowForm(false);
        }}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
        <Package className="w-7 h-7 text-gray-400" />
      </div>
      <div className="text-center">
        <h2 className="text-base font-semibold text-[#1E1F20]">
          No Products Yet
        </h2>
        <p className="text-sm text-[#707375] mt-1">
          Start by adding your first product.
        </p>
      </div>
      <button
        onClick={() => setShowForm(true)}
        className="mt-2 flex items-center gap-2 bg-[#1E1F20] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <span className="text-base leading-none">+</span>
        Add Product
      </button>
    </div>
  );
}
