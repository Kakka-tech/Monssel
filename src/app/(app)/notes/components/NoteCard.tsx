import { Clock, User, Package, Lightbulb } from "lucide-react";
import { Note, CATEGORY_STYLES } from "../types";
import { NoteCategory } from "../types";

interface NoteCardProps {
  note: Note;
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
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

export default function NoteCard({ note }: NoteCardProps) {
  const styles = CATEGORY_STYLES[note.category];

  return (
    <div className="flex items-start gap-3 py-4 border-b border-[#ECEDEE] dark:border-[#2E2E2E] last:border-0">
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
            {timeAgo(note.createdAt)}
          </span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${styles.badge}`}
          >
            {note.category}
          </span>
        </div>
      </div>
    </div>
  );
}
