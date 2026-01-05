"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============ REVEAL COMPONENT ============
function Reveal({
  children,
  className = "",
  y = 50,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y, filter: "blur(8px)" });

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [y, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

function MetaPill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
      <span className="text-lg">{icon}</span>
      <span className="text-xs text-white/70 font-mono">{label}</span>
    </div>
  );
}

function MiniBadge({
  value,
  label,
  valueClass = "text-white",
}: {
  value: string;
  label: string;
  valueClass?: string;
}) {
  return (
    <div className="px-4 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-xl">
      <span className={`text-sm font-bold ${valueClass}`}>{value}</span>
      <span className="mx-2 text-white/30">•</span>
      <span className="text-xs text-white/50 font-mono">{label}</span>
    </div>
  );
}

export default function Resume() {
  const [downloading, setDownloading] = useState(false);

  const onDownload = () => {
    setDownloading(true);
    window.setTimeout(() => setDownloading(false), 1600);
  };

  return (
    <section
      id="resume"
      className="scroll-mt-28 relative px-6 py-24 border-t border-white/10 overflow-hidden"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14] via-[#070a0f] to-black" />
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('/noise.png')]" />

        {/* Grid (un peu plus léger pour éviter surcharge) */}
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            animation: "gridMove 20s linear infinite",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />
        <div className="absolute left-1/2 top-20 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-3xl opacity-15" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 backdrop-blur-xl px-4 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400">
                resume.pdf.ready
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              <span className="text-purple-400 font-mono text-2xl">const</span>{" "}
              CV = {"{"}
              <br />
              <span className="text-emerald-400">Téléchargeable</span>
              <br />
              {"}"};{" "}
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="max-w-2xl mx-auto text-white/60 leading-relaxed">
              Version professionnelle et optimisée ATS. Téléchargez le PDF ou
              consultez-le en ligne.
            </p>
          </Reveal>
        </div>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          {/* Left - Download Card */}
          <Reveal delay={0.2}>
            <div className="relative rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl" />

              <div className="relative p-8">
                {/* Title */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-2xl">
                    📄
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Mon CV Professionnel
                    </h3>
                    <p className="text-xs text-white/50 font-mono">
                      Format PDF • Mise à jour 2026
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-white/70 leading-relaxed mb-8">
                  Document structuré incluant profil, compétences techniques,
                  expériences en stage, projets académiques et informations de
                  contact.
                </p>

                {/* Download Button */}
                <a
                  href="/Amine_Eddahiry.pdf?v=2026"
                  download
                  onClick={onDownload}
                  className="
                    group relative w-full inline-flex items-center justify-center gap-3
                    rounded-2xl px-8 py-5 mb-4
                    bg-gradient-to-r from-emerald-400 to-emerald-500 
                    text-black font-bold text-base
                    shadow-2xl shadow-emerald-500/40
                    transition-all
                    hover:shadow-emerald-500/60 hover:scale-[1.02]
                    active:scale-95
                    overflow-hidden
                  "
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                  {downloading ? (
                    <>
                      <svg
                        className="w-6 h-6 animate-spin relative"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span className="relative">Téléchargement...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6 relative"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 01.707-.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="relative">Télécharger le PDF</span>
                    </>
                  )}
                </a>

                {/* View Button */}
                <a
                  href="/Amine_Eddahiry.pdf?v=2026"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    group relative w-full inline-flex items-center justify-center gap-3
                    rounded-2xl px-8 py-5
                    border-2 border-white/20 bg-white/[0.05]
                    text-white font-semibold text-base backdrop-blur-xl
                    transition-all
                    hover:bg-white/[0.1] hover:border-emerald-400/40 hover:scale-[1.02]
                    active:scale-95
                  "
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span>Voir en ligne</span>
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-0.5"
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
                </a>

                {/* Features (gardées) */}
                <div className="mt-6 grid grid-cols-3 gap-2">
                  <MetaPill icon="⚡" label="Rapide" />
                  <MetaPill icon="✨" label="Propre" />
                  <MetaPill icon="🎯" label="ATS" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right - Real CV Preview (PDF) */}
          <Reveal delay={0.25}>
            <div className="relative">
              {/* Glow effect (gardé) */}
              <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400/20 via-transparent to-purple-400/20 rounded-3xl blur-2xl opacity-60 animate-pulse-slow" />

              <div className="relative rounded-3xl border-2 border-white/20 bg-gradient-to-br from-black/60 to-black/80 backdrop-blur-xl overflow-hidden shadow-2xl">
                {/* Window Chrome (gardé) */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/50 font-mono">
                      Amine_Eddahiry.pdf
                    </span>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg border border-emerald-400/30 bg-emerald-400/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs text-emerald-400 font-mono">
                        Preview
                      </span>
                    </div>
                  </div>
                </div>

                {/* Preview container */}
                <div className="relative">
                  {/* Desktop preview */}
                  <div className="hidden lg:block">
                    <iframe
                      src="/Amine_Eddahiry.pdf?v=2026#view=FitH"
                      title="CV PDF Preview"
                      className="w-full h-[680px]"
                    />
                  </div>

                  {/* Mobile fallback */}
                  <div className="lg:hidden p-8">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
                      <p className="text-sm text-white/60 leading-relaxed">
                        Aperçu PDF désactivé sur mobile pour de meilleures
                        performances.
                      </p>

                      <a
                        href="/Amine_Eddahiry.pdf?v=2026"
                        target="_blank"
                        rel="noreferrer"
                        className="
                          mt-4 group relative w-full inline-flex items-center justify-center gap-3
                          rounded-2xl px-8 py-5
                          border-2 border-white/20 bg-white/[0.05]
                          text-white font-semibold text-base backdrop-blur-xl
                          transition-all
                          hover:bg-white/[0.1] hover:border-emerald-400/40 hover:scale-[1.02]
                          active:scale-95
                        "
                      >
                        Ouvrir le CV
                        <span className="text-white/60">↗</span>
                      </a>
                    </div>
                  </div>

                  {/* Bottom fade pour “finir” clean */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Info Banner (gardé) */}
        <Reveal delay={0.3}>
          <div className="mt-12 rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/10 to-black/20 backdrop-blur-xl p-6 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 via-transparent to-purple-400/5" />

            <div className="relative flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl border-2 border-emerald-400/30 bg-emerald-400/10 shrink-0">
                <span className="text-3xl">💡</span>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg font-bold text-white mb-1">
                  Optimisé pour les systèmes ATS
                </h3>
                <p className="text-sm text-white/60">
                  Format structuré pour les logiciels de tracking automatique et
                  lecture rapide par les recruteurs. Mots-clés pertinents et
                  sections clairement définies.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <svg
                  className="w-5 h-5 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-semibold text-emerald-400">
                  Vérifié
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom meta badges (remplace les 4 grosses stats cards) */}
        <Reveal delay={0.35}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <MiniBadge value="PDF" label="Format" valueClass="text-emerald-400" />
            <MiniBadge value="FR" label="Langue" valueClass="text-blue-400" />
            <MiniBadge value="2026" label="Mise à jour" valueClass="text-purple-400" />
            <MiniBadge value="ATS" label="Optimisé" valueClass="text-amber-400" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
