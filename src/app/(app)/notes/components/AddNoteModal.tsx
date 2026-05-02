"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { NoteCategory, NOTE_CATEGORIES, Note } from "../types";

interface AddNoteModalProps {
  onAdd: (note: Note) => void;
  onClose: () => void;
}

export default function AddNoteModal({ onAdd, onClose }: AddNoteModalProps) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<NoteCategory>("Customer");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!content.trim()) return;
    setError(null);
    setSaving(true);

    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content.trim(), category }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to save note");
      setSaving(false);
      return;
    }

    const note = await res.json();
    onAdd(note);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-md bg-white dark:bg-[#1C1C1C] border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-2xl p-6 space-y-4 shadow-2xl"
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#1E1F20] dark:text-white">
            Add Note
          </h2>
          <button
            onClick={onClose}
            className="text-[#707375] hover:text-[#1E1F20] dark:hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs rounded-lg px-3 py-2"
          >
            {error}
          </motion.div>
        )}

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#1E1F20] dark:text-white">
            Category
          </label>
          <div className="flex gap-2">
            {NOTE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-1 py-2 text-xs rounded-lg border transition-all ${
                  category === cat
                    ? "border-[#155DFC] border-2 bg-[#EFF6FF] dark:bg-[#155DFC]/10 text-[#155DFC] font-medium"
                    : "border-[#ECEDEE] dark:border-[#2E2E2E] text-[#1E1F20] dark:text-[#A0A0A0] hover:bg-gray-50 dark:hover:bg-[#252525]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#1E1F20] dark:text-white">
            Note <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10 focus:border-[#0A0A0A]/50 dark:focus:border-[#505050] transition bg-white dark:bg-[#1E1F20] text-[#1E1F20] dark:text-white placeholder:text-[#1E1F20]/40 dark:placeholder:text-white/30"
          />
        </div>

        <div className="flex gap-3 pt-1">
          <button
            onClick={handleSave}
            disabled={!content.trim() || saving}
            className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-[#121212] text-sm font-medium py-2.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save Note"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-[#ECEDEE] dark:border-[#2E2E2E] text-sm text-[#707375] dark:text-[#A0A0A0] py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}