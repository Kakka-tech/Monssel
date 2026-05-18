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

// Animated dash offset for drawing effect
const AnimatedPath = ({ d }: { d: string }) => (
  <motion.path
    d={d}
    stroke="#d1d5db"
    strokeWidth="1.2"
    strokeDasharray="5 3"
    fill="none"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
  />
);

export default function SocialMediaIllustration() {
  return (
    <div className="relative w-full h-full">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 176"
        preserveAspectRatio="none"
      >
        <AnimatedPath d="M 80 40 C 160 40, 200 88, 310 55" />
        <AnimatedPath d="M 310 55 C 280 100, 200 130, 100 140" />
        <AnimatedPath d="M 80 40 C 100 90, 120 130, 100 140" />
      </svg>

      <div className="absolute top-5 left-12 flex flex-col items-center gap-1">
        <GlowIcon size="sm" color="#f59e0b">
          <UserIcon />
        </GlowIcon>
        <span className="text-[9px] text-[#aaa]">User 1</span>
      </div>

      <div className="absolute top-8 right-10 flex flex-col items-center gap-1">
        <GlowIcon size="sm" color="#f59e0b">
          <UserIcon />
        </GlowIcon>
        <span className="text-[9px] text-[#aaa]">User 2</span>
      </div>

      <div className="absolute bottom-7 left-14 flex flex-col items-center gap-1">
        <div className="w-7 h-7 rounded-full bg-[#1E1F20] flex items-center justify-center shadow-md">
          <svg
            width="12"
            height="12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
        <span className="text-[9px] text-[#aaa]">User 3</span>
      </div>
    </div>
  );
}
