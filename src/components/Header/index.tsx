import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";
import Button from "@/components/ui/Button";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-8 flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/icons/logo.png"
            alt="Monssel"
            width={52}
            height={52}
            className="h-6 w-auto"
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/docs">Docs</NavLink>
          <NavLink href="/insights">Insights</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Login – text only */}
          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            Log in
          </Link>

          {/* Sign up – default Button */}
          <Link href="/signup">
            <Button className="flex-none">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
