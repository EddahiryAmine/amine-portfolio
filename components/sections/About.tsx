"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============ REVEAL COMPONENT ============
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

    const initialProps: any = { opacity: 0, filter: "blur(8px)" };
    const animateProps: any = { opacity: 1, filter: "blur(0px)" };

    switch (direction) {
      case "up":
        initialProps.y = y;
        animateProps.y = 0;
        break;
      case "down":
        initialProps.y = -y;
        animateProps.y = 0;
        break;
      case "left":
        initialProps.x = y;
        animateProps.x = 0;
        break;
      case "right":
        initialProps.x = -y;
        animateProps.x = 0;
        break;
    }

    gsap.set(el, { ...initialProps, willChange: "transform, opacity, filter" });

    const ctx = gsap.context(() => {
      gsap.to(el, {
        ...animateProps,
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
    });

    return () => ctx.revert();
  }, [y, delay, duration, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ============ COMPONENTS ============
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

function TerminalWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-emerald-400/30 bg-black/90 backdrop-blur-xl overflow-hidden shadow-2xl shadow-emerald-500/20">
      <div className="flex items-center gap-2 px-4 py-2 bg-black/50 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-white/40 text-xs font-mono ml-2">about.tsx</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullText = "const developer = new FullStackDev();";

  const codeSnippets = [
    { lang: "Spring Boot", code: "@RestController", color: "emerald" },
    { lang: ".NET", code: "[ApiController]", color: "blue" },
    { lang: "FastAPI", code: "@app.get('/')", color: "purple" },
    { lang: "Docker", code: "docker-compose up", color: "cyan" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % codeSnippets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 50);
    return () => clearInterval(typing);
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
        
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl opacity-20 animate-float-delay" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 backdrop-blur-xl px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400">about.section.active</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-6 font-mono text-emerald-400">
              {typedText}
              <span className="animate-pulse">|</span>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT - Photo avec effets dev */}
          <div className="lg:col-span-5">
            <Reveal direction="left" y={60}>
              <TerminalWindow>
                <div className="relative">
                  {/* Code snippets animés */}
                  <div className="absolute -top-8 -right-8 z-10 hidden md:block">
                    <div className={`rounded-lg border border-${codeSnippets[activeIndex].color}-400/30 bg-black/80 backdrop-blur-xl px-3 py-2 shadow-lg animate-float`}>
                      <div className={`font-mono text-xs text-${codeSnippets[activeIndex].color}-400`}>
                        {codeSnippets[activeIndex].code}
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-8 -left-8 z-10 hidden md:block">
                    <div className="rounded-lg border border-purple-400/30 bg-black/80 backdrop-blur-xl px-3 py-2 shadow-lg animate-float" style={{ animationDelay: "1s" }}>
                      <div className="font-mono text-xs text-purple-400">
                        {codeSnippets[activeIndex].lang}
                      </div>
                    </div>
                  </div>

                  {/* Photo container */}
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400/20 via-transparent to-purple-400/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-br from-emerald-400/40 via-transparent to-purple-400/40 rounded-2xl animate-spin-slow" />
                    </div>

                    <div className="relative overflow-hidden rounded-2xl border-2 border-white/20 bg-black/40 backdrop-blur">
                      <div className="aspect-[3/4] bg-gradient-to-br from-emerald-400/20 to-purple-400/20 flex items-center justify-center text-6xl">
                                              <img src="/me2.png" alt="Développeur" className="w-full h-full object-cover" /> 

                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(16, 185, 129, 0.1) 2px, rgba(16, 185, 129, 0.1) 4px)",
                          animation: "scanline 8s linear infinite"
                        }}
                      />
                      
                      {/* Terminal overlay */}
                      <div className="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center">
                          <div className="font-mono text-emerald-400 text-sm mb-2">$ whoami</div>
                          <div className="font-mono text-white/70 text-xs">Amine Eddahiry</div>
                          <div className="font-mono text-emerald-400/60 text-xs mt-1">Full-Stack Developer</div>
                          <div className="mt-3 flex gap-1 justify-center">
                            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
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
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-white/50 font-mono w-20">Backend</span>
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[85%] bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full animate-progress" />
                      </div>
                      <span className="text-xs text-emerald-400 font-mono">85%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-white/50 font-mono w-20">Frontend</span>
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[75%] bg-gradient-to-r from-blue-400 to-blue-300 rounded-full animate-progress" style={{ animationDelay: "0.2s" }} />
                      </div>
                      <span className="text-xs text-blue-400 font-mono">75%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-white/50 font-mono w-20">DevOps</span>
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[80%] bg-gradient-to-r from-purple-400 to-purple-300 rounded-full animate-progress" style={{ animationDelay: "0.4s" }} />
                      </div>
                      <span className="text-xs text-purple-400 font-mono">80%</span>
                    </div>
                  </div>
                </div>
              </TerminalWindow>
            </Reveal>
          </div>

          {/* RIGHT - Content */}
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
                <span className="text-purple-400 font-mono text-xl">class</span> Developer {"{"}<br />
                <span className="ml-6">Je construis des produits</span><br />
                <span className="ml-6 text-emerald-400">full-stack</span>, propres et<br />
                <span className="ml-6 text-emerald-400">scalables</span>.<br />
                {"}"}
              </h2>
            </Reveal>

            <div className="mt-8 space-y-6">
              <Reveal delay={0.15} direction="right">
                <div className="group relative pl-6 border-l-2 border-emerald-400/30 hover:border-emerald-400/60 transition-colors">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-emerald-400" />
                  <CodeComment>Education & Background</CodeComment>
                  <p className="text-white/70 leading-relaxed">
                    Étudiant en dernière année à l'EMSI Casablanca, je conçois des solutions
                    orientées production : architecture claire, performance, sécurité et intégration.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2} direction="right">
                <div className="group relative pl-6 border-l-2 border-blue-400/30 hover:border-blue-400/60 transition-colors">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-blue-400" />
                  <CodeComment>Development Philosophy</CodeComment>
                  <p className="text-white/70 leading-relaxed">
                    J'aime transformer une idée en produit : APIs backend robustes, UI moderne,
                    puis déploiement propre (Docker / CI).
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.25} direction="right">
                <div className="group relative pl-6 border-l-2 border-purple-400/30 hover:border-purple-400/60 transition-colors">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-purple-400" />
                  <CodeComment>AI Integration</CodeComment>
                  <p className="text-white/70 leading-relaxed">
                    Je travaille aussi sur des projets IA appliqués (vision / NLP), intégrés via API
                    dans des applications réelles.
                  </p>
                </div>
              </Reveal>
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

            {/* Stats Grid */}
            <Reveal delay={0.35} direction="right">
              <div className="mt-8">
                <CodeComment>Statistics</CodeComment>
                <div className="grid grid-cols-2 gap-3">
                  <StatBadge icon="🎓" label="Formation" value="EMSI 2025" />
                  <StatBadge icon="💼" label="Expérience" value="3+ Stages" />
                  <StatBadge icon="🚀" label="Projets" value="8+ Déployés" />
                  <StatBadge icon="🏆" label="Focus" value="Backend First" />
                </div>
              </div>
            </Reveal>

            {/* Availability */}
            <Reveal delay={0.4} direction="right">
              <div className="mt-8 rounded-xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/10 to-transparent backdrop-blur-xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl" />
                <div className="relative flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
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