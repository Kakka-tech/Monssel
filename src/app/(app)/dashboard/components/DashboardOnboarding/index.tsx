"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useFetch } from "@/lib/usefetch";

interface Profile {
  full_name: string | null;
}

export default function DashboardOnboarding() {
  const { data: profile } = useFetch<Profile>("/api/profile");
  const firstName = profile?.full_name?.split(" ")[0] ?? "";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[2rem] font-normal text-neutral-900 dark:text-white font-inter">
          Welcome to Monssel{firstName ? `, ${firstName}` : ""}
        </h1>
        <p className="text-neutral-500 dark:text-[#A0A0A0] mt-1">
          Let&apos;s get your business setup in 2 simple steps
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Link
          href="/inventory"
          className="border border-neutral-200 dark:border-[#2E2E2E] rounded-xl p-6 bg-white dark:bg-[#1C1C1C] hover:shadow-md hover:border-neutral-300 dark:hover:border-[#3E3E3E] transition-all block"
        >
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
          <span className="text-[#155DFC] text-sm font-medium flex items-center gap-1">
            Get Started <ArrowRight size={16} />
          </span>
        </Link>

        <Link
          href="/record-sales"
          className="border border-neutral-200 dark:border-[#2E2E2E] rounded-xl p-6 bg-white dark:bg-[#1C1C1C] hover:shadow-md hover:border-neutral-300 dark:hover:border-[#3E3E3E] transition-all block"
        >
          <div className="mb-4 h-10 w-10 rounded-lg bg-[#EFF6FF] dark:bg-blue-950/40 flex items-center justify-center">
            <Image
              src="/icons/sales.png"
              alt="Sales Icon"
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
          <span className="text-[#00A63E] text-sm font-medium flex items-center gap-1">
            Record Now <ArrowRight size={16} />
          </span>
        </Link>
      </div>
    </div>
  );
}
