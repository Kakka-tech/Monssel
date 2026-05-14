"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SettingsSection from "./SettingsSection";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

export default function DisplaySection() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const isDark = mounted && theme === "dark";

  return (
    <SettingsSection
      icon={<Sun className="w-4 h-4" />}
      title="Display Preferences"
      description="Customize your app appearance"
    >
      <div className="space-y-2">
        <label className="text-xs font-medium text-[#1E1F20] dark:text-white">Theme</label>
        <p className="text-xs text-[#707375] dark:text-[#A0A0A0]">
          Light mode is selected by default
        </p>

        <div className="flex items-center gap-4 mt-3">
          <span className={`text-xs font-medium transition-colors ${!isDark ? "text-[#1E1F20]" : "text-[#A0A0A0]"}`}>
            ☀ Light
          </span>

          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
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
                {isDark ? (
                  <motion.span
                    key="moon"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-3 h-3 text-[#121212]" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="sun"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-3 h-3 text-white" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </button>

          <span className={`text-xs font-medium transition-colors ${isDark ? "text-white" : "text-[#A0A0A0]"}`}>
            🌙 Dark
          </span>
        </div>
      </div>
    </SettingsSection>
  );
}