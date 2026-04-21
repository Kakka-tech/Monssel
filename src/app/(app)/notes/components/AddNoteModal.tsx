"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NoteCategory, NOTE_CATEGORIES } from "../types";

interface AddNoteModalProps {
  onAdd: (content: string, category: NoteCategory) => void;
  onClose: () => void;
}

export default function AddNoteModal({ onAdd, onClose }: AddNoteModalProps) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<NoteCategory | null>(null);

  const canSave = content.trim() !== "" && category !== null;

  const handleSubmit = () => {
    if (!canSave) return;
    onAdd(content.trim(), category!);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-md bg-white dark:bg-[#1E1F20] rounded-2xl shadow-xl p-6 space-y-5"
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
          {/* Header */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 6 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.08, duration: 0.2 },
            }}
          >
            <h2 className="text-base font-semibold text-[#1E1F20] dark:text-white">
              Add Note
            </h2>
            <button
              onClick={onClose}
              className="text-[#707375] dark:text-[#A0A0A0] hover:text-[#1E1F20] dark:hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Note textarea */}
          <motion.div
            className="space-y-1.5"
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.12, duration: 0.2 },
            }}
          >
            <label className="text-sm font-medium text-[#1E1F20] dark:text-white">
              Note <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              autoFocus
              className="w-full px-3 py-2.5 text-sm border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10 focus:border-[#0A0A0A]/50 dark:focus:border-[#505050] transition bg-white dark:bg-[#121212] text-[#1E1F20] dark:text-white placeholder:text-[#1E1F20]/40 dark:placeholder:text-white/30"
            />
          </motion.div>

          {/* Category picker */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.16, duration: 0.2 },
            }}
          >
            <label className="text-sm font-medium text-[#1E1F20] dark:text-white">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              {NOTE_CATEGORIES.map((cat) => {
                const isSelected = category === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`flex-1 py-2 text-sm rounded-lg border transition-all font-medium ${
                      isSelected ?
                        "border-[#155DFC] border-2 bg-[#EFF6FF] dark:bg-[#155DFC]/10 text-[#155DFC]"
                      : "border-[#ECEDEE] dark:border-[#2E2E2E] text-[#1E1F20] dark:text-[#A0A0A0] hover:border-gray-400 dark:hover:border-[#505050] hover:bg-gray-50 dark:hover:bg-[#252525]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="flex gap-3 pt-1"
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.2, duration: 0.2 },
            }}
          >
            <button
              onClick={handleSubmit}
              disabled={!canSave}
              className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-[#121212] text-sm font-medium py-2.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Add Note
            </button>
            <button
              onClick={onClose}
              className="flex-1 border border-[#ECEDEE] dark:border-[#2E2E2E] text-sm text-[#707375] dark:text-[#A0A0A0] hover:text-[#1E1F20] dark:hover:text-white hover:border-gray-400 dark:hover:border-[#505050] py-2.5 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
