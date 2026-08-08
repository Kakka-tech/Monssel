import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY ?? "";

const MONSSEL_FEE_RATE = 0.015;
const TRANSFER_FEE = 10;

const PAYSTACK_API = "https://api.paystack.co";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface PaystackCustomer {
  email?: string;
}

interface PaystackMetadata {
  link_id?: string;
  product_id?: string;
  product_name?: string;
  quantity?: number | string;
  seller_id?: string;
}

interface PaystackChargeData {
  reference?: string;
  amount?: number;
  fees?: number;
  metadata?: PaystackMetadata;
  customer?: PaystackCustomer;
}

interface PaystackTransferData {
  reference?: string;
  transfer_code?: string;
  failures?: string | null;
  reason?: string | null;
}

interface PaystackWebhookEvent {
  event: string;
  data: PaystackChargeData | PaystackTransferData;
}

interface PaystackRecipient {
  recipient_code: string;
  active: boolean;
  name: string;
  currency: string;
  details: {
    account_number: string;
    account_name: string | null;
    bank_code: string;
    bank_name: string;
  };
}

interface PaystackTransfer {
  reference: string;
  amount: number;
  currency: string;
  status: string;
  transfer_code: string;
  id: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// PAYSTACK API HELPER
// ─────────────────────────────────────────────────────────────────────────────

async function paystackRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  if (!PAYSTACK_SECRET) {
    throw new Error("PAYSTACK_SECRET_KEY is not configured");
  }

  const response = await fetch(`${PAYSTACK_API}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET}`,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  const result: {
    status: boolean;
    message: string;
    data: T;
  } = await response.json();

  if (!response.ok || !result.status) {
    throw new Error(result.message || "Paystack request failed");
  }

  return result.data;
}

// ─────────────────────────────────────────────────────────────────────────────
// VERIFY PAYSTACK WEBHOOK SIGNATURE
// ─────────────────────────────────────────────────────────────────────────────

function verifySignature(body: string, signature: string): boolean {
  if (!PAYSTACK_SECRET || !signature) {
    return false;
  }

  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET)
    .update(body)
    .digest("hex");

  const expected = Buffer.from(hash, "utf8");
  const received = Buffer.from(signature, "utf8");

  if (expected.length !== received.length) {
    return false;
  }

  return crypto.timingSafeEqual(expected, received);
}

// ─────────────────────────────────────────────────────────────────────────────
// CREATE / GET PAYSTACK RECIPIENT
// ─────────────────────────────────────────────────────────────────────────────

async function getOrCreateRecipient(sellerId: string): Promise<string> {
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select(
      `
        id,
        full_name,
        business_name,
        business_email,
        paystack_bank_code,
        paystack_account_number,
        paystack_recipient_code
      `,
    )
    .eq("id", sellerId)
    .single();

  if (profileError || !profile) {
    throw new Error(
      `Seller profile not found: ${profileError?.message ?? "unknown error"}`,
    );
  }

  // Reuse existing recipient.
  if (profile.paystack_recipient_code) {
    return profile.paystack_recipient_code;
  }

  if (!profile.paystack_bank_code || !profile.paystack_account_number) {
    throw new Error("Seller has not configured a Paystack bank account.");
  }

  const recipientName =
    profile.business_name || profile.full_name || "Monssel Seller";

  const recipient = await paystackRequest<PaystackRecipient>(
    "/transferrecipient",
    {
      method: "POST",
      body: JSON.stringify({
        type: "nuban",
        name: recipientName,
        account_number: profile.paystack_account_number,
        bank_code: profile.paystack_bank_code,
        currency: "NGN",
        email: profile.business_email || undefined,
      }),
    },
  );

  if (!recipient?.recipient_code) {
    throw new Error("Paystack did not return a recipient code.");
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      paystack_recipient_code: recipient.recipient_code,
      updated_at: new Date().toISOString(),
    })
    .eq("id", sellerId);

  if (updateError) {
    console.error(
      "[webhook] Failed to save recipient code:",
      updateError.message,
    );
  }

  return recipient.recipient_code;
}

// ─────────────────────────────────────────────────────────────────────────────
// INITIATE SELLER TRANSFER
// ─────────────────────────────────────────────────────────────────────────────

async function initiateSellerTransfer({
  amount,
  recipientCode,
  reference,
  reason,
}: {
  amount: number;
  recipientCode: string;
  reference: string;
  reason: string;
}): Promise<PaystackTransfer> {
  return paystackRequest<PaystackTransfer>("/transfer", {
    method: "POST",
    body: JSON.stringify({
      source: "balance",
      amount: Math.round(amount * 100),
      recipient: recipientCode,
      reference,
      reason,
      currency: "NGN",
    }),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// HANDLE CHARGE.SUCCESS
// ─────────────────────────────────────────────────────────────────────────────

async function handleChargeSuccess(event: PaystackWebhookEvent) {
  const data = event.data as PaystackChargeData;

  const metadata = data.metadata ?? {};

  const reference = data.reference ?? "";

  const linkId = metadata.link_id ?? "";
  const productId = metadata.product_id ?? "";
  const productName = metadata.product_name ?? "";
  const sellerId = metadata.seller_id ?? "";

  if (!reference || !linkId || !sellerId) {
    console.log("[webhook] Not a Monssel payment-link transaction — ignoring.");

    return NextResponse.json({
      received: true,
    });
  }

  console.log(`[webhook] charge.success — link=${linkId} ref=${reference}`);

  // ─────────────────────────────────────────────────────────────────────────
  // 1. Get payment link
  // ─────────────────────────────────────────────────────────────────────────

  const { data: link, error: linkFetchError } = await supabase
    .from("payment_links")
    .select("*")
    .eq("id", linkId)
    .single();

  if (linkFetchError || !link) {
    console.error("[webhook] Payment link not found:", linkFetchError?.message);

    return new NextResponse("Payment link not found", {
      status: 404,
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Idempotency
  // ─────────────────────────────────────────────────────────────────────────

  if (link.status === "paid") {
    console.log("[webhook] Payment link already processed — skipping.");

    return NextResponse.json({
      received: true,
    });
  }

  const { data: existingReference } = await supabase
    .from("payment_links")
    .select("id, status")
    .eq("reference", reference)
    .neq("id", linkId)
    .maybeSingle();

  if (existingReference) {
    console.log(
      "[webhook] Reference already belongs to another payment link — skipping.",
    );

    return NextResponse.json({
      received: true,
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Verify amount
  // ─────────────────────────────────────────────────────────────────────────

  const expectedAmountKobo = Math.round(
    Number(link.price) * Number(link.quantity) * 100,
  );

  const paidAmountKobo = Number(data.amount ?? 0);

  if (
    !Number.isFinite(paidAmountKobo) ||
    paidAmountKobo !== expectedAmountKobo
  ) {
    console.error(
      `[webhook] Amount mismatch. Expected ${expectedAmountKobo}, received ${paidAmountKobo}`,
    );

    return new NextResponse("Amount mismatch", {
      status: 400,
    });
  }

  const total = paidAmountKobo / 100;

  const pricePerUnit = total / Number(link.quantity);

  const buyerEmail = data.customer?.email ?? "";

  // Paystack's actual transaction fee.
  const paystackFee = typeof data.fees === "number" ? data.fees / 100 : 0;

  // Monssel's 1.5% platform fee.
  const monsselFee = Math.round(total * MONSSEL_FEE_RATE * 100) / 100;

  // Seller receives:
  // Gross - Paystack fee - Monssel fee - transfer fee.
  const sellerPayout =
    Math.round((total - paystackFee - monsselFee - TRANSFER_FEE) * 100) / 100;

  if (sellerPayout <= 0) {
    console.error(
      `[webhook] Calculated seller payout is invalid: ${sellerPayout}`,
    );

    return new NextResponse("Invalid payout amount", {
      status: 400,
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Claim payment link
  //
  // active -> paid can only happen once.
  // This protects against duplicate charge.success webhooks.
  // ─────────────────────────────────────────────────────────────────────────

  const { data: claimedLink, error: claimError } = await supabase
    .from("payment_links")
    .update({
      status: "paid",
      reference,
      paystack_reference: reference,
      buyer_email: buyerEmail,
      paid_at: new Date().toISOString(),
    })
    .eq("id", linkId)
    .eq("status", "active")
    .select()
    .maybeSingle();

  if (claimError) {
    console.error(
      "[webhook] Failed to claim payment link:",
      claimError.message,
    );

    return new NextResponse("DB error", {
      status: 500,
    });
  }

  if (!claimedLink) {
    console.log(
      "[webhook] Payment link was already claimed by another webhook.",
    );

    return NextResponse.json({
      received: true,
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 5. Record sale
  // ─────────────────────────────────────────────────────────────────────────

  const { data: sale, error: saleError } = await supabase
    .from("sales")
    .insert({
      user_id: sellerId,
      product_id: productId || null,
      product_name: productName || link.product_name,
      quantity: Number(link.quantity),
      price: pricePerUnit,
      total,
      note: `Online sale via Monssel Pay — ${buyerEmail}`,
    })
    .select("id")
    .single();

  if (saleError || !sale) {
    console.error("[webhook] Failed to record sale:", saleError?.message);

    return new NextResponse("Sale recording failed", {
      status: 500,
    });
  }

  console.log(`[webhook] Sale recorded — sale=${sale.id}`);

  // ─────────────────────────────────────────────────────────────────────────
  // 6. Update stock
  // ─────────────────────────────────────────────────────────────────────────

  if (productId) {
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("stock, low_stock_threshold, name")
      .eq("id", productId)
      .eq("user_id", sellerId)
      .single();

    if (productError) {
      console.error("[webhook] Failed to get product:", productError.message);
    }

    if (product) {
      const newStock = Math.max(
        0,
        Number(product.stock) - Number(link.quantity),
      );

      const { error: stockError } = await supabase
        .from("products")
        .update({
          stock: newStock,
          updated_at: new Date().toISOString(),
        })
        .eq("id", productId);

      if (stockError) {
        console.error("[webhook] Failed to update stock:", stockError.message);
      }

      // Stock movement.
      const { error: movementError } = await supabase
        .from("stock_movements")
        .insert({
          user_id: sellerId,
          product_id: productId,
          type: "sale",
          quantity: -Number(link.quantity),
          note: `Sold via Monssel Pay — ref: ${reference}`,
        });

      if (movementError) {
        console.error(
          "[webhook] Failed to record stock movement:",
          movementError.message,
        );
      }

      // Sale notification.
      await supabase.from("notifications").insert({
        user_id: sellerId,
        type: "sale",
        title: "New sale 🎉",
        message: `${link.quantity}x ${
          productName || product.name
        } sold for ₦${total.toLocaleString("en-NG")} via payment link.`,
      });

      // Low stock notification.
      if (newStock <= Number(product.low_stock_threshold) && newStock > 0) {
        await supabase.from("notifications").insert({
          user_id: sellerId,
          type: "stock",
          title: "Low stock alert",
          message: `${
            productName || product.name
          } is running low — only ${newStock} left in stock.`,
        });
      }

      // Out of stock notification.
      if (newStock === 0) {
        await supabase.from("notifications").insert({
          user_id: sellerId,
          type: "stock",
          title: "Out of stock",
          message: `${
            productName || product.name
          } is now out of stock. Restock to keep selling.`,
        });
      }
    }
  } else {
    // Service/custom payment link.
    await supabase.from("notifications").insert({
      user_id: sellerId,
      type: "sale",
      title: "New sale 🎉",
      message: `Payment of ₦${total.toLocaleString("en-NG")} received for ${
        productName || link.product_name
      }.`,
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 7. Create payout record
  // ─────────────────────────────────────────────────────────────────────────

  const payoutReference = `ms_payout_${linkId.replace(/-/g, "")}`;

  const { data: existingPayout } = await supabase
    .from("payouts")
    .select("id, status, reference")
    .eq("payment_link_id", linkId)
    .maybeSingle();

  if (existingPayout) {
    console.log(
      "[webhook] Payout already exists — skipping transfer creation.",
    );

    return NextResponse.json({
      received: true,
    });
  }

  const { data: payout, error: payoutError } = await supabase
    .from("payouts")
    .insert({
      seller_id: sellerId,
      payment_link_id: linkId,
      sale_id: sale.id,
      amount: sellerPayout,
      currency: "NGN",
      monssel_fee: monsselFee,
      paystack_fee: paystackFee,
      transfer_fee: TRANSFER_FEE,
      status: "pending",
      reference: payoutReference,
    })
    .select("id, reference")
    .single();

  if (payoutError || !payout) {
    console.error(
      "[webhook] Failed to create payout record:",
      payoutError?.message,
    );

    return new NextResponse("Payout record failed", {
      status: 500,
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 8. Get/create Paystack recipient
  // ─────────────────────────────────────────────────────────────────────────

  let recipientCode: string;

  try {
    recipientCode = await getOrCreateRecipient(sellerId);
  } catch (error) {
    const message =
      error instanceof Error ?
        error.message
      : "Failed to create Paystack recipient";

    console.error("[webhook] Recipient error:", message);

    await supabase
      .from("payouts")
      .update({
        status: "failed",
        failure_reason: message,
        updated_at: new Date().toISOString(),
      })
      .eq("id", payout.id);

    return new NextResponse("Recipient setup failed", {
      status: 500,
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 9. Initiate Paystack transfer
  // ─────────────────────────────────────────────────────────────────────────

  try {
    const transfer = await initiateSellerTransfer({
      amount: sellerPayout,
      recipientCode,
      reference: payout.reference,
      reason: `Monssel payout for sale ${sale.id}`,
    });

    const transferStatus =
      transfer.status === "success" ? "success"
      : transfer.status === "otp" ? "pending"
      : "processing";

    await supabase
      .from("payouts")
      .update({
        status: transferStatus,
        transfer_code: transfer.transfer_code,
        updated_at: new Date().toISOString(),
      })
      .eq("id", payout.id);

    console.log(
      `[webhook] Transfer initiated — payout=${payout.id} transfer=${transfer.transfer_code} status=${transfer.status}`,
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Paystack transfer failed";

    console.error("[webhook] Failed to initiate seller transfer:", message);

    await supabase
      .from("payouts")
      .update({
        status: "failed",
        failure_reason: message,
        updated_at: new Date().toISOString(),
      })
      .eq("id", payout.id);

    // Do not automatically retry here.
    // A retry must use the same transfer reference
    // to avoid accidentally creating duplicate transfers.
  }

  console.log(
    `[webhook] Done — payment=${reference} sale=${sale.id} payout=${payout.id}`,
  );

  return NextResponse.json({
    received: true,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// HANDLE TRANSFER WEBHOOKS
// ─────────────────────────────────────────────────────────────────────────────

async function handleTransferEvent(
  eventName: string,
  data: PaystackTransferData,
) {
  const reference = data.reference ?? "";

  const transferCode = data.transfer_code ?? "";

  if (!reference) {
    console.warn(`[webhook] ${eventName} without transfer reference.`);

    return NextResponse.json({
      received: true,
    });
  }

  const { data: payout, error } = await supabase
    .from("payouts")
    .select("id, status")
    .eq("reference", reference)
    .maybeSingle();

  if (error) {
    console.error("[webhook] Failed to find payout:", error.message);

    return new NextResponse("DB error", {
      status: 500,
    });
  }

  if (!payout) {
    console.warn(
      `[webhook] No Monssel payout found for transfer ${reference}.`,
    );

    return NextResponse.json({
      received: true,
    });
  }

  let status: "pending" | "processing" | "success" | "failed" | "reversed";

  switch (eventName) {
    case "transfer.success":
      status = "success";
      break;

    case "transfer.failed":
      status = "failed";
      break;

    case "transfer.reversed":
      status = "reversed";
      break;

    default:
      return NextResponse.json({
        received: true,
      });
  }

  const failureReason = data.failures ?? data.reason ?? null;

  const { error: updateError } = await supabase
    .from("payouts")
    .update({
      status,
      transfer_code: transferCode || undefined,
      failure_reason: status === "success" ? null : failureReason,
      updated_at: new Date().toISOString(),
    })
    .eq("id", payout.id);

  if (updateError) {
    console.error(
      `[webhook] Failed to update payout ${payout.id}:`,
      updateError.message,
    );

    return new NextResponse("DB error", {
      status: 500,
    });
  }

  console.log(`[webhook] ${eventName} — payout=${payout.id} ref=${reference}`);

  return NextResponse.json({
    received: true,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN WEBHOOK
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  const rawBody = await request.text();

  const signature = request.headers.get("x-paystack-signature") ?? "";

  // ─────────────────────────────────────────────────────────────────────────
  // 1. Verify signature
  // ─────────────────────────────────────────────────────────────────────────

  if (!verifySignature(rawBody, signature)) {
    console.warn("[webhook] Invalid Paystack signature — ignoring.");

    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Parse event
  // ─────────────────────────────────────────────────────────────────────────

  let parsedEvent: unknown;

  try {
    parsedEvent = JSON.parse(rawBody);
  } catch {
    return new NextResponse("Invalid JSON", {
      status: 400,
    });
  }

  if (
    typeof parsedEvent !== "object" ||
    parsedEvent === null ||
    !("event" in parsedEvent) ||
    typeof parsedEvent.event !== "string" ||
    !("data" in parsedEvent)
  ) {
    return new NextResponse("Invalid webhook payload", {
      status: 400,
    });
  }

  const event = parsedEvent as PaystackWebhookEvent;

  console.log(`[webhook] Received event: ${event.event}`);

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Successful payment
  // ─────────────────────────────────────────────────────────────────────────

  if (event.event === "charge.success") {
    return handleChargeSuccess(event);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Transfer lifecycle
  // ─────────────────────────────────────────────────────────────────────────

  if (
    event.event === "transfer.success" ||
    event.event === "transfer.failed" ||
    event.event === "transfer.reversed"
  ) {
    const transferData = event.data as PaystackTransferData;

    return handleTransferEvent(event.event, transferData);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 5. Ignore events we don't currently need
  // ─────────────────────────────────────────────────────────────────────────

  return NextResponse.json({
    received: true,
  });
}
