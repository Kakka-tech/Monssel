"use client";

import { useState } from "react";
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
  time: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "sale",
    title: "New Sale Recorded",
    message: "Nike Air Max × 2 — $200.00 has been recorded successfully.",
    time: "2m ago",
    read: false,
  },
  {
    id: "2",
    type: "stock",
    title: "Low Stock Alert",
    message: "Product A is running low — only 5 units remaining.",
    time: "15m ago",
    read: false,
  },
  {
    id: "3",
    type: "expense",
    title: "Expense Added",
    message: "A new Utilities expense of $320.00 was logged.",
    time: "1h ago",
    read: false,
  },
  {
    id: "4",
    type: "note",
    title: "Note Created",
    message: "Customer John Doe requested bulk discount for next order.",
    time: "3h ago",
    read: true,
  },
  {
    id: "5",
    type: "alert",
    title: "Weekly Report Ready",
    message: "Your weekly business summary is ready.",
    time: "1d ago",
    read: true,
  },
];

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

interface NotificationPanelProps {
  onClose: () => void;
}

export default function NotificationPanel({ onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const displayed =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  const remove = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  const clearAll = () => setNotifications([]);

  return (
    <>
      {/* Overlay */}
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

        <div className="flex-1 overflow-y-auto py-2">
          <AnimatePresence initial={false}>
            {displayed.length === 0 ?
              <div className="text-center py-10 text-sm text-neutral-500 dark:text-neutral-400">
                You&apos;re all caught up 🎉
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
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${bg} ${color}`}
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
                      <p className="text-[10px] text-neutral-400">{n.time}</p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        remove(n.id);
                      }}
                      className="text-neutral-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                );
              })
            }
          </AnimatePresence>
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
