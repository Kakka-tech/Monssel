"use client";
import PageContainer from "@/components/layout/PageContainer";
import NotesEmpty from "./components/NotesEmpty";
import NotesFull from "./components/NotesFull";

export default function NotesPage() {
  // Replace with real check: does the user have any notes?
  const hasNotes = true;
  return (
    <PageContainer>
      {hasNotes ? (
        <NotesFull />
      ) : (
        <NotesEmpty onAddNote={() => {/* TODO: open add note modal */}} />
      )}
    </PageContainer>
  );
}