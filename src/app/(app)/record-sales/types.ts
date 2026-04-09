export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface RecentSale {
  id: string;
  productName: string;
  quantity: number;
  total: number;
  date: string;
}
