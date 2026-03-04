export default function SalesByCategory() {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6">
      <h3 className="text-base font-semibold text-neutral-900 mb-1">
        Sales by Category
      </h3>
      <p className="text-sm text-neutral-500 mb-6">
        Product performance breakdown
      </p>

      <div className="h-56 rounded-lg bg-neutral-50 border border-dashed border-neutral-200 flex items-center justify-center text-neutral-400 text-sm">
        Bar Chart Here
      </div>
    </div>
  );
}