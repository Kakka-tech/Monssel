"use client";

import Image from "next/image";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import clsx from "clsx";

export default function SignUp() {
  const router = useRouter();
  const supabase = createClient();

  const [formLoading, setFormLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<null | "Google" | "Apple">(
    null,
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 500);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setFormLoading(true);

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setFormLoading(false);
      return;
    }

    setSuccess(true);
    setFormLoading(false);
  };

  const handleGoogleSignup = async () => {
    setSocialLoading("Google");
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setSocialLoading(null);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto bg-transparent p-5 md:p-6 space-y-4 text-center">
        <div className="w-9 h-9 flex items-center justify-center mx-auto rounded-lg border border-white/60 bg-white/70 backdrop-blur-sm shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
          <Image
            src="/Icons/logo-dark.png"
            alt="Logo"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-neutral-900">
            Check your email
          </h1>
          <p className="text-sm text-neutral-500">
            We sent a confirmation link to{" "}
            <span className="font-medium text-neutral-900">
              {formData.email}
            </span>
            . Click the link to activate your account.
          </p>
        </div>
        <button
          onClick={() => router.push("/auth/login")}
          className="w-full bg-neutral-900 text-white py-2.5 rounded-lg hover:bg-black transition text-sm"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <form
      className="w-full max-w-md mx-auto bg-transparent p-5 md:p-6 space-y-4"
      onSubmit={handleSubmit}
    >
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

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg px-3 py-2.5">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleGoogleSignup}
        disabled={socialLoading !== null || formLoading}
        className="w-full flex items-center justify-center gap-2 border-2 border-[#1E1F2014] rounded-lg py-2.5 hover:bg-neutral-50 bg-white text-[#1E1F20] font-medium transition text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <FcGoogle size={18} />
        {socialLoading === "Google" ? "Redirecting..." : "Sign up with Google"}
      </button>

      <button
        type="button"
        disabled
        className="w-full flex items-center justify-center gap-2 border-2 border-[#1E1F2014] rounded-lg py-2.5 bg-white text-[#1E1F20] font-medium text-sm opacity-40 cursor-not-allowed"
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
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleInputChange}
          className="w-full text-black/50 placeholder:text-[#1E1F2040] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-[#F2F2F2]"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full text-black/50 placeholder:text-[#1E1F2040] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-[#F2F2F2]"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={clsx(
              "w-full text-black/50 placeholder:text-[#1E1F2040] rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-[#F2F2F2]",
              passwordError && "animate-shake border border-red-500",
            )}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
          >
            {showPassword ?
              <EyeOff size={16} />
            : <Eye size={16} />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={clsx(
              "w-full text-black/50 placeholder:text-[#1E1F2040] rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-[#F2F2F2]",
              passwordError && "animate-shake border border-red-500",
            )}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
          >
            {showConfirmPassword ?
              <EyeOff size={16} />
            : <Eye size={16} />}
          </button>
        </div>

        {passwordError && (
          <p className="text-red-500 text-xs">Passwords do not match</p>
        )}
      </div>

      <label className="flex items-start gap-2 text-xs text-neutral-500">
        <input type="checkbox" className="mt-0.5" required />I agree to the
        Terms & Conditions and Privacy Policy
      </label>

      <button
        type="submit"
        disabled={formLoading || socialLoading !== null}
        className="w-full bg-neutral-900 text-white py-2.5 rounded-lg hover:bg-black transition text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {formLoading ? "Creating Account..." : "Create Account"}
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
