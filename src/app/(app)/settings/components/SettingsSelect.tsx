import { ChevronDown } from "lucide-react";
import { useId } from "react";

interface SettingsSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  required?: boolean;
}

export default function SettingsSelect({
  label,
  value,
  onChange,
  options,
  required,
}: SettingsSelectProps) {
  const id = useId();

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="text-xs font-medium text-[#1E1F20] dark:text-white"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          title={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none px-3 py-2 pr-8 text-sm border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10 focus:border-[#0A0A0A]/50 dark:focus:border-white/20 transition text-[#1E1F20] dark:text-white bg-white dark:bg-[#252525] cursor-pointer"
        >
          {options.map((o) => (
            <option
              key={o.value}
              value={o.value}
              className="bg-white dark:bg-[#252525]"
            >
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#707375] dark:text-[#A0A0A0] pointer-events-none" />
      </div>
    </div>
  );
}
