import {
  ArrowLeftIcon,
  ShoppingBagIcon,
  BuildingStorefrontIcon,
  ArchiveBoxIcon,
  SparklesIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const businessTypes = [
  {
    name: "Retail Shop",
    icon: ShoppingBagIcon,
  },
  {
    name: "Mini Supermarket",
    icon: BuildingStorefrontIcon,
  },
  {
    name: "Provision Store",
    icon: ArchiveBoxIcon,
  },
  {
    name: "Fashion Vendor",
    icon: SparklesIcon,
  },
  {
    name: "Phone Seller",
    icon: DevicePhoneMobileIcon,
  },
  {
    name: "Small-Scale Trader",
    icon: ChartBarIcon,
  },
];

export default function StepTwo({
  selected,
  setSelected,
  onBack,
  onFinish,
}: {
  selected: string | null;
  setSelected: (val: string) => void;
  onBack: () => void;
  onFinish: () => void;
}) {
  return (
    /* Added py-10 for top/bottom breathing room and h-full/overflow-y-auto */
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-sm space-y-6 my-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-500"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back
        </button>

        <div>
          <span className="text-xs text-[#1E1F20] bg-[#1e1f200f] px-3 py-2 rounded-full">
            STEP 2 OF 2
          </span>

          <h1 className="text-xl font-semibold text-[#101828] mt-2">
            What type of business do you run?
          </h1>

          <p className="text-sm text-gray-500">
            This helps us customize your experience
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {businessTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selected === type.name;

            return (
              <button
                key={type.name}
                onClick={() => setSelected(type.name)}
                className={`p-4 rounded-xl border flex flex-col items-center text-center gap-3 transition ${
                  isSelected ? "border-black bg-gray-50" : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Icon className="w-5 h-5 text-[#101828]" />
                </div>
                <span className="text-sm font-medium text-[#101828]">{type.name}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={onFinish}
          disabled={!selected}
          className={`w-full py-3 rounded-xl text-sm font-medium transition ${
            selected ? "bg-black text-white active:scale-[0.98]" : "bg-[#1E1F20]/25 text-white cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
  );
}
