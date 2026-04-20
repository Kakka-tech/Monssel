"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Receipt,
  StickyNote,
  BarChart3,
  Settings,
  LogOut,
  X,
  Menu,
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
  const [isOpen, setIsOpen] = useState(false);

  // Helper to define active link styles
  const getLinkClassName = (href: string) => {
    const active = pathname === href;
    return `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
      active
        ? "bg-[#ECEDEE] text-neutral-900 font-medium"
        : "text-neutral-600 hover:bg-[#ECEDEE]"
    }`;
  };

  return (
    <>
      <button
        aria-label="Open"
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#ECEDEE] text-[#1E1F20] rounded-md shadow"
      >
        <Menu size={20} />
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static
          top-0 left-0
          h-full
          w-64
          bg-[#FAFAFA]
          flex flex-col
          z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex justify-between items-center p-4 md:hidden">
          <span className="font-semibold text-[#1E1F20]">Monssel</span>
          <button 
            aria-label="Close"
            onClick={() => setIsOpen(false)}
            className="text-[#1E1F20]"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={getLinkClassName(item.href)}
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
            onClick={() => setIsOpen(false)}
            className={getLinkClassName("/settings")}
          >
            <Settings size={18} />
            Settings
          </Link>

          <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-[#ECEDEE] w-full text-left">
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
