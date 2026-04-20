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
    message: "Your weekly business summary for this period is now available.",
    time: "1d ago",
    read: true,
  },
];

const TYPE_CONFIG: Record<
  NotificationType,
  { icon: React.ReactNode; bg: string; color: string }
> = {
  sale: {
    icon: <TrendingUp className="w-4 h-4" />,
    bg: "bg-green-50",
    color: "text-green-600",
  },
  stock: {
    icon: <AlertTriangle className="w-4 h-4" />,
    bg: "bg-amber-50",
    color: "text-amber-500",
  },
  expense: {
    icon: <Receipt className="w-4 h-4" />,
    bg: "bg-red-50",
    color: "text-red-500",
  },
  note: {
    icon: <StickyNote className="w-4 h-4" />,
    bg: "bg-blue-50",
    color: "text-blue-500",
  },
  alert: {
    icon: <Package className="w-4 h-4" />,
    bg: "bg-purple-50",
    color: "text-purple-500",
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
      <motion.div
        className="fixed inset-0 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="absolute right-0 top-[calc(100%+8px)] z-50 w-85 bg-white border border-[#ECEDEE] rounded-2xl shadow-2xl flex flex-col"
        style={{ maxHeight: "min(480px, calc(100vh - 80px))" }}
        initial={{ opacity: 0, y: -8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#ECEDEE] shrink-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-[#1E1F20]">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <span className="text-xs font-semibold bg-red-500 text-white px-1.5 py-0.5 rounded-full leading-none">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-[#155DFC] hover:underline flex items-center gap-1"
              >
                <Check className="w-3 h-3" />
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close"
              className="text-[#707375] hover:text-[#1E1F20] transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-1 px-4 pt-3 shrink-0">
          {(["all", "unread"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                filter === tab ?
                  "bg-[#1E1F20] text-white"
                : "text-[#707375] hover:bg-gray-100"
              }`}
            >
              {tab === "all" ?
                "All"
              : `Unread${unreadCount > 0 ? ` (${unreadCount})` : ""}`}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto flex-1 py-2">
          <AnimatePresence initial={false}>
            {displayed.length === 0 ?
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-10 gap-2"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Check className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm text-[#707375]">
                  You&apos;re all caught up!
                </p>
              </motion.div>
            : displayed.map((notification) => {
                const { icon, bg, color } = TYPE_CONFIG[notification.type];
                return (
                  <motion.div
                    key={notification.id}
                    layout
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10, height: 0 }}
                    transition={{ duration: 0.18 }}
                    className={`group relative flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors ${
                      notification.read ? "hover:bg-gray-50" : (
                        "bg-blue-50/40 hover:bg-blue-50/60"
                      )
                    }`}
                    onClick={() => markRead(notification.id)}
                  >
                    {!notification.read && (
                      <span className="absolute left-2 top-4 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    )}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${bg} ${color}`}
                    >
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <p
                        className={`text-xs font-semibold truncate ${notification.read ? "text-[#707375]" : "text-[#1E1F20]"}`}
                      >
                        {notification.title}
                      </p>
                      <p className="text-xs text-[#707375] leading-relaxed line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-[10px] text-[#707375]/70">
                        {notification.time}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        remove(notification.id);
                      }}
                      aria-label="Remove notification"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[#707375] hover:text-red-500 shrink-0 mt-0.5"
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
          <div className="border-t border-[#ECEDEE] px-4 py-3 flex justify-between items-center shrink-0">
            <p className="text-xs text-[#707375]">
              {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
            </p>
            <button
              onClick={clearAll}
              className="text-xs text-red-400 hover:text-red-600 transition-colors flex items-center gap-1"
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
