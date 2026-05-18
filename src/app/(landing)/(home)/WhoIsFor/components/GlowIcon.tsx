"use client";

import { motion } from "framer-motion";

interface GlowIconProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  children: React.ReactNode;
}

const sizeMap = {
  sm: "w-7 h-7",
  md: "w-8 h-8",
  lg: "w-10 h-10",
};

export default function GlowIcon({
  size = "md",
  color = "#10b981",
  children,
}: GlowIconProps) {
  return (
    <motion.div
      className={`${sizeMap[size]} rounded-full bg-[#f0f0f0] flex items-center justify-center relative cursor-pointer`}
      whileHover="glow"
      initial="idle"
    >
      <motion.span
        variants={{
          idle: { opacity: 0, scale: 0.85 },
          glow: { opacity: 1, scale: 1.35 },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`,
        }}
      />
      <motion.span
        variants={{
          idle: { scale: 1 },
          glow: { scale: 1.15 },
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative z-10 flex items-center justify-center"
      >
        {children}
      </motion.span>
    </motion.div>
  );
}
