"use client";

import { motion } from "framer-motion";
import GlowIcon from "./GlowIcon";

const UserIcon = ({ size = 13 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="#888"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
    />
  </svg>
);

export default function GrowingBusinessIllustration() {
  return (
    <div className="relative w-full h-full">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 176"
        preserveAspectRatio="none"
      >
        <line
          x1="130"
          y1="88"
          x2="200"
          y2="60"
          stroke="#e0e0e0"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <line
          x1="200"
          y1="60"
          x2="270"
          y2="88"
          stroke="#e0e0e0"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <line
          x1="200"
          y1="60"
          x2="200"
          y2="115"
          stroke="#e0e0e0"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
      </svg>

      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <GlowIcon size="lg" color="#10b981">
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#888"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.281-2.28 5.941"
            />
          </svg>
        </GlowIcon>
      </div>

      <div className="absolute bottom-8 left-20">
        <GlowIcon size="md" color="#10b981">
          <UserIcon size={14} />
        </GlowIcon>
      </div>

      <div className="absolute bottom-8 right-20">
        <GlowIcon size="sm" color="#10b981">
          <UserIcon />
        </GlowIcon>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex items-center gap-1 bg-[#ecfdf5] border border-[#a7f3d0] rounded-full px-2.5 py-1"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#10b981"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
          <span className="text-[9px] text-[#065f46] font-medium">Growing</span>
        </motion.div>
      </div>
    </div>
  );
}
