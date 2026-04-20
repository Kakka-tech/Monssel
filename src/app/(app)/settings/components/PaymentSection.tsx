"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import { X } from "lucide-react";
import { PaymentProvider } from "../types";
import SettingsSection from "./SettingsSection";

const MOCK_PROVIDERS: PaymentProvider[] = [
  {
    id: "paystack",
    name: "Paystack",
    icon: "💳",
    connected: true,
    accountName: "stephen@gmail.com",
  },
  { id: "flutterwave", name: "Flutterwave", icon: "🦋", connected: false },
];

export default function PaymentSection() {
  const [providers, setProviders] = useState<PaymentProvider[]>(MOCK_PROVIDERS);

  const disconnect = (id: string) =>
    setProviders((p) =>
      p.map((prov) =>
        prov.id === id ?
          { ...prov, connected: false, accountName: undefined }
        : prov,
      ),
    );

  const connect = (id: string) =>
    setProviders((p) =>
      p.map((prov) =>
        prov.id === id ?
          { ...prov, connected: true, accountName: "stephen@gmail.com" }
        : prov,
      ),
    );

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
                "border-green-200 bg-green-50"
              : "border-[#ECEDEE] bg-white"
            }`}
          >
            {provider.connected && (
              <button
                onClick={() => disconnect(provider.id)}
                className="absolute top-3 right-3 text-[#707375] hover:text-red-500 transition-colors"
                aria-label="Disconnect"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <div className="flex items-center gap-2">
              <span className="text-xl">{provider.icon}</span>
              <span className="text-sm font-semibold text-[#1E1F20]">
                {provider.name}
              </span>
            </div>

            {provider.connected ?
              <>
                <p className="text-xs text-[#707375]">
                  {provider.accountName ?? "Connected"}
                </p>
                <span className="inline-block text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                  Connected
                </span>
              </>
            : <>
                <p className="text-xs text-[#707375]">Not connected</p>
                <button
                  onClick={() => connect(provider.id)}
                  className="w-full text-sm font-medium bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Connect {provider.name}
                </button>
              </>
            }
          </div>
        ))}
      </div>
    </SettingsSection>
  );
}
