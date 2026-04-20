interface SettingsInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}

export default function SettingsInput({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required,
}: SettingsInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-[#1E1F20] dark:text-white">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10 focus:border-[#0A0A0A]/50 dark:focus:border-white/20 transition text-[#1E1F20] dark:text-white placeholder:text-[#1E1F20]/40 dark:placeholder:text-[#A0A0A0] bg-white dark:bg-[#252525]"
      />
    </div>
  );
}
