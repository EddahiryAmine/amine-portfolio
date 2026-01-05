"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  faArrowRight,
  faArrowUpRightFromSquare,
  faBolt,
  faBrain,
  faCodeBranch,
  faDatabase,
  faGraduationCap,
  faLayerGroup,
  faTerminal,
  faCircle,
  faRocket,
  faEnvelope,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

// ============ PAGE LOADER ============
function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => setIsLoading(false), 200);
        },
      });

      tl.from(".loader-text", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          ".loader-progress",
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "-=0.4"
        )
        .to(
          ".loader-text",
          {
            y: -100,
            opacity: 0,
            duration: 0.6,
            ease: "power3.in",
          },
          "-=0.3"
        )
        .to(
          ".loader-bar",
          {
            scaleY: 0,
            transformOrigin: "top",
            duration: 0.8,
            stagger: 0.08,
            ease: "power4.inOut",
          },
          "-=0.2"
        );
    });

    return () => ctx.revert();
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0b0f14]"
      style={{ pointerEvents: "all" }}
    >
      <div className="absolute inset-0 flex">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="loader-bar flex-1 bg-gradient-to-b from-emerald-500/90 via-emerald-600/70 to-[#0b0f14]"
          />
        ))}
      </div>

      <div className="loader-text relative z-10 text-center px-6">
        <div className="mb-6">
          <div className="text-7xl md:text-8xl font-mono font-bold text-white mb-2">
            {"<"}AE{" />"}
          </div>
          <div className="text-emerald-400 font-mono text-sm tracking-widest">
            AMINE EDDAHIRY
          </div>
        </div>

        <div className="w-64 h-1 bg-white/10 mx-auto rounded-full overflow-hidden">
          <div
            className="loader-progress h-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 rounded-full origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <div className="mt-4 text-white/50 text-xs font-mono">
          Loading portfolio...
        </div>
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
}

// ============ REVEAL ============
type RevealProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
};

function Reveal({
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

    gsap.set(el, {
      opacity: 0,
      y,
      filter: "blur(8px)",
      willChange: "transform, opacity, filter",
    });

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration,
        delay: delay + 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [y, delay, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ============ TYPEWRITER ============
function Typewriter({ text, speed = 42 }: { text: string; speed?: number }) {
  const [out, setOut] = useState("");

  useEffect(() => {
    const startDelay = setTimeout(() => {
      let i = 0;
      setOut("");
      const id = window.setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) window.clearInterval(id);
      }, speed);

      return () => window.clearInterval(id);
    }, 1800);

    return () => clearTimeout(startDelay);
  }, [text, speed]);

  return (
    <span className="relative">
      {out}
      <span className="inline-block w-[10px] ml-1 text-emerald-400 animate-pulse">
        |
      </span>
    </span>
  );
}

// ============ CODE SNIPPET ============
function CodeSnippet({ code, delay = 0 }: { code: string; delay?: number }) {
  return (
    <div
      className="absolute rounded-lg border border-emerald-400/30 bg-black/90 backdrop-blur-xl px-4 py-3 font-mono text-xs shadow-2xl shadow-emerald-500/30 animate-float"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
        <span className="text-white/40 text-[10px] inline-flex items-center gap-2">
          <FontAwesomeIcon icon={faTerminal} />
          terminal
        </span>
      </div>
      <div className="text-emerald-400">{code}</div>
    </div>
  );
}

// ============ PILL (avec icône FA) ============
function Pill({
  icon,
  children,
}: {
  icon: IconDefinition;
  children: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70 backdrop-blur hover:border-emerald-400/30 hover:bg-emerald-400/5 transition-all">
      <FontAwesomeIcon icon={icon} className="text-emerald-400/90" />
      {children}
    </span>
  );
}

// ============ CTA BUTTONS (FA) ============
function PrimaryCTA({
  href,
  children,
  icon = faEnvelope,
}: {
  href: string;
  children: string;
  icon?: IconDefinition;
}) {
  return (
    <a
      href={href}
      className="
        group inline-flex items-center justify-center gap-2
        rounded-2xl px-6 py-3 text-sm font-semibold
        bg-emerald-400 text-black
        shadow-[0_18px_55px_-30px_rgba(16,185,129,0.85)]
        transition-all
        hover:brightness-110 hover:shadow-[0_22px_70px_-28px_rgba(16,185,129,0.95)]
        active:scale-[0.99]
      "
    >
      <FontAwesomeIcon icon={icon} />
      {children}
      <FontAwesomeIcon
        icon={faArrowUpRightFromSquare}
        className="opacity-80 transition-transform group-hover:translate-x-0.5"
      />
    </a>
  );
}

function SecondaryCTA({
  href,
  children,
  icon = faArrowRight,
}: {
  href: string;
  children: string;
  icon?: IconDefinition;
}) {
  return (
    <a
      href={href}
      className="
        group inline-flex items-center justify-center gap-2
        rounded-2xl px-6 py-3 text-sm font-semibold
        border border-white/12 bg-white/[0.03]
        text-white/85 backdrop-blur
        transition-all
        hover:bg-white/[0.06] hover:border-emerald-400/18
        active:scale-[0.99]
      "
    >
      {children}
      <FontAwesomeIcon
        icon={icon}
        className="opacity-70 transition-transform group-hover:translate-x-0.5"
      />
    </a>
  );
}

// ============ ENHANCED STAT (FA) ============
function EnhancedStat({
  icon,
  value,
  label,
  gradient,
}: {
  icon: IconDefinition;
  value: string;
  label: string;
  gradient: string;
}) {
  return (
    <div
      className={`group relative rounded-2xl border border-white/10 bg-gradient-to-br ${gradient} p-[1px] backdrop-blur overflow-hidden transition-all hover:scale-[1.02]`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative rounded-2xl bg-black/80 backdrop-blur px-5 py-4 h-full">
        <div className="flex items-start justify-between mb-2">
          <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center">
            <FontAwesomeIcon icon={icon} className="text-emerald-300" />
          </div>

          <div className="flex items-center gap-1">
            <span className="text-emerald-400 animate-pulse">
              <FontAwesomeIcon icon={faCircle} className="text-[6px]" />
            </span>
            <span
              className="text-emerald-400 animate-pulse"
              style={{ animationDelay: "0.2s" }}
            >
              <FontAwesomeIcon icon={faCircle} className="text-[6px]" />
            </span>
            <span
              className="text-emerald-400 animate-pulse"
              style={{ animationDelay: "0.4s" }}
            >
              <FontAwesomeIcon icon={faCircle} className="text-[6px]" />
            </span>
          </div>
        </div>

        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <div className="text-xs uppercase tracking-wider text-white/50 font-mono">
          {label}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}

// ============ HERO SECTION ============
export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <PageLoader />

      <section id="home" className="min-h-screen overflow-hidden relative">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14] via-[#070a0f] to-black" />
          <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('/noise.png')]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
              animation: "gridMove 20s linear infinite",
            }}
          />
          <div className="absolute -top-56 -left-56 h-[720px] w-[720px] rounded-full blur-3xl opacity-35 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.20),transparent_62%)]" />
          <div className="absolute -bottom-64 -right-64 h-[760px] w-[760px] rounded-full blur-3xl opacity-25 bg-[radial-gradient(circle_at_40%_40%,rgba(16,185,129,0.14),transparent_62%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[85vh]">
            {/* LEFT */}
            <div className="order-2 lg:order-1">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/65 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
                  Full-Stack Developer • Backend first • Production mindset
                </div>
              </Reveal>

              <Reveal delay={0.08} y={26}>
                <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05]">
                  <span className="font-mono tracking-tight text-white/60 text-2xl md:text-3xl">
                    {"<"}dev{">"}
                  </span>
                  <br />
                  <span className="font-mono tracking-tight text-white">
                    Bonjour,je suis
                  </span>
                  <br />
                  <span className="font-mono tracking-tight text-emerald-400">
                    <Typewriter text="Amine Eddahiry" />
                  </span>
                  <br />
                  <span className="font-mono tracking-tight text-white/60 text-xl md:text-2xl">
                    {"</"}dev{">"}
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.12} y={18}>
                <p className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed">
                  Je construis des produits solides : APIs robustes, microservices,
                  sécurité, intégrations et IA appliquée — avec un focus qualité,
                  performance et maintenance.
                </p>
              </Reveal>

              <Reveal delay={0.16} y={18}>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Pill icon={faBolt}>Spring Boot</Pill>
                  <Pill icon={faLayerGroup}>.NET</Pill>
                  <Pill icon={faRocket}>FastAPI</Pill>
                  <Pill icon={faCodeBranch}>Microservices</Pill>
                  <Pill icon={faTerminal}>Docker</Pill>
                  <Pill icon={faDatabase}>PostgreSQL</Pill>
                </div>
              </Reveal>

              <Reveal delay={0.2} y={18}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <PrimaryCTA href="#contact" icon={faEnvelope}>
                    Me contacter
                  </PrimaryCTA>
                  <SecondaryCTA href="#projects" icon={faArrowRight}>
                    Voir mes projets
                  </SecondaryCTA>
                </div>
              </Reveal>

              <Reveal delay={0.24} y={12}>
                <div className="mt-10 inline-flex items-center gap-2 text-xs text-white/45">
                  <span className="inline-flex h-8 w-5 items-start justify-center rounded-full border border-white/10 bg-white/[0.03] pt-1">
                    <span className="h-2 w-1 rounded-full bg-emerald-400/70 animate-bounce" />
                  </span>
                  Faites défiler pour découvrir mes projets
                </div>
              </Reveal>
            </div>

            {/* RIGHT */}
            <div className="order-1 lg:order-2 relative">
              <Reveal y={30} duration={0.9}>
                <div className="relative aspect-square max-w-[600px] mx-auto">
                  {/* Floating snippets */}
                  {mounted && (
                    <>
                      <div className="absolute -top-8 left-8 z-20 hidden md:block">
                        <CodeSnippet code="$ npm run build" delay={0} />
                      </div>
                      <div className="absolute top-20 -right-4 z-20 hidden md:block">
                        <CodeSnippet code="✓ API deployed" delay={600} />
                      </div>
                      <div className="absolute bottom-16 -left-8 z-20 hidden md:block">
                        <CodeSnippet code="git commit -m 'feat'" delay={1200} />
                      </div>
                    </>
                  )}

                  <div className="relative w-full h-full">
                    <div className="absolute -inset-4 rounded-3xl border-2 border-emerald-400/30 animate-pulse-slow" />
                    <div
                      className="absolute -inset-2 rounded-3xl border border-emerald-400/20"
                      style={{ animation: "spin 40s linear infinite" }}
                    />

                    <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white/10 bg-gradient-to-br from-emerald-900/20 to-purple-900/20">
                      <img
                        src="/me.png"
                        alt="Amine Eddahiry"
                        className="w-full h-full object-cover object-center"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(16, 185, 129, 0.1) 2px, rgba(16, 185, 129, 0.1) 4px)",
                          animation: "scanline 8s linear infinite",
                        }}
                      />

                      {/* Code overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 to-transparent">
                        <div className="font-mono text-xs space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-purple-400">class</span>
                            <span className="text-emerald-400">Developer</span>
                            <span className="text-white/60">{"{"}</span>
                          </div>
                          <div className="ml-4 text-white/60">
                            <span className="text-blue-400">location</span>:{" "}
                            <span className="text-amber-400">"Casablanca"</span>;
                          </div>
                          <div className="ml-4 text-white/60">
                            <span className="text-blue-400">status</span>:{" "}
                            <span className="text-green-400">"available"</span>;
                          </div>
                          <div className="ml-4 text-white/60">
                            <span className="text-blue-400">skills</span>: [
                            <span className="text-amber-400">"Backend"</span>,{" "}
                            <span className="text-amber-400">"AI"</span>];
                          </div>
                          <div className="text-white/60">{"}"}</div>
                        </div>
                      </div>

                      {/* dots */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <div
                          className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
                          style={{ animationDelay: "0.3s" }}
                        />
                        <div
                          className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
                          style={{ animationDelay: "0.6s" }}
                        />
                      </div>
                    </div>

                    {/* glitch */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div
                        className="absolute inset-0 bg-emerald-400/5 mix-blend-screen animate-glitch"
                        style={{ animationDelay: "0s" }}
                      />
                      <div
                        className="absolute inset-0 bg-purple-400/5 mix-blend-screen animate-glitch"
                        style={{ animationDelay: "0.1s" }}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* STATS (Font Awesome) */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            <Reveal delay={0.05}>
              <EnhancedStat
                icon={faBriefcase}
                value="3+"
                label="Stages Pro"
                gradient="from-emerald-400/20 via-emerald-400/10 to-transparent"
              />
            </Reveal>

            <Reveal delay={0.1}>
              <EnhancedStat
                icon={faRocket}
                value="8+"
                label="Projets Déployés"
                gradient="from-blue-400/20 via-blue-400/10 to-transparent"
              />
            </Reveal>

            <Reveal delay={0.15}>
              <EnhancedStat
                icon={faCodeBranch}
                value="Microservices"
                label="Architecture"
                gradient="from-purple-400/20 via-purple-400/10 to-transparent"
              />
            </Reveal>

            <Reveal delay={0.2}>
              <EnhancedStat
                icon={faBrain}
                value="IA appliquée"
                label="ML & LLMs"
                gradient="from-amber-400/20 via-amber-400/10 to-transparent"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
