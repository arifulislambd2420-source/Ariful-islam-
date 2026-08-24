import { Moon, Sun } from "lucide-react";
import { useTheme } from "../lib/useTheme";

type Props = {
  /** compact = icon-only round button (nav); labeled = with text (mobile menu / settings) */
  variant?: "compact" | "labeled";
  className?: string;
};

export default function ThemeToggle({ variant = "compact", className = "" }: Props) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "লাইট মোডে যান" : "ডার্ক মোডে যান";

  if (variant === "labeled") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        title={label}
        className={
          "inline-flex w-full items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-ink transition hover:border-primary hover:text-primary " +
          className
        }
      >
        <span className="inline-flex items-center gap-2">
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
          {isDark ? "লাইট মোড" : "ডার্ক মোড"}
        </span>
        <span
          className={
            "flex h-5 w-9 items-center rounded-full p-0.5 transition-colors " +
            (isDark ? "bg-cyan" : "bg-border")
          }
        >
          <span
            className={
              "h-4 w-4 rounded-full bg-white shadow transition-transform " +
              (isDark ? "translate-x-4" : "translate-x-0")
            }
          />
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={
        "grid h-10 w-10 place-items-center rounded-full border border-border bg-bg text-ink transition hover:border-primary hover:text-primary " +
        className
      }
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
