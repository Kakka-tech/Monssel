"use client";

import { useState } from "react";

interface AddProductFormData {
  name: string;
  price: string;
  stock: string;
}

interface AddProductFormProps {
  onSubmit: (data: AddProductFormData) => void;
  onCancel: () => void;
}

export default function AddProductForm({
  onSubmit,
  onCancel,
}: AddProductFormProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const isValid = name.trim() !== "" && price !== "" && stock !== "";

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit({ name: name.trim(), price, stock });
  };

  return (
    <div className="max-w-lg mx-auto mt-12 border border-[#ECEDEE] rounded-xl p-6 bg-white space-y-5">
      <h2 className="text-base font-semibold text-[#1E1F20]">
        Add New Product
      </h2>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-[#1E1F20]">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g., Nike Air Max"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-[#ECEDEE] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-[#0A0A0A]/50 transition text-[#1E1F20] placeholder:text-[#1E1F20]/40"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#1E1F20]">
            Default Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min={0}
            placeholder="0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-[#ECEDEE] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-[#0A0A0A]/50 transition text-[#1E1F20] placeholder:text-[#1E1F20]/40"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#1E1F20]">
            Initial Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min={0}
            placeholder="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-[#ECEDEE] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-[#0A0A0A]/50 transition text-[#1E1F20] placeholder:text-[#1E1F20]/40"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Product
        </button>
        <button
          onClick={onCancel}
          className="text-sm text-[#707375] hover:text-[#1E1F20] transition-colors px-2 py-2.5"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
