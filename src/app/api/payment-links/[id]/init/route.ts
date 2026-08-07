import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const MONSSEL_FEE_RATE = 0.015;
const PAYSTACK_FEE_RATE = 0.015;
const PAYSTACK_FEE_CAP = 2000;
const TRANSFER_FEE = 10;

export function calculateSellerPayout(grossAmount: number): number {
  const paystackFee = Math.min(
    Math.round(grossAmount * PAYSTACK_FEE_RATE * 100) / 100,
    PAYSTACK_FEE_CAP,
  );
  const monsselFee = Math.round(grossAmount * MONSSEL_FEE_RATE * 100) / 100;
  return (
    Math.round((grossAmount - paystackFee - monsselFee - TRANSFER_FEE) * 100) /
    100
  );
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();
  const body = await request.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  const { data: link, error } = await supabase
    .from("payment_links")
    .select("*")
    .eq("id", id)
    .eq("status", "active")
    .single();

  if (error || !link) {
    return NextResponse.json(
      { error: "Link not found or inactive" },
      { status: 404 },
    );
  }

  const grossAmount = link.price * link.quantity;
  const amountKobo = Math.round(grossAmount * 100);
  const reference = `monssel_${link.id}_${Date.now()}`;

  await supabase.from("payment_links").update({ reference }).eq("id", link.id);

  // These get sent back to the client so BuyerCheckout can attach them
  // as metadata on the Paystack transaction. The webhook depends on
  // link_id + seller_id being present in event.data.metadata — without
  // them it can't tell this charge apart from a random Paystack event
  // and silently ignores it (which is why sales/stock/notifications
  // weren't updating even though the payment succeeded).
  return NextResponse.json({
    reference,
    amount: amountKobo,
    sellerPayout: calculateSellerPayout(grossAmount),
    metadata: {
      link_id: link.id,
      product_id: link.product_id ?? "",
      product_name: link.product_name,
      quantity: link.quantity,
      seller_id: link.user_id,
    },
  });
}
