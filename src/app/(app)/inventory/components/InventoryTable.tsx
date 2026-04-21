import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import { Product } from "../types";
import InventoryRow from "../components/InventoryRow";
import InventoryCard from "../components/InventoryCard";

interface InventoryTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onAddStock: (product: Product) => void;
}

export default function InventoryTable({
  products,
  onEdit,
  onAddStock,
}: InventoryTableProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [products, search],
  );

  return (
    <div className="space-y-4">
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#707375] dark:text-[#A0A0A0]" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10 focus:border-[#0A0A0A]/50 dark:focus:border-[#505050] transition bg-white dark:bg-[#1E1F20] text-[#1E1F20] dark:text-white placeholder:text-[#1E1F20]/40 dark:placeholder:text-white/30"
        />
      </div>

      <div className="border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-xl overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-150">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#1E1F20] border-b border-[#ECEDEE] dark:border-[#2E2E2E]">
                <th className="text-left text-xs font-medium text-[#707375] dark:text-[#A0A0A0] px-4 py-3">
                  Product
                </th>
                <th className="text-left text-xs font-medium text-[#707375] dark:text-[#A0A0A0] px-4 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-[#707375] dark:text-[#A0A0A0] px-4 py-3">
                  Stock
                </th>
                <th className="text-left text-xs font-medium text-[#707375] dark:text-[#A0A0A0] px-4 py-3">
                  Price
                </th>
                <th className="text-left text-xs font-medium text-[#707375] dark:text-[#A0A0A0] px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECEDEE] dark:divide-[#2E2E2E]">
              {filtered.map((product) => (
                <InventoryRow
                  key={product.id}
                  product={product}
                  onEdit={onEdit}
                  onAddStock={onAddStock}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden divide-y divide-[#ECEDEE] dark:divide-[#2E2E2E]">
          {filtered.map((product) => (
            <InventoryCard
              key={product.id}
              product={product}
              onEdit={onEdit}
              onAddStock={onAddStock}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-400 dark:text-[#A0A0A0]">
            No products match your search.
          </div>
        )}
      </div>
    </div>
  );
}
