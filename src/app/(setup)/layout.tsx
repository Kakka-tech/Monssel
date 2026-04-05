import Image from "next/image";

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl flex items-center justify-center gap-20">
        <div className="hidden lg:flex shrink-0">
          <Image
            src="/images/auth-image.png"
            alt="Auth"
            width={540}
            height={660}
            priority
            className="h-165 w-auto rounded-3xl object-cover" 
          />
        </div>

        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
