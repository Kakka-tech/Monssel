"use client";

import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { BusinessInfo } from "../types";
import SettingsSection from "./SettingsSection";
import SettingsInput from "./SettingsInput";
import PhoneInput from "./PhoneInput";
import SaveBar from "./SaveBar";

const DEFAULTS: BusinessInfo = {
  businessName: "",
  businessEmail: "",
  phoneNumber: "",
  taxId: "",
  businessAddress: "",
};

export default function BusinessInfoSection() {
  const [form, setForm] = useState<BusinessInfo>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => (res.ok ? res.json() : null))
      .then((profile) => {
        if (!profile) return;
        setForm({
          businessName: profile.business_name ?? "",
          businessEmail: profile.business_email ?? "",
          phoneNumber: profile.phone_number ?? "",
          taxId: profile.tax_id ?? "",
          businessAddress: profile.business_address ?? "",
        });
      })
      .catch(() => {});
  }, []);

  const set = (key: keyof BusinessInfo) => (value: string) => {
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
        business_name: form.businessName,
        business_email: form.businessEmail,
        phone_number: form.phoneNumber,
        tax_id: form.taxId,
        business_address: form.businessAddress,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to save business info");
      setSaving(false);
      return;
    }

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
      icon={<User className="w-4 h-4" />}
      title="Business Information"
      description="Provide core business details below"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SettingsInput
          label="Business Name"
          placeholder="Nigerian Business"
          value={form.businessName}
          onChange={set("businessName")}
        />
        <SettingsInput
          label="Business Email"
          placeholder="stephen@gmail.com"
          value={form.businessEmail}
          onChange={set("businessEmail")}
          type="email"
        />
        <PhoneInput value={form.phoneNumber} onChange={set("phoneNumber")} />
        <SettingsInput
          label="Tax ID / Registration Number"
          placeholder="Enter tax id"
          value={form.taxId}
          onChange={set("taxId")}
        />
      </div>

      <SettingsInput
        label="Business Address"
        placeholder="Enter your business address"
        value={form.businessAddress}
        onChange={set("businessAddress")}
      />

      {error && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs rounded-lg px-3 py-2.5">
          {error}
        </div>
      )}

      {saved && (
        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-600 dark:text-green-400 text-xs rounded-lg px-3 py-2.5">
          ✓ Business information saved successfully
        </div>
      )}

      <SaveBar onSave={handleSave} onCancel={handleCancel} saving={saving} />
    </SettingsSection>
  );
}
