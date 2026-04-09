"use client";

import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import InventoryOnboarding from "./components/InventoryOnboarding";
import InventoryFull from "./components/InventoryFull";

export default function InventoryPage() {
  // Replace with real product data from your backend
  const [hasProducts, setHasProducts] = useState(false);

  const handleProductAdded = (data: { name: string; price: string; stock: string }) => {
    // TODO: persist to backend, then refresh product list
    console.log("Product added:", data);
    setHasProducts(true);
  };

  const handleAddProduct = () => {
    // TODO: open add-product modal/drawer from the full view
  };

  return (
    <PageContainer>
      {hasProducts ? (
        <InventoryFull onAddProduct={handleAddProduct} />
      ) : (
        <InventoryOnboarding onProductAdded={handleProductAdded} />
      )}
    </PageContainer>
  );
}

// export default function InventoryPage() {
//   const handleAddProduct = () => {
//     // TODO: open add-product modal/drawer from the full view
//   };

//   return (
//     <PageContainer>
//       <InventoryFull onAddProduct={handleAddProduct} />
//     </PageContainer>
//   );
// } // For testing the full view without onboarding