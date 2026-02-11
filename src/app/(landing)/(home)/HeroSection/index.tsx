import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";

export default function HeroSection() {
  return (
    <section className="bg-[#fafafa] overflow-hidden">
      <Container className="py-5">
        <div className="max-w-xl">
          <h1 className="text-3xl text-[#1E1F20] font-semibold leading-snug md:text-4xl">
            Track sales, stock, and profit without accounting stress.
          </h1>

          <p className="mt-4 text-sm text-[#666] md:text-base">
            A simple daily business tool built for small business owners, not
            accountants.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>

            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-black"
            >
              Log In
            </Link>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Image
            src="/images/hero-dashboard.png"
            alt="Monssel dashboard preview"
            width={2000}
            height={1157}
            priority
            className="w-full max-w-5xl -rotate-13 origin-top pointer-events-none"
          />
        </div>
      </Container>
    </section>
  );
}
