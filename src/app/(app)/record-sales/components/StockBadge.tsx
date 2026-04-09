interface StockBadgeProps {
  stock: number;
}

export default function StockBadge({ stock }: StockBadgeProps) {
  if (stock === 0)
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-600">
        Out
      </span>
    );
  if (stock <= 5)
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-orange-100 text-orange-500">
        Low
      </span>
    );
  return (
    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-600">
      In Stock
    </span>
  );
}