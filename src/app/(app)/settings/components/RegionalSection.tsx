"use client";

import { useState, useEffect } from "react";
import { RegionalSettings } from "../types";
import { Globe } from "lucide-react";
import { useCurrency } from "@/lib/currency-context";
import SettingsSection from "./SettingsSection";
import SettingsSelect from "./SettingsSelect";
import SaveBar from "./SaveBar";

const DEFAULTS: RegionalSettings = {
  defaultCurrency: "NGN",
  timezone: "Africa/Lagos",
  dateFormat: "DD/MM/YYYY",
  numberFormat: "1,000.00",
};

const CURRENCIES = [
  { label: "NGN - Nigerian Naira", value: "NGN" },
  { label: "USD - US Dollar", value: "USD" },
  { label: "GBP - British Pound", value: "GBP" },
  { label: "EUR - Euro", value: "EUR" },
];

const TIMEZONES = [
  { label: "Africa/Lagos (WAT)", value: "Africa/Lagos" },
  { label: "UTC", value: "UTC" },
  { label: "America/New_York", value: "America/New_York" },
  { label: "Europe/London", value: "Europe/London" },
];

const DATE_FORMATS = [
  { label: "DD/MM/YYYY", value: "DD/MM/YYYY" },
  { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
  { label: "YYYY-MM-DD", value: "YYYY-MM-DD" },
];

const NUMBER_FORMATS = [
  { label: "1,000.00", value: "1,000.00" },
  { label: "1.000,00", value: "1.000,00" },
];

export default function RegionalSection() {
  const { setCurrency } = useCurrency();
  const [form, setForm] = useState<RegionalSettings>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => (res.ok ? res.json() : null))
      .then((profile) => {
        if (!profile) return;
        setForm({
          defaultCurrency: profile.currency ?? DEFAULTS.defaultCurrency,
          timezone: profile.timezone ?? DEFAULTS.timezone,
          dateFormat: profile.date_format ?? DEFAULTS.dateFormat,
          numberFormat: profile.number_format ?? DEFAULTS.numberFormat,
        });
      })
      .catch(() => {});
  }, []);

  const set = (key: keyof RegionalSettings) => (value: string) => {
    setError(null);
    setSaved(false);
    setForm((p) => ({ ...p, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currency: form.defaultCurrency,
        timezone: form.timezone,
        date_format: form.dateFormat,
        number_format: form.numberFormat,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to save settings");
      setSaving(false);
      return;
    }

    setCurrency(form.defaultCurrency);
    setSaved(true);
    setSaving(false);
  };

  const handleCancel = () => {
    setForm(DEFAULTS);
    setError(null);
    setSaved(false);
  };

  return (
    <SettingsSection
      icon={<Globe className="w-4 h-4" />}
      title="Currency & Regional"
      description="Set how the app displays your regional preference"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SettingsSelect
          label="Default Currency"
          value={form.defaultCurrency}
          onChange={set("defaultCurrency")}
          options={CURRENCIES}
          required
        />
        <SettingsSelect
          label="Timezone"
          value={form.timezone}
          onChange={set("timezone")}
          options={TIMEZONES}
          required
        />
        <SettingsSelect
          label="Date Format"
          value={form.dateFormat}
          onChange={set("dateFormat")}
          options={DATE_FORMATS}
          required
        />
        <SettingsSelect
          label="Number Format"
          value={form.numberFormat}
          onChange={set("numberFormat")}
          options={NUMBER_FORMATS}
          required
        />
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs rounded-lg px-3 py-2.5">
          {error}
        </div>
      )}

      {saved && (
        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-600 dark:text-green-400 text-xs rounded-lg px-3 py-2.5">
          ✓ Regional settings saved successfully
        </div>
      )}

      <div className="border border-blue-100 dark:border-blue-900/50 rounded-lg p-3 bg-blue-50 dark:bg-blue-950/30">
        <p className="text-xs text-blue-600 dark:text-blue-400">
          💡 These settings will apply to all transactions, reports, and
          invoices across your account.
        </p>
      </div>

      <SaveBar onSave={handleSave} onCancel={handleCancel} saving={saving} />
    </SettingsSection>
  );
}
