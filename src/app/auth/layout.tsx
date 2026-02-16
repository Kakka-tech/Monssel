import Container from "@/components/layout/Container";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-[#f5f6f7] px-4">
      <Container>{children}</Container>
    </section>
  );
}
