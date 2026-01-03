"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** si true => animation déclenchée au scroll */
  onScroll?: boolean;
};

export default function BlockReveal({
  children,
  className = "",
  delay = 0,
  onScroll = false,
}: Props) {
  const wrapRef = useRef<HTMLSpanElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const blockRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      if (!wrapRef.current || !textRef.current || !blockRef.current) return;

      gsap.set(textRef.current, { opacity: 0, y: 10 });
      gsap.set(blockRef.current, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        delay,
        ...(onScroll
          ? {
              scrollTrigger: {
                trigger: wrapRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          : {}),
      });

      tl.to(blockRef.current, { scaleX: 1, duration: 0.55 })
        .to(textRef.current, { opacity: 1, y: 0, duration: 0.35 }, "-=0.18")
        .to(blockRef.current, { scaleX: 0, duration: 0.55, transformOrigin: "right center" }, "-=0.15");
    },
    { scope: wrapRef }
  );

  return (
    <span ref={wrapRef} className={`relative inline-block ${className}`}>
      <span ref={textRef} className="relative inline-block">
        {children}
      </span>
      <span
        ref={blockRef}
        aria-hidden="true"
        className="absolute inset-0 rounded-sm bg-white/90"
        style={{ mixBlendMode: "difference" }}
      />
    </span>
  );
}
