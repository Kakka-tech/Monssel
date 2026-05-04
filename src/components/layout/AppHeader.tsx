"use client";

import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore, useEffect, useCallback, useRef } from "react";
import { useTheme } from "next-themes";
import { Bell, PanelLeft, X } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import NotificationPanel from "./NotificationPanel";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

function formatTitle(segment: string) {
  return segment.replace("-", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

interface ToastNotification {
  id: string;
  title: string;
  message: string;
}

export default function AppHeader() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [toast, setToast] = useState<ToastNotification | null>(null);
  const lastCountRef = useRef<number | null>(null);

  // Fetch user
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  // Poll for new notifications every 10 seconds
  useEffect(() => {
    const checkNotifications = async () => {
      try {
        const res = await fetch("/api/notifications");
        if (!res.ok) return;
        const data = await res.json();
        if (!Array.isArray(data)) return;

        const unread = data.filter((n: { read: boolean }) => !n.read);
        const newCount = unread.length;

        // If count increased since last check, show toast
        if (lastCountRef.current !== null && newCount > lastCountRef.current) {
          const newest = data.find((n: { read: boolean }) => !n.read);
          if (newest) {
            setToast({ id: newest.id, title: newest.title, message: newest.message });
            setTimeout(() => setToast(null), 5000);
          }
        }

        lastCountRef.current = newCount;
        setUnreadCount(newCount);
      } catch {}
    };

    // Run immediately
    checkNotifications();

    // Then poll every 10 seconds
    const interval = setInterval(checkNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleUnreadChange = useCallback((count: number) => {
    setUnreadCount(count);
    lastCountRef.current = count;
  }, []);

  const logoSrc = mounted && theme === "dark" ? "/Icons/logo.png" : "/Icons/logo-dark.png";

  const segments = pathname.split("/").filter(Boolean);
  const isDashboardRoot = segments.length === 1 && segments[0] === "dashboard";
  const currentPage = segments.length > 0 ? formatTitle(segments[segments.length - 1]) : "Dashboard";

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "User";

  const displayEmail = user?.email || "";

  return (
    <>
      {/* Toast notification popup */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="fixed top-4 right-4 z-100 w-80 bg-white dark:bg-[#1C1C1C] border border-neutral-200 dark:border-[#2E2E2E] rounded-xl shadow-2xl p-4 flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                {toast.title}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="h-16 w-full bg-white dark:bg-[#111113] border-b border-[#E4E6E7] dark:border-[#2E2E2E] flex items-center">
        <div className="w-16 sm:w-20 md:w-64 px-4 md:px-6 flex items-center">
          <Image src={logoSrc} alt="Monssel Logo" width={26} height={26} priority />
        </div>

        <div className="flex-1 px-4 md:px-6 flex items-center justify-between min-w-0">
          <div className="flex items-center gap-2 text-sm min-w-0">
            <PanelLeft size={18} className="text-[#707375] shrink-0" />
            <div className="flex items-center gap-2 truncate">
              {isDashboardRoot ? (
                <span className="font-medium text-[#707375] truncate">Dashboard</span>
              ) : (
                <>
                  <span className="text-neutral-400 hidden sm:inline">Dashboard</span>
                  <span className="text-neutral-400 hidden sm:inline">/</span>
                  <span className="font-medium text-neutral-900 dark:text-white truncate">
                    {currentPage}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            <div className="relative">
              <button
                aria-label="Notifications"
                onClick={() => setShowNotifications((o) => !o)}
                className={`relative p-1.5 rounded-lg transition-colors ${
                  showNotifications
                    ? "bg-gray-100 dark:bg-[#252525]"
                    : "hover:bg-gray-100 dark:hover:bg-[#252525]"
                }`}
              >
                <Bell size={18} className="text-[#1E1F20] dark:text-white" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {showNotifications && (
                  <NotificationPanel
                    onClose={() => setShowNotifications(false)}
                    onUnreadChange={handleUnreadChange}
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="text-sm text-right hidden sm:block">
              <div className="font-medium text-neutral-900 dark:text-white">{displayName}</div>
              <div className="text-neutral-500 dark:text-[#A0A0A0] text-xs">{displayEmail}</div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}