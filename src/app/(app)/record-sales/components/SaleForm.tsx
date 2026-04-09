import { Product } from "../types";

interface SaleFormProps {
  selectedProduct: Product | null;
  quantityRaw: string;
  onQuantityChange: (value: string) => void;
  qtyExceedsStock: boolean;
  customPrice: string;
  onCustomPriceChange: (value: string) => void;
  note: string;
  onNoteChange: (value: string) => void;
}

export default function SaleForm({
  selectedProduct,
  quantityRaw,
  onQuantityChange,
  qtyExceedsStock,
  customPrice,
  onCustomPriceChange,
  note,
  onNoteChange,
}: SaleFormProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">
          Quantity <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          min={1}
          placeholder="1"
          value={quantityRaw}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "" || /^\d+$/.test(raw)) onQuantityChange(raw);
          }}
          className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition text-[#1E1F20] placeholder:text-[#1E1F20]/40 ${
            qtyExceedsStock ?
              "border-red-400 focus:ring-red-200 focus:border-red-400"
            : "border-gray-200 focus:ring-gray-900/10 focus:border-gray-400"
          }`}
        />
        {selectedProduct && !qtyExceedsStock && (
          <p className="text-xs text-gray-400">
            Available: {selectedProduct.stock} units
          </p>
        )}
        {qtyExceedsStock && (
          <p className="text-xs text-red-500">
            Maximum quantity for this product is {selectedProduct!.stock}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">
          Price{" "}
          <span className="text-gray-400 font-normal">
            (Optional – defaults to ${selectedProduct?.price ?? 0})
          </span>
        </label>
        <input
          type="number"
          min={0}
          placeholder={String(selectedProduct?.price ?? 0)}
          value={customPrice}
          onChange={(e) => onCustomPriceChange(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition text-[#1E1F20] placeholder:text-[#1E1F20]/40"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">
          Note (Optional)
        </label>
        <textarea
          rows={3}
          placeholder="Add any notes about this sale..."
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition text-[#1E1F20] placeholder:text-[#1E1F20]/40"
        />
      </div>
    </div>
  );
}
