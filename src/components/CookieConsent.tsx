"use client";

import { useState } from "react";
import { X, Cookie, ArrowLeft, CircleCheck } from "lucide-react";

type View = "banner" | "prefs" | "done";

const COOKIE_KEY = "monssel_cookie_consent";

function getInitialView(): View | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(COOKIE_KEY) ? null : "banner";
}

export function CookieConsent() {
  const [view, setView] = useState<View | null>(getInitialView);
  const [analytics, setAnalytics] = useState(true);

  function save(analyticsEnabled: boolean) {
    localStorage.setItem(
      COOKIE_KEY,
      JSON.stringify({
        essential: true,
        analytics: analyticsEnabled,
        savedAt: Date.now(),
      }),
    );
    setView("done");
    setTimeout(() => setView(null), 3000);
  }

  if (view === null) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 flex justify-center pointer-events-none">
      <div className="w-full max-w-lg pointer-events-auto">
        {/* ── Main banner ── */}
        {view === "banner" && (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-5 shadow-sm flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Cookie className="w-5 h-5 text-neutral-400" aria-hidden />
                <p className="font-medium text-sm text-neutral-900 dark:text-neutral-100">
                  We use cookies
                </p>
              </div>
              <button
                onClick={() => save(analytics)}
                aria-label="Dismiss"
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              We use essential cookies to keep you signed in, and optional
              analytics cookies to understand how you use Monssel. Manage your
              preferences anytime in settings.
            </p>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={() => save(true)}
                className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Accept all
              </button>
              <button
                onClick={() => save(false)}
                className="border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-700 dark:text-neutral-300 px-4 py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                Essential only
              </button>
              <button
                onClick={() => setView("prefs")}
                className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 underline underline-offset-2 transition-colors px-1"
              >
                Manage preferences
              </button>
            </div>
          </div>
        )}

        {/* ── Preferences panel ── */}
        {view === "prefs" && (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-5 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="font-medium text-sm text-neutral-900 dark:text-neutral-100">
                Cookie preferences
              </p>
              <button
                onClick={() => setView("banner")}
                className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-800 rounded-lg px-3 py-3">
                <div>
                  <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    Essential
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Authentication and security. Always on.
                  </p>
                </div>
                <span className="text-xs text-neutral-400 italic">
                  Required
                </span>
              </div>

              <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-800 rounded-lg px-3 py-3">
                <div>
                  <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    Analytics
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Helps us understand how you use Monssel.
                  </p>
                </div>
                <button
                  role="switch"
                  aria-checked={analytics}
                  onClick={() => setAnalytics((v) => !v)}
                  className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${
                    analytics ?
                      "bg-neutral-900 dark:bg-neutral-100"
                    : "bg-neutral-300 dark:bg-neutral-600"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white dark:bg-neutral-900 rounded-full shadow-sm transition-transform duration-200 ${
                      analytics ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            <button
              onClick={() => save(analytics)}
              className="self-start bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Save preferences
            </button>
          </div>
        )}

        {/* ── Confirmation ── */}
        {view === "done" && (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl px-5 py-4 shadow-sm flex items-center gap-3">
            <CircleCheck
              className="w-4 h-4 text-emerald-500 shrink-0"
              aria-hidden
            />
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Preferences saved. You can update them anytime in settings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
