"use client";

import { useState } from "react";
import { Product, RecentSale } from "../../types";
import ProductSelector from "../../components/ProductSelector";
import SaleForm from "../../components/SaleForm";
import SaleSummary from "../../components/SalesSummary";
import { useFetch } from "@/lib/usefetch";

interface RecordSalesFullProps {
  products: Product[];
  onSaleRecorded: () => void;
}

interface RawSale {
  id: string;
  product_name: string;
  quantity: number;
  total: number;
  created_at: string;
}

function mapSale(s: RawSale): RecentSale {
  return {
    id: s.id,
    productName: s.product_name,
    quantity: s.quantity,
    total: s.total,
    date: new Date(s.created_at).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }),
  };
}

export default function RecordSalesFull({
  products,
  onSaleRecorded,
}: RecordSalesFullProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    products[0] ?? null,
  );
  const [quantityRaw, setQuantityRaw] = useState<string>("");
  const [customPrice, setCustomPrice] = useState<string>("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: rawSales, refetch: refetchSales } =
    useFetch<RawSale[]>("/api/sales?limit=5");
  const recentSales: RecentSale[] = rawSales ? rawSales.map(mapSale) : [];

  const quantity = parseInt(quantityRaw) || 1;
  const qtyExceedsStock =
    quantityRaw !== "" &&
    selectedProduct !== null &&
    quantity > selectedProduct.stock;

  const effectivePrice =
    customPrice !== "" ?
      parseFloat(customPrice) || 0
    : (selectedProduct?.price ?? 0);
  const total = effectivePrice * quantity;

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setQuantityRaw("");
    setCustomPrice("");
    setError(null);
  };

  const handleSave = async () => {
    if (!selectedProduct || qtyExceedsStock) return;
    setSaving(true);
    setError(null);

    const res = await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: selectedProduct.id,
        quantity,
        price: effectivePrice,
        note: note || null,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to record sale");
      setSaving(false);
      return;
    }

    setQuantityRaw("");
    setCustomPrice("");
    setNote("");
    setSaving(false);
    refetchSales();
    onSaleRecorded();
  };

  const handleCancel = () => {
    setSelectedProduct(null);
    setQuantityRaw("");
    setCustomPrice("");
    setNote("");
    setError(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-0">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Record Sale
      </h1>

      {error && (
        <div className="mb-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs rounded-lg px-3 py-2.5">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full flex-1 min-w-0 space-y-5">
          <ProductSelector
            products={products}
            selectedProduct={selectedProduct}
            onSelect={handleSelectProduct}
          />
          <SaleForm
            selectedProduct={selectedProduct}
            quantityRaw={quantityRaw}
            onQuantityChange={setQuantityRaw}
            qtyExceedsStock={qtyExceedsStock}
            customPrice={customPrice}
            onCustomPriceChange={setCustomPrice}
            note={note}
            onNoteChange={setNote}
          />
        </div>

        <SaleSummary
          selectedProduct={selectedProduct}
          quantity={quantity}
          effectivePrice={effectivePrice}
          total={total}
          saving={saving}
          qtyExceedsStock={qtyExceedsStock}
          recentSales={recentSales}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
