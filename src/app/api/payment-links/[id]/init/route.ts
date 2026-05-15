import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY ?? "";
const FLUTTERWAVE_SECRET = process.env.FLUTTERWAVE_SECRET_KEY ?? "";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { email } = await request.json();

  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

  // Use service role to read payment link without auth (buyer is not logged in)
  const supabase = await createClient();

  const { data: link, error } = await supabase
    .from("payment_links")
    .select("*")
    .eq("id", id)
    .eq("status", "active")
    .single();

  if (error || !link) {
    return NextResponse.json({ error: "Payment link not found or already used" }, { status: 404 });
  }

  const amountKobo = Math.round(link.price * link.quantity * 100); // kobo for Paystack
  const amountMain = link.price * link.quantity; // main unit for Flutterwave

  if (link.provider === "paystack") {
    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amountKobo,
        currency: "NGN",
        reference: `monssel_${id}_${Date.now()}`,
        callback_url: `${APP_URL}/pay/${id}/success`,
        metadata: { payment_link_id: id },
      }),
    });

    const data = await res.json();
    if (!data.status) {
      return NextResponse.json({ error: data.message }, { status: 502 });
    }

    // Save reference and buyer email
    await supabase
      .from("payment_links")
      .update({ reference: data.data.reference, buyer_email: email })
      .eq("id", id);

    return NextResponse.json({ url: data.data.authorization_url });
  }

  if (link.provider === "flutterwave") {
    const res = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FLUTTERWAVE_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tx_ref: `monssel_${id}_${Date.now()}`,
        amount: amountMain,
        currency: "NGN",
        redirect_url: `${APP_URL}/pay/${id}/success`,
        customer: { email },
        meta: { payment_link_id: id },
        customizations: {
          title: link.product_name,
          description: `Payment for ${link.quantity}x ${link.product_name}`,
        },
      }),
    });

    const data = await res.json();
    if (data.status !== "success") {
      return NextResponse.json({ error: data.message }, { status: 502 });
    }

    await supabase
      .from("payment_links")
      .update({ reference: data.data.tx_ref, buyer_email: email })
      .eq("id", id);

    return NextResponse.json({ url: data.data.link });
  }

  return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
}