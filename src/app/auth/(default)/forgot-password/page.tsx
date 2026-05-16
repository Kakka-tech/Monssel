"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="p-5 sm:p-6">
        <div className="w-9 h-9 flex items-center justify-center">
          <Image
            src="/icons/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm"
        >
          {sent ?
            <div className="text-center space-y-4">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl">📬</span>
              </div>
              <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
                Check your email
              </h1>
              <p className="text-sm text-neutral-500 leading-relaxed">
                We sent a password reset link to{" "}
                <span className="font-medium text-neutral-800">{email}</span>.
                Check your inbox and follow the link to reset your password.
              </p>
              <Link
                href="/auth/login"
                className="inline-block text-sm font-medium text-neutral-900 hover:underline mt-2"
              >
                Back to login
              </Link>
            </div>
          : <>
              <div className="mb-8 space-y-1.5">
                <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
                  Forgot password?
                </h1>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Enter your email and we&apos;ll send you a reset link.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-neutral-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder="you@example.com"
                    className="w-full border border-[#ECEDEE] rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black placeholder:text-neutral-400 text-neutral-900"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg px-3 py-2.5">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!email || loading}
                  className="w-full bg-neutral-900 text-white py-2.5 rounded-lg hover:bg-black transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ?
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin inline-block" />
                      Sending…
                    </span>
                  : "Send Reset Link"}
                </button>

                <p className="text-center text-sm text-neutral-500">
                  Remember your password?{" "}
                  <Link
                    href="/auth/login"
                    className="font-medium text-neutral-900 hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          }
        </motion.div>
      </main>
    </div>
  );
}
