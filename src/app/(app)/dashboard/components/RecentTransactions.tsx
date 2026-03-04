"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";

type IconType = "box" | "bolt" | "briefcase";
type TransactionType = "Income" | "Expense";

type TransactionItem = {
  title: string;
  type: TransactionType;
  amount: number;
  icon: IconType;
};

export default function RecentTransactions() {
  const transactions: TransactionItem[] = [
    { title: "Product Name", type: "Income", amount: 180, icon: "box" },
    { title: "Electricity Bill", type: "Expense", amount: 50, icon: "bolt" },
    { title: "Product Name", type: "Income", amount: 290, icon: "box" },
    { title: "Supplier Payment", type: "Expense", amount: 120, icon: "briefcase" },
    { title: "Product Name", type: "Income", amount: 450, icon: "box" },
  ];

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6 flex flex-col h-151">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-neutral-900">
          Recent Transactions
        </h3>
        <p className="text-sm text-neutral-500">
          Latest income & expenses
        </p>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto flex-1 pr-1">
        {transactions.map((tx, index) => (
          <Transaction key={index} {...tx} />
        ))}
      </div>

      <button className="mt-6 bg-neutral-900 text-[#FFFFFF] py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-800 transition">
        View All Transactions
      </button>
    </div>
  );
}

function Transaction({
  title,
  type,
  amount,
  icon,
}: TransactionItem) {
  const iconMap: Record<
    IconType,
    { bg: string; color: string; emoji: string }
  > = {
    box: { bg: "bg-blue-100", color: "text-blue-600", emoji: "📦" },
    bolt: { bg: "bg-pink-100", color: "text-pink-600", emoji: "⚡" },
    briefcase: { bg: "bg-yellow-100", color: "text-yellow-600", emoji: "💼" },
  };

  const isIncome = type === "Income";
  const { bg, color, emoji } = iconMap[icon];

  return (
    <div className="flex items-center justify-between bg-[#FAFAFA] border border-[#ECEDEE] p-3 rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${bg}`}>
          <span className={`text-lg ${color}`}>{emoji}</span>
        </div>

        <div>
          <p className="text-sm font-medium text-neutral-900">{title}</p>
          <p className="text-xs text-neutral-500">{type}</p>
        </div>
      </div>

      <div
        className={`flex items-center gap-1 text-sm font-medium ${
          isIncome ? "text-[#43B75D]" : "text-[#FC4736]"
        }`}
      >
        {isIncome ? `+$${amount.toFixed(2)}` : `-$${amount.toFixed(2)}`}
        {isIncome ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
      </div>
    </div>
  );
}