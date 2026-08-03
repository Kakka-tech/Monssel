import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

// Use service role key — webhook runs outside user auth context
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY ?? "";

// ─── Verify Paystack webhook signature ────────────────────────────────────────
function verifySignature(body: string, signature: string): boolean {
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET)
    .update(body)
    .digest("hex");
  return hash === signature;
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature") ?? "";

  // ── 1. Verify the request is genuinely from Paystack ─────────────────────
  if (!verifySignature(rawBody, signature)) {
    console.warn("[webhook] Invalid signature — ignoring");
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const event = JSON.parse(rawBody);

  // ── 2. Only handle successful charges ────────────────────────────────────
  if (event.event !== "charge.success") {
    return NextResponse.json({ received: true });
  }

  const data = event.data;
  const reference: string = data.reference ?? "";
  const metadata = data.metadata ?? {};

  const link_id: string = metadata.link_id ?? "";
  const product_id: string = metadata.product_id ?? "";
  const product_name: string = metadata.product_name ?? "";
  const quantity: number = Number(metadata.quantity ?? 1);
  const seller_id: string = metadata.seller_id ?? "";

  if (!link_id || !seller_id) {
    // Not a Monssel payment link transaction — ignore safely
    return NextResponse.json({ received: true });
  }

  console.log(`[webhook] charge.success — link=${link_id} ref=${reference}`);

  // ── 3. Idempotency — skip if already processed ───────────────────────────
  const { data: existingLink } = await supabase
    .from("payment_links")
    .select("status")
    .eq("id", link_id)
    .single();

  if (existingLink?.status === "paid") {
    console.log("[webhook] Already processed — skipping");
    return NextResponse.json({ received: true });
  }

  const pricePerUnit = Number(data.amount) / 100 / quantity; // convert kobo → naira
  const total = Number(data.amount) / 100;
  const buyerEmail: string = data.customer?.email ?? "";

  // ── 4. Run all DB writes — mark paid, record sale, decrement stock ────────
  // Mark payment link as paid
  const { error: linkErr } = await supabase
    .from("payment_links")
    .update({
      status: "paid",
      reference,
      buyer_email: buyerEmail,
      paid_at: new Date().toISOString(),
    })
    .eq("id", link_id);

  if (linkErr) {
    console.error("[webhook] Failed to update payment link:", linkErr.message);
    return new NextResponse("DB error", { status: 500 });
  }

  // Record the sale
  const { error: saleErr } = await supabase.from("sales").insert({
    user_id: seller_id,
    product_id: product_id || null,
    product_name,
    quantity,
    price: pricePerUnit,
    total,
    note: `Online sale via Monssel Pay — ${buyerEmail}`,
  });

  if (saleErr) {
    console.error("[webhook] Failed to record sale:", saleErr.message);
    // Don't return 500 — link is already marked paid, we'll log and continue
  }

  // Decrement stock if product_id exists
  if (product_id) {
    const { data: product } = await supabase
      .from("products")
      .select("stock, low_stock_threshold, name")
      .eq("id", product_id)
      .single();

    if (product) {
      const newStock = Math.max(0, product.stock - quantity);

      await supabase
        .from("products")
        .update({ stock: newStock })
        .eq("id", product_id);

      // Record stock movement
      await supabase.from("stock_movements").insert({
        user_id: seller_id,
        product_id,
        type: "sale",
        quantity: -quantity,
        note: `Sold via Monssel Pay — ref: ${reference}`,
      });

      // ── 5. Notify seller ───────────────────────────────────────────────────
      // Sale notification
      await supabase.from("notifications").insert({
        user_id: seller_id,
        type: "sale",
        title: "New sale 🎉",
        message: `${quantity}x ${product_name} sold for ₦${total.toLocaleString()} via payment link.`,
      });

      // Low stock notification if threshold breached
      if (newStock <= product.low_stock_threshold && newStock > 0) {
        await supabase.from("notifications").insert({
          user_id: seller_id,
          type: "stock",
          title: "Low stock alert",
          message: `${product_name} is running low — only ${newStock} left in stock.`,
        });
      }

      // Out of stock notification
      if (newStock === 0) {
        await supabase.from("notifications").insert({
          user_id: seller_id,
          type: "stock",
          title: "Out of stock",
          message: `${product_name} is now out of stock. Restock to keep selling.`,
        });
      }
    }
  } else {
    // No product_id (service/custom link) — still notify about the sale
    await supabase.from("notifications").insert({
      user_id: seller_id,
      type: "sale",
      title: "New sale 🎉",
      message: `Payment of ₦${total.toLocaleString()} received for ${product_name}.`,
    });
  }

  console.log(`[webhook] Done — sale recorded, stock updated, seller notified`);
  return NextResponse.json({ received: true });
}