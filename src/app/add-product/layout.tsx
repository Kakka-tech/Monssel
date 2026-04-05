"use client";

import Image from "next/image";

export default function AddProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-8">
      <div className="flex items-center gap-8 w-full max-w-5xl">
        <div className="w-full max-w-md shrink-0">{children}</div>
        <div className="hidden md:flex flex-1 items-end justify-center">
          <Image
            src="/illustrations/delivery-man.png"
            alt="Delivery illustration"
            width={600}
            height={700}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </div>
  );
}