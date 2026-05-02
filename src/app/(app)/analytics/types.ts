export interface StatCard {
  label: string;
  value: number;
  change: string;
  changePositive: boolean;
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

export interface AnalyticsData {
  stats: {
    totalSales: number;
    totalExpenses: number;
    netProfit: number;
    profitMargin: number;
  };
  chartData: ChartDataPoint[];
  stockAlerts: StockAlertProduct[];
}
