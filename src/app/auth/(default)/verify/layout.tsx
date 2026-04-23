export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen w-full bg-[#FAFAFA]">
      {children}
    </section>
  );
}