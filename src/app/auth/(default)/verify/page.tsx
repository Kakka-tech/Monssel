"use client";

import Image from "next/image";
import {
  useRef,
  useState,
  useEffect,
  ClipboardEvent,
  KeyboardEvent,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

const CODE_LENGTH = 6;

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const supabase = createClient();

  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(60);
  const [resending, setResending] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  // Auto-submit when all 6 digits filled
  useEffect(() => {
    if (digits.every((d) => d !== "")) {
      handleVerify(digits.join(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits]);

  const focusNext = (index: number) => {
    inputRefs.current[index + 1]?.focus();
  };
  const focusPrev = (index: number) => {
    inputRefs.current[index - 1]?.focus();
  };

  const handleChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    setError(null);
    if (digit) focusNext(index);
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const next = [...digits];
        next[index] = "";
        setDigits(next);
      } else {
        focusPrev(index);
      }
    } else if (e.key === "ArrowLeft") {
      focusPrev(index);
    } else if (e.key === "ArrowRight") {
      focusNext(index);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH);
    if (!pasted) return;
    const next = Array(CODE_LENGTH).fill("");
    pasted.split("").forEach((char, i) => {
      next[i] = char;
    });
    setDigits(next);
    const focusIndex = Math.min(pasted.length, CODE_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = async (code: string) => {
    if (!email) {
      setError("Session expired. Please sign up again.");
      return;
    }
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "signup",
    });

    if (error) {
      setError("Invalid or expired code. Please try again.");
      setDigits(Array(CODE_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || resending || !email) return;
    setResending(true);
    setError(null);

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    setResending(false);

    if (error) {
      setError("Couldn't resend code. Please try again.");
    } else {
      setDigits(Array(CODE_LENGTH).fill(""));
      setResendCooldown(60);
      inputRefs.current[0]?.focus();
    }
  };

  const code = digits.join("");
  const isFilled = code.length === CODE_LENGTH;

  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="p-5 sm:p-6">
        <div className="w-9 h-9 flex items-center justify-center ">
          <Image
            src="/icons/logo-dark.png"
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
          <div className="mb-8 space-y-1.5">
            <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
              Check your email
            </h1>
            <p className="text-sm text-neutral-500 leading-relaxed">
              We sent a 6-digit code to{" "}
              <span className="font-medium text-neutral-800 break-all">
                {email || "your email"}
              </span>
              . Enter it below to verify your account.
            </p>
          </div>

          <div className="flex gap-2 sm:gap-3 justify-between mb-5">
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                autoFocus={i === 0}
                disabled={loading}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                className={[
                  "flex-1 min-w-0 aspect-square rounded-xl text-center text-xl font-semibold",
                  "text-neutral-900 bg-[#F2F2F2] transition-all duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white",
                  "disabled:opacity-50",
                  digit ? "bg-white ring-1 ring-neutral-300" : "",
                ].join(" ")}
              />
            ))}
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg px-3 py-2.5"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => handleVerify(code)}
            disabled={!isFilled || loading}
            className="w-full bg-neutral-900 text-white py-2.5 rounded-lg hover:bg-black transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {loading ?
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin inline-block" />
                Verifying…
              </span>
            : "Verify & Continue"}
          </button>

          <p className="text-center text-xs text-neutral-500">
            Didn&apos;t receive a code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={resendCooldown > 0 || resending}
              className="font-medium text-neutral-900 hover:underline disabled:opacity-40 disabled:cursor-not-allowed disabled:no-underline"
            >
              {resending ?
                "Sending…"
              : resendCooldown > 0 ?
                `Resend in ${resendCooldown}s`
              : "Resend code"}
            </button>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
