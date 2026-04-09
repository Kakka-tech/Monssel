"use client";

import { useState, useMemo } from "react";
import { Search, ShoppingCart, Package } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface RecentSale {
  id: string;
  productName: string;
  quantity: number;
  total: number;
  date: string;
}

const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "Nike Air Max", price: 100, stock: 5 },
  { id: "2", name: "Adidas Ultra Boost", price: 180, stock: 12 },
  { id: "3", name: "Jordan 1 Retro", price: 250, stock: 2 },
];

const MOCK_RECENT_SALES: RecentSale[] = [
  {
    id: "s1",
    productName: "Nike Air Max",
    quantity: 2,
    total: 200,
    date: "Today, 2:30 PM",
  },
  {
    id: "s2",
    productName: "Jordan 1 Retro",
    quantity: 1,
    total: 250,
    date: "Today, 11:00 AM",
  },
  {
    id: "s3",
    productName: "Adidas Ultra Boost",
    quantity: 3,
    total: 540,
    date: "Yesterday, 4:15 PM",
  },
];

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0)
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-600">
        Out
      </span>
    );
  if (stock <= 5)
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-orange-100 text-orange-500">
        Low
      </span>
    );
  return (
    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-600">
      In Stock
    </span>
  );
}

export default function RecordSalesFull() {
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    MOCK_PRODUCTS[0],
  );
  const [quantityRaw, setQuantityRaw] = useState<string>("");
  const [customPrice, setCustomPrice] = useState<string>("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const quantity = parseInt(quantityRaw) || 1;

  const qtyExceedsStock =
    quantityRaw !== "" &&
    selectedProduct !== null &&
    quantity > selectedProduct.stock;

  const filtered = useMemo(
    () =>
      MOCK_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  const effectivePrice =
    customPrice !== "" ?
      parseFloat(customPrice) || 0
    : (selectedProduct?.price ?? 0);
  const total = effectivePrice * quantity;

  const handleSave = async () => {
    if (!selectedProduct || qtyExceedsStock) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setQuantityRaw("");
    setCustomPrice("");
    setNote("");
  };

  const handleCancel = () => {
    setSelectedProduct(null);
    setQuantityRaw("");
    setCustomPrice("");
    setNote("");
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Record Sale</h1>

      <div className="flex gap-6 items-start">
        <div className="flex-1 min-w-0 space-y-5">
          <div className="border border-gray-200 rounded-xl p-4 space-y-3">
            <p className="text-sm font-medium text-gray-700">
              Select Product <span className="text-red-500">*</span>
            </p>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition text-[#1E1F20] placeholder:text-[#1E1F20]/40"
              />
            </div>

            <div className="space-y-2">
              {filtered.map((product) => (
                <button
                  key={product.id}
                  onClick={() => {
                    setSelectedProduct(product);
                    setQuantityRaw("");
                    setCustomPrice("");
                  }}
                  disabled={product.stock === 0}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                    selectedProduct?.id === product.id ?
                      "border-gray-900 bg-white shadow-sm"
                    : "border-gray-100 bg-gray-50 hover:border-gray-300 hover:bg-white"
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {product.name}
                    </span>
                    <StockBadge stock={product.stock} />
                  </div>
                  <div className="mt-0.5 flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      ${product.price}
                    </span>
                    <span className="text-xs text-gray-400">
                      {product.stock} in stock
                    </span>
                  </div>
                </button>
              ))}

              {filtered.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">
                  No products match your search.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min={1}
              placeholder="1"
              value={quantityRaw}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw === "" || /^\d+$/.test(raw)) setQuantityRaw(raw);
              }}
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition text-[#1E1F20] placeholder:text-[#1E1F20]/40 ${
                qtyExceedsStock ?
                  "border-red-400 focus:ring-red-200 focus:border-red-400"
                : "border-gray-200 focus:ring-gray-900/10 focus:border-gray-400"
              }`}
            />
            {selectedProduct && !qtyExceedsStock && (
              <p className="text-xs text-gray-400">
                Available: {selectedProduct.stock} units
              </p>
            )}
            {qtyExceedsStock && (
              <p className="text-xs text-red-500">
                Maximum quantity for this product is {selectedProduct!.stock}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Price{" "}
              <span className="text-gray-400 font-normal">
                (Optional – defaults to ${selectedProduct?.price ?? 0})
              </span>
            </label>
            <input
              type="number"
              min={0}
              placeholder={String(selectedProduct?.price ?? 0)}
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition text-[#1E1F20] placeholder:text-[#1E1F20]/40"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Note (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Add any notes about this sale..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition text-[#1E1F20] placeholder:text-[#1E1F20]/40"
            />
          </div>
        </div>

        <div className="w-64 shrink-0 space-y-4">
          <div className="border border-gray-200 rounded-xl p-5 space-y-4">
            <p className="text-sm font-semibold text-gray-900">Summary</p>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Product</span>
                <span className="text-gray-900 font-medium text-right max-w-30 truncate">
                  {selectedProduct?.name ?? "—"}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Quantity</span>
                <span className="text-gray-900 font-medium">{quantity}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Price per unit</span>
                <span className="text-gray-900 font-medium">
                  ${effectivePrice.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-2.5 flex justify-between">
                <span className="font-medium text-gray-900">Total Amount</span>
                <span className="font-semibold text-green-600">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={!selectedProduct || saving || qtyExceedsStock}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-4 h-4" />
              {saving ? "Saving…" : "Save Sale"}
            </button>

            <button
              onClick={handleCancel}
              className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors py-1"
            >
              Cancel
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-900">Recent Sales</p>
            <div className="space-y-2">
              {MOCK_RECENT_SALES.map((sale) => (
                <div
                  key={sale.id}
                  className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg bg-gray-50"
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                    <Package className="w-4 h-4 text-orange-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-gray-900 truncate">
                      {sale.productName}
                    </p>
                    <p className="text-xs text-gray-400">{sale.date}</p>
                  </div>
                  <span className="text-xs font-semibold text-gray-700 shrink-0">
                    ${sale.total}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
