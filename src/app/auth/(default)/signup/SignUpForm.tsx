"use client";

import Link from "next/link";
import { X, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center bg-[#f5f6f7] px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-[0_4px_16px_0_rgba(0,0,0,0.25)]">
        <button
          className="absolute right-5 top-5 text-[#707375] hover:text-gray-600"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h1 className="text-2xl font-semibold text-[#1E1F20]">Get Started</h1>
        <p className="mt-1 text-sm text-[#707375]">
          Create your free Monssel account
        </p>

        <form className="mt-6 space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#1E1F20]">
              Business Name *
            </label>
            <input
              type="text"
              placeholder="eg. Fashion Flex"
              className="w-full rounded-lg border border-[#ECEDEE] px-4 py-3 text-sm outline-none transition focus:border-gray-400 placeholder:text-[#707375] text-[#1E1F20]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#1E1F20]">
              Email *
            </label>
            <input
              type="email"
              placeholder="me@gmail.com"
              className="w-full rounded-lg border border-[#ECEDEE] px-4 py-3 text-sm outline-none transition focus:border-gray-400 placeholder:text-[#707375] text-[#1E1F20]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#1E1F20]">
              Password *
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-lg border border-[#ECEDEE] px-4 py-3 pr-10 text-sm outline-none transition focus:border-gray-400 placeholder:text-[#707375] text-[#1E1F20]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707375] hover:text-[#1E1F20]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ?
                  <EyeOff size={18} />
                : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-[#1c1d1f] py-3 text-sm font-medium text-white transition hover:bg-black"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#707375]">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-[#1E1F20] hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}
