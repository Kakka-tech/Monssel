import Link from "next/link";
import { Twitter, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1E1F20] text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h2 className="mb-4 text-3xl font-semibold">
          Ready to simplify your business tracking?
        </h2>

        <p className="mx-auto mb-8 max-w-xl text-sm text-gray-400">
          Join hundreds of business owners who have switched to stress-free
          sales and inventory management.
        </p>

        <div className="mb-4 flex flex-wrap justify-center gap-4">
          <Link
            href="#"
            className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-medium text-black"
          >
            Get Started for Free →
          </Link>

          <Link
            href="#"
            className="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 text-sm font-medium"
          >
            View Demo
          </Link>
        </div>

        <p className="text-xs text-[#D1D5DC]">
          No credit card required • Free 14-day trial • Cancel anytime
        </p>
      </div>

      <div className="">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center space-x-2 text-lg font-semibold">
                <Image
                  src="/icons/logo.png" 
                  alt="Monssel Logo"
                  width={24}
                  height={24} 
                    className="object-contain invert"
                />
                <span>Monssel</span>
              </div>

              <p className="mb-4 text-sm text-[#D1D5DC]">
                Simple business tool built for small business owners, not
                accountants.
              </p>

              <div className="flex gap-4 text-[#D1D5DC]">
                <Twitter className="h-4 w-4" />
                <Linkedin className="h-4 w-4" />
                <Instagram className="h-4 w-4" />
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-medium">Product</h4>
              <ul className="space-y-2 text-sm text-[#D1D5DC]">
                <li>
                  <Link href="#">Features</Link>
                </li>
                <li>
                  <Link href="#">Integrations</Link>
                </li>
                <li>
                  <Link href="#">Pricing</Link>
                </li>
                <li>
                  <Link href="#">Demo</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-medium">Resources</h4>
              <ul className="space-y-2 text-sm text-[#D1D5DC]">
                <li>
                  <Link href="#">Documentation</Link>
                </li>
                <li>
                  <Link href="#">Guides</Link>
                </li>
                <li>
                  <Link href="#">Blog</Link>
                </li>
                <li>
                  <Link href="#">Support</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-medium">Company</h4>
              <ul className="space-y-2 text-sm text-[#D1D5DC]">
                <li>
                  <Link href="#">About Us</Link>
                </li>
                <li>
                  <Link href="#">Contact</Link>
                </li>
                <li>
                  <Link href="#">Careers</Link>
                </li>
                <li>
                  <Link href="#">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="">
          <div className="mx-auto max-w-6xl px-4 py-6">
            <div className="flex flex-col gap-4 text-xs text-[#D1D5DC] md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <p>© 2026</p>

                <div className="flex items-center gap-2">
                  <Image
                    src="/icons/kakka.png"
                    alt="Kakka icon"
                    width={14}
                    height={14}
                    className="opacity-80"
                  />
                  <span>Powered by Kakka</span>
                </div>
              </div>

              <p>hello@monssel.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
