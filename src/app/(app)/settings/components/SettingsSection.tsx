interface SettingsSectionProps {
  index: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function SettingsSection({
  index,
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <div className="bg-white border border-[#ECEDEE] rounded-xl p-6 space-y-5">
      {/* Section header */}
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-xs font-semibold text-white">{index}</span>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#1E1F20]">{title}</h2>
          <p className="text-xs text-[#707375] mt-0.5">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}