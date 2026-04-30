import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { quantity, note } = await request.json();
  if (!quantity || quantity <= 0) {
    return NextResponse.json({ error: "quantity must be a positive number" }, { status: 400 });
  }

  // Get current stock
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("stock")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  // Update stock + log movement
  const [{ data, error }, { error: movError }] = await Promise.all([
    supabase
      .from("products")
      .update({ stock: product.stock + quantity })
      .eq("id", params.id)
      .eq("user_id", user.id)
      .select()
      .single(),
    supabase
      .from("stock_movements")
      .insert({ user_id: user.id, product_id: params.id, type: "add", quantity, note }),
  ]);

  if (error || movError) return NextResponse.json({ error: "Failed to update stock" }, { status: 500 });
  return NextResponse.json(data);
}