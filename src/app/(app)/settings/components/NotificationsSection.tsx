"use client";

import { useState } from "react";
import { NotificationSettings } from "../types";
import { Bell } from "lucide-react";
import { useFetch } from "@/lib/usefetch";
import SettingsSection from "./SettingsSection";
import Toggle from "./Toggle";

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

const DEFAULTS: NotificationSettings = {
  emailNotifications: true,
  lowStockAlerts: true,
  expenseNotifications: false,
  weeklyReports: true,
  marketingEmails: true,
};

interface ProfileResponse {
  notif_email: boolean;
  notif_low_stock: boolean;
  notif_expenses: boolean;
  notif_weekly_reports: boolean;
  notif_marketing: boolean;
}

function mapProfileToForm(profile: ProfileResponse): NotificationSettings {
  return {
    emailNotifications: profile.notif_email ?? DEFAULTS.emailNotifications,
    lowStockAlerts: profile.notif_low_stock ?? DEFAULTS.lowStockAlerts,
    expenseNotifications:
      profile.notif_expenses ?? DEFAULTS.expenseNotifications,
    weeklyReports: profile.notif_weekly_reports ?? DEFAULTS.weeklyReports,
    marketingEmails: profile.notif_marketing ?? DEFAULTS.marketingEmails,
  };
}

export default function NotificationsSection() {
  const { data: profile, loading } = useFetch<ProfileResponse>("/api/profile");

  const [overrides, setOverrides] = useState<Partial<NotificationSettings>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const base = profile ? mapProfileToForm(profile) : DEFAULTS;
  const form: NotificationSettings = { ...base, ...overrides };

  const toggle = (key: keyof NotificationSettings) => {
    setSaved(false);
    setOverrides((p) => ({ ...p, [key]: !form[key] }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        notif_email: form.emailNotifications,
        notif_low_stock: form.lowStockAlerts,
        notif_expenses: form.expenseNotifications,
        notif_weekly_reports: form.weeklyReports,
        notif_marketing: form.marketingEmails,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to save preferences");
      setSaving(false);
      return;
    }

    setOverrides({});
    setSaved(true);
    setSaving(false);
  };

  const handleReset = () => {
    setOverrides(DEFAULTS);
    setSaved(false);
    setError(null);
  };

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex justify-between items-center py-3">
            <div className="space-y-1">
              <div className="h-3 w-32 bg-gray-200 dark:bg-[#2E2E2E] rounded" />
              <div className="h-2 w-48 bg-gray-200 dark:bg-[#2E2E2E] rounded" />
            </div>
            <div className="h-6 w-10 bg-gray-200 dark:bg-[#2E2E2E] rounded-full" />
          </div>
        ))}
      </div>
    );
  }

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

      {error && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs rounded-lg px-3 py-2.5">
          {error}
        </div>
      )}

      {saved && (
        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-600 dark:text-green-400 text-xs rounded-lg px-3 py-2.5">
          ✓ Notification preferences saved
        </div>
      )}

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
          onClick={handleReset}
          className="text-sm text-[#707375] dark:text-[#A0A0A0] hover:text-[#1E1F20] dark:hover:text-white transition-colors px-2 py-2"
        >
          Reset to Default
        </button>
      </div>
    </SettingsSection>
  );
}
