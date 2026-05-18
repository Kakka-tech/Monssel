"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PayDeclinedPage() {
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

      {/* Animated X circle */}
      <div className="relative mb-6">
        <svg viewBox="0 0 100 100" className="w-24 h-24">
          {/* Track */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="4"
          />
          {/* Animated ring — red */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#ef4444"
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
          {/* X mark — left stroke */}
          <line
            x1="33"
            y1="33"
            x2="67"
            y2="67"
            stroke="#ef4444"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="48"
            strokeDashoffset={animate ? "0" : "48"}
            style={{
              transition: "stroke-dashoffset 0.4s ease-in-out 0.7s",
            }}
          />
          {/* X mark — right stroke */}
          <line
            x1="67"
            y1="33"
            x2="33"
            y2="67"
            stroke="#ef4444"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="48"
            strokeDashoffset={animate ? "0" : "48"}
            style={{
              transition: "stroke-dashoffset 0.4s ease-in-out 0.95s",
            }}
          />
        </svg>
      </div>

      {/* Text */}
      <div
        className="text-center space-y-2"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.5s ease 1.1s, transform 0.5s ease 1.1s",
        }}
      >
        <h1 className="text-2xl font-semibold text-neutral-900">
          Payment Declined
        </h1>
        <p className="text-sm text-neutral-500">
          Your transaction could not be completed. Please try again.
        </p>
      </div>

      {/* Actions */}
      <div
        className="mt-8 flex items-center gap-3"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.5s ease 1.4s, transform 0.5s ease 1.4s",
        }}
      >
        <button
          onClick={() => router.back()}
          className="bg-neutral-900 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-black transition"
        >
          Try Again
        </button>
        <button
          onClick={() => router.push("/")}
          className="text-sm font-medium text-neutral-500 hover:text-neutral-800 transition"
        >
          Go Home
        </button>
      </div>

      <p
        className="absolute bottom-6 text-xs text-neutral-400"
        style={{
          opacity: animate ? 1 : 0,
          transition: "opacity 0.5s ease 1.6s",
        }}
      >
        Powered by <span className="font-medium text-neutral-600">Monssel</span>
      </p>
    </div>
  );
}