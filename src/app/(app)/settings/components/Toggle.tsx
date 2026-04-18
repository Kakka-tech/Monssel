interface ToggleProps {
  enabled: boolean;
  onChange: (value: boolean) => void;
  label: string;
}

export default function Toggle({ enabled, onChange, label }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={enabled ? "true" : "false"}
      aria-label={label}
      title={label}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 ${
        enabled ? "bg-green-500" : "bg-gray-200"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 ${
          enabled ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}