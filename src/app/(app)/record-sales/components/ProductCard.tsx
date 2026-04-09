import { Product } from "../types";
import StockBadge from "../components/StockBadge";

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, isSelected, onSelect }: ProductCardProps) {
  return (
    <button
      onClick={() => onSelect(product)}
      disabled={product.stock === 0}
      className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
        isSelected
          ? "border-[#155DFC] border-2 bg-[#EFF6FF] shadow-sm"
          : "border-gray-100 bg-gray-50 hover:border-gray-300 hover:bg-white"
      } disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900">{product.name}</span>
        <StockBadge stock={product.stock} />
      </div>
      <div className="mt-0.5 flex items-center gap-2">
        <span className="text-sm text-gray-500">${product.price}</span>
        <span className="text-xs text-gray-400">{product.stock} in stock</span>
      </div>
    </button>
  );
}