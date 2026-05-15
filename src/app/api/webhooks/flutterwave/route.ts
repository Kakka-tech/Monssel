import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("verif-hash") ?? "";
  const secret = process.env.FLUTTERWAVE_WEBHOOK_HASH ?? "";

  if (signature !== secret) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event !== "charge.completed" || event.data.status !== "successful") {
    return NextResponse.json({ received: true });
  }

  const txRef = event.data.tx_ref;
  const supabase = await createClient();

  const { data: link, error } = await supabase
    .from("payment_links")
    .select("*")
    .eq("reference", txRef)
    .eq("status", "active")
    .single();

  if (error || !link) return NextResponse.json({ received: true });

  const total = link.price * link.quantity;

  await Promise.all([
    supabase.from("sales").insert({
      user_id: link.user_id,
      product_id: link.product_id,
      product_name: link.product_name,
      quantity: link.quantity,
      price: link.price,
      total,
      note: `Payment link sale via Flutterwave — ${link.buyer_email}`,
    }),
    supabase.rpc("decrement_stock", {
      p_product_id: link.product_id,
      p_quantity: link.quantity,
    }),
    supabase
      .from("payment_links")
      .update({ status: "paid", paid_at: new Date().toISOString() })
      .eq("id", link.id),
    supabase.from("notifications").insert({
      user_id: link.user_id,
      type: "sale",
      title: "Payment Received!",
      message: `${link.quantity}x ${link.product_name} sold for ₦${total.toLocaleString()} via Flutterwave`,
    }),
  ]);

  return NextResponse.json({ received: true });
}