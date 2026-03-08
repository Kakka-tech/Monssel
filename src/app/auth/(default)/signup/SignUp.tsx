"use client";

import Image from "next/image";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function SignUp() {
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form className="w-full max-w-md mx-auto bg-transparent p-5 md:p-6 space-y-4">
      <div className="text-center space-y-1">
        <div className="w-9 h-9 flex items-center justify-center mx-auto rounded-lg border border-white/60 bg-white/70 backdrop-blur-sm shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
          <Image
            src="/icons/logo.png"
            alt="Logo"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>

        <h1 className="text-xl font-semibold text-neutral-900">
          Create Your Account
        </h1>

        <p className="text-xs text-neutral-500">Start your journey with us</p>
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 border-2 border-[#1E1F2014] rounded-lg py-2.5 hover:bg-neutral-50 bg-white text-[#1E1F20] font-medium transition text-sm"
      >
        <FcGoogle size={18} />
        Sign up with Google
      </button>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 border-2 border-[#1E1F2014] rounded-lg py-2.5 hover:bg-neutral-50 bg-white transition text-[#1E1F20] font-medium text-sm"
      >
        <FaApple size={16} className="text-black" />
        Sign up with Apple
      </button>

      <div className="flex items-center gap-2">
        <hr className="flex-1 border-neutral-200" />
        <span className="text-[10px] text-neutral-400">OR</span>
        <hr className="flex-1 border-neutral-200" />
      </div>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full text-black/50 placeholder:text-[#1E1F2040] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-[#F2F2F2]"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full text-black/50 placeholder:text-[#1E1F2040] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-[#F2F2F2]"
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full text-black/50 placeholder:text-[#1E1F2040] rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-[#F2F2F2]"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full text-black/50 placeholder:text-[#1E1F2040] rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-[#F2F2F2]"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <label className="flex items-start gap-2 text-xs text-neutral-500">
        <input type="checkbox" className="mt-0.5" />
        I agree to the Terms & Conditions and Privacy Policy
      </label>

      <button
        type="submit"
        className="w-full bg-neutral-900 text-white py-2.5 rounded-lg hover:bg-black transition text-sm"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <p className="text-center text-xs text-neutral-500">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-neutral-900 hover:underline"
        >
          Log In
        </Link>
      </p>
    </form>
  );
}