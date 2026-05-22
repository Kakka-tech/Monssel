import { NextResponse } from "next/server";

const FLUTTERWAVE_SECRET = process.env.FLUTTERWAVE_SECRET_KEY ?? "";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const account_number = searchParams.get("account_number");
  const bank_code = searchParams.get("bank_code");

  if (!account_number || !bank_code) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const res = await fetch("https://api.flutterwave.com/v3/accounts/resolve", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${FLUTTERWAVE_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ account_number, account_bank: bank_code }),
  });

  const data = await res.json();

  if (data.status !== "success") {
    return NextResponse.json(
      { error: "Could not verify account" },
      { status: 400 },
    );
  }

  return NextResponse.json({ account_name: data.data.account_name });
}
