import { Search, ChevronDown } from "lucide-react";
import { NoteCategory, NOTE_CATEGORIES } from "../types";

interface NotesFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  activeFilter: NoteCategory | "All";
  onFilterChange: (filter: NoteCategory | "All") => void;
}

export default function NotesFilter({
  search,
  onSearchChange,
  activeFilter,
  onFilterChange,
}: NotesFilterProps) {
  const filters: (NoteCategory | "All")[] = ["All", ...NOTE_CATEGORIES];

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#707375]" />
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm border border-[#ECEDEE] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-[#0A0A0A]/50 transition text-[#1E1F20] placeholder:text-[#1E1F20]/40"
        />
      </div>

      <div className="relative">
        <select
          aria-label="active filter"
          value={activeFilter}
          onChange={(e) =>
            onFilterChange(e.target.value as NoteCategory | "All")
          }
          className="appearance-none pl-3 pr-8 py-2 text-sm border border-[#ECEDEE] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-[#0A0A0A]/50 transition text-[#1E1F20] bg-white cursor-pointer"
        >
          {filters.map((f) => (
            <option key={f} value={f}>
              {f === "All" ? "All Notes" : `${f}s`}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#707375] pointer-events-none" />
      </div>
    </div>
  );
}
