import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { Database } from "@/lib/supabase/database.types";

type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  const allowed: (keyof ProfileUpdate)[] = [
    "full_name",
    "business_name",
    "business_email",
    "phone_number",
    "tax_id",
    "business_address",
    "currency",
    "timezone",
    "date_format",
    "number_format",
    "theme",
    "dashboard_layout",
    "notif_email",
    "notif_low_stock",
    "notif_expenses",
    "notif_weekly_reports",
    "notif_marketing",
    "paystack_connected",
    "paystack_account",
    "flutterwave_connected",
    "flutterwave_account",
  ];

  const updates = Object.fromEntries(
    Object.entries(body).filter(([key]) =>
      allowed.includes(key as keyof ProfileUpdate),
    ),
  ) as ProfileUpdate;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: "No valid fields to update" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
