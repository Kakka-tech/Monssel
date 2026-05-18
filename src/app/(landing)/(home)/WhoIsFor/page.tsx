"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import OnlineVendorsIllustration from "./components/OnlineVendors";
import SocialMediaIllustration from "./components/SocialMedia";
import BusinessOwnersIllustration from "./components/BusinessOwners";
import GrowingBusinessIllustration from "./components/GrowingBusiness";

const cards = [
  {
    title: "Online Vendors",
    description:
      "Perfect for e-commerce businesses managing inventory and tracking sales across multiple platforms.",
    Illustration: OnlineVendorsIllustration,
  },
  {
    title: "Social Media Sellers",
    description:
      "Built for Instagram and WhatsApp sellers who collect payments digitally and need simple tracking.",
    Illustration: SocialMediaIllustration,
  },
  {
    title: "Business Owners",
    description:
      "Designed for business owners who prefer simplicity over complex accounting tools and software.",
    Illustration: BusinessOwnersIllustration,
  },
  {
    title: "Growing Business",
    description:
      "Ideal for small and growing businesses that want clear sales and profit tracking without complexity.",
    Illustration: GrowingBusinessIllustration,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
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
    <section className="w-full bg-[#fafafa] py-24 px-10">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Who it's for"
          title="Who Monssel is For"
          subtitle="Built specifically for business owners who need simple, effective tools to manage their daily operations"
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {cards.map(({ title, description, Illustration }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="group bg-white border border-[#ebebeb] rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="h-44 relative bg-[#fafafa] border-b border-[#f0f0f0]">
                <Illustration />
              </div>
              <div className="px-5 py-4">
                <h3 className="text-sm font-semibold text-[#1E1F20] mb-1">
                  {title}
                </h3>
                <p className="text-xs text-[#888] leading-relaxed">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
