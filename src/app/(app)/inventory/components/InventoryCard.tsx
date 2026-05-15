"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Product, getStockStatus } from "../types";
import StatusBadge from "../components/StatusBadge";
import { useCurrency } from "@/lib/currency-context";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";

interface InventoryCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onAddStock: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function InventoryCard({
  product,
  onEdit,
  onAddStock,
  onDelete,
}: InventoryCardProps) {
  const { format } = useCurrency();
  const status = getStockStatus(product.stock);
  const stockColor =
    status === "out_of_stock" ? "text-red-500 dark:text-red-400"
    : status === "low_stock" ? "text-yellow-600 dark:text-yellow-400"
    : "text-green-600 dark:text-green-400";

  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  return (
    <>
      <div className="p-4 space-y-4 hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#2E2E2E] flex items-center justify-center shrink-0">
              <span className="text-sm">📦</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1E1F20] dark:text-white">
                {product.name}
              </p>
              <p className="text-xs text-[#707375] dark:text-[#A0A0A0]">
                {format(product.price)} per unit
              </p>
            </div>
          </div>
          <StatusBadge status={status} />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-[#707375] dark:text-[#A0A0A0]">Stock: </span>
            <span className={`font-medium ${stockColor}`}>
              {product.stock} units
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditProduct(product)}
              className="p-2 text-gray-400 dark:text-[#A0A0A0] hover:text-gray-700 dark:hover:text-white transition-colors rounded-md border border-[#ECEDEE] dark:border-[#2E2E2E] bg-white dark:bg-[#1E1F20]"
              aria-label="Edit product"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeleteProduct(product)}
              className="p-2 text-gray-400 dark:text-[#A0A0A0] hover:text-red-500 transition-colors rounded-md border border-[#ECEDEE] dark:border-[#2E2E2E] bg-white dark:bg-[#1E1F20]"
              aria-label="Delete product"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onAddStock(product)}
              className="flex items-center gap-1.5 bg-[#1E1F20] dark:bg-white text-white dark:text-[#121212] text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              <span className="text-sm leading-none">+</span>
              Add Stock
            </button>
          </div>
        </div>
      </div>

      <EditProductModal
        key={editProduct?.id}
        product={editProduct}
        onClose={() => setEditProduct(null)}
        onSave={(updated) => {
          onEdit(updated);
          setEditProduct(null);
        }}
      />

      <DeleteProductModal
        product={deleteProduct}
        onClose={() => setDeleteProduct(null)}
        onDelete={(id) => {
          onDelete(id);
          setDeleteProduct(null);
        }}
      />
    </>
  );
}