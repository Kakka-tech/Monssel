"use client";

import { useState } from "react";
import { Product } from "../../types";
import InventoryTable from "../InventoryTable";

const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "Laptop Stand",        price: 45,  stock: 5  },
  { id: "2", name: "Wireless Mouse",      price: 25,  stock: 2  },
  { id: "3", name: "USB-C Cable",         price: 12,  stock: 15 },
  { id: "4", name: "Notebook",            price: 8,   stock: 8  },
  { id: "5", name: "Mechanical Keyboard", price: 120, stock: 0  },
];

interface InventoryFullProps {
  onAddProduct: () => void;
}

export default function InventoryFull({ onAddProduct }: InventoryFullProps) {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);

  const handleEdit = (product: Product) => {
    // TODO: open edit modal/drawer
    console.log("Edit:", product);
  };

  const handleAddStock = (product: Product) => {
    // TODO: open add-stock modal/drawer
    console.log("Add stock:", product);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#1E1F20]">Inventory</h1>
        <button
          onClick={onAddProduct}
          className="flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <span className="text-base leading-none">+</span>
          Add Product
        </button>
      </div>

      <InventoryTable
        products={products}
        onEdit={handleEdit}
        onAddStock={handleAddStock}
      />
    </div>
  );
}