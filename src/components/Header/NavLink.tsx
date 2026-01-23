"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm transition-colors ${
        isActive
          ? "text-[#1E1F20] font-medium"
          : "text-[#666666] hover:text-[#1E1F20]"
      }`}
    >
      {children}
    </Link>
  );
}
