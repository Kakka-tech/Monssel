export const EXPENSE_CATEGORIES = [
  "Supplies",
  "Rent",
  "Utilities",
  "Marketing",
  "Shipping",
  "Equipment",
  "Salary",
  "Other",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  note?: string;
  createdAt: string;
}