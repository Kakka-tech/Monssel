"use client";

import { useState } from "react";
import { Product, RecentSale } from "../../types";
import ProductSelector from "../../components/ProductSelector";
import SaleForm from "../../components/SaleForm";
import SaleSummary from "../../components/SalesSummary";

const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "Nike Air Max", price: 100, stock: 5 },
  { id: "2", name: "Adidas Ultra Boost", price: 180, stock: 12 },
  { id: "3", name: "Jordan 1 Retro", price: 250, stock: 2 },
];

const MOCK_RECENT_SALES: RecentSale[] = [
  { id: "s1", productName: "Nike Air Max", quantity: 2, total: 200, date: "Today, 2:30 PM" },
  { id: "s2", productName: "Jordan 1 Retro", quantity: 1, total: 250, date: "Today, 11:00 AM" },
  { id: "s3", productName: "Adidas Ultra Boost", quantity: 3, total: 540, date: "Yesterday, 4:23 PM" },
];

export default function RecordSalesFull() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(MOCK_PRODUCTS[0]);
  const [quantityRaw, setQuantityRaw] = useState<string>("");
  const [customPrice, setCustomPrice] = useState<string>("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const quantity = parseInt(quantityRaw) || 1;
  const qtyExceedsStock =
    quantityRaw !== "" && selectedProduct !== null && quantity > selectedProduct.stock;

  const effectivePrice =
    customPrice !== "" ? parseFloat(customPrice) || 0 : (selectedProduct?.price ?? 0);
  const total = effectivePrice * quantity;

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setQuantityRaw("");
    setCustomPrice("");
  };

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
    <div className="max-w-5xl mx-auto px-4 md:px-0">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Record Sale</h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full flex-1 min-w-0 space-y-5">
          <ProductSelector
            products={MOCK_PRODUCTS}
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
          recentSales={MOCK_RECENT_SALES}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
