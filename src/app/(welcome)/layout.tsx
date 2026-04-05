"use client";
import React from "react";
import Image from "next/image";

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-2">
        
        <div className="w-full max-w-xl shrink-0 z-20">
          <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/60 p-8 shadow-2xl">
            <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </div>

        <div className="hidden md:block shrink-0 md:-ml-17 z-10">
          <Image
            src="/illustrations/welcome-illustration.png"
            alt="Welcome"
            width={480} 
            height={480}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </div>
  );
}
