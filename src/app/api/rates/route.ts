import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const base = searchParams.get("base") ?? "NGN";

  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${base}`,
    { next: { revalidate: 3600 } }, // cache for 1 hour
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch rates" }, { status: 502 });
  }

  const data = await res.json();
  return NextResponse.json(data.conversion_rates);
}