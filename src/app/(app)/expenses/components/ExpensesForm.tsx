"use client";

import { useState } from "react";
import { ExpenseCategory, Expense } from "../types";
import ExpenseDetails from "./ExpenseDetails";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseList from "./ExpenseList";

interface ExpensesFormProps {
  onSaved: () => void;
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export default function ExpensesForm({
  onSaved,
  expenses,
  onDelete,
}: ExpensesFormProps) {
  const [amountRaw, setAmountRaw] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ExpenseCategory | null>(null);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const amount = parseFloat(amountRaw) || 0;
  const canSave = amount > 0 && selectedCategory !== null;

  const handleSave = async () => {
    if (!canSave) return;
    setError(null);
    setSaving(true);

    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, category: selectedCategory, note }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to save expense");
      setSaving(false);
      return;
    }

    setSaving(false);
    setAmountRaw("");
    setSelectedCategory(null);
    setNote("");
    onSaved();
  };

  const handleCancel = () => {
    setAmountRaw("");
    setSelectedCategory(null);
    setNote("");
    setError(null);
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs rounded-lg px-3 py-2.5">
          {error}
        </div>
      )}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        <ExpenseDetails
          amountRaw={amountRaw}
          onAmountChange={setAmountRaw}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          note={note}
          onNoteChange={setNote}
        />
        <ExpenseSummary
          amount={amount}
          selectedCategory={selectedCategory}
          saving={saving}
          canSave={canSave}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
      <ExpenseList expenses={expenses} onDelete={onDelete} />
    </div>
  );
}
