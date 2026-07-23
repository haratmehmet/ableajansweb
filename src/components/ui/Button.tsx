// src/components/ui/Button.tsx
import { type ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[var(--orange-vivid)] text-white font-semibold border-transparent " +
    "shadow-[0_4px_24px_rgba(245,90,0,0.28)] hover:bg-[#FF6B1A] " +
    "hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(245,90,0,0.38)] " +
    "active:translate-y-0",
  secondary:
    "bg-transparent text-[var(--text-primary)] font-medium " +
    "border border-[var(--border-soft)] hover:bg-[rgba(255,255,255,0.04)] " +
    "hover:border-[var(--border-medium)] hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "bg-transparent text-[var(--text-secondary)] font-medium " +
    "border border-[var(--border-soft)] hover:bg-[rgba(255,255,255,0.04)] " +
    "hover:text-[var(--text-primary)] hover:-translate-y-0.5 active:translate-y-0",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-5 py-2.5 text-sm rounded-[var(--radius-md)]",
  md: "px-9 py-4 text-[0.9rem] rounded-[var(--radius-lg)]",
  lg: "px-11 py-5 text-base rounded-[var(--radius-lg)]",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", href, external, className, children, ...props }, ref) => {
    const baseClass = cn(
      "inline-flex items-center justify-center gap-2 transition-all duration-[450ms] relative overflow-hidden",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange-vivid)] focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      return (
        <Link
          href={href}
          className={baseClass}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {variant === "primary" && (
            <span
              aria-hidden
              className="absolute inset-0 pointer-events-none rounded-inherit"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)",
              }}
            />
          )}
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={baseClass} {...props}>
        {variant === "primary" && (
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none rounded-inherit"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)",
            }}
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
