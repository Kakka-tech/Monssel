"use client";

import { useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun } from "lucide-react";
import { DashboardLayout } from "../types";
import SettingsSection from "./SettingsSection";
import SaveBar from "./SaveBar";

const LAYOUTS: DashboardLayout[] = ["Compact", "Comfortable", "Spacious"];

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

export default function DisplaySection() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
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
        <label className="text-xs font-medium text-[#1E1F20] dark:text-white">
          Theme
        </label>
        <p className="text-xs text-[#707375] dark:text-[#A0A0A0]">
          Light mode is selected by default
        </p>
        <div className="flex gap-2 mt-2">
          {(["light", "dark"] as const).map((t) => {
            const isActive = mounted && theme === t;
            return (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-4 py-1.5 text-sm rounded-lg border transition-all ${
                  isActive ?
                    "bg-[#1E1F20] dark:bg-white text-white dark:text-[#121212] border-[#1E1F20] dark:border-white"
                  : "border-[#ECEDEE] dark:border-[#2E2E2E] text-[#707375] dark:text-[#A0A0A0] hover:border-gray-400 dark:hover:border-[#505050]"
                }`}
              >
                {t === "light" ? "☀ Light" : "🌙 Dark"}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-[#1E1F20] dark:text-white">
          Dashboard Layout
        </label>
        <div className="grid grid-cols-3 gap-2">
          {LAYOUTS.map((l) => (
            <button
              key={l}
              onClick={() => setLayout(l)}
              className={`py-3 text-sm rounded-lg border text-center transition-all ${
                layout === l ?
                  "border-[#155DFC] border-2 bg-[#EFF6FF] dark:bg-[#155DFC]/10 text-[#155DFC] font-medium"
                : "border-[#ECEDEE] dark:border-[#2E2E2E] text-[#707375] dark:text-[#A0A0A0] hover:border-gray-400 dark:hover:border-[#505050] hover:bg-gray-50 dark:hover:bg-[#252525]"
              }`}
            >
              <span className="block text-xs font-semibold">{l}</span>
              <span className="block text-[10px] text-[#707375] dark:text-[#A0A0A0] mt-0.5">
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
