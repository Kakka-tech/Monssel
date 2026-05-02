import { Clock, User, Package, Lightbulb } from "lucide-react";
import { Note, CATEGORY_STYLES, NoteCategory } from "../types";

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

const AVATAR_ICON: Record<NoteCategory, React.ReactNode> = {
  Customer: <User className="w-4 h-4" />,
  Supplier: <Package className="w-4 h-4" />,
  Observation: <Lightbulb className="w-4 h-4" />,
};

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  const styles = CATEGORY_STYLES[note.category];

  return (
    <div className="flex items-start gap-3 py-4 last:border-0">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${styles.avatar}`}
      >
        {AVATAR_ICON[note.category]}
      </div>
      <div className="flex-1 min-w-0 space-y-1.5">
        <p className="text-sm text-[#1E1F20] dark:text-white leading-snug">
          {note.content}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1 text-xs text-[#707375] dark:text-[#A0A0A0]">
            <Clock className="w-3 h-3" />
            {timeAgo(note.created_at)}
          </span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${styles.badge}`}
          >
            {note.category}
          </span>
        </div>
      </div>
      <button
        onClick={() => onDelete(note.id)}
        className="text-[#707375] dark:text-[#A0A0A0] hover:text-red-500 dark:hover:text-red-400 transition-colors shrink-0 mt-0.5"
        aria-label="Delete note"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14H6L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4h6v2" />
        </svg>
      </button>
    </div>
  );
}
