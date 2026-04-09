"use client";

import { Package } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RecordSalesOnboarding() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] gap-4">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
        <Package className="w-7 h-7 text-gray-400" />
      </div>
      <div className="text-center">
        <h2 className="text-base font-semibold text-gray-900">No Products Yet</h2>
        <p className="text-sm text-gray-500 mt-1">
          Add Product to your inventory before recording sales
        </p>
      </div>
      <button
        onClick={() => router.push("/inventory")}
        className="mt-2 flex items-center gap-2 bg-[#1E1F20] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <span className="text-base leading-none">+</span>
        Add Product
      </button>
    </div>
  );
}