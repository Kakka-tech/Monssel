"use client";

import { useState } from "react";
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

  const set = (key: keyof BusinessInfo) => (value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
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
        <PhoneInput
          value={form.phoneNumber}
          onChange={set("phoneNumber")}
        />
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
      <SaveBar
        onSave={handleSave}
        onCancel={() => setForm(DEFAULTS)}
        saving={saving}
      />
    </SettingsSection>
  );
}