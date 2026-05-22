import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const FLUTTERWAVE_SECRET = process.env.FLUTTERWAVE_SECRET_KEY ?? "";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { bank_code, account_number, business_name, account_name } =
    await request.json();

  if (!bank_code || !account_number || !business_name) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  // Create Flutterwave subaccount
  const res = await fetch("https://api.flutterwave.com/v3/subaccounts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${FLUTTERWAVE_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      account_bank: bank_code,
      account_number,
      business_name,
      business_email: user.email,
      split_type: "percentage",
      split_value: 0, // 100% goes to business owner
    }),
  });

  const data = await res.json();

  if (data.status !== "success") {
    return NextResponse.json(
      { error: data.message ?? "Failed to create subaccount" },
      { status: 502 },
    );
  }

  const subaccount_id = data.data.subaccount_id;

  // Save to profile
  const { error } = await supabase
    .from("profiles")
    .update({
      flutterwave_connected: true,
      flutterwave_account: account_name,
      flutterwave_account_number: account_number,
      flutterwave_bank_code: bank_code,
      flutterwave_subaccount_code: String(subaccount_id),
    })
    .eq("id", user.id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ subaccount_id, account_name });
}
