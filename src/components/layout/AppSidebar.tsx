"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Receipt,
  StickyNote,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Record Sales", href: "/record-sales", icon: ShoppingCart },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Expenses", href: "/expenses", icon: Receipt },
  { name: "Notes", href: "/notes", icon: StickyNote },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#FAFAFA] flex flex-col">
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                active
                  ? "bg-[#ECEDEE] text-neutral-900 font-medium"
                  : "text-neutral-600 hover:bg-[#ECEDEE]"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-neutral-200 p-3 space-y-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-neutral-50"
        >
          <Settings size={18} />
          Settings
        </Link>

        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-neutral-50 w-full text-left">
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  );
}