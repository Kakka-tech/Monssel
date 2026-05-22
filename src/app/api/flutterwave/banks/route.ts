import { NextResponse } from "next/server";

const FLUTTERWAVE_SECRET = process.env.FLUTTERWAVE_SECRET_KEY ?? "";

export async function GET() {
  const res = await fetch("https://api.flutterwave.com/v3/banks/NG", {
    headers: { Authorization: `Bearer ${FLUTTERWAVE_SECRET}` },
  });

  const data = await res.json();

  // Return everything including errors
  return NextResponse.json({
    status: data.status,
    message: data.message,
    key_prefix: FLUTTERWAVE_SECRET.slice(0, 10) + "...",
    data: data.data?.slice(0, 2), // just first 2 banks if it works
  });
}
