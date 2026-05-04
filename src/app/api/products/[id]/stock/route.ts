import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { quantity, note } = await request.json();

  if (!quantity || quantity <= 0) {
    return NextResponse.json(
      { error: "quantity must be a positive number" },
      { status: 400 },
    );
  }

  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("name, stock, low_stock_threshold")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const newStock = product.stock + quantity;

  const [{ data, error }, { error: movError }] = await Promise.all([
    supabase
      .from("products")
      .update({ stock: newStock })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single(),
    supabase
      .from("stock_movements")
      .insert({
        user_id: user.id,
        product_id: id,
        type: "add",
        quantity,
        note,
      }),
  ]);

  if (error || movError) {
    return NextResponse.json(
      { error: "Failed to update stock" },
      { status: 500 },
    );
  }

  // Fire low stock notification if still below threshold after adding
  if (newStock <= product.low_stock_threshold) {
    await supabase.from("notifications").insert({
      user_id: user.id,
      type: "stock",
      title: "Low Stock Alert",
      message: `${product.name} is running low — only ${newStock} units remaining.`,
    });
  }

  return NextResponse.json(data);
}
