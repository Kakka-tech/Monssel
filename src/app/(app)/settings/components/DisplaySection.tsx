"use client";

import { useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

  const isDark = mounted && theme === "dark";

  const handleThemeChange = (t: "light" | "dark") => {
    setTheme(t);
  };

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
      <div className="space-y-2">
        <label className="text-xs font-medium text-[#1E1F20] dark:text-white">
          Theme
        </label>
        <p className="text-xs text-[#707375] dark:text-[#A0A0A0]">
          Light mode is selected by default
        </p>

        {/* Toggle switch */}
        <div className="flex items-center gap-4 mt-3">
          <span
            className={`text-xs font-medium transition-colors ${!isDark ? "text-[#1E1F20]" : "text-[#A0A0A0]"}`}
          >
            ☀ Light
          </span>

          <button
            onClick={() => handleThemeChange(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isDark ? "bg-[#2E2E2E]" : "bg-[#ECEDEE]"
            }`}
          >
            <motion.div
              className={`absolute top-1 left-1 w-5 h-5 rounded-full flex items-center justify-center shadow-md ${
                isDark ? "bg-white" : "bg-[#1E1F20]"
              }`}
              animate={{ x: isDark ? 28 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <AnimatePresence mode="wait">
                {isDark ?
                  <motion.span
                    key="moon"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-3 h-3 text-[#121212]" />
                  </motion.span>
                : <motion.span
                    key="sun"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-3 h-3 text-white" />
                  </motion.span>
                }
              </AnimatePresence>
            </motion.div>
          </button>

          <span
            className={`text-xs font-medium transition-colors ${isDark ? "text-white" : "text-[#A0A0A0]"}`}
          >
            🌙 Dark
          </span>
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
