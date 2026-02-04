import Image from "next/image";

export default function HowItWorksPage() {
  return (
    <section className="w-full bg-[#1E1F20]  py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center text-3xl font-semibold text-[#FAFAFA]">
          How it works
        </h2>

        <div className="mb-10 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-[1fr_1.6fr] md:items-center">
            <div className="max-w-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black text-lg font-semibold text-white">
                1
              </div>

              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Inventory
              </h3>
              <p className="text-gray-600">
                Add products and manage your stock levels effortlessly in one
                place.
              </p>
            </div>

            <div className="relative w-full">
              <Image
                src="/images/how-it-works.png"
                alt="Inventory management"
                width={900}
                height={420}
                className="w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-black text-lg font-semibold text-white">
              2
            </div>

            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Record sales or payment links
            </h3>
            <p className="mb-6 text-gray-600">
              Quickly record sales or generate payment links for your customers.
            </p>

            <Image
              src="/images/record-sales.png"
              alt="Record sales"
              width={600}
              height={360}
              className="w-full"
            />
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-black text-lg font-semibold text-white">
              3
            </div>

            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Analytics
            </h3>
            <p className="mb-6 text-gray-600">
              See your profits, sales, and stock performance clearly at a
              glance.
            </p>

            <Image
              src="/images/analytics.png"
              alt="Analytics dashboard"
              width={600}
              height={360}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
