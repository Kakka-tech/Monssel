import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "flex flex-1 items-center justify-center",
        "rounded-[9px] border border-[#E5E5E5] bg-white",
        "px-5 py-[5.5px]",
        "text-sm font-medium text-black",
        "shadow-[0_1px_3px_rgba(0,0,0,0.10),0_1px_2px_rgba(0,0,0,0.10)]",
        "transition-colors hover:bg-gray-50 active:bg-gray-100",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}
