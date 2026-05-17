"use client";

import { useState, useEffect } from "react";
import { CreditCard, X, CheckCircle } from "lucide-react";
import SettingsSection from "./SettingsSection";

interface Profile {
  paystack_connected: boolean;
  paystack_account: string | null;
  paystack_subaccount_code: string | null;
  flutterwave_connected: boolean;
  flutterwave_account: string | null;
}

interface Bank {
  name: string;
  code: string;
}

export default function PaymentSection() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPaystackForm, setShowPaystackForm] = useState(false);

  // Form state
  const [banks, setBanks] = useState<Bank[]>([]);
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (showPaystackForm && banks.length === 0) {
      fetch("/api/paystack/banks")
        .then((r) => r.json())
        .then((data) => setBanks(Array.isArray(data) ? data : []));
    }
  }, [showPaystackForm, banks.length]);

  // Auto-verify when account number is 10 digits and bank is selected
  useEffect(() => {
    if (accountNumber.length === 10 && bankCode) {
      verifyAccount();
    } else {
      setAccountName(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountNumber, bankCode]);

  const verifyAccount = async () => {
    setVerifying(true);
    setAccountName(null);
    setError(null);

    // Use our backend instead to keep keys server-side
    const verifyRes = await fetch(
      `/api/paystack/verify-account?account_number=${accountNumber}&bank_code=${bankCode}`,
    );
    const data = await verifyRes.json();

    if (!verifyRes.ok) {
      setError(data.error ?? "Could not verify account");
    } else {
      setAccountName(data.account_name);
    }
    setVerifying(false);
  };

  const handleConnect = async () => {
    if (!accountName || !bankCode || !accountNumber) return;
    setConnecting(true);
    setError(null);

    const res = await fetch("/api/paystack/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bank_code: bankCode,
        account_number: accountNumber,
        business_name: accountName,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Failed to connect");
      setConnecting(false);
      return;
    }

    setProfile((prev) =>
      prev ?
        {
          ...prev,
          paystack_connected: true,
          paystack_account: accountName,
          paystack_subaccount_code: data.subaccount_code,
        }
      : prev,
    );
    setShowPaystackForm(false);
    setConnecting(false);
  };

  const handleDisconnect = async () => {
    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paystack_connected: false,
        paystack_account: null,
        paystack_account_number: null,
        paystack_bank_code: null,
        paystack_subaccount_code: null,
      }),
    });
    setProfile((prev) =>
      prev ?
        {
          ...prev,
          paystack_connected: false,
          paystack_account: null,
          paystack_subaccount_code: null,
        }
      : prev,
    );
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
      description="Connect your payment gateways so buyers can pay you directly"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Paystack */}
        <div
          className={`relative rounded-xl border p-4 space-y-3 ${
            profile?.paystack_connected ?
              "border-green-200 dark:border-green-900/60 bg-green-50 dark:bg-green-950/20"
            : "border-[#ECEDEE] dark:border-[#2E2E2E] bg-white dark:bg-[#252525]"
          }`}
        >
          {profile?.paystack_connected && (
            <button
              onClick={handleDisconnect}
              className="absolute top-3 right-3 text-[#707375] dark:text-[#A0A0A0] hover:text-red-500 transition-colors"
              aria-label="Disconnect"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xl">💳</span>
            <span className="text-sm font-semibold text-[#1E1F20] dark:text-white">
              Paystack
            </span>
          </div>

          {profile?.paystack_connected ?
            <>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                  {profile.paystack_account}
                </p>
              </div>
              <span className="inline-block text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-2 py-0.5 rounded-full">
                Connected
              </span>
            </>
          : <>
              <p className="text-xs text-[#707375] dark:text-[#A0A0A0]">
                Not connected
              </p>
              <button
                onClick={() => setShowPaystackForm(true)}
                className="w-full text-sm font-medium bg-[#1E1F20] dark:bg-white text-white dark:text-[#121212] py-2 rounded-lg hover:bg-black dark:hover:bg-gray-200 transition-colors"
              >
                Connect Paystack
              </button>
            </>
          }
        </div>

        {/* Flutterwave — placeholder for now */}
        <div className="relative rounded-xl border border-[#ECEDEE] dark:border-[#2E2E2E] p-4 space-y-3 bg-white dark:bg-[#252525]">
          <div className="flex items-center gap-2">
            <span className="text-xl">🦋</span>
            <span className="text-sm font-semibold text-[#1E1F20] dark:text-white">
              Flutterwave
            </span>
          </div>
          <p className="text-xs text-[#707375] dark:text-[#A0A0A0]">
            Coming soon
          </p>
          <button
            disabled
            className="w-full text-sm font-medium bg-gray-100 dark:bg-[#2E2E2E] text-gray-400 py-2 rounded-lg cursor-not-allowed"
          >
            Connect Flutterwave
          </button>
        </div>
      </div>

      {/* Paystack Connect Modal */}
      {showPaystackForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowPaystackForm(false)}
          />
          <div className="relative w-full max-w-sm mx-4 rounded-2xl border border-neutral-200 dark:border-[#2E2E2E] bg-white dark:bg-[#1C1C1C] shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#1E1F20] dark:text-white">
                Connect Paystack
              </h2>
              <button
                onClick={() => setShowPaystackForm(false)}
                className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#707375] dark:text-[#A0A0A0]">
              Enter your Nigerian bank account details. Payments from buyers
              will go directly to this account.
            </p>

            <div className="space-y-3">
              {/* Bank selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#707375] dark:text-[#A0A0A0]">
                  Bank
                </label>
                <select
                  value={bankCode}
                  onChange={(e) => setBankCode(e.target.value)}
                  className="w-full text-sm rounded-lg border border-[#ECEDEE] dark:border-[#2E2E2E] bg-white dark:bg-[#252525] text-[#1E1F20] dark:text-white px-3 py-2 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                >
                  <option value="">Select your bank</option>
                  {banks.map((bank) => (
                    <option key={bank.code} value={bank.code}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Account number */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#707375] dark:text-[#A0A0A0]">
                  Account Number
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={accountNumber}
                  onChange={(e) =>
                    setAccountNumber(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="0123456789"
                  className="w-full text-sm rounded-lg border border-[#ECEDEE] dark:border-[#2E2E2E] bg-white dark:bg-[#252525] text-[#1E1F20] dark:text-white px-3 py-2 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                />
              </div>

              {/* Account name verification */}
              {verifying && (
                <p className="text-xs text-[#707375] dark:text-[#A0A0A0] flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin inline-block" />
                  Verifying account…
                </p>
              )}
              {accountName && !verifying && (
                <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 rounded-lg px-3 py-2">
                  <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400 shrink-0" />
                  <p className="text-xs font-medium text-green-700 dark:text-green-400">
                    {accountName}
                  </p>
                </div>
              )}
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={handleConnect}
                disabled={!accountName || connecting}
                className="flex-1 bg-[#1E1F20] dark:bg-white text-white dark:text-[#121212] text-sm font-medium py-2 rounded-lg hover:bg-black dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {connecting ? "Connecting…" : "Connect Account"}
              </button>
              <button
                onClick={() => setShowPaystackForm(false)}
                className="flex-1 text-sm text-[#707375] dark:text-[#A0A0A0] border border-[#ECEDEE] dark:border-[#2E2E2E] py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-[#2A2A2A] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </SettingsSection>
  );
}
