"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, FastForward, Trash2, CheckCircle } from "lucide-react";

interface Product {
  id: number;
  name: string;
  costPrice: string;
  sellingPrice: string;
  stockQuantity: string;
  lowStockAlert: string;
}

const newProduct = (): Product => ({
  id: Date.now(),
  name: "",
  costPrice: "",
  sellingPrice: "",
  stockQuantity: "",
  lowStockAlert: "",
});

export default function AddProductPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([newProduct()]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (id: number, field: keyof Product, value: string) =>
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );

  const add = () => setProducts((prev) => [...prev, newProduct()]);

  const remove = (id: number) => {
    if (products.length === 1) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    router.push("/dashboard");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
      <div>
        <h1 className="text-base font-semibold text-[#1E1F20]">
          Add Your Products
        </h1>
        <p className="text-xs text-[#707375] mt-0.5">
          Start with a few products, you can add more later
        </p>
      </div>

      <div className="space-y-5 max-h-[55vh] overflow-y-auto pr-1">
        {products.map((product, index) => (
          <div key={product.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#1E1F20]">
                Product {index + 1}
              </p>
              {products.length > 1 && (
                <button
                  aria-label="remove"
                  onClick={() => remove(product.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1E1F20] mb-1">
                Product Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Rice 50kg"
                value={product.name}
                onChange={(e) => update(product.id, "name", e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 bg-[#FAFAFA] placeholder:text-gray-300 text-[#1E1F20] focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#1E1F20] mb-1">
                  Cost Price (₦) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  placeholder="30000"
                  value={product.costPrice}
                  onChange={(e) =>
                    update(product.id, "costPrice", e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 bg-[#FAFAFA] placeholder:text-gray-300 text-[#1E1F20] focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#1E1F20] mb-1">
                  Selling Price (₦) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  placeholder="35000"
                  value={product.sellingPrice}
                  onChange={(e) =>
                    update(product.id, "sellingPrice", e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 bg-[#FAFAFA] placeholder:text-gray-300 text-[#1E1F20] focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#1E1F20] mb-1">
                  Stock Quantity <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  placeholder="20"
                  value={product.stockQuantity}
                  onChange={(e) =>
                    update(product.id, "stockQuantity", e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 bg-[#FAFAFA] placeholder:text-gray-300 text-[#1E1F20] focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#1E1F20] mb-1">
                  Low Stock Alert
                </label>
                <input
                  type="number"
                  placeholder="10"
                  value={product.lowStockAlert}
                  onChange={(e) =>
                    update(product.id, "lowStockAlert", e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 bg-[#FAFAFA] placeholder:text-gray-300 text-[#1E1F20] focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
            </div>

            {index < products.length - 1 && (
              <div className="border-t border-dashed border-gray-100" />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={add}
        className="flex items-center gap-1.5 text-xs text-[#4A90D9] hover:text-[#357ABD] font-medium transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
        Add Another Product
      </button>

      <div className="space-y-2 pt-1">
        <button
          onClick={handleComplete}
          disabled={isSubmitting}
          className="w-full py-2.5 rounded-lg bg-[#4CAF82] hover:bg-[#3d9e72] text-white text-sm font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-70"
        >
          <CheckCircle className="w-4 h-4" />
          {isSubmitting ? "Saving..." : "Complete Setup"}
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="w-full py-2.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <FastForward className="w-3.5 h-3.5" />
          Skip to Dashboard
        </button>
      </div>
    </div>
  );
}
