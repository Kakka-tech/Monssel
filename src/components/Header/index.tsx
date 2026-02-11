import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";
import Button from "@/components/ui/Button";

export default function Header() {
  return (
    <header className="w-full bg-[#fafafa]">
      <div className="mx-10 grid h-16 max-w-7xl grid-cols-3 items-center px-6">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/icons/logo.png"
              alt="Monssel"
              width={52}
              height={52}
              className=""
              priority
            />
          </Link>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/docs">Docs</NavLink>
          <NavLink href="/insights">Insights</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            Log in
          </Link>

          <Link href="/signup">
            <Button className="flex-none">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
