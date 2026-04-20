"use client";

import { useState } from "react";
import { RegionalSettings } from "../types";
import { Globe } from "lucide-react";
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
  const [form, setForm] = useState<RegionalSettings>(DEFAULTS);
  const [saving, setSaving] = useState(false);

  const set = (key: keyof RegionalSettings) => (value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
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

      {/* Tip */}
      <div className="border border-blue-100 rounded-lg p-3 bg-blue-50">
        <p className="text-xs text-blue-600">
          💡 These settings will apply to all transactions, reports, and
          invoices across your account.
        </p>
      </div>

      <SaveBar
        onSave={handleSave}
        onCancel={() => setForm(DEFAULTS)}
        saving={saving}
      />
    </SettingsSection>
  );
}
