import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const [{ data: sales }, { data: expenses }, { data: products }] =
    await Promise.all([
      supabase.from("sales").select("total, created_at").eq("user_id", user.id),
      supabase
        .from("expenses")
        .select("amount, created_at")
        .eq("user_id", user.id),
      supabase
        .from("products")
        .select("id, name, stock, low_stock_threshold")
        .eq("user_id", user.id),
    ]);

  // Stat totals
  const totalSales = (sales ?? []).reduce((s, r) => s + Number(r.total), 0);
  const totalExpenses = (expenses ?? []).reduce(
    (s, r) => s + Number(r.amount),
    0,
  );
  const netProfit = totalSales - totalExpenses;
  const profitMargin =
    totalSales > 0 ? ((netProfit / totalSales) * 100).toFixed(1) : "0.0";

  // Monthly chart data (last 6 months)
  const months: Record<string, { sales: number; expenses: number }> = {};
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    months[key] = { sales: 0, expenses: 0 };
  }

  (sales ?? []).forEach((s) => {
    const d = new Date(s.created_at);
    if (d >= sixMonthsAgo) {
      const key = d.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      if (months[key]) months[key].sales += Number(s.total);
    }
  });

  (expenses ?? []).forEach((e) => {
    const d = new Date(e.created_at);
    if (d >= sixMonthsAgo) {
      const key = d.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      if (months[key]) months[key].expenses += Number(e.amount);
    }
  });

  const chartData = Object.entries(months).map(([label, vals]) => ({
    month: label.split(" ")[0], // "Jan", "Feb" etc
    sales: vals.sales,
    expenses: vals.expenses,
    profit: vals.sales - vals.expenses,
  }));

  // Low stock alerts
  const stockAlerts = (products ?? [])
    .filter((p) => p.stock <= p.low_stock_threshold)
    .map((p) => ({
      id: p.id,
      name: p.name,
      stock: p.stock,
      min: p.low_stock_threshold,
    }));

  return NextResponse.json({
    stats: {
      totalSales,
      totalExpenses,
      netProfit,
      profitMargin: Number(profitMargin),
    },
    chartData,
    stockAlerts,
  });
}
