"use client";

import GlowIcon from "./GlowIcon";

const UserIcon = ({ size = 14 }: { size?: number }) => (
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

export default function OnlineVendorsIllustration() {
  return (
    <div className="relative w-full h-full">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 176"
        preserveAspectRatio="none"
      >
        <line
          x1="60"
          y1="40"
          x2="200"
          y2="88"
          stroke="#e0e0e0"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <line
          x1="60"
          y1="136"
          x2="200"
          y2="88"
          stroke="#e0e0e0"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <line
          x1="200"
          y1="88"
          x2="330"
          y2="130"
          stroke="#e0e0e0"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
      </svg>

      <div className="absolute top-6 left-8">
        <GlowIcon size="md" color="#6366f1">
          <UserIcon />
        </GlowIcon>
      </div>

      <div className="absolute bottom-8 left-8">
        <GlowIcon size="sm" color="#6366f1">
          <UserIcon size={12} />
        </GlowIcon>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-[#d1fae5] rounded-full px-3 py-1 shadow-sm">
        <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
        <span className="text-[10px] text-[#065f46] font-medium">Active</span>
      </div>

      <div className="absolute bottom-8 right-8 flex items-center gap-1.5 bg-white border border-[#e8e8e8] rounded-lg px-2.5 py-1.5 shadow-sm">
        <svg
          width="12"
          height="12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#888"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.06-.815-1.06-2.135 0-2.95a3.75 3.75 0 0 1 3.005-.634"
          />
        </svg>
        <span className="text-[10px] text-[#444]">Revenue</span>
      </div>
    </div>
  );
}
