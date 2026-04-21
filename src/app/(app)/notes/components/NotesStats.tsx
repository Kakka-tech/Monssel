import { Note, NoteCategory, NOTE_CATEGORIES } from "../types";

interface NotesStatsProps {
  notes: Note[];
}

const colorMap: Record<NoteCategory, string> = {
  Customer: "text-blue-500 dark:text-blue-400",
  Supplier: "text-blue-500 dark:text-blue-400",
  Observation: "text-amber-500 dark:text-amber-400",
};

export default function NotesStats({ notes }: NotesStatsProps) {
  const countByCategory = (cat: NoteCategory) =>
    notes.filter((n) => n.category === cat).length;

  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-xl px-4 py-3.5 bg-white dark:bg-[#1E1F20] space-y-2">
        <p className="text-xs text-[#707375] dark:text-[#A0A0A0]">
          Total Notes
        </p>
        <p className="text-2xl font-semibold text-[#1E1F20] dark:text-white">
          {notes.length}
        </p>
      </div>
      {NOTE_CATEGORIES.map((cat) => (
        <div
          key={cat}
          className="border border-[#ECEDEE] dark:border-[#2E2E2E] rounded-xl px-4 py-3.5 bg-white dark:bg-[#1E1F20] space-y-2"
        >
          <p className="text-xs text-[#707375] dark:text-[#A0A0A0]">{cat}s</p>
          <p className={`text-2xl font-semibold ${colorMap[cat]}`}>
            {countByCategory(cat)}
          </p>
        </div>
      ))}
    </div>
  );
}
