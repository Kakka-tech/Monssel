"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCurrency } from "@/lib/currency-context";

type TransactionType = "Income" | "Expense";

interface Transaction {
  id: string;
  title: string;
  type: TransactionType;
  amount: number;
  created_at: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

const iconMap: Record<
  TransactionType,
  { bg: string; darkBg: string; color: string; emoji: string }
> = {
  Income: {
    bg: "bg-blue-100",
    darkBg: "dark:bg-blue-950/40",
    color: "text-blue-600",
    emoji: "📦",
  },
  Expense: {
    bg: "bg-yellow-100",
    darkBg: "dark:bg-yellow-950/40",
    color: "text-yellow-600",
    emoji: "💼",
  },
};

export default function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  const { format } = useCurrency();
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-[#1C1C1C] border border-neutral-200 dark:border-[#2E2E2E] rounded-xl p-4 flex flex-col">
      
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
          Recent Transactions
        </h3>
        <p className="text-xs text-neutral-500 dark:text-[#A0A0A0]">
          Latest income & expenses
        </p>
      </div>

      {/* Transactions */}
      <div className="flex flex-col gap-2">
        {transactions.length === 0 ? (
          <p className="text-xs text-center text-neutral-400 dark:text-[#A0A0A0] py-6">
            No transactions yet
          </p>
        ) : (
          transactions.slice(0, 6).map((tx) => {
            const isIncome = tx.type === "Income";
            const { bg, darkBg, color, emoji } = iconMap[tx.type];

            return (
              <div
                key={tx.id}
                className="flex items-center justify-between bg-[#FAFAFA] dark:bg-[#252525] border border-[#ECEDEE] dark:border-[#2E2E2E] px-3 py-2 rounded-lg"
              >
                <div className="flex items-center gap-2 min-w-0">
                  
                  {/* Icon */}
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${bg} ${darkBg}`}
                  >
                    <span className={`text-sm ${color}`}>{emoji}</span>
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-neutral-900 dark:text-white truncate max-w-[120px]">
                      {tx.title}
                    </p>
                    <p className="text-[10px] text-neutral-500 dark:text-[#A0A0A0]">
                      {tx.type} · {timeAgo(tx.created_at)}
                    </p>
                  </div>
                </div>

                {/* Amount */}
                <div
                  className={`flex items-center gap-1 text-xs font-medium shrink-0 ${
                    isIncome ? "text-[#43B75D]" : "text-[#FC4736]"
                  }`}
                >
                  {isIncome
                    ? `+${format(tx.amount)}`
                    : `-${format(tx.amount)}`}
                  {isIncome ? (
                    <ArrowUpRight size={12} />
                  ) : (
                    <ArrowDownRight size={12} />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Button */}
      <button
        onClick={() => router.push("/record-sales")}
        className="mt-4 bg-[#11181C] dark:bg-white text-white dark:text-[#121212] py-2 rounded-md text-xs font-medium hover:bg-neutral-800 dark:hover:bg-gray-200 transition"
      >
        View All Transactions
      </button>
    </div>
  );
}