import { Note, NoteCategory, NOTE_CATEGORIES } from "../types";

interface NotesStatsProps {
  notes: Note[];
}

const colorMap: Record<NoteCategory, string> = {
  Customer:    "text-blue-500",
  Supplier:    "text-blue-500",
  Observation: "text-amber-500",
};

export default function NotesStats({ notes }: NotesStatsProps) {
  const countByCategory = (cat: NoteCategory) =>
    notes.filter((n) => n.category === cat).length;

  return (
    <div className="border border-[#ECEDEE] rounded-xl flex divide-x divide-[#ECEDEE] overflow-hidden">
      <div className="flex-1 px-5 py-4">
        <p className="text-xs text-[#707375]">Total Notes</p>
        <p className="text-2xl font-semibold text-[#1E1F20] mt-1">{notes.length}</p>
      </div>

      {NOTE_CATEGORIES.map((cat) => (
        <div key={cat} className="flex-1 px-5 py-4">
          <p className="text-xs text-[#707375]">{cat}s</p>
          <p className={`text-2xl font-semibold mt-1 ${colorMap[cat]}`}>
            {countByCategory(cat)}
          </p>
        </div>
      ))}
    </div>
  );
}