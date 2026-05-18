"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PaySuccessPage() {
  const [animate, setAnimate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="mb-10">
        <Image
          src="/icons/logo-dark.png"
          alt="Monssel"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>

      <div className="relative mb-6">
        <svg viewBox="0 0 100 100" className="w-24 h-24">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="4"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#1E1F20"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset={animate ? "0" : "283"}
            style={{
              transition: "stroke-dashoffset 0.8s ease-in-out",
              transformOrigin: "center",
              transform: "rotate(-90deg)",
            }}
          />
          <polyline
            points="30,52 44,66 70,36"
            fill="none"
            stroke="#1E1F20"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="60"
            strokeDashoffset={animate ? "0" : "60"}
            style={{
              transition: "stroke-dashoffset 0.5s ease-in-out 0.7s",
            }}
          />
        </svg>
      </div>

      <div
        className="text-center space-y-2"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.5s ease 1s, transform 0.5s ease 1s",
        }}
      >
        <h1 className="text-2xl font-semibold text-neutral-900">
          Payment Successful
        </h1>
        <p className="text-sm text-neutral-500">
          Your transaction was completed successfully.
        </p>
      </div>

      <div
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.5s ease 1.3s, transform 0.5s ease 1.3s",
        }}
        className="mt-8"
      >
        <button
          onClick={() => router.push("/")}
          className="bg-neutral-900 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-black transition"
        >
          Done
        </button>
      </div>

      <p
        className="absolute bottom-6 text-xs text-neutral-400"
        style={{
          opacity: animate ? 1 : 0,
          transition: "opacity 0.5s ease 1.5s",
        }}
      >
        Powered by <span className="font-medium text-neutral-600">Monssel</span>
      </p>
    </div>
  );
}
