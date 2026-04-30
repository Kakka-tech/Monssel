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
    .from("sales")
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
  const { product_id, quantity, price, note } = body;

  if (!product_id || !quantity || !price) {
    return NextResponse.json(
      { error: "product_id, quantity and price are required" },
      { status: 400 },
    );
  }

  // Fetch product
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("id, name, stock")
    .eq("id", product_id)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  if (product.stock < quantity) {
    return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });
  }

  const total = price * quantity;

  // Run all operations in parallel
  const [
    { data: sale, error: saleError },
    { error: stockError },
    { error: movError },
  ] = await Promise.all([
    // Insert sale
    supabase
      .from("sales")
      .insert({
        user_id: user.id,
        product_id,
        product_name: product.name,
        quantity,
        price,
        total,
        note,
      })
      .select()
      .single(),

    // Deduct stock
    supabase
      .from("products")
      .update({ stock: product.stock - quantity })
      .eq("id", product_id)
      .eq("user_id", user.id),

    // Log stock movement
    supabase.from("stock_movements").insert({
      user_id: user.id,
      product_id,
      type: "sale",
      quantity: -quantity,
      note: `Sale recorded`,
    }),
  ]);

  if (saleError || stockError || movError) {
    return NextResponse.json(
      { error: "Failed to record sale" },
      { status: 500 },
    );
  }

  // Create sale notification (non-blocking)
  supabase.from("notifications").insert({
    user_id: user.id,
    type: "sale",
    title: "New Sale Recorded",
    message: `${quantity}x ${product.name} sold for ₦${total.toLocaleString()}`,
  });

  return NextResponse.json(sale, { status: 201 });
}
