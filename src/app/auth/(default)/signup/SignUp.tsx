"use client";

import Image from "next/image";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import clsx from "clsx"; // for conditional classes

export default function SignUp() {
  const [formLoading, setFormLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<null | "Google" | "Apple">(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);

      // Remove shake effect after animation
      setTimeout(() => setPasswordError(false), 500);
      return;
    }

    setPasswordError(false);
    setFormLoading(true);

    setTimeout(() => {
      alert(`Mock signup successful for ${formData.fullName}!`);
      setFormLoading(false);
    }, 1500);
  };

  const handleSocialSignup = (provider: "Google" | "Apple") => {
    setSocialLoading(provider);

    setTimeout(() => {
      alert(`Mock signup successful with ${provider}!`);
      setSocialLoading(null);
    }, 1200);
  };

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

      {/* Social Buttons */}
      <button
        type="button"
        onClick={() => handleSocialSignup("Google")}
        className="w-full flex items-center justify-center gap-2 border-2 border-[#1E1F2014] rounded-lg py-2.5 hover:bg-neutral-50 bg-white text-[#1E1F20] font-medium transition text-sm"
        disabled={socialLoading !== null || formLoading}
      >
        <FcGoogle size={18} />
        {socialLoading === "Google" ? "Signing in with Google..." : "Sign up with Google"}
      </button>

      <button
        type="button"
        onClick={() => handleSocialSignup("Apple")}
        className="w-full flex items-center justify-center gap-2 border-2 border-[#1E1F2014] rounded-lg py-2.5 hover:bg-neutral-50 bg-white transition text-[#1E1F20] font-medium text-sm"
        disabled={socialLoading !== null || formLoading}
      >
        <FaApple size={16} className="text-black" />
        {socialLoading === "Apple" ? "Signing in with Apple..." : "Sign up with Apple"}
      </button>

      <div className="flex items-center gap-2">
        <hr className="flex-1 border-neutral-200" />
        <span className="text-[10px] text-neutral-400">OR</span>
        <hr className="flex-1 border-neutral-200" />
      </div>

      {/* Form Fields */}
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

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={clsx(
              "w-full text-black/50 placeholder:text-[#1E1F2040] rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-[#F2F2F2]",
              passwordError && "animate-shake border-red-500"
            )}
            required
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
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={clsx(
              "w-full text-black/50 placeholder:text-[#1E1F2040] rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-[#F2F2F2]",
              passwordError && "animate-shake border-red-500"
            )}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Password Error Message */}
        {passwordError && (
          <p className="text-red-500 text-xs">Passwords do not match</p>
        )}
      </div>

      <label className="flex items-start gap-2 text-xs text-neutral-500">
        <input type="checkbox" className="mt-0.5" required />
        I agree to the Terms & Conditions and Privacy Policy
      </label>

      <button
        type="submit"
        className="w-full bg-neutral-900 text-white py-2.5 rounded-lg hover:bg-black transition text-sm"
        disabled={formLoading || socialLoading !== null}
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