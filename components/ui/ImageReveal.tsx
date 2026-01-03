"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

type Props = {
  src: string;
  alt: string;
  className?: string;
  onScroll?: boolean;
};

export default function ImageReveal({ src, alt, className = "", onScroll = false }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      if (!wrapRef.current || !overlayRef.current || !imgRef.current) return;

      gsap.set(overlayRef.current, { scaleX: 1, transformOrigin: "left center" });
      gsap.set(imgRef.current, { scale: 1.08, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        ...(onScroll
          ? {
              scrollTrigger: {
                trigger: wrapRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          : {}),
      });

      tl.to(imgRef.current, { opacity: 1, duration: 0.25 }, 0)
        .to(overlayRef.current, { scaleX: 0, duration: 0.75, transformOrigin: "right center" }, 0.05)
        .to(imgRef.current, { scale: 1.0, duration: 1.0 }, 0.05);
    },
    { scope: wrapRef }
  );

  return (
    <div ref={wrapRef} className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 ${className}`}>
      <div ref={imgRef} className="relative">
        <Image
          src={src}
          alt={alt}
          width={900}
          height={1100}
          className="h-[420px] w-full object-cover md:h-[520px]"
          priority
        />
      </div>

      {/* overlay qui “wipe” la photo */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-white/90"
        style={{ mixBlendMode: "difference" }}
      />

      {/* petit glow */}
      <div className="pointer-events-none absolute inset-0 shadow-[0_0_80px_rgba(255,255,255,0.08)]" />
    </div>
  );
}
