import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Product } from "../types";
import ProductCard from "../components/ProductCard";

interface ProductSelectorProps {
  products: Product[];
  selectedProduct: Product | null;
  onSelect: (product: Product) => void;
}

export default function ProductSelector({
  products,
  selectedProduct,
  onSelect,
}: ProductSelectorProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [products, search],
  );

  return (
    <div className="border border-[#ECEDEE] rounded-xl p-4 space-y-3">
      <p className="text-sm font-medium text-[#1E1F20]">
        Select Product <span className="text-red-500">*</span>
      </p>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#707375]" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm border border-[#ECEDEE] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-[#0A0A0A]/50 transition text-[#1E1F20] placeholder:text-[#1E1F20]/40"
        />
      </div>

      <div className="space-y-2">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isSelected={selectedProduct?.id === product.id}
            onSelect={onSelect}
          />
        ))}

        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">
            No products match your search.
          </p>
        )}
      </div>
    </div>
  );
}
