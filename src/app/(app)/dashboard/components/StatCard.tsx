import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
  iconBg?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconBg = "bg-neutral-100 dark:bg-[#252525]",
}: StatCardProps) {
  return (
    <div className="flex items-start justify-between rounded-xl border border-neutral-200 bg-white p-5 dark:border-[#2E2E2E] dark:bg-[#1C1C1C]">
      <div>
        <p className="text-sm text-neutral-500 dark:text-[#A0A0A0]">{title}</p>

        <h2 className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-white">
          {value}
        </h2>

        <p className="mt-1 text-xs text-neutral-500 dark:text-[#A0A0A0]">
          {subtitle}
        </p>
      </div>

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}
      >
        <div className="text-neutral-700 dark:text-white">{icon}</div>
      </div>
    </div>
  );
}
