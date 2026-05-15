"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function WelcomeStepOne({ onNext }: { onNext: () => void }) {
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);

  const handleNext = async (skip = false) => {
    setSaving(true);

    if (!skip && value.trim()) {
      await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business_description: value.trim() }),
      }).catch(() => {});
    }

    setSaving(false);
    onNext();
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <div className="h-1 flex-1 bg-black rounded-full" />
        <div className="h-1 flex-1 bg-gray-200 rounded-full" />
        <div className="h-1 flex-1 bg-gray-200 rounded-full" />
      </div>

      <div>
        <h2 className="text-lg text-[#1E1F20] font-semibold">
          Welcome, Stephen! 👋
        </h2>
        <p className="text-sm text-[#707375]">
          Let&apos;s get you set up in 3 quick steps
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#1E1F20]">
          What do you sell? (Optional)
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleNext()}
          placeholder="e.g., Fashion items, Electronics, Food..."
          className="w-full border border-[#ECEDEE] rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black placeholder:text-[#0A0A0A80] text-[#1E1F20]"
        />
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => handleNext()}
          disabled={saving}
          className="flex-1 bg-[#1E1F20]! text-white! py-2 rounded-lg disabled:opacity-50"
        >
          {saving ? "Saving…" : "Continue"}
        </Button>

        <button
          onClick={() => handleNext(true)}
          disabled={saving}
          className="px-4 py-2 border-2 border-[#ECEDEE] rounded-lg text-[#707375] disabled:opacity-50"
        >
          Skip
        </button>
      </div>
    </div>
  );
}