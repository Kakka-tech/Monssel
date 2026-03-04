import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function RecentTransactions() {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6 flex flex-col">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-neutral-900">
          Recent Transactions
        </h3>
        <p className="text-sm text-neutral-500">
          Latest income & expenses
        </p>
      </div>

      <div className="space-y-4 flex-1">
        <Transaction
          title="Product Name"
          type="Income"
          amount="+$180.00"
          positive
        />

        <Transaction
          title="Electricity Bill"
          type="Expense"
          amount="-$50.00"
        />

        <Transaction
          title="Supplier Payment"
          type="Expense"
          amount="-$120.00"
        />
      </div>

      <button className="mt-6 bg-neutral-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-800 transition">
        View All Transactions
      </button>
    </div>
  );
}

function Transaction({
  title,
  type,
  amount,
  positive,
}: {
  title: string;
  type: string;
  amount: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between bg-neutral-50 p-3 rounded-lg">
      <div>
        <p className="text-sm font-medium text-neutral-900">
          {title}
        </p>
        <p className="text-xs text-neutral-500">{type}</p>
      </div>

      <div
        className={`flex items-center gap-1 text-sm font-medium ${
          positive ? "text-green-600" : "text-red-600"
        }`}
      >
        {amount}
        {positive ? (
          <ArrowUpRight size={14} />
        ) : (
          <ArrowDownRight size={14} />
        )}
      </div>
    </div>
  );
}