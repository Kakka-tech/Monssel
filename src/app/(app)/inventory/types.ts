export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export function getStockStatus(stock: number): StockStatus {
  if (stock === 0) return "out_of_stock";
  if (stock <= 5) return "low_stock";
  return "in_stock";
}