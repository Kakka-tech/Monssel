import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY ?? "";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ linkId: string }> },
) {
  const { linkId } = await params;
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // ── 1. Fetch the payment link ─────────────────────────────────────────────
  const supabase = await createClient();

  const { data: link, error: linkError } = await supabase
    .from("payment_links")
    .select("*, profiles!payment_links_user_id_fkey(paystack_subaccount_code)")
    .eq("id", linkId)
    .single();

  if (linkError || !link) {
    return NextResponse.json(
      { error: "Payment link not found" },
      { status: 404 },
    );
  }

  if (link.status !== "active") {
    return NextResponse.json(
      {
        error:
          link.status === "paid" ?
            "This link has already been paid"
          : "This link has expired",
      },
      { status: 400 },
    );
  }

  const subaccount = link.profiles?.paystack_subaccount_code;
  if (!subaccount) {
    return NextResponse.json(
      { error: "Seller has not connected a payment account" },
      { status: 400 },
    );
  }

  // ── 2. Initialise Paystack transaction ────────────────────────────────────
  const amountKobo = Math.round(link.price * link.quantity * 100);
  const reference = `monssel_${linkId}_${Date.now()}`;

  const paystackRes = await fetch(
    "https://api.paystack.co/transaction/initialize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amountKobo,
        currency: "NGN",
        reference,
        subaccount,
        // Monssel takes 0% — 100% goes to seller subaccount
        // Adjust bearer and transaction_charge if you want a platform fee
        bearer: "subaccount",
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/pay/${linkId}/success`,
        metadata: {
          link_id: linkId,
          product_id: link.product_id,
          product_name: link.product_name,
          quantity: link.quantity,
          seller_id: link.user_id,
          cancel_action: `${process.env.NEXT_PUBLIC_APP_URL}/pay/${linkId}/declined`,
        },
      }),
    },
  );

  const paystackData = await paystackRes.json();

  if (!paystackData.status) {
    console.error("[init] Paystack error:", paystackData);
    return NextResponse.json(
      { error: paystackData.message ?? "Failed to initialize payment" },
      { status: 502 },
    );
  }

  // ── 3. Save reference + buyer email to the link ───────────────────────────
  await supabase
    .from("payment_links")
    .update({ reference, buyer_email: email })
    .eq("id", linkId);

  return NextResponse.json({
    reference: paystackData.data.reference,
    amount: amountKobo,
    subaccount,
    // authorization_url is used if you want redirect flow instead of popup
    authorization_url: paystackData.data.authorization_url,
  });
}
