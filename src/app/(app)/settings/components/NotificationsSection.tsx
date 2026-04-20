"use client";

import { useState } from "react";
import { NotificationSettings } from "../types";
import { Bell } from "lucide-react";
import SettingsSection from "./SettingsSection";
import Toggle from "./Toggle";

const DEFAULTS: NotificationSettings = {
  emailNotifications: true,
  lowStockAlerts: true,
  expenseNotifications: false,
  weeklyReports: true,
  marketingEmails: true,
};

const NOTIFICATION_ITEMS: {
  key: keyof NotificationSettings;
  label: string;
  description: string;
}[] = [
  {
    key: "emailNotifications",
    label: "Email Notifications",
    description: "Receive updates via email",
  },
  {
    key: "lowStockAlerts",
    label: "Low Stock Alerts",
    description: "Get notified when inventory is low",
  },
  {
    key: "expenseNotifications",
    label: "Expense Notifications",
    description: "Track expense submissions",
  },
  {
    key: "weeklyReports",
    label: "Weekly Reports",
    description: "Receive weekly business summary",
  },
  {
    key: "marketingEmails",
    label: "Marketing Emails",
    description: "Promotions and product updates",
  },
];

export default function NotificationsSection() {
  const [form, setForm] = useState<NotificationSettings>(DEFAULTS);
  const [saving, setSaving] = useState(false);

  const toggle = (key: keyof NotificationSettings) =>
    setForm((p) => ({ ...p, [key]: !p[key] }));

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
  };

  return (
    <SettingsSection
      icon={<Bell className="w-4 h-4" />}
      title="Notifications"
      description="Manage your notification preferences"
    >
      <div className="space-y-1">
        {NOTIFICATION_ITEMS.map(({ key, label, description }) => (
          <div
            key={key}
            className="flex items-center justify-between py-3 border-b border-[#ECEDEE] dark:border-[#2E2E2E] last:border-0"
          >
            <div>
              <p className="text-sm font-medium text-[#1E1F20] dark:text-white">
                {label}
              </p>
              <p className="text-xs text-[#707375] dark:text-[#A0A0A0]">
                {description}
              </p>
            </div>
            <Toggle
              enabled={form[key]}
              onChange={() => toggle(key)}
              label={label}
            />
          </div>
        ))}
      </div>

      <div className="border border-amber-200 dark:border-amber-900/50 rounded-lg p-3 bg-amber-50 dark:bg-amber-950/30">
        <p className="text-xs text-amber-700 dark:text-amber-400">
          💡 Quick Tip: Turn off all notifications for busy nights, or customize
          when alerts matter most to you.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#1E1F20] dark:bg-white text-white dark:text-[#121212] text-sm font-medium px-5 py-2 rounded-lg hover:bg-black dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save Preferences"}
        </button>
        <button
          onClick={() => setForm(DEFAULTS)}
          className="text-sm text-[#707375] dark:text-[#A0A0A0] hover:text-[#1E1F20] dark:hover:text-white transition-colors px-2 py-2"
        >
          Reset to Default
        </button>
      </div>
    </SettingsSection>
  );
}
