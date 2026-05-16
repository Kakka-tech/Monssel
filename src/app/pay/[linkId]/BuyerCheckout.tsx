"use client";

import { useState } from "react";
import Image from "next/image";

interface PaymentLink {
  id: string;
  product_name: string;
  price: number;
  quantity: number;
  provider: "paystack" | "flutterwave";
  status: "active" | "paid" | "expired";
}

export default function BuyerCheckout({ link }: { link: PaymentLink }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = link.price * link.quantity;

  if (link.status !== "active") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-3">
          <div className="text-4xl">{link.status === "paid" ? "✅" : "⏰"}</div>
          <h2 className="text-lg font-semibold text-gray-900">
            {link.status === "paid" ? "Already Paid" : "Link Expired"}
          </h2>
          <p className="text-sm text-gray-500">
            {link.status === "paid" ?
              "This payment link has already been used."
            : "This payment link is no longer active."}
          </p>
        </div>
      </div>
    );
  }

  const handlePay = async () => {
    if (!email) return;
    setLoading(true);
    setError(null);

    const res = await fetch(`/api/payment-links/${link.id}/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Failed to initialize payment");
      setLoading(false);
      return;
    }

    window.location.href = data.url;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-3">
            <Image
              src="/Icons/logo.png"
              alt="Monssel"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <h1 className="text-lg font-semibold text-gray-900">Monssel Pay</h1>
          <p className="text-sm text-gray-500">
            Secure payment powered by{" "}
            {link.provider === "paystack" ? "Paystack" : "Flutterwave"}
          </p>
        </div>

        {/* Product card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              You&apos;re paying for
            </p>
            <p className="text-lg font-semibold text-gray-900 mt-0.5">
              {link.product_name}
            </p>
            <p className="text-sm text-gray-500">Qty: {link.quantity}</p>
          </div>

          <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">Total</span>
            <span className="text-xl font-bold text-gray-900">
              ₦{total.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-700">
              Your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            onClick={handlePay}
            disabled={!email || loading}
            className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-900 transition disabled:opacity-50"
          >
            {loading ? "Redirecting…" : `Pay ₦${total.toLocaleString()}`}
          </button>
        </div>

        <p className="text-center text-xs text-gray-400">
          Powered by <span className="font-medium text-gray-600">Monssel</span>
        </p>
      </div>
    </div>
  );
}
