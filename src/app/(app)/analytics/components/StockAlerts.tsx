import { AlertTriangle } from "lucide-react";
import { StockAlertProduct } from "../types";

const MOCK_ALERTS: StockAlertProduct[] = [
  { id: "1", name: "Product A", stock: 5, min: 10 },
  { id: "2", name: "Product B", stock: 8, min: 15 },
  { id: "3", name: "Product C", stock: 12, min: 20 },
  { id: "4", name: "Product D", stock: 2, min: 10 },
];

function getWidthClass(stock: number, min: number): string {
  const pct = Math.min(Math.round((stock / min) * 100), 100);
  if (pct <= 10) return "w-[10%]";
  if (pct <= 20) return "w-[20%]";
  if (pct <= 30) return "w-[30%]";
  if (pct <= 40) return "w-[40%]";
  if (pct <= 50) return "w-[50%]";
  if (pct <= 60) return "w-[60%]";
  if (pct <= 70) return "w-[70%]";
  if (pct <= 80) return "w-[80%]";
  if (pct <= 90) return "w-[90%]";
  return "w-full";
}

function getColors(
  stock: number,
  min: number,
): {
  bar: string;
  border: string;
  bg: string;
  darkBorder: string;
  darkBg: string;
} {
  const pct = (stock / min) * 100;
  if (pct <= 30)
    return {
      bar: "bg-red-400",
      border: "border-red-300",
      bg: "bg-red-50",
      darkBorder: "dark:border-red-900/50",
      darkBg: "dark:bg-red-950/30",
    };
  if (pct <= 60)
    return {
      bar: "bg-amber-400",
      border: "border-amber-300",
      bg: "bg-amber-50",
      darkBorder: "dark:border-amber-900/50",
      darkBg: "dark:bg-amber-950/30",
    };
  return {
    bar: "bg-green-400",
    border: "border-green-300",
    bg: "bg-green-50",
    darkBorder: "dark:border-green-900/50",
    darkBg: "dark:bg-green-950/30",
  };
}

interface StockAlertsProps {
  onViewAll?: () => void;
}

export default function StockAlerts({ onViewAll }: StockAlertsProps) {
  return (
    <div className="bg-white dark:bg-[#1E1F20] border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#1E1F20] dark:text-white">
          Stock Alerts
        </h3>
        <AlertTriangle className="w-4 h-4 text-amber-400" />
      </div>
      <p className="text-xs text-[#707375] dark:text-[#A0A0A0] -mt-2">
        Items running low on inventory
      </p>
      <div className="space-y-2.5">
        {MOCK_ALERTS.map((product) => {
          const { bar, border, bg, darkBorder, darkBg } = getColors(
            product.stock,
            product.min,
          );
          return (
            <div
              key={product.id}
              className={`rounded-lg border ${border} ${darkBorder} ${bg} ${darkBg} p-3 space-y-2`}
            >
              <p className="text-sm font-medium text-[#1E1F20] dark:text-white">
                {product.name}
              </p>
              <div className="w-full bg-white/70 dark:bg-black/20 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${bar} ${getWidthClass(product.stock, product.min)}`}
                />
              </div>
              <div className="flex justify-between text-xs text-[#707375] dark:text-[#A0A0A0]">
                <span>{product.stock} units left</span>
                <span className="text-right">Min: {product.min}</span>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={onViewAll}
        className="w-full text-sm font-medium bg-gray-900 dark:bg-white text-white dark:text-[#121212] py-2.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
      >
        View All Stock
      </button>
    </div>
  );
}
