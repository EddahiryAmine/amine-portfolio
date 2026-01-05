"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Background() {
  const blob1 = useRef<HTMLDivElement | null>(null);
  const blob2 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!blob1.current || !blob2.current) return;

    gsap.to(blob1.current, { x: 60, y: 40, duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(blob2.current, { x: -50, y: 30, duration: 14, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
    
      <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_20%_10%,rgba(16,185,129,0.10),transparent_65%),radial-gradient(800px_480px_at_80%_20%,rgba(148,163,184,0.06),transparent_65%)]" />
      <div
        ref={blob1}
        className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-70
               bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.10),transparent_60%),linear-gradient(135deg,rgba(16,185,129,0.18),rgba(15,23,42,0.0))]"
      />

      <div
        ref={blob2}
        className="absolute -bottom-48 -right-48 h-[560px] w-[560px] rounded-full blur-3xl opacity-60
               bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_60%),linear-gradient(135deg,rgba(16,185,129,0.14),rgba(15,23,42,0.0))]"
      />
    </div>
  );
}
