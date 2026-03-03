export default function SetupReminderBanner() {
  return (
    <div className="mb-6 p-4 rounded-lg border border-amber-200 bg-amber-50 flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-amber-800">
          Complete your setup to unlock full dashboard features.
        </p>
        <p className="text-xs text-amber-700">
          Add products and record sales to see analytics.
        </p>
      </div>

      <button className="text-sm font-medium text-amber-900">
        Complete Setup →
      </button>
    </div>
  );
}