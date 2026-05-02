"use client";

import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import NotesFull from "./components/NotesFull";
import NotesEmpty from "./components/NotesEmpty";
import AddNoteModal from "./components/AddNoteModal";
import { useFetch } from "@/lib/usefetch";
import { Note } from "./types";

function NotesSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-8 w-24 bg-gray-200 dark:bg-[#2E2E2E] rounded-lg" />
        <div className="h-10 w-28 bg-gray-200 dark:bg-[#2E2E2E] rounded-lg" />
      </div>
      <div className="flex gap-3">
        <div className="flex-1 h-10 bg-gray-200 dark:bg-[#2E2E2E] rounded-lg" />
        <div className="h-10 w-32 bg-gray-200 dark:bg-[#2E2E2E] rounded-lg" />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-20 bg-gray-200 dark:bg-[#2E2E2E] rounded-xl"
          />
        ))}
      </div>
      <div className="border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-xl px-4 divide-y divide-[#ECEDEE] dark:divide-[#2E2E2E]">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-3 py-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#2E2E2E] shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-full bg-gray-200 dark:bg-[#2E2E2E] rounded" />
              <div className="h-3 w-2/3 bg-gray-200 dark:bg-[#2E2E2E] rounded" />
              <div className="h-3 w-20 bg-gray-200 dark:bg-[#2E2E2E] rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NotesPage() {
  const { data, loading } = useFetch<Note[]>("/api/notes");
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Sync fetched data into local state once
  if (data !== null && notes === null) setNotes(data);

  const handleAdd = (note: Note) => {
    setNotes((prev) => (prev ? [note, ...prev] : [note]));
  };

  const handleDelete = async (id: string) => {
    setNotes((prev) => prev?.filter((n) => n.id !== id) ?? null);
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
  };

  return (
    <PageContainer>
      {loading || notes === null ?
        <NotesSkeleton />
      : notes.length === 0 ?
        <>
          <NotesEmpty onAddNote={() => setShowModal(true)} />
          {showModal && (
            <AddNoteModal
              onAdd={(note) => {
                handleAdd(note);
                setShowModal(false);
              }}
              onClose={() => setShowModal(false)}
            />
          )}
        </>
      : <NotesFull notes={notes} onAdd={handleAdd} onDelete={handleDelete} />}
    </PageContainer>
  );
}
