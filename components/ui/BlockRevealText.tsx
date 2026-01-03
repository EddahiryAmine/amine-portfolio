"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Block reveal:
 * 1) Un "bloc" (overlay) traverse le texte
 * 2) Le texte apparaît au bon moment
 */
export default function BlockRevealText({ children, className = "", delay = 0 }: Props) {
  const wrapRef = useRef<HTMLSpanElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const blockRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      if (!wrapRef.current || !textRef.current || !blockRef.current) return;

      gsap.set(textRef.current, { opacity: 0, y: 8 });
      gsap.set(blockRef.current, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" }, delay });

      // Le bloc passe (phase 1)
      tl.to(blockRef.current, { scaleX: 1, duration: 0.55 })
        // Révèle le texte pendant que le bloc est “plein”
        .to(textRef.current, { opacity: 1, y: 0, duration: 0.35 }, "-=0.20")
        // Le bloc repart (phase 2)
        .to(blockRef.current, { scaleX: 0, duration: 0.55, transformOrigin: "right center" }, "-=0.15");
    },
    { scope: wrapRef }
  );

  return (
    <span ref={wrapRef} className={`relative inline-block ${className}`}>
      <span ref={textRef} className="relative inline-block">
        {children}
      </span>

      {/* Le “bloc” overlay */}
      <span
        ref={blockRef}
        aria-hidden="true"
        className="absolute inset-0 rounded-sm bg-white/90"
        style={{ mixBlendMode: "difference" }}
      />
    </span>
  );
}
