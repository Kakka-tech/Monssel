// src/lib/fees.ts

// Monssel's own fee — flat ₦10 per sale for now, regardless of amount.
const MONSSEL_FLAT_FEE = 10;

// ── Paystack CHARGE fee (buyer pays → lands in Monssel's Paystack balance) ──
const PAYSTACK_CHARGE_RATE = 0.015;
const PAYSTACK_CHARGE_FLAT = 100;
const PAYSTACK_CHARGE_CAP = 2000;
const PAYSTACK_CHARGE_WAIVER_THRESHOLD = 2500;

function paystackChargeFee(amount: number): number {
  if (amount <= PAYSTACK_CHARGE_WAIVER_THRESHOLD) return 0;
  const fee = amount * PAYSTACK_CHARGE_RATE + PAYSTACK_CHARGE_FLAT;
  return Math.min(fee, PAYSTACK_CHARGE_CAP);
}

// ── Paystack TRANSFER fee (Monssel's balance → seller's bank account) ──────
function paystackTransferFee(amount: number): number {
  if (amount < 5000) return 10;
  if (amount <= 50000) return 25;
  return 50;
}

// ── Nigeria Tax Act 2025 stamp duty ─────────────────────────────────────────
function transferStampDuty(amount: number): number {
  return amount >= 10000 ? 50 : 0;
}

function monsselFee(_amount: number): number {
  return MONSSEL_FLAT_FEE;
}

export interface FeeBreakdown {
  grossAmount: number;
  paystackChargeFee: number;
  monsselFee: number;
  paystackTransferFee: number;
  stampDuty: number;
  payout: number;
}

/** Full line-item breakdown, for showing sellers exactly where their money goes. */
export function getFeeBreakdown(grossAmount: number): FeeBreakdown {
  const chargeFee = paystackChargeFee(grossAmount);
  const platformFee = monsselFee(grossAmount);
  const afterChargeAndPlatformFee = grossAmount - chargeFee - platformFee;

  const transferFee = paystackTransferFee(afterChargeAndPlatformFee);
  const stampDuty = transferStampDuty(afterChargeAndPlatformFee);

  const payout =
    Math.round((afterChargeAndPlatformFee - transferFee - stampDuty) * 100) /
    100;

  return {
    grossAmount,
    paystackChargeFee: Math.round(chargeFee * 100) / 100,
    monsselFee: platformFee,
    paystackTransferFee: transferFee,
    stampDuty,
    payout,
  };
}

/** Just the final number — used by the init route and webhook. */
export function calculateSellerPayout(grossAmount: number): number {
  return getFeeBreakdown(grossAmount).payout;
}
