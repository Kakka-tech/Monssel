import { NextResponse } from "next/server";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY ?? "";

export async function GET() {
  const res = await fetch("https://api.paystack.co/bank?country=nigeria&perPage=100", {
    headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
    next: { revalidate: 86400 }, // cache for 24 hours
  });

  const data = await res.json();
  if (!data.status) {
    return NextResponse.json({ error: "Failed to fetch banks" }, { status: 502 });
  }

  return NextResponse.json(data.data);
}