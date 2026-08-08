import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import { calculateSellerPayout } from "@/lib/fees";
import {
  createTransferRecipient,
  initiateTransfer,
} from "@/lib/paystack/transfer";

// Use service role key — webhook runs outside user auth context
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY ?? "";

interface PaystackChargeMetadata {
  link_id?: string;
  product_id?: string;
  product_name?: string;
  quantity?: string | number;
  seller_id?: string;
}

interface PaystackChargeData {
  reference: string;
  amount: number;
  metadata?: PaystackChargeMetadata;
  customer?: { email?: string };
}

interface PaystackTransferData {
  reference: string;
}

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

  if (!verifySignature(rawBody, signature)) {
    console.warn("[webhook] Invalid signature — ignoring");
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const event: {
    event: string;
    data: PaystackChargeData | PaystackTransferData;
  } = JSON.parse(rawBody);

  if (event.event === "charge.success") {
    return handleChargeSuccess(event.data as PaystackChargeData);
  }

  if (
    event.event === "transfer.success" ||
    event.event === "transfer.failed" ||
    event.event === "transfer.reversed"
  ) {
    return handleTransferStatus(
      event.event,
      event.data as PaystackTransferData,
    );
  }

  return NextResponse.json({ received: true });
}

async function handleChargeSuccess(data: PaystackChargeData) {
  const reference: string = data.reference ?? "";
  const metadata = data.metadata ?? {};

  const link_id: string = metadata.link_id ?? "";
  const product_id: string = metadata.product_id ?? "";
  const product_name: string = metadata.product_name ?? "";
  const quantity: number = Number(metadata.quantity ?? 1);
  const seller_id: string = metadata.seller_id ?? "";

  if (!link_id || !seller_id) {
    return NextResponse.json({ received: true });
  }

  console.log(`[webhook] charge.success — link=${link_id} ref=${reference}`);

  const { data: existingLink } = await supabase
    .from("payment_links")
    .select("status")
    .eq("id", link_id)
    .single();

  if (existingLink?.status === "paid") {
    console.log("[webhook] Already processed — skipping");
    return NextResponse.json({ received: true });
  }

  const grossTotal = Number(data.amount) / 100;
  const netPayout = calculateSellerPayout(grossTotal);
  const pricePerUnit = Math.round((netPayout / quantity) * 100) / 100;
  const buyerEmail: string = data.customer?.email ?? "";

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

  const { error: saleErr } = await supabase.from("sales").insert({
    user_id: seller_id,
    product_id: product_id || null,
    product_name,
    quantity,
    price: pricePerUnit,
    total: netPayout,
    note: `Online sale via Monssel Pay — ${buyerEmail} (buyer paid ₦${grossTotal.toLocaleString()})`,
  });

  if (saleErr) {
    console.error("[webhook] Failed to record sale:", saleErr.message);
  }

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

      await supabase.from("stock_movements").insert({
        user_id: seller_id,
        product_id,
        type: "sale",
        quantity: -quantity,
        note: `Sold via Monssel Pay — ref: ${reference}`,
      });

      await supabase.from("notifications").insert({
        user_id: seller_id,
        type: "sale",
        title: "New sale 🎉",
        message: `${quantity}x ${product_name} sold — ₦${netPayout.toLocaleString()} sent to your account.`,
      });

      if (newStock <= product.low_stock_threshold && newStock > 0) {
        await supabase.from("notifications").insert({
          user_id: seller_id,
          type: "stock",
          title: "Low stock alert",
          message: `${product_name} is running low — only ${newStock} left in stock.`,
        });
      }

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
    await supabase.from("notifications").insert({
      user_id: seller_id,
      type: "sale",
      title: "New sale 🎉",
      message: `₦${netPayout.toLocaleString()} sent to your account for ${product_name}.`,
    });
  }

  console.log(`[webhook] Sale recorded, stock updated, seller notified`);

  await triggerPayout({
    sellerId: seller_id,
    saleReference: reference,
    payoutAmount: netPayout,
  });

  return NextResponse.json({ received: true });
}

/**
 * Gets a cached recipient code for this seller, or creates one via
 * createTransferRecipient and caches it on their profile. Recipient
 * codes are reusable across transfers, so we only want to create one
 * the first time a given seller gets paid out.
 */
async function getOrCreateRecipientCode(seller: {
  id: string;
  business_name: string | null;
  full_name: string | null;
  email: string | null;
  paystack_account_number: string | null;
  paystack_bank_code: string | null;
  paystack_recipient_code: string | null;
}): Promise<{ recipientCode: string | null; error: string | null }> {
  if (seller.paystack_recipient_code) {
    return { recipientCode: seller.paystack_recipient_code, error: null };
  }

  if (!seller.paystack_account_number || !seller.paystack_bank_code) {
    return {
      recipientCode: null,
      error: "Seller has no bank account connected",
    };
  }

  try {
    const recipient = await createTransferRecipient({
      name: seller.business_name || seller.full_name || "Monssel Seller",
      accountNumber: seller.paystack_account_number,
      bankCode: seller.paystack_bank_code,
      email: seller.email ?? undefined,
    });

    await supabase
      .from("profiles")
      .update({ paystack_recipient_code: recipient.recipient_code })
      .eq("id", seller.id);

    return { recipientCode: recipient.recipient_code, error: null };
  } catch (err) {
    return {
      recipientCode: null,
      error:
        err instanceof Error ?
          err.message
        : "Failed to create transfer recipient",
    };
  }
}

async function triggerPayout({
  sellerId,
  saleReference,
  payoutAmount,
}: {
  sellerId: string;
  saleReference: string;
  payoutAmount: number;
}) {
  if (payoutAmount <= 0) {
    console.warn(
      `[payout] Computed payout <= 0 for ref=${saleReference}, skipping`,
    );
    return;
  }

  const { data: seller, error: sellerErr } = await supabase
    .from("profiles")
    .select(
      "id, email, business_name, full_name, paystack_account_number, paystack_bank_code, paystack_recipient_code",
    )
    .eq("id", sellerId)
    .single();

  if (sellerErr || !seller) {
    console.error(
      `[payout] Could not load seller ${sellerId}:`,
      sellerErr?.message,
    );
    return;
  }

  const { recipientCode, error: recipientErr } =
    await getOrCreateRecipientCode(seller);

  if (!recipientCode) {
    console.error(
      `[payout] Recipient error for seller ${sellerId}:`,
      recipientErr,
    );
    await supabase.from("notifications").insert({
      user_id: sellerId,
      type: "payout",
      title: "Payout couldn't be sent",
      message: `We couldn't send your payout for ₦${payoutAmount.toLocaleString()} — please check your connected bank account.`,
    });
    return;
  }

  const transferReference = `payout_${saleReference}`;

  const { data: existingPayout } = await supabase
    .from("payouts")
    .select("id")
    .eq("transfer_reference", transferReference)
    .maybeSingle();

  if (existingPayout) {
    console.log(`[payout] Already attempted for ${saleReference}, skipping`);
    return;
  }

  try {
    // NOTE: initiateTransfer expects amount in NAIRA (it converts to
    // kobo internally), unlike the rest of this codebase which mostly
    // works in kobo. Passing payoutAmount directly here, not *100.
    const transfer = await initiateTransfer({
      amount: payoutAmount,
      recipientCode,
      reference: transferReference,
      reason: `Monssel sale payout — ${saleReference}`,
    });

    await supabase.from("payouts").insert({
      user_id: sellerId,
      sale_reference: saleReference,
      transfer_reference: transferReference,
      transfer_code: transfer.transfer_code,
      amount: payoutAmount,
      status: transfer.status === "success" ? "success" : "pending",
    });

    console.log(
      `[payout] Transfer initiated for ${saleReference} — status=${transfer.status}`,
    );

    if (transfer.status === "success") {
      await supabase.from("notifications").insert({
        user_id: sellerId,
        type: "payout",
        title: "Payout sent 💸",
        message: `₦${payoutAmount.toLocaleString()} has been sent to your bank account.`,
      });
    }
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Transfer failed to initiate";

    await supabase.from("payouts").insert({
      user_id: sellerId,
      sale_reference: saleReference,
      transfer_reference: transferReference,
      amount: payoutAmount,
      status: "failed",
      failure_reason: message,
    });

    console.error(
      `[payout] Transfer initiation failed for ${saleReference}:`,
      message,
    );

    await supabase.from("notifications").insert({
      user_id: sellerId,
      type: "payout",
      title: "Payout failed",
      message: `Your payout of ₦${payoutAmount.toLocaleString()} couldn't be sent. We'll retry — contact support if this continues.`,
    });
  }
}

async function handleTransferStatus(
  eventType: string,
  data: PaystackTransferData,
) {
  const transferReference: string = data.reference ?? "";

  if (!transferReference) {
    return NextResponse.json({ received: true });
  }

  const { data: payout } = await supabase
    .from("payouts")
    .select("id, user_id, amount, status")
    .eq("transfer_reference", transferReference)
    .single();

  if (!payout || payout.status === "success") {
    return NextResponse.json({ received: true });
  }

  const newStatus =
    eventType === "transfer.success" ? "success"
    : eventType === "transfer.reversed" ? "reversed"
    : "failed";

  await supabase
    .from("payouts")
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq("id", payout.id);

  if (newStatus === "success") {
    await supabase.from("notifications").insert({
      user_id: payout.user_id,
      type: "payout",
      title: "Payout sent 💸",
      message: `₦${Number(payout.amount).toLocaleString()} has been sent to your bank account.`,
    });
  } else {
    await supabase.from("notifications").insert({
      user_id: payout.user_id,
      type: "payout",
      title: newStatus === "reversed" ? "Payout reversed" : "Payout failed",
      message: `Your payout of ₦${Number(payout.amount).toLocaleString()} ${
        newStatus === "reversed" ? "was reversed" : "failed"
      }. We'll look into it — contact support if this continues.`,
    });
  }

  console.log(
    `[webhook] ${eventType} — payout ${payout.id} marked ${newStatus}`,
  );
  return NextResponse.json({ received: true });
}
