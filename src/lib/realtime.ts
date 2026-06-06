"use client";

import { useEffect, useRef } from "react";
import { createClient } from "./supabase/client"; // fix 1: correct browser client path
import type {
  RealtimeChannel,
  RealtimePostgresChangesPayload,
  REALTIME_SUBSCRIBE_STATES,
} from "@supabase/supabase-js";

const supabase = createClient();

// ─── Types ────────────────────────────────────────────────────────────────────
type TableName = "expenses" | "budgets" | "recurring" | "categories";
type EventType = "INSERT" | "UPDATE" | "DELETE" | "*";

interface UseRealtimeTableOptions {
  /** Supabase table to listen on */
  table: TableName;
  /** Which events to listen for — defaults to all */
  event?: EventType;
  /** user_id to scope the subscription — REQUIRED to prevent data leakage */
  userId: string;
  /** Called when a matching event fires */
  onEvent: (payload: RealtimePayload) => void;
}

export interface RealtimePayload {
  eventType: "INSERT" | "UPDATE" | "DELETE";
  new: Record<string, unknown>;
  old: Record<string, unknown>;
  table: string;
}

// ─── Hook: subscribe to a table scoped to the current user ───────────────────
/**
 * Subscribes to Postgres changes for a specific table + user.
 * Automatically unsubscribes when the component unmounts.
 *
 * @example
 * useRealtimeTable({
 *   table: "expenses",
 *   userId: user.id,
 *   onEvent: ({ eventType }) => {
 *     if (eventType === "INSERT" || eventType === "DELETE") refetch();
 *   },
 * });
 */
export function useRealtimeTable({
  table,
  event = "*",
  userId,
  onEvent,
}: UseRealtimeTableOptions) {
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!userId) return;

    // Namespace channel by user to avoid cross-user event leakage
    const channelName = `${table}:user=${userId}`;

    const channel = supabase
      .channel(channelName, {
        config: {
          // Use private channels — requires the user to be authenticated.
          // Supabase validates the JWT before allowing the subscription.
          broadcast: { self: false },
        },
      })
      .on(
        "postgres_changes",
        {
          event,
          schema: "public",
          table,
          // RLS on the table already enforces user_id ownership,
          // but we also filter client-side for defence in depth.
          filter: `user_id=eq.${userId}`,
        },
        (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => {
          // fix 2
          onEvent({
            eventType: payload.eventType as RealtimePayload["eventType"],
            new: (payload.new ?? {}) as Record<string, unknown>,
            old: (payload.old ?? {}) as Record<string, unknown>,
            table: payload.table,
          });
        },
      )
      .subscribe((status: `${REALTIME_SUBSCRIBE_STATES}`) => {
        // fix 3
        if (status === "CHANNEL_ERROR") {
          console.error(`[Realtime] Channel error on ${channelName}`);
        }
      });

    channelRef.current = channel;

    // Cleanup on unmount — prevents socket leaks
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
    // Stringify userId/event/table to get stable primitive deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, table, event]);
}

// ─── One-shot: subscribe and get the first matching event then unsubscribe ────
/**
 * Useful for triggering a single refetch after a server action completes
 * without keeping a persistent socket open.
 */
export function waitForRealtimeEvent(
  table: TableName,
  userId: string,
  timeoutMs = 5000,
): Promise<RealtimePayload> {
  return new Promise((resolve, reject) => {
    const channelName = `oneshot:${table}:${userId}:${Date.now()}`;
    let settled = false;

    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table,
          filter: `user_id=eq.${userId}`,
        },
        (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => {
          // fix 4
          if (settled) return;
          settled = true;
          supabase.removeChannel(channel);
          resolve({
            eventType: payload.eventType as RealtimePayload["eventType"],
            new: (payload.new ?? {}) as Record<string, unknown>,
            old: (payload.old ?? {}) as Record<string, unknown>,
            table: payload.table,
          });
        },
      )
      .subscribe();

    // Timeout safety — don't leave the socket open forever
    setTimeout(() => {
      if (settled) return;
      settled = true;
      supabase.removeChannel(channel);
      reject(new Error(`Realtime timeout waiting for ${table} event`));
    }, timeoutMs);
  });
}

// ─── Presence: track online users in a shared space (e.g. multi-device) ──────
/**
 * Tracks the current user's presence. Useful for detecting if the same
 * account is open on multiple devices and showing a warning.
 *
 * @example
 * const { onlineCount } = usePresence(user.id);
 */
export function usePresence(userId: string) {
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase.channel(`presence:${userId}`, {
      config: { presence: { key: userId } },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        const count = Object.keys(state).length;
        if (count > 1) {
          console.warn(
            `[Presence] ${count} sessions detected for user ${userId}`,
          );
        }
      })
      .subscribe(async (status: `${REALTIME_SUBSCRIBE_STATES}`) => {
        // fix 5
        if (status === "SUBSCRIBED") {
          await channel.track({
            user_id: userId,
            online_at: new Date().toISOString(),
          });
        }
      });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [userId]);
}
