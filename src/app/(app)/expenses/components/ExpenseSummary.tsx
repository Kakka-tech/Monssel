"use client";

import { useState } from "react";
import { Receipt, X } from "lucide-react";
import { ExpenseCategory } from "../types";

interface ExpenseSummaryProps {
  amount: number;
  selectedCategory: ExpenseCategory | null;
  saving: boolean;
  canSave: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export default function ExpenseSummary({
  amount,
  selectedCategory,
  saving,
  canSave,
  onSave,
  onCancel,
}: ExpenseSummaryProps) {
  const [showTip, setShowTip] = useState(true);

  return (
    <div className="w-full xl:w-72 xl:shrink-0 space-y-3">
      <div className="border border-[#ECEDEE] rounded-xl p-4 sm:p-5 space-y-4 bg-white">
        <p className="text-sm font-semibold text-[#1E1F20]">Summary</p>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-[#707375]">
            <span>Amount</span>
            <span className="text-[#1E1F20] font-medium">
              ${amount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-[#707375]">
            <span>Category</span>
            <span className="text-[#1E1F20] font-medium">
              {selectedCategory ?? "—"}
            </span>
          </div>
          <div className="border-t border-[#ECEDEE] pt-3 flex justify-between">
            <span className="font-semibold text-[#1E1F20]">Total Expense</span>
            <span className="font-semibold text-red-500">
              ${amount.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          onClick={onSave}
          disabled={!canSave || saving}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Receipt className="w-4 h-4" />
          {saving ? "Saving…" : "Save Expense"}
        </button>

        <button
          onClick={onCancel}
          className="w-full text-sm text-[#707375] hover:text-[#1E1F20] transition-colors py-1"
        >
          Cancel
        </button>
      </div>

      {showTip && (
        <div className="border border-[#BEDBFF] rounded-xl p-4 bg-blue-50 space-y-1.5 relative">
          <button
            onClick={() => setShowTip(false)}
            className="absolute top-3 right-3 text-[#155DFC]/50 hover:text-[#155DFC] transition-colors"
            aria-label="Dismiss tip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="text-sm font-normal text-[#155DFC]">💡 Tip</p>
          <p className="text-xs text-[#193CB8] leading-relaxed pr-4">
            Keep track of all business expenses to accurately calculate your
            net profit and make informed decisions.
          </p>
        </div>
      )}
    </div>
  );
}