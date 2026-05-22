import { NextResponse } from "next/server";

const FLUTTERWAVE_SECRET = process.env.FLUTTERWAVE_SECRET_KEY ?? "";

export async function GET() {
  const res = await fetch("https://api.flutterwave.com/v3/banks/NG", {
    headers: { Authorization: `Bearer ${FLUTTERWAVE_SECRET}` },
    next: { revalidate: 86400 },
  });

  const data = await res.json();
  if (data.status !== "success") {
    return NextResponse.json(
      { error: "Failed to fetch banks" },
      { status: 502 },
    );
  }

  return NextResponse.json(data.data);
}
