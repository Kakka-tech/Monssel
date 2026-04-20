interface StockBadgeProps {
  stock: number;
}

export default function StockBadge({ stock }: StockBadgeProps) {
  if (stock === 0)
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400">
        Out
      </span>
    );
  if (stock <= 5)
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/40 text-orange-500 dark:text-orange-400">
        Low
      </span>
    );
  return (
    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400">
      In Stock
    </span>
  );
}
