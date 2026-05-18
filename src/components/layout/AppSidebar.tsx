"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import LogoutModal from "./LogoutModal";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Record Sales", href: "/record-sales", icon: ShoppingCart },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Expenses", href: "/expenses", icon: Receipt },
  { name: "Notes", href: "/notes", icon: StickyNote },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

const sidebarVariants = {
  closed: {
    x: "-100%",
    transition: {
      duration: 0.35,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
  open: {
    x: 0,
    transition: {
      duration: 0.35,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
};

const navContainerVariants = {
  closed: {},
  open: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
};

const navItemVariants = {
  closed: { opacity: 0, x: -12 },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const bottomVariants = {
  closed: { opacity: 0, y: 8 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const, delay: 0.35 },
  },
};

interface SidebarContentProps {
  animate: boolean;
  pathname: string;
  onClose: () => void;
  onLogout: () => void;
}

function SidebarContent({
  animate,
  pathname,
  onClose,
  onLogout,
}: SidebarContentProps) {
  const getLinkClassName = (href: string) => {
    const active = pathname === href;
    return `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
      active ?
        "bg-[#ECEDEE] dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium"
      : "text-neutral-600 dark:text-neutral-400 hover:bg-[#ECEDEE] dark:hover:bg-neutral-800"
    }`;
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 md:hidden">
        <span className="font-semibold text-[#1E1F20] dark:text-white">
          Monssel
        </span>
        <button
          aria-label="Close"
          onClick={onClose}
          className="text-[#1E1F20] dark:text-white"
        >
          <X size={20} />
        </button>
      </div>

      <motion.nav
        className="flex-1 px-3 py-4 space-y-1"
        variants={animate ? navContainerVariants : undefined}
        initial={animate ? "closed" : false}
        animate={animate ? "open" : false}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.name}
              variants={animate ? navItemVariants : undefined}
            >
              <Link
                href={item.href}
                onClick={onClose}
                className={getLinkClassName(item.href)}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            </motion.div>
          );
        })}
      </motion.nav>

      <motion.div
        className="border-t border-neutral-200 dark:border-neutral-800 p-3 space-y-1"
        variants={animate ? bottomVariants : undefined}
        initial={animate ? "closed" : false}
        animate={animate ? "open" : false}
      >
        <Link
          href="/settings"
          onClick={onClose}
          className={getLinkClassName("/settings")}
        >
          <Settings size={18} />
          Settings
        </Link>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-neutral-600 dark:text-neutral-400 hover:bg-[#ECEDEE] dark:hover:bg-neutral-800 w-full text-left transition-colors"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </motion.div>
    </>
  );
}

export default function AppSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    setIsOpen(false);
    setShowLogout(true);
  };

  return (
    <>
      <button
        aria-label="Open"
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#ECEDEE] dark:bg-neutral-800 text-[#1E1F20] dark:text-white rounded-md shadow"
      >
        <Menu size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              key="sidebar"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 left-0 h-full w-64 bg-[#FAFAFA] dark:bg-[#111113] flex flex-col z-50 md:hidden"
            >
              <SidebarContent
                animate
                pathname={pathname}
                onClose={() => setIsOpen(false)}
                onLogout={handleLogout}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <aside className="hidden md:flex flex-col h-full w-64 bg-[#FAFAFA] dark:bg-[#111113]">
        <SidebarContent
          animate={false}
          pathname={pathname}
          onClose={() => setIsOpen(false)}
          onLogout={handleLogout}
        />
      </aside>

      {showLogout && <LogoutModal onCancel={() => setShowLogout(false)} />}
    </>
  );
}
