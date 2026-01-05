"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  faCode,
  faTerminal,
  faGraduationCap,
  faBriefcase,
  faRocket,
  faTrophy,
  faCircleCheck,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

// ===================== REVEAL =====================
type RevealProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
};

function Reveal({
  children,
  className = "",
  y = 50,
  delay = 0,
  duration = 0.8,
  direction = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const from: gsap.TweenVars = { opacity: 0, filter: "blur(8px)" };
    const to: gsap.TweenVars = { opacity: 1, filter: "blur(0px)" };

    if (direction === "up") {
      from.y = y;
      to.y = 0;
    } else if (direction === "down") {
      from.y = -y;
      to.y = 0;
    } else if (direction === "left") {
      from.x = y;
      to.x = 0;
    } else if (direction === "right") {
      from.x = -y;
      to.x = 0;
    }

    gsap.set(el, { ...from, willChange: "transform, opacity, filter" });

    const ctx = gsap.context(() => {
      gsap.to(el, {
        ...to,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 65%",
          toggleActions: "play none none reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [y, delay, duration, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ===================== UI PARTS =====================
function CodeComment({ children }: { children: string }) {
  return (
    <div className="font-mono text-xs text-emerald-400/60 mb-2">
      <span className="text-emerald-400/40">{"/* "}</span>
      {children}
      <span className="text-emerald-400/40">{" */"}</span>
    </div>
  );
}

function TechTag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70 backdrop-blur hover:border-emerald-400/30 hover:bg-emerald-400/5 transition-all font-mono">
      <span className="text-emerald-400 mr-1.5">//</span>
      {children}
    </span>
  );
}

function TerminalWindow({
  title = "about.tsx",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-emerald-400/30 bg-black/90 backdrop-blur-xl overflow-hidden shadow-2xl shadow-emerald-500/20">
      <div className="flex items-center gap-2 px-4 py-2 bg-black/50 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-white/40 text-xs font-mono ml-2">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function StatBadgeFA({
  icon,
  label,
  value,
}: {
  icon: IconDefinition;
  label: string;
  value: string;
}) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-emerald-400/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl px-4 py-3 transition-all hover:border-emerald-400/30 hover:bg-black/60">
        <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center">
          <FontAwesomeIcon icon={icon} className="text-emerald-400" />
        </div>
        <div>
          <div className="text-xs text-white/50 font-mono">{label}</div>
          <div className="text-sm font-semibold text-white">{value}</div>
        </div>
      </div>
    </div>
  );
}

// ===================== ABOUT =====================
type Snippet = {
  lang: string;
  code: string;
  tone: "emerald" | "blue" | "purple" | "cyan";
};

const SNIPPET_CLASS: Record<
  Snippet["tone"],
  { border: string; text: string; glow: string }
> = {
  emerald: {
    border: "border-emerald-400/30",
    text: "text-emerald-400",
    glow: "shadow-emerald-500/20",
  },
  blue: {
    border: "border-blue-400/30",
    text: "text-blue-400",
    glow: "shadow-blue-500/20",
  },
  purple: {
    border: "border-purple-400/30",
    text: "text-purple-400",
    glow: "shadow-purple-500/20",
  },
  cyan: {
    border: "border-cyan-400/30",
    text: "text-cyan-400",
    glow: "shadow-cyan-500/20",
  },
};

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [typedText, setTypedText] = useState("");

  const fullText = "const developer = new FullStackDev();";

  const codeSnippets: Snippet[] = useMemo(
    () => [
      { lang: "Spring Boot", code: "@RestController", tone: "emerald" },
      { lang: ".NET", code: "[ApiController]", tone: "blue" },
      { lang: "FastAPI", code: "@app.get('/')", tone: "purple" },
      { lang: "Docker", code: "docker-compose up", tone: "cyan" },
    ],
    []
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % codeSnippets.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, [codeSnippets.length]);

  useEffect(() => {
    let i = 0;
    const t = window.setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i += 1;
      } else {
        window.clearInterval(t);
      }
    }, 50);
    return () => window.clearInterval(t);
  }, [fullText]);

  const current = codeSnippets[activeIndex];
  const tone = SNIPPET_CLASS[current.tone];

  return (
    <section
      id="about"
      className="scroll-mt-28 relative px-6 py-24 border-t border-white/10 overflow-hidden"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14] via-[#070a0f] to-black" />
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('/noise.png')]" />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            animation: "gridMove 20s linear infinite",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl opacity-20 animate-float-delay" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 backdrop-blur-xl px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400">
                about.section.active
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-6 font-mono text-emerald-400 flex items-center gap-2">
              <FontAwesomeIcon icon={faTerminal} className="text-emerald-400/80" />
              <span>{typedText}</span>
              <span className="animate-pulse">|</span>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT */}
          <div className="lg:col-span-5">
            <Reveal direction="left" y={60}>
              <TerminalWindow title="profile.tsx">
                <div className="relative">
                  {/* Floating code pills */}
                  <div className="absolute -top-8 -right-8 z-10 hidden md:block">
                    <div
                      className={[
                        "rounded-lg border bg-black/80 backdrop-blur-xl px-3 py-2 shadow-lg animate-float",
                        tone.border,
                        tone.glow,
                      ].join(" ")}
                    >
                      <div className={["font-mono text-xs", tone.text].join(" ")}>
                        {current.code}
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-8 -left-8 z-10 hidden md:block">
                    <div
                      className="rounded-lg border border-purple-400/30 bg-black/80 backdrop-blur-xl px-3 py-2 shadow-lg animate-float"
                      style={{ animationDelay: "1s" }}
                    >
                      <div className="font-mono text-xs text-purple-400">
                        {current.lang}
                      </div>
                    </div>
                  </div>

                  {/* Photo card */}
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400/20 via-transparent to-purple-400/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-br from-emerald-400/40 via-transparent to-purple-400/40 rounded-2xl animate-spin-slow" />
                    </div>

                    <div className="relative overflow-hidden rounded-2xl border-2 border-white/20 bg-black/40 backdrop-blur">
                      <div className="aspect-[3/4] flex items-center justify-center">
                        <img
                          src="/me2.png"
                          alt="Développeur"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(16, 185, 129, 0.1) 2px, rgba(16, 185, 129, 0.1) 4px)",
                          animation: "scanline 8s linear infinite",
                        }}
                      />

                      {/* Hover terminal overlay */}
                      <div className="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center">
                          <div className="font-mono text-emerald-400 text-sm mb-2 flex items-center justify-center gap-2">
                            <FontAwesomeIcon icon={faCode} />
                            <span>$ whoami</span>
                          </div>
                          <div className="font-mono text-white/70 text-xs">
                            Amine Eddahiry
                          </div>
                          <div className="font-mono text-emerald-400/60 text-xs mt-1">
                            Full-Stack Developer
                          </div>

                          <div className="mt-3 flex gap-1 justify-center">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                            <span
                              className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"
                              style={{ animationDelay: "0.2s" }}
                            />
                            <span
                              className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"
                              style={{ animationDelay: "0.4s" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative brackets */}
                    <div className="absolute -bottom-2 -right-2 w-16 h-16 border-r-2 border-b-2 border-emerald-400/30 rounded-br-lg group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute -top-2 -left-2 w-16 h-16 border-l-2 border-t-2 border-purple-400/30 rounded-tl-lg group-hover:scale-110 transition-transform duration-500" />
                  </div>

                  {/* Progress bars */}
                  <div className="mt-6 space-y-3">
                    {[
                      { label: "Backend", pct: "85%", w: "w-[85%]", color: "from-emerald-400 to-emerald-300", t: "text-emerald-400" },
                      { label: "Frontend", pct: "75%", w: "w-[75%]", color: "from-blue-400 to-blue-300", t: "text-blue-400", delay: "0.2s" },
                      { label: "DevOps", pct: "80%", w: "w-[80%]", color: "from-purple-400 to-purple-300", t: "text-purple-400", delay: "0.4s" },
                    ].map((b) => (
                      <div key={b.label} className="flex items-center gap-3">
                        <span className="text-xs text-white/50 font-mono w-20">
                          {b.label}
                        </span>
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${b.w} bg-gradient-to-r ${b.color} rounded-full animate-progress`}
                            style={b.delay ? { animationDelay: b.delay } : undefined}
                          />
                        </div>
                        <span className={`text-xs font-mono ${b.t}`}>{b.pct}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TerminalWindow>
            </Reveal>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7">
            <Reveal direction="right">
              <CodeComment>Section: About Me</CodeComment>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-emerald-400 font-mono text-sm">{"<"}</span>
                <p className="text-emerald-300/80 text-xs uppercase tracking-widest font-mono">
                  À PROPOS
                </p>
                <span className="text-emerald-400 font-mono text-sm">{"/>"}</span>
              </div>
            </Reveal>

            <Reveal delay={0.1} direction="right">
              <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                <span className="text-purple-400 font-mono text-xl">class</span>{" "}
                Developer {"{"}
                <br />
                <span className="ml-6">Je construis des produits</span>
                <br />
                <span className="ml-6 text-emerald-400">full-stack</span>, propres
                et
                <br />
                <span className="ml-6 text-emerald-400">scalables</span>.
                <br />
                {"}"}
              </h2>
            </Reveal>

            <div className="mt-8 space-y-6">
              {[
                {
                  border: "border-emerald-400/30 hover:border-emerald-400/60",
                  dot: "bg-emerald-400",
                  title: "Education & Background",
                  text:
                    "Étudiant en dernière année à l'EMSI Casablanca, je conçois des solutions orientées production : architecture claire, performance, sécurité et intégration.",
                },
                {
                  border: "border-blue-400/30 hover:border-blue-400/60",
                  dot: "bg-blue-400",
                  title: "Development Philosophy",
                  text:
                    "J'aime transformer une idée en produit : APIs backend robustes, UI moderne, puis déploiement propre (Docker / CI).",
                },
                {
                  border: "border-purple-400/30 hover:border-purple-400/60",
                  dot: "bg-purple-400",
                  title: "AI Integration",
                  text:
                    "Je travaille aussi sur des projets IA appliqués (vision / NLP), intégrés via API dans des applications réelles.",
                },
              ].map((b) => (
                <Reveal key={b.title} delay={0.15} direction="right">
                  <div
                    className={`group relative pl-6 border-l-2 ${b.border} transition-colors`}
                  >
                    <div className={`absolute -left-[5px] top-0 w-2 h-2 rounded-full ${b.dot}`} />
                    <CodeComment>{b.title}</CodeComment>
                    <p className="text-white/70 leading-relaxed">{b.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Tech Stack */}
            <Reveal delay={0.3} direction="right">
              <div className="mt-8">
                <CodeComment>Current Tech Stack</CodeComment>
                <div className="flex flex-wrap gap-2">
                  <TechTag>Spring Boot</TechTag>
                  <TechTag>.NET Core</TechTag>
                  <TechTag>FastAPI</TechTag>
                  <TechTag>React/Next.js</TechTag>
                  <TechTag>PostgreSQL</TechTag>
                  <TechTag>Docker</TechTag>
                  <TechTag>Microservices</TechTag>
                  <TechTag>AI/ML</TechTag>
                </div>
              </div>
            </Reveal>

            {/* Stats Grid (Font Awesome) */}
            <Reveal delay={0.35} direction="right">
              <div className="mt-8">
                <CodeComment>Statistics</CodeComment>
                <div className="grid grid-cols-2 gap-3">
                  <StatBadgeFA icon={faGraduationCap} label="Formation" value="EMSI 2025" />
                  <StatBadgeFA icon={faBriefcase} label="Expérience" value="3+ Stages" />
                  <StatBadgeFA icon={faRocket} label="Projets" value="8+ Déployés" />
                  <StatBadgeFA icon={faTrophy} label="Focus" value="Backend First" />
                </div>
              </div>
            </Reveal>

            {/* Availability */}
            <Reveal delay={0.4} direction="right">
              <div className="mt-8 rounded-xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/10 to-transparent backdrop-blur-xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl" />
                <div className="relative flex items-center gap-3">
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="text-emerald-400 text-xs animate-pulse"
                    />
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="absolute left-0 top-0 text-emerald-400 text-xs opacity-60 animate-ping"
                    />
                  </div>
                  <div>
                    <div className="text-white font-semibold font-mono">
                      <span className="text-emerald-400">status:</span> available
                    </div>
                    <div className="text-xs text-white/60 font-mono mt-0.5">
                      Stage / Pré-embauche • Démarrage immédiat
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
