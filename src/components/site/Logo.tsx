import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="gauri-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.88 0.09 85)" />
          <stop offset="0.55" stopColor="oklch(0.76 0.14 68)" />
          <stop offset="1" stopColor="oklch(0.6 0.16 40)" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="34" r="25" fill="none" stroke="url(#gauri-gold)" strokeOpacity="0.45" strokeWidth="1.2" />
      <path d="M45.8 22.4 A17 17 0 1 0 49 34 H34" fill="none" stroke="url(#gauri-gold)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 2.5 L35.2 7 L32 11.5 L28.8 7 Z" fill="url(#gauri-gold)" />
    </svg>
  );
}

export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <Link to="/" aria-label="Gauri Entertainment — home" className={cn("group flex items-center gap-3", className)}>
      <LogoMark className="h-10 w-10 shrink-0 transition-transform duration-700 group-hover:rotate-[18deg]" />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[1.6rem] font-medium italic tracking-tight", tone === "light" ? "text-ink-foreground" : "text-foreground")}>
          Gauri
        </span>
        <span className={cn("mt-1 text-[0.58rem] font-bold uppercase tracking-[0.42em]", tone === "light" ? "text-gold" : "text-primary")}>
          Entertainment
        </span>
      </span>
    </Link>
  );
}
