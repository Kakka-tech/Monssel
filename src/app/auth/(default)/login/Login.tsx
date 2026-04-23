"use client";

import Image from "next/image";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [formLoading, setFormLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<null | "Google" | "Apple">(
    null,
  );
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFormLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setError(error.message);
      setFormLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  const handleGoogleLogin = async () => {
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

  return (
    <form
      className="w-full max-w-md mx-auto bg-transparent p-5 md:p-6 space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="text-center space-y-1">
        <div className="w-9 h-9 flex items-center justify-center mx-auto rounded-lg border border-white/60 bg-white/70 backdrop-blur-sm shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
          <Image
            src="/Icons/logo-dark.png"
            alt="Logo"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
        <h1 className="text-xl font-semibold text-neutral-900">Welcome Back</h1>
        <p className="text-xs text-neutral-500">Sign in to continue</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg px-3 py-2.5">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={socialLoading !== null || formLoading}
        className="w-full flex items-center justify-center gap-2 border-2 border-[#1E1F2014] rounded-lg py-2.5 hover:bg-neutral-50 bg-white text-[#1E1F20] font-medium transition text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <FcGoogle size={18} />
        {socialLoading === "Google" ? "Redirecting..." : "Sign in with Google"}
      </button>

      <button
        type="button"
        disabled
        className="w-full flex items-center justify-center gap-2 border-2 border-[#1E1F2014] rounded-lg py-2.5 bg-white text-[#1E1F20] font-medium text-sm opacity-40 cursor-not-allowed"
      >
        <FaApple size={16} className="text-black" />
        Sign in with Apple
      </button>

      <div className="flex items-center gap-2">
        <hr className="flex-1 border-neutral-200" />
        <span className="text-[10px] text-neutral-400">OR</span>
        <hr className="flex-1 border-neutral-200" />
      </div>

      <div className="space-y-3">
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
            className="w-full text-black/50 placeholder:text-[#1E1F2040] rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-[#F2F2F2]"
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
      </div>

      <div className="flex justify-between items-center text-xs text-neutral-500">
        <Link href="/auth/forgot-password" className="hover:underline">
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={formLoading || socialLoading !== null}
        className="w-full bg-neutral-900 text-white py-2.5 rounded-lg hover:bg-black transition text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {formLoading ? "Signing In..." : "Sign In"}
      </button>

      <p className="text-center text-xs text-neutral-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="font-medium text-neutral-900 hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}
