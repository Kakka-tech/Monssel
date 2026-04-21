import { StockStatus } from "../types";

interface StatusBadgeProps {
  status: StockStatus;
}

const config: Record<
  StockStatus,
  {
    label: string;
    dot: string;
    text: string;
    bg: string;
    darkText: string;
    darkBg: string;
  }
> = {
  in_stock: {
    label: "In Stock",
    dot: "bg-green-500",
    text: "text-green-700",
    bg: "bg-green-50",
    darkText: "dark:text-green-400",
    darkBg: "dark:bg-green-950/40",
  },
  low_stock: {
    label: "Low Stock",
    dot: "bg-yellow-400",
    text: "text-yellow-700",
    bg: "bg-yellow-50",
    darkText: "dark:text-yellow-400",
    darkBg: "dark:bg-yellow-950/40",
  },
  out_of_stock: {
    label: "Out of Stock",
    dot: "bg-red-500",
    text: "text-red-700",
    bg: "bg-red-50",
    darkText: "dark:text-red-400",
    darkBg: "dark:bg-red-950/40",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, dot, text, bg, darkText, darkBg } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${text} ${bg} ${darkText} ${darkBg}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
