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

  return NextResponse.json({
    reference,
    amount: amountKobo,
    sellerPayout: calculateSellerPayout(grossAmount),
  });
}
