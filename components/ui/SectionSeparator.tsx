"use client";

export default function SectionSeparator() {
  return (
    <div className="relative h-20 md:h-28 -mt-10 md:-mt-14">
      {/* Fade (fond vers section suivante) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/60 to-slate-950" />

      {/* Ligne lumineuse */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Glow discret */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-[70%] blur-2xl opacity-60
                      bg-[radial-gradient(closest-side,rgba(59,130,246,0.16),transparent_70%)]" />

      {/* Wave premium (SVG subtil) */}
      <svg
        className="absolute bottom-0 left-0 w-full h-16 md:h-20 opacity-[0.16]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,64 C240,110 480,20 720,54 C960,88 1200,110 1440,64 L1440,120 L0,120 Z"
          fill="white"
        />
      </svg>

      {/* Grain léger */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('/noise.png')]" />
    </div>
  );
}
