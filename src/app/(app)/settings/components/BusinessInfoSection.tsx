"use client";

import { useState } from "react";
import { BusinessInfo } from "../types";
import SettingsSection from "./SettingsSection";
import SettingsInput from "./SettingsInput";
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

  const set = (key: keyof BusinessInfo) => (value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
  };

  return (
    <SettingsSection
      index="A"
      title="Business Information"
      description="Provide core business details below"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SettingsInput label="Business Name" placeholder="Nigerian Business" value={form.businessName} onChange={set("businessName")} />
        <SettingsInput label="Business Email" placeholder="stephen@gmail.com" value={form.businessEmail} onChange={set("businessEmail")} type="email" />
        <SettingsInput label="Phone Number" placeholder="+234 900 000 0000" value={form.phoneNumber} onChange={set("phoneNumber")} type="tel" />
        <SettingsInput label="Tax ID / Registration Number" placeholder="Enter tax id" value={form.taxId} onChange={set("taxId")} />
      </div>
      <SettingsInput label="Business Address" placeholder="Enter your business address" value={form.businessAddress} onChange={set("businessAddress")} />
      <SaveBar onSave={handleSave} onCancel={() => setForm(DEFAULTS)} saving={saving} />
    </SettingsSection>
  );
}