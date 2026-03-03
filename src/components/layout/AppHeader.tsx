"use client";

import { usePathname } from "next/navigation";
import { Bell, PanelLeft } from "lucide-react";
import Image from "next/image";

function formatTitle(segment: string) {
  return segment
    .replace("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function AppHeader() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const isDashboardRoot =
    segments.length === 1 && segments[0] === "dashboard";

  const currentPage =
    segments.length > 0
      ? formatTitle(segments[segments.length - 1])
      : "Dashboard";

  return (
    <header className="h-16 w-full bg-white border-b border-[#E4E6E7] flex items-center">
  <div className="w-64 px-6 flex items-center">
    <Image
      src="/icons/logo.png"
      alt="Monssel Logo"
      width={26}
      height={26}
      priority
    />
  </div>

  <div className="flex-1 px-6 flex items-center justify-between">
    <div className="flex items-center gap-2 text-sm">
      <PanelLeft size={20} className="text-neutral-400" />

      {isDashboardRoot ? (
        <span className="font-medium text-neutral-900">
          Dashboard
        </span>
      ) : (
        <>
          <span className="text-neutral-400">Dashboard</span>
          <span className="text-neutral-400">/</span>
          <span className="font-medium text-neutral-900">
            {currentPage}
          </span>
        </>
      )}
    </div>

    <div className="flex items-center gap-4">
      <button aria-label="Notifications">
        <Bell size={18} className="text-[#1E1F20]" />
      </button>

      <div className="text-sm text-right">
        <div className="font-medium text-neutral-900">
          Stephen Samson
        </div>
        <div className="text-neutral-500 text-xs">
          stephen@gmail.com
        </div>
      </div>
    </div>
  </div>
</header>
  );
}