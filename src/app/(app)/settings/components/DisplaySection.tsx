"use client";

import { useState } from "react";
import { Sun } from "lucide-react";
import { Theme, DashboardLayout } from "../types";
import SettingsSection from "./SettingsSection";
import SaveBar from "./SaveBar";

const LAYOUTS: DashboardLayout[] = ["Compact", "Comfortable", "Spacious"];

export default function DisplaySection() {
  const [theme, setTheme] = useState<Theme>("light");
  const [layout, setLayout] = useState<DashboardLayout>("Compact");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
  };

  return (
    <SettingsSection
      icon={<Sun className="w-4 h-4" />}
      title="Display Preferences"
      description="Customize your app appearance"
    >
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-[#1E1F20]">Theme</label>
        <p className="text-xs text-[#707375]">
          Light mode is selected by default
        </p>
        <div className="flex gap-2 mt-2">
          {(["light", "dark"] as Theme[]).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-4 py-1.5 text-sm rounded-lg border transition-all capitalize ${
                theme === t ?
                  "bg-gray-900 text-white border-gray-900"
                : "border-[#ECEDEE] text-[#707375] hover:border-gray-400"
              }`}
            >
              {t === "light" ? "☀ Light" : "🌙 Dark"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-[#1E1F20]">
          Dashboard Layout
        </label>
        <div className="grid grid-cols-3 gap-2">
          {LAYOUTS.map((l) => (
            <button
              key={l}
              onClick={() => setLayout(l)}
              className={`py-3 text-sm rounded-lg border text-center transition-all ${
                layout === l ?
                  "border-[#155DFC] border-2 bg-[#EFF6FF] text-[#155DFC] font-medium"
                : "border-[#ECEDEE] text-[#707375] hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              <span className="block text-xs font-semibold">{l}</span>
              <span className="block text-[10px] text-[#707375] mt-0.5">
                {l === "Compact" ?
                  "Default"
                : l === "Comfortable" ?
                  "More space"
                : "Full width"}
              </span>
            </button>
          ))}
        </div>
      </div>

      <SaveBar
        onSave={handleSave}
        onCancel={() => {
          setTheme("light");
          setLayout("Compact");
        }}
        saving={saving}
      />
    </SettingsSection>
  );
}
