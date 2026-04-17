export const NOTE_CATEGORIES = ["Customer", "Supplier", "Observation"] as const;

export type NoteCategory = (typeof NOTE_CATEGORIES)[number];

export interface Note {
  id: string;
  content: string;
  category: NoteCategory;
  createdAt: Date;
}

export const CATEGORY_STYLES: Record<
  NoteCategory,
  { badge: string; avatar: string }
> = {
  Customer:    { badge: "bg-blue-50 text-blue-500",   avatar: "bg-blue-100 text-blue-500"   },
  Supplier:    { badge: "bg-purple-50 text-purple-500", avatar: "bg-purple-100 text-purple-500" },
  Observation: { badge: "bg-amber-50 text-amber-500",  avatar: "bg-amber-100 text-amber-500"  },
};