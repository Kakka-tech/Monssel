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
      <div className="border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-xl p-4 sm:p-5 space-y-4 bg-white dark:bg-[#1E1F20]">
        <p className="text-sm font-semibold text-[#1E1F20] dark:text-white">
          Summary
        </p>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-[#707375] dark:text-[#A0A0A0]">
            <span>Amount</span>
            <span className="text-[#1E1F20] dark:text-white font-medium">
              ${amount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-[#707375] dark:text-[#A0A0A0]">
            <span>Category</span>
            <span className="text-[#1E1F20] dark:text-white font-medium">
              {selectedCategory ?? "—"}
            </span>
          </div>
          <div className="border-t border-[#ECEDEE] dark:border-[#2E2E2E] pt-3 flex justify-between">
            <span className="font-semibold text-[#1E1F20] dark:text-white">
              Total Expense
            </span>
            <span className="font-semibold text-red-500 dark:text-red-400">
              ${amount.toFixed(2)}
            </span>
          </div>
        </div>
        <button
          onClick={onSave}
          disabled={!canSave || saving}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-[#121212] text-sm font-medium py-2.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Receipt className="w-4 h-4" />
          {saving ? "Saving…" : "Save Expense"}
        </button>
        <button
          onClick={onCancel}
          className="w-full text-sm text-[#707375] dark:text-[#A0A0A0] hover:text-[#1E1F20] dark:hover:text-white transition-colors py-1"
        >
          Cancel
        </button>
      </div>

      {showTip && (
        <div className="border border-[#BEDBFF] dark:border-[#155DFC]/30 rounded-xl p-4 bg-blue-50 dark:bg-[#155DFC]/10 space-y-1.5 relative">
          <button
            onClick={() => setShowTip(false)}
            className="absolute top-3 right-3 text-[#155DFC]/50 hover:text-[#155DFC] dark:text-[#155DFC]/60 dark:hover:text-[#6BA3FF] transition-colors"
            aria-label="Dismiss tip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="text-sm font-normal text-[#155DFC] dark:text-[#6BA3FF]">
            💡 Tip
          </p>
          <p className="text-xs text-[#193CB8] dark:text-[#A0BFFF] leading-relaxed pr-4">
            Keep track of all business expenses to accurately calculate your net
            profit and make informed decisions.
          </p>
        </div>
      )}
    </div>
  );
}
