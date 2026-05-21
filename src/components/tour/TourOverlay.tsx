"use client";

import { useEffect, useState, useRef } from "react";
import { useTour } from "./TourProvider";
import { X, ArrowRight, ArrowLeft } from "lucide-react";

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const PADDING = 8;

export default function TourOverlay() {
  const { active, currentStep, steps, next, prev, skip } = useTour();
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const tooltipRef = useRef<HTMLDivElement>(null);

  const step = steps[currentStep];

  useEffect(() => {
    if (!active) return;

    const updateRect = () => {
      const el = document.querySelector(step.target);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });

      const tooltipWidth = 280;
      const tooltipHeight = 180;
      const pos = step.position ?? "right";
      const vpW = window.innerWidth;
      const vpH = window.innerHeight;

      let top = 0;
      let left = 0;

      if (pos === "right") {
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.right + PADDING + 12;
        if (left + tooltipWidth > vpW) {
          left = rect.left - tooltipWidth - PADDING - 12;
        }
      } else if (pos === "bottom") {
        top = rect.bottom + PADDING + 12;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
      } else if (pos === "top") {
        top = rect.top - tooltipHeight - PADDING - 12;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
      } else if (pos === "left") {
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.left - tooltipWidth - PADDING - 12;
      }

      // If tooltip goes below viewport, flip it above the target
      if (top + tooltipHeight > vpH - 12) {
        top = rect.top - tooltipHeight - PADDING - 12;
      }

      // If tooltip goes above viewport, flip it below
      if (top < 12) {
        top = rect.bottom + PADDING + 12;
      }

      // Clamp horizontal
      left = Math.max(12, Math.min(left, vpW - tooltipWidth - 12));

      setTooltipStyle({ top, left, width: tooltipWidth });
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect);

    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
    };
  }, [active, currentStep, step]);

  if (!active || !targetRect) return null;

  return (
    <>
      {/* Dark overlay with spotlight cutout */}
      <div className="fixed inset-0 z-9998 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <mask id="spotlight-mask">
              <rect width="100%" height="100%" fill="white" />
              <rect
                x={targetRect.left - PADDING}
                y={targetRect.top - PADDING}
                width={targetRect.width + PADDING * 2}
                height={targetRect.height + PADDING * 2}
                rx="8"
                fill="black"
              />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="rgba(0,0,0,0.55)"
            mask="url(#spotlight-mask)"
          />
          {/* Highlight border around target */}
          <rect
            x={targetRect.left - PADDING}
            y={targetRect.top - PADDING}
            width={targetRect.width + PADDING * 2}
            height={targetRect.height + PADDING * 2}
            rx="8"
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Backdrop click to skip */}
      <div className="fixed inset-0 z-9998" onClick={skip} />

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed z-9999 bg-white dark:bg-[#1C1C1C] rounded-2xl shadow-2xl border border-neutral-200 dark:border-[#2E2E2E] p-5 space-y-3"
        style={tooltipStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Step counter + skip */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-400 dark:text-neutral-500">
            {currentStep + 1} of {steps.length}
          </span>
          <button
            onClick={skip}
            className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-[#1E1F20] dark:text-white">
            {step.title}
          </h3>
          <p className="text-xs text-[#707375] dark:text-[#A0A0A0] leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === currentStep ?
                  "w-4 h-1.5 bg-[#1E1F20] dark:bg-white"
                : "w-1.5 h-1.5 bg-neutral-200 dark:bg-[#2E2E2E]"
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2 pt-1">
          {currentStep > 0 && (
            <button
              onClick={prev}
              className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition-colors px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-[#2A2A2A]"
            >
              <ArrowLeft className="w-3 h-3" />
              Back
            </button>
          )}
          <button
            onClick={next}
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#1E1F20] dark:bg-white text-white dark:text-[#121212] text-xs font-medium py-1.5 rounded-lg hover:bg-black dark:hover:bg-gray-200 transition-colors"
          >
            {currentStep === steps.length - 1 ?
              "Done 🎉"
            : <>
                Next <ArrowRight className="w-3 h-3" />
              </>
            }
          </button>
        </div>
      </div>
    </>
  );
}
