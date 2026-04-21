"use client";
import { useState } from "react";
import { ExpenseCategory } from "../types";
import ExpenseDetails from "./ExpenseDetails";
import ExpenseSummary from "./ExpenseSummary";

export default function ExpensesForm() {
  const [amountRaw, setAmountRaw] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ExpenseCategory | null>(null);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const amount = parseFloat(amountRaw) || 0;
  const canSave = amount > 0 && selectedCategory !== null;

  const handleSave = async () => {
    if (!canSave) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setAmountRaw("");
    setSelectedCategory(null);
    setNote("");
  };

  const handleCancel = () => {
    setAmountRaw("");
    setSelectedCategory(null);
    setNote("");
  };

  return (
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
  );
}
