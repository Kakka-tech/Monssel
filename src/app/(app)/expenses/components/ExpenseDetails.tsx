"use client";

import { EXPENSE_CATEGORIES, ExpenseCategory } from "../types";

interface ExpenseDetailsProps {
  amountRaw: string;
  onAmountChange: (value: string) => void;
  selectedCategory: ExpenseCategory | null;
  onCategoryChange: (category: ExpenseCategory) => void;
  note: string;
  onNoteChange: (value: string) => void;
}

export default function ExpenseDetails({
  amountRaw,
  onAmountChange,
  selectedCategory,
  onCategoryChange,
  note,
  onNoteChange,
}: ExpenseDetailsProps) {
  return (
    <div className="w-full xl:flex-1 xl:min-w-0 border border-[#ECEDEE] rounded-xl p-4 sm:p-6 space-y-6 bg-white">
      <h2 className="text-sm font-semibold text-[#1E1F20]">Expense Details</h2>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#1E1F20]">
          Amount <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center border border-[#ECEDEE] rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-gray-900/10 focus-within:border-[#0A0A0A]/50 transition">
          <span className="px-3 text-sm text-[#707375] border-r border-[#ECEDEE] py-2.5 bg-gray-50 select-none">
            $
          </span>
          <input
            type="number"
            min={0}
            step="0.01"
            placeholder="0.00"
            value={amountRaw}
            onChange={(e) => onAmountChange(e.target.value)}
            className="flex-1 px-3 py-2.5 text-sm focus:outline-none text-[#1E1F20] placeholder:text-[#1E1F20]/40 bg-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#1E1F20]">
          Category <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {EXPENSE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3 py-2 text-sm rounded-lg border transition-all text-center ${
                selectedCategory === cat
                  ? "border-[#155DFC] border-2 bg-[#EFF6FF] text-[#155DFC] font-medium"
                  : "border-[#ECEDEE] text-[#1E1F20] hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#1E1F20]">
          Note (optional)
        </label>
        <textarea
          rows={4}
          placeholder="Add details about this expense..."
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          className="w-full px-3 py-2.5 text-sm border border-[#ECEDEE] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-[#0A0A0A]/50 transition text-[#1E1F20] placeholder:text-[#1E1F20]/40"
        />
      </div>
    </div>
  );
}