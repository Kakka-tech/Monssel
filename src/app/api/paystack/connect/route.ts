import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY ?? "";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { bank_code, account_number, business_name } = await request.json();

  if (!bank_code || !account_number || !business_name) {
    return NextResponse.json(
      { error: "bank_code, account_number and business_name are required" },
      { status: 400 },
    );
  }

  // First verify the account number with Paystack
  const verifyRes = await fetch(
    `https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`,
    {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
    },
  );

  const verifyData = await verifyRes.json();
  if (!verifyData.status) {
    return NextResponse.json(
      { error: "Could not verify account. Please check your details." },
      { status: 400 },
    );
  }

  const accountName = verifyData.data.account_name;

  // Create the subaccount
  const subRes = await fetch("https://api.paystack.co/subaccount", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      business_name,
      bank_code,
      account_number,
      percentage_charge: 0, // 100% goes to business owner
    }),
  });

  const subData = await subRes.json();
  if (!subData.status) {
    return NextResponse.json(
      { error: subData.message ?? "Failed to create subaccount" },
      { status: 502 },
    );
  }

  const subaccount_code = subData.data.subaccount_code;

  // Save to profile
  const { error } = await supabase
    .from("profiles")
    .update({
      paystack_connected: true,
      paystack_account: accountName,
      paystack_account_number: account_number,
      paystack_bank_code: bank_code,
      paystack_subaccount_code: subaccount_code,
    })
    .eq("id", user.id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ subaccount_code, account_name: accountName });
}
