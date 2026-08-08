const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
  throw new Error("PAYSTACK_SECRET_KEY is not configured");
}

const PAYSTACK_API = "https://api.paystack.co";

interface Recipient {
  recipient_code: string;
  name: string;
  type: string;
  currency: string;
  active: boolean;
  details: {
    account_number: string;
    account_name: string | null;
    bank_code: string;
    bank_name: string;
  };
}

interface Transfer {
  id: number;
  reference: string;
  amount: number;
  currency: string;
  status: string;
  transfer_code: string;
  recipient: number;
}

async function paystackRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${PAYSTACK_API}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  const data = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || "Paystack request failed");
  }

  return data.data;
}

/**
 * Creates a Paystack transfer recipient for a seller.
 */
export async function createTransferRecipient({
  name,
  accountNumber,
  bankCode,
  email,
}: {
  name: string;
  accountNumber: string;
  bankCode: string;
  email?: string;
}): Promise<Recipient> {
  return paystackRequest<Recipient>("/transferrecipient", {
    method: "POST",
    body: JSON.stringify({
      type: "nuban",
      name,
      account_number: accountNumber,
      bank_code: bankCode,
      currency: "NGN",
      email,
    }),
  });
}

/**
 * Initiates a transfer to a Paystack recipient.
 */
export async function initiateTransfer({
  amount,
  recipientCode,
  reference,
  reason,
}: {
  amount: number;
  recipientCode: string;
  reference: string;
  reason?: string;
}): Promise<Transfer> {
  return paystackRequest<Transfer>("/transfer", {
    method: "POST",
    body: JSON.stringify({
      source: "balance",
      amount: Math.round(amount * 100),
      recipient: recipientCode,
      reference,
      reason: reason ?? "Monssel seller payout",
      currency: "NGN",
    }),
  });
}
