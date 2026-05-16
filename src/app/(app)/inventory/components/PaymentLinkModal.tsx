"use client";

import { useState } from "react";
import { X, Copy, Check, Link } from "lucide-react";
import { Product } from "../types";

interface PaymentLinkModalProps {
  product: Product | null;
  onClose: () => void;
}

const APP_URL =
  typeof window !== "undefined" ?
    window.location.origin
  : (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000");

export default function PaymentLinkModal({
  product,
  onClose,
}: PaymentLinkModalProps) {
  const [price, setPrice] = useState(String(product?.price ?? ""));
  const [quantity, setQuantity] = useState("1");
  const [provider, setProvider] = useState<"paystack" | "flutterwave">(
    "paystack",
  );
  const [generating, setGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!product) return null;

  const total = parseFloat(price || "0") * parseInt(quantity || "1");

  const handleGenerate = async () => {
    if (!price || !quantity) return;
    setGenerating(true);
    setError(null);

    const res = await fetch("/api/payment-links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: product.id,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        provider,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to generate link");
      setGenerating(false);
      return;
    }

    const data = await res.json();
    setGeneratedLink(`${APP_URL}/pay/${data.id}`);
    setGenerating(false);
  };

  const handleCopy = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm mx-4 rounded-2xl border border-neutral-200 dark:border-[#2E2E2E] bg-white dark:bg-[#1C1C1C] shadow-2xl p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center">
              <Link className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-sm font-semibold text-[#1E1F20] dark:text-white">
              Generate Payment Link
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product info */}
        <div className="bg-gray-50 dark:bg-[#252525] rounded-lg px-3 py-2.5">
          <p className="text-xs text-[#707375] dark:text-[#A0A0A0]">Product</p>
          <p className="text-sm font-medium text-[#1E1F20] dark:text-white mt-0.5">
            {product.name}
          </p>
        </div>

        {!generatedLink ?
          <>
            <div className="space-y-3">
              {/* Price */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#707375] dark:text-[#A0A0A0]">
                  Price per Unit (₦)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full text-sm rounded-lg border border-[#ECEDEE] dark:border-[#2E2E2E] bg-white dark:bg-[#252525] text-[#1E1F20] dark:text-white px-3 py-2 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                />
              </div>

              {/* Quantity */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#707375] dark:text-[#A0A0A0]">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full text-sm rounded-lg border border-[#ECEDEE] dark:border-[#2E2E2E] bg-white dark:bg-[#252525] text-[#1E1F20] dark:text-white px-3 py-2 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                />
              </div>

              {/* Provider */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#707375] dark:text-[#A0A0A0]">
                  Payment Provider
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["paystack", "flutterwave"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setProvider(p)}
                      className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                        provider === p ?
                          "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                        : "border-[#ECEDEE] dark:border-[#2E2E2E] text-[#707375] dark:text-[#A0A0A0] hover:border-gray-400 dark:hover:border-gray-500"
                      }`}
                    >
                      {p === "paystack" ? "Paystack" : "Flutterwave"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between border-t border-[#ECEDEE] dark:border-[#2E2E2E] pt-3">
                <span className="text-xs text-[#707375] dark:text-[#A0A0A0]">
                  Total
                </span>
                <span className="text-sm font-semibold text-[#1E1F20] dark:text-white">
                  ₦{total.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={handleGenerate}
                disabled={generating || !price || !quantity}
                className="flex-1 bg-[#1E1F20] dark:bg-white text-white dark:text-[#121212] text-sm font-medium py-2 rounded-lg hover:bg-black dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {generating ? "Generating…" : "Generate Link"}
              </button>
              <button
                onClick={onClose}
                className="flex-1 text-sm text-[#707375] dark:text-[#A0A0A0] border border-[#ECEDEE] dark:border-[#2E2E2E] py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-[#2A2A2A] transition-colors"
              >
                Cancel
              </button>
            </div>
          </>
        : <>
            <div className="space-y-2">
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                ✓ Link generated successfully
              </p>
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#252525] rounded-lg px-3 py-2.5 border border-[#ECEDEE] dark:border-[#2E2E2E]">
                <p className="text-xs text-[#707375] dark:text-[#A0A0A0] flex-1 truncate">
                  {generatedLink}
                </p>
                <button
                  onClick={handleCopy}
                  className="shrink-0 text-[#1E1F20] dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {copied ?
                    <Check className="w-4 h-4 text-green-500" />
                  : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-[#707375] dark:text-[#A0A0A0]">
                Share this link with your buyer. It expires after one payment.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 bg-[#1E1F20] dark:bg-white text-white dark:text-[#121212] text-sm font-medium py-2 rounded-lg hover:bg-black dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                {copied ?
                  <Check className="w-4 h-4" />
                : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Link"}
              </button>
              <button
                onClick={() => {
                  setGeneratedLink(null);
                  setPrice(String(product.price));
                  setQuantity("1");
                }}
                className="flex-1 text-sm text-[#707375] dark:text-[#A0A0A0] border border-[#ECEDEE] dark:border-[#2E2E2E] py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-[#2A2A2A] transition-colors"
              >
                New Link
              </button>
            </div>
          </>
        }
      </div>
    </div>
  );
}
