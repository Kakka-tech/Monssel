"use client";

import { Trash2 } from "lucide-react";
import { Expense } from "../types";
import { useCurrency } from "@/lib/currency-context";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Supplies: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400",
  Rent: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400",
  Utilities:
    "bg-yellow-50 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-400",
  Marketing: "bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400",
  Shipping:
    "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400",
  Equipment: "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400",
  Salary: "bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400",
  Other: "bg-gray-100 dark:bg-[#2E2E2E] text-gray-600 dark:text-[#A0A0A0]",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  const { format } = useCurrency();

  if (expenses.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-[#1E1F20] dark:text-white">
        Past Expenses
      </h2>
      <div className="border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-xl overflow-hidden divide-y divide-[#ECEDEE] dark:divide-[#2E2E2E]">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center gap-4 px-4 py-3 bg-white dark:bg-[#1E1F20] hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
          >
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${CATEGORY_COLORS[expense.category]}`}
            >
              {expense.category}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#1E1F20] dark:text-white truncate">
                {expense.note || "—"}
              </p>
              <p className="text-xs text-[#707375] dark:text-[#A0A0A0]">
                {formatDate(expense.created_at)}
              </p>
            </div>
            <span className="text-sm font-semibold text-red-500 dark:text-red-400 shrink-0">
              -{format(expense.amount)}
            </span>
            <button
              onClick={() => onDelete(expense.id)}
              className="text-[#707375] dark:text-[#A0A0A0] hover:text-red-500 dark:hover:text-red-400 transition-colors shrink-0"
              aria-label="Delete expense"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
