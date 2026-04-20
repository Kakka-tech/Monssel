import { ShoppingCart, Package } from "lucide-react";
import { Product, RecentSale } from "../types";

interface SaleSummaryProps {
  selectedProduct: Product | null;
  quantity: number;
  effectivePrice: number;
  total: number;
  saving: boolean;
  qtyExceedsStock: boolean;
  recentSales: RecentSale[];
  onSave: () => void;
  onCancel: () => void;
}

export default function SaleSummary({
  selectedProduct,
  quantity,
  effectivePrice,
  total,
  saving,
  qtyExceedsStock,
  recentSales,
  onSave,
  onCancel,
}: SaleSummaryProps) {
  return (
    <div className="w-full lg:w-64 shrink-0 space-y-4">
      <div className="border border-gray-200 dark:border-[#2E2E2E] rounded-xl p-5 space-y-4 bg-white dark:bg-[#1C1C1C]">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          Summary
        </p>
        <div className="space-y-2.5 text-sm">
          <div className="flex justify-between text-gray-600 dark:text-[#A0A0A0]">
            <span>Product</span>
            <span className="text-gray-900 dark:text-white font-medium text-right max-w-30 truncate">
              {selectedProduct?.name ?? "—"}
            </span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-[#A0A0A0]">
            <span>Quantity</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {quantity}
            </span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-[#A0A0A0]">
            <span>Price per unit</span>
            <span className="text-gray-900 dark:text-white font-medium">
              ${effectivePrice.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-gray-100 dark:border-[#2E2E2E] pt-2.5 flex justify-between">
            <span className="font-medium text-gray-900 dark:text-white">
              Total Amount
            </span>
            <span className="font-semibold text-green-600 dark:text-green-400">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
        <button
          onClick={onSave}
          disabled={!selectedProduct || saving || qtyExceedsStock}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-[#121212] text-sm font-medium py-2.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-4 h-4" />
          {saving ? "Saving…" : "Save Sale"}
        </button>
        <button
          onClick={onCancel}
          className="w-full text-sm text-gray-500 dark:text-[#A0A0A0] hover:text-gray-700 dark:hover:text-white transition-colors py-1"
        >
          Cancel
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          Recent Sales
        </p>
        <div className="space-y-2">
          {recentSales.map((sale) => (
            <div
              key={sale.id}
              className="flex items-center gap-3 p-3 border border-gray-100 dark:border-[#2E2E2E] rounded-lg bg-gray-50 dark:bg-[#1E1F20]"
            >
              <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center shrink-0">
                <Package className="w-4 h-4 text-orange-500 dark:text-orange-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                  {sale.productName}
                </p>
                <p className="text-xs text-gray-400 dark:text-[#A0A0A0]">
                  {sale.date}
                </p>
              </div>
              <span className="text-xs font-semibold text-gray-700 dark:text-[#A0A0A0] shrink-0">
                ${sale.total.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
