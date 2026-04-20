import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function DashboardOnboarding() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[2rem] font-normal text-neutral-900 dark:text-white font-inter">
          Welcome to Monssel Stephen
        </h1>
        <p className="text-neutral-500 dark:text-[#A0A0A0] mt-1">
          Let&apos;s get your business setup in 2 simple steps
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-neutral-200 dark:border-[#2E2E2E] rounded-xl p-6 bg-white dark:bg-[#1C1C1C]">
          <div className="mb-4 h-10 w-10 rounded-lg bg-[#EFF6FF] dark:bg-blue-950/40 flex items-center justify-center">
            <Image
              src="/icons/product.png"
              alt="Package Icon"
              width={24}
              height={24}
            />
          </div>
          <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
            Step 1: Add Products
          </h3>
          <p className="text-sm text-neutral-500 dark:text-[#A0A0A0] mb-4">
            Add the products you sell to your inventory
          </p>
          <button className="text-[#155DFC] text-sm font-medium">
            Get Started <ArrowRight size={16} className="inline-block ml-1" />
          </button>
        </div>

        <div className="border border-neutral-200 dark:border-[#2E2E2E] rounded-xl p-6 bg-white dark:bg-[#1C1C1C]">
          <div className="mb-4 h-10 w-10 rounded-lg bg-[#EFF6FF] dark:bg-blue-950/40 flex items-center justify-center">
            <Image
              src="/icons/sales.png"
              alt="Package Icon"
              width={24}
              height={24}
            />
          </div>
          <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
            Step 2: Record Sales
          </h3>
          <p className="text-sm text-neutral-500 dark:text-[#A0A0A0] mb-4">
            Record the products you&apos;ve sold
          </p>
          <button className="text-[#00A63E] text-sm font-medium">
            Record Now <ArrowRight size={16} className="inline-block ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
