import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [
    { data: sales },
    { data: expenses },
    { data: products },
  ] = await Promise.all([
    supabase.from("sales").select("id, product_name, total, created_at").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase.from("expenses").select("id, amount, category, note, created_at").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase.from("products").select("id, stock").eq("user_id", user.id),
  ]);

  const totalSales = (sales ?? []).reduce((s, r) => s + Number(r.total), 0);
  const totalExpenses = (expenses ?? []).reduce((s, r) => s + Number(r.amount), 0);
  const netProfit = totalSales - totalExpenses;
  const totalStock = (products ?? []).reduce((s, p) => s + p.stock, 0);
  const profitMargin = totalSales > 0 ? ((netProfit / totalSales) * 100).toFixed(1) : "0.0";

  // Merge sales + expenses into recent transactions (last 10)
  type TxType = {
    id: string;
    title: string;
    type: "Income" | "Expense";
    amount: number;
    created_at: string;
  };

  const saleTxs: TxType[] = (sales ?? []).map((s) => ({
    id: s.id,
    title: s.product_name,
    type: "Income",
    amount: Number(s.total),
    created_at: s.created_at,
  }));

  const expenseTxs: TxType[] = (expenses ?? []).map((e) => ({
    id: e.id,
    title: e.note || e.category,
    type: "Expense",
    amount: Number(e.amount),
    created_at: e.created_at,
  }));

  const recentTransactions = [...saleTxs, ...expenseTxs]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 10);

  // Monthly revenue data (last 6 months)
  const now = new Date();
  const months: Record<string, { sales: number; expenses: number }> = {};
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleDateString("en-US", { month: "short" });
    months[key] = { sales: 0, expenses: 0 };
  }

  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  (sales ?? []).forEach((s) => {
    const d = new Date(s.created_at);
    if (d >= sixMonthsAgo) {
      const key = d.toLocaleDateString("en-US", { month: "short" });
      if (months[key]) months[key].sales += Number(s.total);
    }
  });

  (expenses ?? []).forEach((e) => {
    const d = new Date(e.created_at);
    if (d >= sixMonthsAgo) {
      const key = d.toLocaleDateString("en-US", { month: "short" });
      if (months[key]) months[key].expenses += Number(e.amount);
    }
  });

  const revenueData = Object.entries(months).map(([label, vals]) => ({
    label,
    value: vals.sales,
  }));

  const hasProducts = (products ?? []).length > 0;
  const hasSales = (sales ?? []).length > 0;

  return NextResponse.json({
    stats: { totalSales, totalExpenses, netProfit, totalStock, profitMargin: Number(profitMargin) },
    recentTransactions,
    revenueData,
    hasProducts,
    hasSales,
  });
}