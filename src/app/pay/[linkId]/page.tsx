import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import BuyerCheckout from "./BuyerCheckout";

export default async function PayPage({
  params,
}: {
  params: Promise<{ linkId: string }>;
}) {
  const { linkId } = await params;
  const supabase = await createClient();

  const { data: link } = await supabase
    .from("payment_links")
    .select("*")
    .eq("id", linkId)
    .single();

  if (!link) notFound();

  return (
    <BuyerCheckout
      link={{
        ...link,
        provider: link.provider as "paystack" | "flutterwave",
        status: link.status as "active" | "paid" | "expired",
      }}
    />
  );
}