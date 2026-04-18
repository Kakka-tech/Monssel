export interface StatCard {
  label: string;
  value: string;
  change: string;
  changePositive: boolean;
  sub?: string;
  highlight?: boolean;
}

export interface ChartDataPoint {
  month: string;
  sales: number;
  expenses: number;
  profit: number;
}

export interface StockAlertProduct {
  id: string;
  name: string;
  stock: number;
  min: number;
}

export type QuickMetric = "Sales" | "Expenses" | "Profit";
