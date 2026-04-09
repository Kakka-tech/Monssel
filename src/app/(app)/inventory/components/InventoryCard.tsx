import { Pencil } from "lucide-react";
import { Product, getStockStatus } from "../types";
import StatusBadge from "../components/StatusBadge";

interface InventoryCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onAddStock: (product: Product) => void;
}

export default function InventoryCard({ product, onEdit, onAddStock }: InventoryCardProps) {
  const status = getStockStatus(product.stock);
  const stockColor =
    status === "out_of_stock" ? "text-red-500"
    : status === "low_stock"  ? "text-yellow-600"
    : "text-green-600";

  return (
    <div className="p-4 space-y-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <span className="text-sm">📦</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1E1F20]">{product.name}</p>
            <p className="text-xs text-[#707375]">${product.price.toFixed(2)} per unit</p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="text-[#707375]">Stock: </span>
          <span className={`font-medium ${stockColor}`}>{product.stock} units</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(product)}
            className="p-2 text-gray-400 hover:text-gray-700 transition-colors rounded-md border border-[#ECEDEE] bg-white"
            aria-label="Edit product"
          >
            <Pencil className="w-4 h-4 text-[#1E1F20]" />
          </button>
          <button
            onClick={() => onAddStock(product)}
            className="flex items-center gap-1.5 bg-[#1E1F20] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <span className="text-sm leading-none">+</span>
            Add Stock
          </button>
        </div>
      </div>
    </div>
  );
}
