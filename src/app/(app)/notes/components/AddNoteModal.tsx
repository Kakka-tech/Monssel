"use client";

import { useState } from "react";
import { X } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#1E1F20]">Add Note</h2>
          <button
            onClick={onClose}
            className="text-[#707375] hover:text-[#1E1F20] transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#1E1F20]">
            Note <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoFocus
            className="w-full px-3 py-2.5 text-sm border border-[#ECEDEE] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-[#0A0A0A]/50 transition text-[#1E1F20] placeholder:text-[#1E1F20]/40"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#1E1F20]">
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
                      "border-[#155DFC] border-2 bg-[#EFF6FF] text-[#155DFC]"
                    : "border-[#ECEDEE] text-[#1E1F20] hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button
            onClick={handleSubmit}
            disabled={!canSave}
            className="flex-1 bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add Note
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-[#ECEDEE] text-sm text-[#707375] hover:text-[#1E1F20] hover:border-gray-400 py-2.5 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
