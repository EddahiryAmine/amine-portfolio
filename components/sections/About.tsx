"use client";
import { useEffect, useState } from "react";

// Simuler BlockReveal si non disponible
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

function StatBadge({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-emerald-400/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl px-4 py-3 transition-all hover:border-emerald-400/30 hover:bg-black/60">
        <div className="text-2xl">{icon}</div>
        <div>
          <div className="text-xs text-white/50 font-mono">{label}</div>
          <div className="text-sm font-semibold text-white">{value}</div>
        </div>
      </div>
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

function CodeComment({ children }: { children: string }) {
  return (
    <div className="font-mono text-xs text-emerald-400/60 mb-2">
      <span className="text-emerald-400/40">{"/* "}</span>
      {children}
      <span className="text-emerald-400/40">{" */"}</span>
    </div>
  );
}

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const codeSnippets = [
    { lang: "Spring Boot", code: "@RestController" },
    { lang: ".NET", code: "[ApiController]" },
    { lang: "FastAPI", code: "@app.get('/')" },
    { lang: "Docker", code: "docker-compose up" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % codeSnippets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      className="scroll-mt-28 relative px-6 py-24 border-t border-white/10 overflow-hidden"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14] via-[#070a0f] to-black" />
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('/noise.png')]" />
        
        {/* Animated grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
        
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />
        
        {/* Floating gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl opacity-20 animate-float-delay" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header avec effet terminal */}
        <div className="mb-16">
          <BlockReveal onScroll>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 backdrop-blur-xl px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400">about.section.active</span>
            </div>
          </BlockReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* LEFT - Photo avec effets */}
          <div className="md:col-span-4">
            <BlockReveal onScroll>
              <div className="relative w-full max-w-[280px] mx-auto">
                {/* Code snippets flottants */}
                <div className="absolute -top-4 -right-4 z-10">
                  <div className="rounded-lg border border-emerald-400/30 bg-black/80 backdrop-blur-xl px-3 py-2 shadow-lg shadow-emerald-500/20">
                    <div className="font-mono text-xs text-emerald-400">
                      {codeSnippets[activeIndex].code}
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 z-10">
                  <div className="rounded-lg border border-purple-400/30 bg-black/80 backdrop-blur-xl px-3 py-2 shadow-lg shadow-purple-500/20">
                    <div className="font-mono text-xs text-purple-400">
                      {codeSnippets[activeIndex].lang}
                    </div>
                  </div>
                </div>

                {/* Photo container avec effets avancés */}
                <div className="relative group">
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400/20 via-transparent to-purple-400/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Rotating border */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-br from-emerald-400/40 via-transparent to-purple-400/40 rounded-2xl animate-spin-slow" style={{ backgroundClip: 'padding-box' }} />
                  </div>

                  {/* Photo */}
                  <div className="relative overflow-hidden rounded-2xl border-2 border-white/20 bg-black/40 backdrop-blur">
                    <img
                      src="/me2.png"
                      alt="Photo développeur"
                      className="h-[280px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Terminal overlay au hover */}
                    <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center">
                        <div className="font-mono text-emerald-400 text-sm mb-2">{">"} whoami</div>
                        <div className="font-mono text-white/70 text-xs">Full-Stack Developer</div>
                        <div className="mt-2 flex gap-1 justify-center">
                          <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                          <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                          <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -bottom-2 -right-2 w-16 h-16 border border-emerald-400/20 rounded-lg rotate-12 group-hover:rotate-45 transition-transform duration-500" />
                  <div className="absolute -top-2 -left-2 w-12 h-12 border border-purple-400/20 rounded-lg -rotate-12 group-hover:-rotate-45 transition-transform duration-500" />
                </div>

                {/* Status line */}
                <div className="mt-6 h-px w-full bg-gradient-to-r from-emerald-400/50 via-emerald-400/20 to-transparent relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent animate-shimmer" />
                </div>

                {/* Stats mini */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-20 h-1 bg-emerald-400/30 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-emerald-400 rounded-full" />
                    </div>
                    <span className="text-white/50 font-mono">Backend 85%</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-20 h-1 bg-blue-400/30 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-blue-400 rounded-full" />
                    </div>
                    <span className="text-white/50 font-mono">Frontend 75%</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-20 h-1 bg-purple-400/30 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-purple-400 rounded-full" />
                    </div>
                    <span className="text-white/50 font-mono">DevOps 80%</span>
                  </div>
                </div>
              </div>
            </BlockReveal>
          </div>

          {/* RIGHT - Content */}
          <div className="md:col-span-8">
            <BlockReveal onScroll>
              <CodeComment>Section: About Me</CodeComment>
              <p className="text-emerald-300/80 text-xs uppercase tracking-widest font-mono">
                {"<"} À PROPOS {"/>"}
              </p>
            </BlockReveal>

            <BlockReveal onScroll delay={0.06}>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                Je construis des produits{" "}
                <span className="text-emerald-400">full-stack</span>,<br />
                propres et <span className="text-emerald-400">scalables</span>.
              </h2>
            </BlockReveal>

            <div className="mt-6 space-y-5 text-white/70 leading-relaxed text-base">
              <BlockReveal onScroll delay={0.12}>
                <div className="relative pl-4 border-l-2 border-emerald-400/30">
                  <p>
                    Étudiant en dernière année à l'EMSI Casablanca, je conçois des solutions
                    orientées production : architecture claire, performance, sécurité et intégration.
                  </p>
                </div>
              </BlockReveal>

              <BlockReveal onScroll delay={0.18}>
                <div className="relative pl-4 border-l-2 border-blue-400/30">
                  <p>
                    J'aime transformer une idée en produit : APIs backend robustes, UI moderne,
                    puis déploiement propre (Docker / CI).
                  </p>
                </div>
              </BlockReveal>

              <BlockReveal onScroll delay={0.24}>
                <div className="relative pl-4 border-l-2 border-purple-400/30">
                  <p>
                    Je travaille aussi sur des projets IA appliqués (vision / NLP), intégrés via API
                    dans des applications réelles.
                  </p>
                </div>
              </BlockReveal>
            </div>

            {/* Tech Stack */}
            <BlockReveal onScroll delay={0.30}>
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
            </BlockReveal>

            {/* Stats Grid */}
            <BlockReveal onScroll delay={0.36}>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <StatBadge icon="🎓" label="Formation" value="EMSI 2025" />
                <StatBadge icon="💼" label="Expérience" value="3+ Stages" />
                <StatBadge icon="🚀" label="Projets" value="8+ Déployés" />
                <StatBadge icon="🏆" label="Focus" value="Backend First" />
              </div>
            </BlockReveal>

            {/* Availability */}
            <BlockReveal onScroll delay={0.42}>
              <div className="mt-8 rounded-xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/10 to-transparent backdrop-blur-xl p-5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Disponible pour opportunités</div>
                    <div className="text-xs text-white/60 font-mono mt-0.5">
                      Stage / Pré-embauche • Démarrage immédiat
                    </div>
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