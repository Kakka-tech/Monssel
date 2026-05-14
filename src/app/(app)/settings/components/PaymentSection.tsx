"use client";

import { useState, useEffect } from "react";
import { CreditCard, X } from "lucide-react";
import { PaymentProvider } from "../types";
import SettingsSection from "./SettingsSection";

interface ProfileResponse {
  paystack_connected: boolean;
  paystack_account: string | null;
  flutterwave_connected: boolean;
  flutterwave_account: string | null;
}

export default function PaymentSection() {
  const [providers, setProviders] = useState<PaymentProvider[]>([
    { id: "paystack", name: "Paystack", icon: "💳", connected: false },
    { id: "flutterwave", name: "Flutterwave", icon: "🦋", connected: false },
  ]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data: ProfileResponse) => {
        setProviders([
          {
            id: "paystack",
            name: "Paystack",
            icon: "💳",
            connected: data.paystack_connected ?? false,
            accountName: data.paystack_account ?? undefined,
          },
          {
            id: "flutterwave",
            name: "Flutterwave",
            icon: "🦋",
            connected: data.flutterwave_connected ?? false,
            accountName: data.flutterwave_account ?? undefined,
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const update = async (id: string, connected: boolean) => {
    setSaving(id);
    const body =
      id === "paystack" ?
        {
          paystack_connected: connected,
          paystack_account: connected ? "placeholder" : null,
        }
      : {
          flutterwave_connected: connected,
          flutterwave_account: connected ? "placeholder" : null,
        };

    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setProviders((p) =>
      p.map((prov) =>
        prov.id === id ?
          {
            ...prov,
            connected,
            accountName: connected ? "placeholder" : undefined,
          }
        : prov,
      ),
    );
    setSaving(null);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-pulse">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-[#ECEDEE] dark:border-[#2E2E2E] p-4 h-32 bg-gray-100 dark:bg-[#252525]"
          />
        ))}
      </div>
    );
  }

  return (
    <SettingsSection
      icon={<CreditCard className="w-4 h-4" />}
      title="Payment Providers"
      description="Connect your payment gateways"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {providers.map((provider) => (
          <div
            key={provider.id}
            className={`relative rounded-xl border p-4 space-y-3 ${
              provider.connected ?
                "border-green-200 dark:border-green-900/60 bg-green-50 dark:bg-green-950/20"
              : "border-[#ECEDEE] dark:border-[#2E2E2E] bg-white dark:bg-[#252525]"
            }`}
          >
            {provider.connected && (
              <button
                onClick={() => update(provider.id, false)}
                disabled={saving === provider.id}
                className="absolute top-3 right-3 text-[#707375] dark:text-[#A0A0A0] hover:text-red-500 transition-colors disabled:opacity-40"
                aria-label="Disconnect"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <div className="flex items-center gap-2">
              <span className="text-xl">{provider.icon}</span>
              <span className="text-sm font-semibold text-[#1E1F20] dark:text-white">
                {provider.name}
              </span>
            </div>

            {provider.connected ?
              <>
                <p className="text-xs text-[#707375] dark:text-[#A0A0A0]">
                  {provider.accountName ?? "Connected"}
                </p>
                <span className="inline-block text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-2 py-0.5 rounded-full">
                  Connected
                </span>
              </>
            : <>
                <p className="text-xs text-[#707375] dark:text-[#A0A0A0]">
                  Not connected
                </p>
                <button
                  onClick={() => update(provider.id, true)}
                  disabled={saving === provider.id}
                  className="w-full text-sm font-medium bg-[#1E1F20] dark:bg-white text-white dark:text-[#121212] py-2 rounded-lg hover:bg-black dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  {saving === provider.id ?
                    "Connecting…"
                  : `Connect ${provider.name}`}
                </button>
              </>
            }
          </div>
        ))}
      </div>
    </SettingsSection>
  );
}
