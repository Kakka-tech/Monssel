import Image from "next/image";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-[#FAFAFA] flex items-center justify-center px-6 overflow-hidden">
      <div className="w-full max-w-7xl flex items-center gap-20">
       
        <div className="hidden lg:block">
          <Image
            src="/images/auth-image.png"
            alt="Auth"
            width={540}
            height={660}
            priority
            className="h-140 w-auto rounded-3xl object-cover"
          />
        </div>

        <div className="w-full max-w-md py-6 flex items-center">
          {children}
        </div>

      </div>
    </div>
  );
}