"use client";

import { LogOut, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutModal({ onConfirm, onCancel }: LogoutModalProps) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onCancel}
          aria-hidden="true"
        />

        <motion.div
          className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 space-y-5"
          initial={{ scale: 0.75, opacity: 0, y: 20 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 22,
              mass: 0.8,
            },
          }}
          exit={{
            scale: 0.9,
            opacity: 0,
            y: 10,
            transition: { duration: 0.15, ease: "easeIn" },
          }}
        >
          <button
            onClick={onCancel}
            aria-label="Close"
            className="absolute top-4 right-4 text-[#707375] hover:text-[#1E1F20] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <motion.div
            className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mx-auto"
            initial={{ scale: 0, rotate: -15 }}
            animate={{
              scale: 1,
              rotate: 0,
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 18,
                delay: 0.08,
              },
            }}
          >
            <LogOut className="w-5 h-5 text-red-500" />
          </motion.div>

          <motion.div
            className="text-center space-y-1.5"
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.12, duration: 0.2 },
            }}
          >
            <h2 className="text-base font-semibold text-[#1E1F20]">Log Out</h2>
            <p className="text-sm text-[#707375]">
              Are you sure you want to log out? You&appos;ll need to sign in
              again to access your account.
            </p>
          </motion.div>

          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.16, duration: 0.2 },
            }}
          >
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 text-sm font-medium border border-[#ECEDEE] text-[#1E1F20] rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Log Out
            </button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
