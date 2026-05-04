"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  TrendingUp,
  AlertTriangle,
  Receipt,
  StickyNote,
  Check,
  Trash2,
  X,
} from "lucide-react";

export type NotificationType = "sale" | "stock" | "expense" | "note" | "alert";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  created_at: string;
  read: boolean;
}

const TYPE_CONFIG = {
  sale: {
    icon: <TrendingUp className="w-4 h-4" />,
    bg: "bg-green-50 dark:bg-green-500/10",
    color: "text-green-600 dark:text-green-400",
  },
  stock: {
    icon: <AlertTriangle className="w-4 h-4" />,
    bg: "bg-amber-50 dark:bg-amber-500/10",
    color: "text-amber-500 dark:text-amber-400",
  },
  expense: {
    icon: <Receipt className="w-4 h-4" />,
    bg: "bg-red-50 dark:bg-red-500/10",
    color: "text-red-500 dark:text-red-400",
  },
  note: {
    icon: <StickyNote className="w-4 h-4" />,
    bg: "bg-blue-50 dark:bg-blue-500/10",
    color: "text-blue-500 dark:text-blue-400",
  },
  alert: {
    icon: <Package className="w-4 h-4" />,
    bg: "bg-purple-50 dark:bg-purple-500/10",
    color: "text-purple-500 dark:text-purple-400",
  },
};

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

interface NotificationPanelProps {
  onClose: () => void;
  onUnreadChange: (count: number) => void;
}

export default function NotificationPanel({
  onClose,
  onUnreadChange,
}: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(() => {
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) return;
        setNotifications(data);
        onUnreadChange(data.filter((n: Notification) => !n.read).length);
      })
      .finally(() => setLoading(false));
  }, [onUnreadChange]);

  // Fetch on open + poll every 10s while panel is open
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const displayed =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const markAllRead = async () => {
    await fetch("/api/notifications/read-all", { method: "PATCH" });
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    onUnreadChange(0);
  };

  const markRead = async (id: string) => {
    await fetch(`/api/notifications/${id}`, { method: "PATCH" });
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
    onUnreadChange(Math.max(0, unreadCount - 1));
  };

  const remove = async (id: string) => {
    const wasUnread = notifications.find((n) => n.id === id)?.read === false;
    await fetch(`/api/notifications/${id}`, { method: "DELETE" });
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    if (wasUnread) onUnreadChange(Math.max(0, unreadCount - 1));
  };

  const clearAll = async () => {
    await Promise.all(
      notifications.map((n) =>
        fetch(`/api/notifications/${n.id}`, { method: "DELETE" }),
      ),
    );
    setNotifications([]);
    onUnreadChange(0);
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="absolute right-0 top-[calc(100%+8px)] z-50 w-80 flex flex-col rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-[#2E2E2E] dark:bg-[#1C1C1C]"
        style={{ maxHeight: "min(480px, calc(100vh - 80px))" }}
        initial={{ opacity: 0, y: -8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-[#2E2E2E]">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <span className="text-xs font-semibold bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <Check className="w-3 h-3" />
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="shrink-0 flex gap-2 px-4 pt-3">
          {(["all", "unread"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 text-xs rounded-full ${
                filter === tab ?
                  "bg-black text-white dark:bg-white dark:text-black"
                : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-[#2A2A2A]"
              }`}
            >
              {tab === "all" ?
                "All"
              : `Unread${unreadCount ? ` (${unreadCount})` : ""}`}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto py-2">
          {loading ?
            <div className="space-y-3 px-4 py-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#2E2E2E] shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-32 bg-gray-200 dark:bg-[#2E2E2E] rounded" />
                    <div className="h-3 w-48 bg-gray-200 dark:bg-[#2E2E2E] rounded" />
                    <div className="h-2 w-12 bg-gray-200 dark:bg-[#2E2E2E] rounded" />
                  </div>
                </div>
              ))}
            </div>
          : <AnimatePresence initial={false}>
              {displayed.length === 0 ?
                <div className="text-center py-10 text-sm text-neutral-500 dark:text-neutral-400">
                  You&apos;re all caught up!
                </div>
              : displayed.map((n) => {
                  const { icon, bg, color } = TYPE_CONFIG[n.type];
                  return (
                    <motion.div
                      key={n.id}
                      layout
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className={`flex gap-3 px-4 py-3 cursor-pointer ${
                        n.read ?
                          "hover:bg-neutral-50 dark:hover:bg-[#2A2A2A]"
                        : "bg-blue-50/40 dark:bg-blue-500/10"
                      }`}
                      onClick={() => markRead(n.id)}
                    >
                      <div
                        className={`w-8 h-8 flex items-center justify-center rounded-full shrink-0 ${bg} ${color}`}
                      >
                        {icon}
                      </div>
                      <div className="flex-1 text-xs">
                        <p className="font-medium text-neutral-900 dark:text-white">
                          {n.title}
                        </p>
                        <p className="text-neutral-500 dark:text-neutral-400">
                          {n.message}
                        </p>
                        <p className="text-[10px] text-neutral-400 mt-0.5">
                          {timeAgo(n.created_at)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          remove(n.id);
                        }}
                        className="text-neutral-400 hover:text-red-500 shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  );
                })
              }
            </AnimatePresence>
          }
        </div>

        {notifications.length > 0 && (
          <div className="shrink-0 flex items-center justify-between border-t border-neutral-200 px-4 py-3 dark:border-[#2E2E2E]">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
            </p>
            <button
              onClick={clearAll}
              className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              Clear all
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}
