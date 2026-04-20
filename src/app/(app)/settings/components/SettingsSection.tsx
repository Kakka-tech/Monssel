import { ReactNode } from "react";

interface SettingsSectionProps {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}

export default function SettingsSection({
  icon,
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <div className="bg-white dark:bg-[#1C1C1C] border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-xl p-6 space-y-5">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center shrink-0 mt-0.5 text-[#1E1F20] dark:text-white">
          {icon}
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#1E1F20] dark:text-white">
            {title}
          </h2>
          <p className="text-xs text-[#707375] dark:text-[#A0A0A0] mt-0.5">
            {description}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}
