"use client";

import Link from "next/link";
import { PropsWithChildren } from "react";

type Variant = "primary" | "outline" | "ghost";

export default function MagicButton({
  href,
  children,
  variant = "primary",
}: PropsWithChildren<{ href: string; variant?: Variant }>) {
  const base =
    "group relative inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold " +
    "transition focus:outline-none focus:ring-2 focus:ring-white/20";

  const variants: Record<Variant, string> = {
    primary: "text-slate-950 bg-white hover:opacity-95",
    outline: "text-white border border-white/15 bg-white/5 hover:bg-white/10",
    ghost: "text-white/90 bg-transparent hover:bg-white/10 border border-transparent hover:border-white/10",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      <span className="pointer-events-none absolute -inset-1 rounded-[18px] opacity-0 blur-xl transition duration-300 group-hover:opacity-100
                       bg-[conic-gradient(from_180deg,rgba(99,102,241,0.55),rgba(34,211,238,0.35),rgba(236,72,153,0.35),rgba(99,102,241,0.55))]" />
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-60
                       bg-[radial-gradient(500px_200px_at_30%_10%,rgba(255,255,255,0.22),transparent_55%)]" />
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
