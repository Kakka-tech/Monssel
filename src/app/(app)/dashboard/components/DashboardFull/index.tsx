import SetupReminderBanner from "../SetupReminderBanner";

interface Props {
  showReminder?: boolean;
}

export default function DashboardFull({ showReminder }: Props) {
  return (
    <div>
      {showReminder && <SetupReminderBanner />}

      <h1 className="text-2xl font-semibold text-neutral-900 mb-6">
        Dashboard Overview
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border border-neutral-200 rounded-xl p-6">
          <p className="text-sm text-neutral-500">Total Sales</p>
          <h2 className="text-2xl font-semibold mt-2">₦0</h2>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-6">
          <p className="text-sm text-neutral-500">Products</p>
          <h2 className="text-2xl font-semibold mt-2">0</h2>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-6">
          <p className="text-sm text-neutral-500">Expenses</p>
          <h2 className="text-2xl font-semibold mt-2">₦0</h2>
        </div>
      </div>
    </div>
  );
}