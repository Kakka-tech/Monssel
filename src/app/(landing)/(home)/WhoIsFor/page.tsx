"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "Online Vendors",
    description:
      "Perfect for e-commerce businesses managing inventory and tracking sales across multiple platforms.",
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute top-4 left-6">
          <div className="w-8 h-8 rounded-full bg-[#f0f0f0] flex items-center justify-center">
            <svg
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#888"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
        </div>
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#d1fae5] rounded-full px-3 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
          <span className="text-[10px] text-[#065f46] font-medium">Active</span>
        </div>
        <div className="absolute bottom-6 right-6 flex items-center gap-1 bg-[#fafafa] border border-[#e8e8e8] rounded-lg px-2.5 py-1.5">
          <svg
            width="12"
            height="12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#888"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.06-.815-1.06-2.135 0-2.95a3.75 3.75 0 0 1 3.005-.634"
            />
          </svg>
          <span className="text-[10px] text-[#444]">Revenue</span>
        </div>
        <div className="absolute bottom-12 left-6">
          <div className="w-7 h-7 rounded-full bg-[#f0f0f0] flex items-center justify-center">
            <svg
              width="12"
              height="12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#888"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Social Media Sellers",
    description:
      "Built for Instagram and WhatsApp sellers who collect payments digitally and need simple tracking.",
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute top-3 left-1/2 -translate-x-16">
          <div className="bg-white border border-[#e8e8e8] rounded-lg px-3 py-1.5 text-[10px] text-[#666] shadow-sm">
            User 1
          </div>
        </div>
        <div className="absolute top-10 right-6">
          <div className="bg-white border border-[#e8e8e8] rounded-lg px-3 py-1.5 text-[10px] text-[#666] shadow-sm">
            User 2
          </div>
        </div>
        <div className="absolute bottom-8 right-8">
          <div className="bg-[#1E1F20] rounded-lg px-3 py-1.5 text-[10px] text-white shadow-sm">
            User 2
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
            <path
              d="M20 15 Q40 35 60 20"
              stroke="#e8e8e8"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <path
              d="M60 20 Q50 50 30 48"
              stroke="#e8e8e8"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          </svg>
        </div>
      </div>
    ),
  },
  {
    title: "Business Owners",
    description:
      "Designed for business owners who prefer simplicity over complex accounting tools and software.",
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <div className="w-7 h-7 rounded-full bg-[#f0f0f0] flex items-center justify-center">
            <svg
              width="13"
              height="13"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#888"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-[#f0f0f0] flex items-center justify-center">
            <svg
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#888"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-7 h-7 rounded-full bg-[#f0f0f0] flex items-center justify-center">
            <svg
              width="13"
              height="13"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#888"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
              />
            </svg>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Growing Business",
    description:
      "Ideal for small and growing businesses that want clear sales and profit tracking without complexity.",
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center gap-8">
        <div className="w-8 h-8 rounded-full bg-[#f0f0f0] flex items-center justify-center">
          <svg
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#888"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
        <div className="w-7 h-7 rounded-full bg-[#f0f0f0] flex items-center justify-center">
          <svg
            width="12"
            height="12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#888"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
      </div>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function WhoIsItFor() {
  return (
    <section className="w-full bg-[#fafafa] py-20 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1E1F20] tracking-tight mb-3">
            Who is Monssel is For
          </h2>
          <p className="text-sm text-[#888] max-w-sm mx-auto leading-relaxed">
            Built specifically for business owners who need simple, effective
            tools to manage their daily operations
          </p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              className="bg-white border border-[#ebebeb] rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {/* Illustration area */}
              <div className="h-44 relative bg-[#fafafa] border-b border-[#f0f0f0]">
                {card.illustration}
              </div>

              {/* Text */}
              <div className="px-5 py-4">
                <h3 className="text-sm font-semibold text-[#1E1F20] mb-1">
                  {card.title}
                </h3>
                <p className="text-xs text-[#888] leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
