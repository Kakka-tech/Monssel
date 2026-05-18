"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import NavLink from "./NavLink";
import Button from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/docs", label: "Docs" },
  { href: "/insights", label: "Insights" },
  { href: "/pricing", label: "Pricing" },
];

const menuVariants: Variants = {
  closed: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
  open: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
};

const linkContainerVariants: Variants = {
  closed: {},
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const linkVariants: Variants = {
  closed: { y: 24, opacity: 0 },
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const authVariants: Variants = {
  closed: { opacity: 0, y: 10 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const, delay: 0.38 },
  },
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-[#fafafa] relative z-50">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image
              src="/Icons/logo-dark.png"
              alt="Monssel"
              width={40}
              height={40}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <NavLink key={href} href={href}>
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Log in
            </Link>
            <Link href="/auth/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
              }}
              className="block h-[1.5px] w-6 bg-[#1E1F20] origin-center"
            />
            <motion.span
              animate={
                isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.2 }}
              className="block h-[1.5px] w-6 bg-[#1E1F20]"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
              }}
              className="block h-[1.5px] w-6 bg-[#1E1F20] origin-center"
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-30 bg-black/10 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 left-0 right-0 z-40 md:hidden bg-[#fafafa] pt-20 pb-8 px-6 shadow-xl"
            >
              <div className="h-px bg-[#e8e8e8] mb-8" />

              {/* Nav links */}
              <motion.nav
                variants={linkContainerVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col gap-1"
              >
                {navLinks.map(({ href, label }) => (
                  <motion.div key={href} variants={linkVariants}>
                    <Link
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="block py-3 text-2xl font-medium text-[#1E1F20] hover:text-[#666666] transition-colors tracking-tight"
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Auth */}
              <motion.div
                variants={authVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="mt-8 pt-6 border-t border-[#e8e8e8] flex items-center gap-4"
              >
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Log in
                </Link>
                <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                  <Button>Sign Up</Button>
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
