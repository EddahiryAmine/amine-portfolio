"use client";

import { useEffect, useRef } from "react";
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
    });

    return () => ctx.revert();
  }, [y, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export default function Certifications() {
  return (
    <section
      id="certifications"
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
        <div className="absolute left-1/2 top-20 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/5 backdrop-blur-xl px-4 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-mono text-amber-400">
                certifications.pending
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              <span className="text-purple-400 font-mono text-2xl">class</span>{" "}
              Certifications {"{"}<br />
              <span className="ml-8 text-emerald-400">En cours...</span>
              <br />
              {"}"}
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="max-w-2xl text-white/60 leading-relaxed">
              Cette section sera bientôt enrichie avec mes certifications
              professionnelles en{" "}
              <span className="text-blue-400">Backend</span>,{" "}
              <span className="text-purple-400">Cloud</span> et{" "}
              <span className="text-emerald-400">DevOps</span>.
            </p>
          </Reveal>
        </div>

        {/* Empty State Container */}
        <Reveal delay={0.2}>
          <div className="rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-black/60 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-white/40 font-mono">
                  ~/certifications
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-amber-400">0</span>
                <span className="text-white/50">uploaded</span>
              </div>
            </div>

            {/* Empty State Content */}
            <div className="p-12 md:p-20 text-center">
              <div className="max-w-2xl mx-auto">
                {/* Icon */}
                <div className="mb-8 relative inline-block">
                  <div className="text-8xl mb-4 animate-bounce-slow">📜</div>
                  <div className="absolute -top-4 -right-4 w-16 h-16 border-2 border-emerald-400/30 rounded-full animate-ping" />
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 border-2 border-purple-400/30 rounded-full animate-ping" style={{ animationDelay: "0.5s" }} />
                </div>

                {/* Code Block */}
                <div className="mb-8 rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl p-6 text-left max-w-md mx-auto">
                  <div className="font-mono text-sm space-y-2">
                    <div className="text-white/40">
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-emerald-400">certifications</span> ={" "}
                      <span className="text-amber-400">[]</span>;
                    </div>
                    <div className="text-white/40">
                      <span className="text-gray-500">// TODO:</span>{" "}
                      <span className="text-white/50">Upload certificates</span>
                    </div>
                    <div className="text-white/40">
                      <span className="text-gray-500">// Status:</span>{" "}
                      <span className="text-amber-400">"In Progress"</span>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  Section en construction
                </h3>
                <p className="text-white/60 mb-8 leading-relaxed">
                  Je prépare actuellement mes certifications pour les ajouter
                  ici. Cette section sera mise à jour prochainement avec les
                  détails de chaque certification obtenue.
                </p>

                {/* Coming Soon Pills */}
                <div className="flex flex-wrap justify-center gap-3">
                  <div className="group relative">
                    <div className="absolute inset-0 bg-blue-400/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-400/30 bg-blue-400/10 backdrop-blur-xl">
                      <span className="text-xl">🗄️</span>
                      <span className="text-sm text-blue-300 font-mono">
                        Database
                      </span>
                    </div>
                  </div>

                  <div className="group relative">
                    <div className="absolute inset-0 bg-purple-400/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center gap-2 px-4 py-2 rounded-xl border border-purple-400/30 bg-purple-400/10 backdrop-blur-xl">
                      <span className="text-xl">☁️</span>
                      <span className="text-sm text-purple-300 font-mono">
                        Cloud
                      </span>
                    </div>
                  </div>

                  <div className="group relative">
                    <div className="absolute inset-0 bg-emerald-400/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 backdrop-blur-xl">
                      <span className="text-xl">🚀</span>
                      <span className="text-sm text-emerald-300 font-mono">
                        DevOps
                      </span>
                    </div>
                  </div>

                  <div className="group relative">
                    <div className="absolute inset-0 bg-amber-400/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center gap-2 px-4 py-2 rounded-xl border border-amber-400/30 bg-amber-400/10 backdrop-blur-xl">
                      <span className="text-xl">⚙️</span>
                      <span className="text-sm text-amber-300 font-mono">
                        Backend
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="px-6 py-4 bg-black/40 border-t border-white/10">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white/40">Status:</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                  <span className="text-amber-400">Préparation en cours</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Timeline Preview */}
        <Reveal delay={0.3}>
          <div className="mt-12 rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/10 to-black/20 backdrop-blur-xl p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 text-sm font-mono mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400">Roadmap</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Certifications prévues
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-xl bg-black/30 border border-white/10">
                <div className="text-3xl mb-2">📅</div>
                <div className="text-sm text-white font-semibold mb-1">
                  Q1 2025
                </div>
                <div className="text-xs text-white/50 font-mono">
                  Backend & Cloud
                </div>
              </div>

              <div className="text-center p-4 rounded-xl bg-black/30 border border-white/10">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-sm text-white font-semibold mb-1">
                  Q2 2025
                </div>
                <div className="text-xs text-white/50 font-mono">
                  DevOps & Kubernetes
                </div>
              </div>

              <div className="text-center p-4 rounded-xl bg-black/30 border border-white/10">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-sm text-white font-semibold mb-1">
                  Q3 2025
                </div>
                <div className="text-xs text-white/50 font-mono">
                  Database & Security
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <div className="rounded-lg border border-emerald-400/30 bg-black/60 backdrop-blur px-4 py-2 font-mono text-xs text-emerald-400">
                <span className="text-white/40">console</span>.log(
                <span className="text-amber-400">"Coming soon..."</span>);
              </div>
            </div>
          </div>
        </Reveal>
      </div>

    
    </section>
  );
}