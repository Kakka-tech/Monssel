"use client";

import { useState, useMemo } from "react";
import { Note, NoteCategory } from "../types";
import NotesStats from "./NotesStats";
import NotesFilter from "./NotesFilter";
import NoteCard from "./NoteCard";
import AddNoteModal from "./AddNoteModal";

const MOCK_NOTES: Note[] = [
  {
    id: "1",
    content: "Customer John Doe requested bulk discount for next order – follow up by Friday",
    category: "Customer",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    id: "2",
    content: "Supplier ABC Corp delayed shipment of electronics. Expected arrival: next Tuesday",
    category: "Supplier",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "3",
    content: "Sales peak observed during weekend evenings. Consider adjusting staff schedule",
    category: "Observation",
    createdAt: new Date(Date.now() - 16 * 60 * 60 * 1000),
  },
  {
    id: "4",
    content: "Low stock alert for Product X. Reorder 50 units from supplier",
    category: "Supplier",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: "5",
    content: "Customer feedback: packaging needs improvement. Research eco-friendly options",
    category: "Customer",
    createdAt: new Date(Date.now() - 34 * 60 * 60 * 1000),
  },
];

export default function NotesFull() {
  const [notes, setNotes] = useState<Note[]>(MOCK_NOTES);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<NoteCategory | "All">("All");
  const [showModal, setShowModal] = useState(false);

  const filtered = useMemo(() => {
    return notes.filter((n) => {
      const matchesSearch = n.content.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = activeFilter === "All" || n.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [notes, search, activeFilter]);

  const handleAddNote = (content: string, category: NoteCategory) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content,
      category,
      createdAt: new Date(),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  return (
    <>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[#1E1F20]">Notes</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <span className="text-base leading-none">+</span>
            Add Note
          </button>
        </div>

        <NotesFilter
          search={search}
          onSearchChange={setSearch}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <NotesStats notes={notes} />

        <div className="border border-[#ECEDEE] rounded-xl px-4 divide-y divide-[#ECEDEE]">
          {filtered.length > 0 ? (
            filtered.map((note) => <NoteCard key={note.id} note={note} />)
          ) : (
            <p className="text-sm text-[#707375] text-center py-10">
              No notes match your search.
            </p>
          )}
        </div>
      </div>

      {showModal && (
        <AddNoteModal
          onAdd={handleAddNote}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}