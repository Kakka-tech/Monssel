import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { amount, category, note } = body;

  if (!amount || !category) {
    return NextResponse.json(
      { error: "amount and category are required" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("expenses")
    .insert({ user_id: user.id, amount, category, note })
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from("notifications").insert({
    user_id: user.id,
    type: "expense",
    title: "Expense Added",
    message: `₦${Number(amount).toLocaleString()} logged under ${category}`,
  });

  return NextResponse.json(data, { status: 201 });
}
