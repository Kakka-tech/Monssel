interface SaveBarProps {
  onSave: () => void;
  onCancel: () => void;
  saving?: boolean;
}

export default function SaveBar({ onSave, onCancel, saving }: SaveBarProps) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <button
        onClick={onSave}
        disabled={saving}
        className="bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>
      <button
        onClick={onCancel}
        className="text-sm text-[#707375] hover:text-[#1E1F20] transition-colors px-2 py-2"
      >
        Cancel
      </button>
    </div>
  );
}