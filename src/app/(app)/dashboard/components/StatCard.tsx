import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
  iconBg: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconBg,
}: StatCardProps) {
  return (
    <div className="bg-white border-2 border-[#ECEDEE] rounded-xl p-6 flex justify-between items-start">
      <div>
        <p className="text-semibold text-[#707375]">{title}</p>
        <h2 className="text-2xl font-semibold text-[#1E1F20] mt-1">
          {value}
        </h2>
        <p className="text-xs text-[#707375] mt-1">{subtitle}</p>
      </div>

      <div className={`h-9 w-9 rounded-lg ${iconBg} flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  );
}