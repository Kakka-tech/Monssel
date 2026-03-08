"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { CubeIcon, LinkIcon } from "@heroicons/react/24/outline";

export default function SetupPage() {
  return (
    <div className="w-full max-w-md bg-white border rounded-2xl p-6 shadow-sm space-y-6">
      <button className="flex items-center gap-2 text-sm text-gray-500">
        <ArrowLeftIcon className="w-4 h-4" />
        Back
      </button>

      <div>
        <h1 className="text-xl font-semibold text-[#101828]">How would you like to set up?</h1>
        <p className="text-sm text-[#4A5565]">
          Choose the method that works best for you
        </p>
      </div>

      <button className="w-full flex gap-4 p-4 border rounded-xl hover:bg-gray-50 items-start">
        <div className="p-2 bg-[#DBEAFE] rounded-lg">
          <CubeIcon className="w-5 h-5 text-[#155DFC]" strokeWidth={2} />
        </div>

        <div className="text-left">
          <p className="font-medium text-[#101828]">Manual Mode</p>
          <p className="text-sm text-[#4A5565]">
            Add your products manually with prices and stock quantities
          </p>
        </div>
      </button>

      <div className="w-full flex gap-4 p-4 border rounded-xl bg-gray-50 opacity-70 items-start">
        <div className="p-2 bg-[#F3E8FF] rounded-lg">
          <LinkIcon className="w-5 h-5 text-[#9810FA]" strokeWidth={2} />
        </div>

        <div>
          <p className="font-medium text-[#101828]">Integration</p>
          <p className="text-sm text-gray-500">
            Connect with Kora or Strapi to import your products
          </p>
          <span className="text-xs text-[#9810FA]">Coming soon</span>
        </div>
      </div>
    </div>
  );
}
