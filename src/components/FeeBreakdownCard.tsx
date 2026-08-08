"use client";

import { useState } from "react";
import { getFeeBreakdown } from "@/lib/fees";

interface FeeBreakdownProps {
  price: number;
  quantity: number;
}

const naira = (n: number) =>
  `₦${n.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function FeeBreakdownCard({ price, quantity }: FeeBreakdownProps) {
  const [open, setOpen] = useState(false);
  const gross = price * (quantity || 1);

  if (!gross || gross <= 0) return null;

  const { paystackChargeFee, monsselFee, paystackTransferFee, stampDuty, payout } =
    getFeeBreakdown(gross);

  const pctReceived = ((payout / gross) * 100).toFixed(1);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            You&apos;ll receive
          </p>
          <p className="text-2xl font-semibold text-gray-900 mt-0.5">
            {naira(payout)}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {pctReceived}% of the {naira(gross)} sale
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-xs font-medium text-gray-600 hover:text-gray-900 transition shrink-0"
        >
          {open ? "Hide breakdown" : "See breakdown"}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-100 px-4 py-3 space-y-2 bg-gray-50">
          <Row label="Sale price" value={naira(gross)} />
          <Row label="Card processing (Paystack)" value={`− ${naira(paystackChargeFee)}`} muted />
          <Row label="Monssel fee" value={`− ${naira(monsselFee)}`} muted />
          <Row label="Bank transfer fee" value={`− ${naira(paystackTransferFee)}`} muted />
          {stampDuty > 0 && (
            <Row label="Stamp duty (govt. levy)" value={`− ${naira(stampDuty)}`} muted />
          )}
          <div className="border-t border-gray-200 pt-2 mt-2">
            <Row label="You receive" value={naira(payout)} bold />
          </div>
          <p className="text-[11px] text-gray-400 pt-1">
            Sent to your connected bank account automatically after the buyer pays.
          </p>
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  muted,
  bold,
}: {
  label: string;
  value: string;
  muted?: boolean;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={muted ? "text-gray-500" : "text-gray-700"}>{label}</span>
      <span
        className={
          bold ? "font-semibold text-gray-900" : muted ? "text-gray-500" : "text-gray-700"
        }
      >
        {value}
      </span>
    </div>
  );
}