"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
};

export default function Reveal({
  children,
  className = "",
  y = 50,
  delay = 0,
  duration = 0.8,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Configuration initiale
    gsap.set(el, { 
      opacity: 0, 
      y, 
      filter: "blur(8px)",
      willChange: "transform, opacity, filter"
    });

    // Animation
    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "top 70%",
          toggleActions: "play none none reverse",
          // markers: true, // Décommentez pour debug
        },
      });
    });

    return () => {
      ctx.revert(); // Nettoie tout automatiquement
    };
  }, [y, delay, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}