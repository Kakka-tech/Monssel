import { Product } from "../types";
import StockBadge from "../components/StockBadge";
import { useCurrency } from "@/lib/currency-context";

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: (product: Product) => void;
}

export default function ProductCard({
  product,
  isSelected,
  onSelect,
}: ProductCardProps) {
  const { format } = useCurrency();

  return (
    <button
      onClick={() => onSelect(product)}
      disabled={product.stock === 0}
      className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
        isSelected ?
          "border-[#155DFC] border-2 bg-[#EFF6FF] dark:bg-[#155DFC]/10 shadow-sm"
        : "border-gray-100 dark:border-[#2E2E2E] bg-gray-50 dark:bg-[#252525] hover:border-gray-300 dark:hover:border-[#505050] hover:bg-white dark:hover:bg-[#2E2E2E]"
      } disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {product.name}
        </span>
        <StockBadge stock={product.stock} />
      </div>
      <div className="mt-0.5 flex items-center gap-2">
        <span className="text-sm text-gray-500 dark:text-[#A0A0A0]">
          {format(product.price)}
        </span>
        <span className="text-xs text-gray-400 dark:text-[#707375]">
          {product.stock} in stock
        </span>
      </div>
    </button>
  );
}
