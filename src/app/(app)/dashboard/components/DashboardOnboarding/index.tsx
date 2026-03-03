import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function DashboardOnboarding() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[2rem] font-normal text-neutral-900 font-inter">
          Welcome to Monssel Stephen
        </h1>
        <p className="text-neutral-500 mt-1">
          Let’s get your business setup in 2 simple steps
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-neutral-200 rounded-xl p-6 bg-white">
          <div className="mb-4 h-10 w-10 rounded-lg bg-[#EFF6FF] flex items-center justify-center">
            <Image
              src="/icons/product.png"
              alt="Package Icon"
              width={24}
              height={24}
            />
          </div>
          <h3 className="font-semibold text-neutral-900 mb-1">
            Step 1: Add Products
          </h3>
          <p className="text-sm text-neutral-500 mb-4">
            Add the products you sell to your inventory
          </p>
          <button className="text-[#155DFC] text-sm font-medium">
            Get Started <ArrowRight size={16} className="inline-block ml-1" />
          </button>
        </div>

        <div className="border border-neutral-200 rounded-xl p-6 bg-white">
          <div className="mb-4 h-10 w-10 rounded-lg bg-[#EFF6FF] flex items-center justify-center">
            <Image
              src="/icons/sales.png" 
              alt="Package Icon"
              width={24}
              height={24}
            />
          </div>
          <h3 className="font-semibold text-neutral-900 mb-1">
            Step 2: Record Sales
          </h3>
          <p className="text-sm text-neutral-500 mb-4">
            Record the products you’ve sold
          </p>
          <button className="text-[#00A63E] text-sm font-medium">
            Record Now <ArrowRight size={16} className="inline-block ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
