"use client";

import { useEffect, useMemo, useState } from "react";

/* ----------------------------- REVEAL (simple) ---------------------------- */
function BlockReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), delay * 1000);
    return () => window.clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={[
        "transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

/* ---------------------------------- LINKS --------------------------------- */
const LINKS = {
  github: "https://github.com/EddahiryAmine",
  linkedin: "https://www.linkedin.com/in/eddahiry-amine/",
  email: "eddahiryamine@gmail.com",
  phone: "+212724546394",
};

/* ------------------------------- COPY BUTTON ------------------------------ */
function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // noop
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className={[
        "group inline-flex items-center justify-center gap-2 rounded-xl",
        "border backdrop-blur-sm px-4 py-2.5 text-xs font-bold",
        "transition-all duration-300 active:scale-95",
        copied
          ? "border-emerald-400/50 bg-emerald-400/20 text-emerald-100 scale-105 shadow-lg shadow-emerald-500/30"
          : "border-white/15 bg-black/50 text-white/70 hover:bg-emerald-400/10 hover:border-emerald-400/40 hover:text-emerald-100 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20",
      ].join(" ")}
      aria-label={`Copier ${label}`}
    >
      {copied ? (
        <>
          <svg className="w-4 h-4 animate-scale-in" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-mono">Copié!</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <span className="font-mono">Copy</span>
        </>
      )}
    </button>
  );
}

/* ------------------------------ CONTACT CARD ------------------------------ */
function ContactCard({
  title,
  subtitle,
  href,
  icon,
  badge,
  right,
  primary,
  description,
}: {
  title: string;
  subtitle: string;
  href?: string;
  icon: React.ReactNode;
  badge?: string;
  right?: React.ReactNode;
  primary?: boolean;
  description?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Wrapper: any = href ? "a" : "div";

  return (
    <Wrapper
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={[
        "group relative rounded-2xl border backdrop-blur-xl overflow-hidden transition-all duration-500",
        href ? "cursor-pointer" : "",
        primary
          ? "border-emerald-400/40 bg-gradient-to-br from-emerald-400/15 via-emerald-400/5 to-black/60 hover:border-emerald-400/60 hover:from-emerald-400/20 hover:scale-[1.02]"
          : "border-white/15 bg-gradient-to-br from-white/5 to-black/60 hover:border-emerald-400/30 hover:from-white/8 hover:scale-[1.02]",
        "hover:shadow-2xl",
        primary ? "hover:shadow-emerald-500/30" : "hover:shadow-emerald-500/20",
      ].join(" ")}
    >
      {/* Animated gradient background */}
      <div
        className={[
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          primary
            ? "bg-gradient-to-br from-emerald-400/10 via-cyan-400/5 to-purple-400/10"
            : "bg-gradient-to-br from-emerald-400/5 via-transparent to-cyan-400/5",
        ].join(" ")}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity"
        style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.4) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(16,185,129,0.4) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Glow orb */}
      <div
        className={[
          "absolute w-32 h-32 rounded-full blur-3xl transition-all duration-700",
          primary ? "bg-emerald-400/20" : "bg-emerald-400/10",
        ].join(" ")}
        style={{
          top: isHovered ? "-20%" : "-40%",
          right: isHovered ? "-10%" : "-20%",
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 min-w-0 flex-1">
            {/* Icon */}
            <div
              className={[
                "relative h-16 w-16 shrink-0 rounded-2xl border-2 flex items-center justify-center transition-all duration-500",
                primary
                  ? "border-emerald-400/40 bg-gradient-to-br from-emerald-400/20 to-cyan-400/10 group-hover:border-emerald-400/60 group-hover:scale-110 group-hover:rotate-3"
                  : "border-white/20 bg-gradient-to-br from-white/10 to-white/5 group-hover:border-emerald-400/40 group-hover:scale-110 group-hover:rotate-3",
              ].join(" ")}
            >
              <div
                className={[
                  "absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity",
                  primary ? "bg-emerald-400/30" : "bg-emerald-400/20",
                ].join(" ")}
              />
              <div className="relative transition-transform group-hover:scale-110">{icon}</div>

              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-emerald-400/0 group-hover:border-emerald-400/60 rounded-tl transition-all" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400/0 group-hover:border-cyan-400/60 rounded-br transition-all" />
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-100 transition-colors">
                  {title}
                </h3>
                {badge && (
                  <span className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-emerald-400/40 bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-100 shadow-lg shadow-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
                    {badge}
                  </span>
                )}
              </div>

              <p className="mt-2 text-base text-white/80 font-mono group-hover:text-emerald-100 transition-colors break-all sm:break-normal">
                {subtitle}
              </p>

              {description && (
                <p className="mt-3 text-sm text-white/60 leading-relaxed group-hover:text-white/70 transition-colors">
                  {description}
                </p>
              )}
            </div>
          </div>

          {right && <div className="shrink-0">{right}</div>}
        </div>

        {href && (
          <div className="mt-5 flex items-center gap-2 text-xs text-white/50 font-mono group-hover:text-emerald-400 transition-colors">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
            <span>Click to connect</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        )}
      </div>
    </Wrapper>
  );
}

/* --------------------------------- CONTACT -------------------------------- */
export default function Contact() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({ w: 1200, h: 800 });

  useEffect(() => {
    const updateViewport = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    updateViewport();

    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });

    window.addEventListener("resize", updateViewport);
    window.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  const radialStyle = useMemo(() => {
    const left = `${(mousePos.x / viewport.w) * 100}%`;
    const top = `${(mousePos.y / viewport.h) * 100}%`;
    return {
      left,
      top,
      transform: "translate(-50%, -50%)",
      background:
        "radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(6,182,212,0.15) 40%, transparent 70%)",
    } as const;
  }, [mousePos.x, mousePos.y, viewport.w, viewport.h]);

  return (
    <section id="contact" className="scroll-mt-28 relative isolate px-6 py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f14] via-[#050a0f] to-black" />

        <div className="absolute w-[520px] sm:w-[600px] h-[520px] sm:h-[600px] rounded-full blur-3xl opacity-20 transition-all duration-1000" style={radialStyle} />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(16,185,129,0.4) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(16,185,129,0.4) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
            animation: "gridMove 30s linear infinite",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(16,185,129,0.3) 0px, transparent 2px, transparent 4px)",
            animation: "scanlines 8s linear infinite",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
        <div className="absolute left-1/4 top-20 h-80 sm:h-96 w-80 sm:w-96 rounded-full blur-3xl opacity-10 bg-emerald-400/30 animate-pulse-slow" />
        <div className="absolute right-1/4 bottom-20 h-80 sm:h-96 w-80 sm:w-96 rounded-full blur-3xl opacity-10 bg-cyan-400/30 animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 sm:mb-16">
          <BlockReveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/40 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 backdrop-blur-xl px-5 py-2.5 shadow-lg shadow-emerald-500/20">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <span className="text-sm font-mono font-bold text-emerald-400">{">"} contact.init()</span>
            </div>
          </BlockReveal>

          {/* Title (DEV const style) */}
          <div className="mt-7 sm:mt-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div className="max-w-3xl">
              <BlockReveal delay={0.1}>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
                  <span className="text-purple-400 font-mono text-xl sm:text-2xl">const</span>{" "}
                  <span className="font-mono">contact</span>{" "}
                  <span className="text-white/60 font-mono">= {"{"}</span>
                  <br />
                  <span className="ml-6 sm:ml-10 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-gradient">
                    "Construisons Ensemble"
                  </span>
                  <br />
                  <span className="text-white/60 font-mono">{"}"};</span>
                </h2>
              </BlockReveal>

              <BlockReveal delay={0.2}>
                <div className="mt-6 space-y-3">
                  <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                    <span className="text-emerald-400 font-bold font-mono">Email</span> pour une réponse rapide ({"<24h"}),
                    <span className="text-cyan-400 font-bold font-mono ml-2">LinkedIn</span> pour networker,
                    <span className="text-purple-400 font-bold font-mono ml-2">GitHub</span> pour voir le code en action.
                  </p>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5">
                      <span className="text-xs font-mono text-white/60">response_time:</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">{"<24h"}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5">
                      <span className="text-xs font-mono text-white/60">availability:</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">true</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5">
                      <span className="text-xs font-mono text-white/60">location:</span>
                      <span className="text-xs font-mono font-bold text-cyan-400">Casablanca, MA</span>
                    </div>
                  </div>
                </div>
              </BlockReveal>
            </div>

            {/* CTAs responsive */}
            <BlockReveal delay={0.3}>
              <div className="flex flex-col gap-3 w-full sm:w-auto min-w-0 sm:min-w-[280px]">
                <a
                  href={`mailto:${LINKS.email}`}
                  className={[
                    "group relative inline-flex items-center justify-center gap-3",
                    "rounded-xl px-8 py-4",
                    "bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 text-black font-black text-base",
                    "shadow-2xl shadow-emerald-500/40",
                    "transition-all duration-300 hover:shadow-emerald-500/60 hover:scale-[1.02] active:scale-95",
                    "overflow-hidden",
                  ].join(" ")}
                >
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0"
                    style={{ animation: "shine 3s infinite", backgroundSize: "200% 100%" }}
                  />
                  <svg className="w-5 h-5 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="relative">Envoyer un Email</span>
                  <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-black/30 rounded-tl" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-black/30 rounded-br" />
                </a>

                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={[
                    "group relative inline-flex items-center justify-center gap-3",
                    "rounded-xl px-8 py-4",
                    "border-2 border-white/25 bg-white/5 text-white font-bold text-base backdrop-blur-xl",
                    "transition-all duration-300 hover:bg-white/10 hover:border-emerald-400/40 hover:scale-[1.02] active:scale-95",
                    "overflow-hidden",
                  ].join(" ")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/10 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <svg className="w-5 h-5 relative" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="relative">LinkedIn Profile</span>
                </a>
              </div>
            </BlockReveal>
          </div>
        </div>

        {/* Divider */}
        <BlockReveal delay={0.35}>
          <div className="mb-10 sm:mb-12 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-white/20 via-emerald-400/30 to-transparent" />
            <span className="text-xs font-mono text-white/40">// contact_methods</span>
          </div>
        </BlockReveal>

        {/* Cards grid (responsive) */}
        <div className="grid gap-6 md:grid-cols-2 mb-10 sm:mb-12">
          <BlockReveal delay={0.4}>
            <ContactCard
              title="Email"
              subtitle={LINKS.email}
              href={`mailto:${LINKS.email}`}
              badge="Rapide"
              description="Réponse garantie sous 24h en semaine • Projets, stages, collaborations"
              primary
              right={<CopyButton value={LINKS.email} label="email" />}
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7Z" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
                  <path d="M6.5 8.5 12 12.5l5.5-4" stroke="rgba(16,185,129,1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
          </BlockReveal>

          <BlockReveal delay={0.45}>
            <ContactCard
              title="Téléphone"
              subtitle={LINKS.phone}
              href={`tel:${LINKS.phone}`}
              description="Disponible 9h-18h (GMT+1) • Appels professionnels uniquement"
              right={<CopyButton value={LINKS.phone} label="numéro" />}
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7.5 4.5h2.2c.5 0 .9.3 1 .8l.6 2.7c.1.4 0 .8-.3 1.1l-1.1 1.1c1 2.1 2.7 3.8 4.8 4.8l1.1-1.1c.3-.3.7-.4 1.1-.3l2.7.6c.5.1.8.5.8 1V18.5c0 .6-.5 1-1 1h-1.1C11 19.5 4.5 13 4.5 5.6V4.5c0-.6.4-1 1-1Z"
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </BlockReveal>

          <BlockReveal delay={0.5}>
            <ContactCard
              title="LinkedIn"
              subtitle="eddahiry-amine"
              href={LINKS.linkedin}
              badge="Network"
              description="Networking professionnel • Opportunités de carrière • Recommandations"
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M6.5 9.5V18" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M6.5 6.75h.01" stroke="rgba(16,185,129,1)" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M10.25 18v-5.2c0-1.6 1-2.55 2.35-2.55 1.3 0 2.15.9 2.15 2.6V18" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10.25 10.2V18" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4.5 5.8c0-.72.58-1.3 1.3-1.3h12.4c.72 0 1.3.58 1.3 1.3v12.4c0 .72-.58 1.3-1.3 1.3H5.8c-.72 0-1.3-.58-1.3-1.3V5.8Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
                </svg>
              }
            />
          </BlockReveal>

          <BlockReveal delay={0.55}>
            <ContactCard
              title="GitHub"
              subtitle="EddahiryAmine"
              href={LINKS.github}
              badge="Open Source"
              description="Repos publics • Contributions • Code samples • Technical portfolio"
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2.75c-5.1 0-9.25 4.15-9.25 9.26 0 4.08 2.65 7.54 6.33 8.77.46.08.63-.2.63-.45v-1.6c-2.57.56-3.11-1.1-3.11-1.1-.42-1.06-1.03-1.35-1.03-1.35-.84-.57.06-.56.06-.56.93.06 1.42.96 1.42.96.83 1.42 2.18 1.01 2.72.77.08-.6.33-1.01.6-1.24-2.05-.23-4.2-1.03-4.2-4.56 0-1 .36-1.82.96-2.46-.1-.23-.42-1.18.1-2.46 0 0 .78-.25 2.55.94.74-.2 1.53-.3 2.32-.3.79 0 1.58.1 2.32.3 1.77-1.19 2.55-.94 2.55-.94.52 1.28.2 2.23.1 2.46.6.64.96 1.46.96 2.46 0 3.54-2.16 4.33-4.22 4.55.34.29.64.86.64 1.74v2.58c0 .25.17.54.64.45 3.68-1.23 6.33-4.69 6.33-8.77 0-5.11-4.15-9.26-9.25-9.26Z"
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <path d="M9 19.25c-1.2.38-2.4.38-3.6 0" stroke="rgba(16,185,129,1)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              }
            />
          </BlockReveal>
        </div>

        {/* Quick copy row (responsive center) */}
        <BlockReveal delay={0.65}>
          <div className="mt-6 flex flex-wrap items-center justify-start sm:justify-center gap-3">
            <CopyButton value={LINKS.email} label="email" />
            <CopyButton value={LINKS.phone} label="téléphone" />
          </div>
        </BlockReveal>
      </div>
    </section>
  );
}
