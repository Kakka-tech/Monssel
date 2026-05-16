"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Check if there's already an active session (user came from email link)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setReady(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [supabase]);
  const handleReset = async () => {
    if (!password || !confirm) return;
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
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
          {!ready ?
            <div className="text-center space-y-3">
              <div className="w-5 h-5 rounded-full border-2 border-neutral-200 border-t-neutral-900 animate-spin mx-auto" />
              <p className="text-sm text-neutral-500">Verifying your link…</p>
            </div>
          : <>
              <div className="mb-8 space-y-1.5">
                <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
                  Set new password
                </h1>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Choose a strong password for your account.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-neutral-700">
                    New password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full border border-[#ECEDEE] rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black placeholder:text-neutral-400 text-neutral-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-neutral-700">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleReset()}
                    placeholder="Repeat your password"
                    className="w-full border border-[#ECEDEE] rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black placeholder:text-neutral-400 text-neutral-900"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg px-3 py-2.5">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleReset}
                  disabled={!password || !confirm || loading}
                  className="w-full bg-neutral-900 text-white py-2.5 rounded-lg hover:bg-black transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ?
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin inline-block" />
                      Updating…
                    </span>
                  : "Reset Password"}
                </button>
              </div>
            </>
          }
        </motion.div>
      </main>
    </div>
  );
}
