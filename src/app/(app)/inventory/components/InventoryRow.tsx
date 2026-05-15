"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Pencil, Trash2 } from "lucide-react";
import { Product, getStockStatus } from "../types";
import StatusBadge from "../components/StatusBadge";
import { useCurrency } from "@/lib/currency-context";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";

interface InventoryRowProps {
  product: Product;
  onEdit: (product: Product) => void;
  onAddStock: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function InventoryRow({
  product,
  onEdit,
  onAddStock,
  onDelete,
}: InventoryRowProps) {
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
      <tr className="border-b border-[#ECEDEE] dark:border-[#2E2E2E] last:border-0 hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors">
        <td className="py-3.5 px-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-[#2E2E2E] flex items-center justify-center shrink-0">
              <span className="text-xs text-gray-400">📦</span>
            </div>
            <span className="text-sm font-medium text-[#1E1F20] dark:text-white">
              {product.name}
            </span>
          </div>
        </td>
        <td className="py-3.5 px-4">
          <StatusBadge status={status} />
        </td>
        <td className="py-3.5 px-4">
          <span className={`text-sm font-medium ${stockColor}`}>
            {product.stock} units
          </span>
        </td>
        <td className="py-3.5 px-4">
          <span className="text-sm text-[#1E1F20] dark:text-white">
            {format(product.price)}
          </span>
        </td>
        <td className="py-3.5 px-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditProduct(product)}
              className="p-1.5 text-gray-400 dark:text-[#A0A0A0] hover:text-gray-700 dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-[#2E2E2E]"
              aria-label="Edit product"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeleteProduct(product)}
              className="p-1.5 text-gray-400 dark:text-[#A0A0A0] hover:text-red-500 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-[#2E2E2E]"
              aria-label="Delete product"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onAddStock(product)}
              className="flex items-center gap-1.5 bg-[#1E1F20] dark:bg-white text-white dark:text-[#121212] text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              <span className="text-sm leading-none">+</span>
              Add Stock
            </button>
          </div>
        </td>
      </tr>

      {typeof window !== "undefined" && createPortal(
        <>
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
        </>,
        document.body
      )}
    </>
  );
}