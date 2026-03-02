"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

function getTitle(pathname: string) {
  const map: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/record-sales": "Record Sales",
    "/inventory": "Inventory",
    "/expenses": "Expenses",
    "/notes": "Notes",
    "/analytics": "Analytics",
    "/settings": "Settings",
  };

  return map[pathname] ?? "Dashboard";
}

export default function AppHeader() {
  const pathname = usePathname();
  const title = getTitle(pathname);

  return (
    <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-neutral-400">Dashboard</span>
        <span className="text-neutral-400">/</span>
        <span className="font-medium text-neutral-900">{title}</span>
      </div>

      <div className="flex items-center gap-4">
        <button aria-label="Notifications" className="relative">
          <Bell size={18} />
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
    </header>
  );
}