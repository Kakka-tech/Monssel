export default function SetupReminderBanner() {
  return (
    <div className="mb-6 p-4 rounded-lg border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/30 flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-amber-800 dark:text-amber-400">
          Complete your setup to unlock full dashboard features.
        </p>
        <p className="text-xs text-amber-700 dark:text-amber-500">
          Add products and record sales to see analytics.
        </p>
      </div>
      <button className="text-sm font-medium text-amber-900 dark:text-amber-400">
        Complete Setup →
      </button>
    </div>
  );
}
