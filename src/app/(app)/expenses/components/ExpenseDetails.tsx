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
    <div className="w-full xl:flex-1 xl:min-w-0 border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-xl p-4 sm:p-6 space-y-6 bg-white dark:bg-[#1E1F20]">
      <h2 className="text-sm font-semibold text-[#1E1F20] dark:text-white">
        Expense Details
      </h2>

      {/* Amount */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#1E1F20] dark:text-white">
          Amount <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-gray-900/10 dark:focus-within:ring-white/10 focus-within:border-[#0A0A0A]/50 dark:focus-within:border-[#505050] transition">
          <span className="px-3 text-sm text-[#707375] dark:text-[#A0A0A0] border-r border-[#ECEDEE] dark:border-[#2E2E2E] py-2.5 bg-gray-50 dark:bg-[#252525] select-none">
            $
          </span>
          <input
            type="number"
            min={0}
            step="0.01"
            placeholder="0.00"
            value={amountRaw}
            onChange={(e) => onAmountChange(e.target.value)}
            className="flex-1 px-3 py-2.5 text-sm focus:outline-none bg-white dark:bg-[#1E1F20] text-[#1E1F20] dark:text-white placeholder:text-[#1E1F20]/40 dark:placeholder:text-white/30"
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#1E1F20] dark:text-white">
          Category <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {EXPENSE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3 py-2 text-sm rounded-lg border transition-all text-center ${
                selectedCategory === cat ?
                  "border-[#155DFC] border-2 bg-[#EFF6FF] dark:bg-[#155DFC]/10 text-[#155DFC] font-medium"
                : "border-[#ECEDEE] dark:border-[#2E2E2E] text-[#1E1F20] dark:text-[#A0A0A0] hover:border-gray-400 dark:hover:border-[#505050] hover:bg-gray-50 dark:hover:bg-[#252525]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#1E1F20] dark:text-white">
          Note (optional)
        </label>
        <textarea
          rows={4}
          placeholder="Add details about this expense..."
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          className="w-full px-3 py-2.5 text-sm border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10 focus:border-[#0A0A0A]/50 dark:focus:border-[#505050] transition bg-white dark:bg-[#1E1F20] text-[#1E1F20] dark:text-white placeholder:text-[#1E1F20]/40 dark:placeholder:text-white/30"
        />
      </div>
    </div>
  );
}
