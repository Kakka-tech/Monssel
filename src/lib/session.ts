/**
 * lib/session.ts
 *
 * Server-side session utilities.
 * Import in Server Components, Server Actions, and Route Handlers only.
 * Never import in "use client" files.
 */

import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";
import type { User, Session } from "@supabase/supabase-js";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface AuthedContext {
  user: User;
  session: Session;
}

// ─── Get validated session — throws/redirects if unauthenticated ──────────────
/**
 * Use at the top of Server Actions and Route Handlers that need auth.
 * Uses getUser() (server-validated) not getSession() (cookie-only).
 *
 * @example
 * const { user } = await requireAuth();
 */
export async function requireAuth(): Promise<AuthedContext> {
  const supabase = await createClient();

  // getUser() hits Supabase servers to validate the JWT — not just the cookie.
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  // Also grab the session for the access token if needed downstream.
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return { user, session };
}

// ─── Soft check — returns null instead of redirecting ─────────────────────────
/**
 * Use in layouts or components where auth is optional.
 * Returns null if the user is not authenticated.
 */
export async function getOptionalAuth(): Promise<AuthedContext | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) return null;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return null;

    return { user, session };
  } catch {
    return null;
  }
}

// ─── Session refresh ──────────────────────────────────────────────────────────
/**
 * Explicitly refresh the session. Call this in long-running Server Actions
 * or after a token may have expired.
 * Returns the refreshed session, or null on failure.
 */
export async function refreshSession(): Promise<Session | null> {
  try {
    const supabase = await createClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.refreshSession();

    if (error || !session) return null;
    return session;
  } catch {
    return null;
  }
}

// ─── Sign out (server-side) ───────────────────────────────────────────────────
/**
 * Invalidates the session on the Supabase side and clears cookies.
 * Call from a Server Action triggered by a sign-out button.
 */
export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

// ─── Check if user owns a resource ───────────────────────────────────────────
/**
 * Utility to verify a user owns a DB row before mutating it.
 * Throws if the row doesn't belong to the user.
 *
 * @example
 * await assertOwnership("expenses", expenseId, user.id);
 */
export async function assertOwnership(
  table: "expenses" | "budgets" | "recurring" | "categories",
  rowId: string,
  userId: string,
): Promise<void> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(table as "expenses") // temporary cast to satisfy TS
    .select("user_id")
    .eq("id", rowId)
    .single();

  if (error || !data) {
    throw new Error(`Resource not found in ${table}`);
  }

  if ((data as unknown as { user_id: string }).user_id !== userId) {
    throw new Error("Forbidden: you do not own this resource");
  }
}
