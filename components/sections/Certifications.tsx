"use client";

import { useEffect, useState } from "react";

// Simuler BlockReveal
function BlockReveal({ children, onScroll, delay = 0 }: any) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {children}
    </div>
  );
}

function UpcomingCertCard({ icon, title, platform, status }: { 
  icon: string; 
  title: string; 
  platform: string; 
  status: string;
}) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-black/20 backdrop-blur-xl p-6 transition-all hover:border-emerald-400/30 hover:scale-[1.02]">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-transparent to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl border border-white/10 bg-black/40 text-3xl">
              {icon}
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">{title}</h3>
              <p className="text-sm text-white/60 mt-0.5">{platform}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs text-amber-400 font-mono">{status}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-gradient-to-r from-emerald-400 to-amber-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function TechStackItem({ icon, name }: { icon: string; name: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl px-4 py-3 transition-all hover:border-emerald-400/30 hover:bg-emerald-400/5">
      <span className="text-2xl">{icon}</span>
      <span className="text-sm text-white/80 font-medium">{name}</span>
    </div>
  );
}

export default function Certifications() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const upcomingCerts = [
    { icon: "☁️", title: "AWS Certified Solutions Architect", platform: "Amazon Web Services", status: "En préparation" },
    { icon: "🐳", title: "Docker Certified Associate", platform: "Docker Inc.", status: "Planifié 2025" },
    { icon: "☸️", title: "Kubernetes Administrator (CKA)", platform: "CNCF", status: "Objectif Q2 2025" },
    { icon: "☕", title: "Oracle Certified Professional Java", platform: "Oracle", status: "En cours" },
  ];

  const techFocus = [
    { icon: "🔧", name: "Backend Engineering" },
    { icon: "🏗️", name: "Architecture Microservices" },
    { icon: "🔐", name: "Security & Auth" },
    { icon: "🚀", name: "DevOps & CI/CD" },
  ];

  return (
    <section
      id="certifications"
      className="scroll-mt-28 relative px-6 py-24 border-t border-white/10 overflow-hidden"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14] via-[#070a0f] to-black" />
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('/noise.png')]" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
        
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />
        <div className="absolute left-1/2 top-10 -translate-x-1/2 h-[520px] w-[900px] rounded-full blur-3xl opacity-20 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.18),transparent_60%)] animate-pulse-slow" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <BlockReveal onScroll>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/5 backdrop-blur-xl px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-mono text-amber-400">certifications.roadmap.active</span>
            </div>
          </BlockReveal>

          <BlockReveal onScroll delay={0.06}>
            <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-white">
              Certifications <span className="text-emerald-400">& Roadmap</span>
            </h2>
          </BlockReveal>

          <BlockReveal onScroll delay={0.12}>
            <p className="mt-4 max-w-2xl text-white/60 leading-relaxed">
              En phase active de préparation et certification. Focus sur l'architecture cloud, 
              les conteneurs, et la maîtrise approfondie des technologies backend.
            </p>
          </BlockReveal>
        </div>

        {/* Main Content - Coming Soon State */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left - Main Empty State */}
          <div className="lg:col-span-7">
            <BlockReveal onScroll delay={0.18}>
              <div className="relative rounded-3xl border-2 border-dashed border-white/10 bg-gradient-to-br from-white/[0.02] to-black/40 backdrop-blur-xl p-12 overflow-hidden">
                {/* Decorative background */}
                <div className="absolute inset-0 opacity-[0.03]">
                  <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-400 rounded-full blur-3xl" />
                  <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400 rounded-full blur-3xl" />
                </div>

                <div className="relative text-center">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl border-2 border-white/10 bg-black/40 backdrop-blur-xl mb-6">
                    <span className="text-5xl">🎓</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Certifications en cours
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 leading-relaxed max-w-md mx-auto mb-8">
                    Je me concentre actuellement sur des certifications professionnelles 
                    pour valider mes compétences en architecture cloud et conteneurisation.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                    <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-4">
                      <div className="text-2xl font-bold text-emerald-400">4+</div>
                      <div className="text-xs text-white/50 mt-1 font-mono">En préparation</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-4">
                      <div className="text-2xl font-bold text-blue-400">2025</div>
                      <div className="text-xs text-white/50 mt-1 font-mono">Objectif</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-4">
                      <div className="text-2xl font-bold text-purple-400">Pro</div>
                      <div className="text-xs text-white/50 mt-1 font-mono">Niveau visé</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 backdrop-blur-xl px-6 py-3 text-sm font-semibold text-emerald-100">
                    <span className="text-lg">📚</span>
                    <span>Roadmap 2025 active</span>
                  </div>
                </div>
              </div>
            </BlockReveal>

            {/* Upcoming Certifications */}
            <BlockReveal onScroll delay={0.24}>
              <div className="mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-bold text-white">Certifications ciblées</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-emerald-400/30 to-transparent" />
                </div>

                <div className="grid gap-4">
                  {upcomingCerts.map((cert, i) => (
                    <div 
                      key={i}
                      className="opacity-0 animate-fade-in-up"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <UpcomingCertCard {...cert} />
                    </div>
                  ))}
                </div>
              </div>
            </BlockReveal>
          </div>

          {/* Right - Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tech Focus */}
            <BlockReveal onScroll delay={0.20}>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-black/20 backdrop-blur-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🎯</span>
                  <h3 className="text-lg font-bold text-white">Focus Technique</h3>
                </div>

                <p className="text-sm text-white/60 mb-4">
                  Domaines d'expertise en développement
                </p>

                <div className="space-y-3">
                  {techFocus.map((tech, i) => (
                    <div 
                      key={i}
                      className="opacity-0 animate-fade-in-up"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <TechStackItem {...tech} />
                    </div>
                  ))}
                </div>
              </div>
            </BlockReveal>

            {/* Learning Path */}
            <BlockReveal onScroll delay={0.26}>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-black/20 backdrop-blur-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">📈</span>
                  <h3 className="text-lg font-bold text-white">Parcours d'apprentissage</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-emerald-400/30 bg-emerald-400/10 text-emerald-400 font-bold text-sm shrink-0">
                      1
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Fondations solides</div>
                      <div className="text-xs text-white/50 mt-0.5">
                        3+ stages, 8+ projets en production
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-amber-400/30 bg-amber-400/10 text-amber-400 font-bold text-sm shrink-0">
                      2
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Certifications pro</div>
                      <div className="text-xs text-white/50 mt-0.5">
                        AWS, Docker, Kubernetes (2025)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-purple-400/30 bg-purple-400/10 text-purple-400 font-bold text-sm shrink-0">
                      3
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Expert architecte</div>
                      <div className="text-xs text-white/50 mt-0.5">
                        Solutions Cloud & Microservices
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BlockReveal>

            {/* Call to Action */}
            <BlockReveal onScroll delay={0.32}>
              <div className="rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/10 to-transparent backdrop-blur-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-emerald-400/30 bg-emerald-400/10 text-xl shrink-0">
                    💡
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-2">
                      Expérience pratique d'abord
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Je privilégie l'expérience terrain et les projets réels. 
                      Les certifications viennent valider et officialiser ces compétences acquises.
                    </p>
                  </div>
                </div>
              </div>
            </BlockReveal>
          </div>
        </div>
      </div>

     
    </section>
  );
}