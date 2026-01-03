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

const SKILLS = {
  frontend: ["React", "React Native", "Flutter", "VueJs", "Bootstrap"],
  backend: ["Spring Boot", "Jakarta EE", ".Net", "Django", "Laravel", "Symfony"],
  languages: [
    "Java",
    "C#",
    "C++",
    "C",
    "Python",
    "PHP",
    "JavaScript",
    "TypeScript",
    "CSS",
    "HTML",
  ],
  databases: [
    "Oracle (DBA 1, DBA 2)",
    "MongoDB (NoSQL)",
    "PostgreSQL",
    "MySQL",
    "SQL Server",
    "SQL Tuning",
  ],
  methods: ["Méthodes Agiles (Scrum)", "Jira", "UML", "Merise", "Figma"],
  devops: ["Git", "GitHub", "GitLab CI/CD", "Docker", "SonarQube", "Postman"],
  security: ["OpenID", "Keycloak"],
  os: ["Linux", "Windows", "macOS"],
};

function Chip({ children }: { children: string }) {
  return (
    <span className="group inline-flex items-center rounded-lg border border-white/10 bg-black/40 backdrop-blur-xl px-3 py-1.5 text-xs text-white/75 transition-all hover:border-emerald-400/30 hover:bg-emerald-400/5 hover:text-emerald-100 hover:scale-105">
      <span className="w-1 h-1 rounded-full bg-emerald-400/50 mr-2 group-hover:bg-emerald-400 group-hover:animate-pulse" />
      {children}
    </span>
  );
}

function Node({
  title,
  items,
  badge,
  icon,
  level = "child"
}: {
  title: string;
  items: string[];
  badge?: string;
  icon?: string;
  level?: "root" | "child";
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`group relative rounded-2xl border backdrop-blur overflow-hidden transition-all hover:scale-[1.01] ${
      level === "root" 
        ? "border-emerald-400/30 bg-gradient-to-br from-emerald-400/10 via-black/40 to-black/40" 
        : "border-white/10 bg-black/30 hover:border-emerald-400/20"
    }`}>
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-transparent to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative">
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between gap-3 p-5 text-left"
        >
          <div className="flex items-center gap-3">
            {/* Icon */}
            {icon && (
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all ${
                level === "root"
                  ? "border-emerald-400/30 bg-emerald-400/10 text-2xl"
                  : "border-white/10 bg-white/5 text-xl"
              }`}>
                {icon}
              </div>
            )}
            
            {/* Title */}
            <div>
              <h3 className={`font-semibold ${level === "root" ? "text-base text-white" : "text-sm text-white/90"}`}>
                {title}
              </h3>
              {badge && (
                <span className="text-[10px] text-emerald-400/70 font-mono mt-0.5 block">
                  // {badge}
                </span>
              )}
            </div>
          </div>

          {/* Expand/Collapse indicator */}
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <span className="text-xs text-white/40 font-mono">
                {items.length}
              </span>
            )}
            <svg
              className={`w-5 h-5 text-emerald-400/70 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Content */}
        <div className={`overflow-hidden transition-all ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-5 pb-5">
            {/* Separator line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent mb-4" />
            
            {/* Skills chips */}
            <div className="flex flex-wrap gap-2">
              {items.map((x) => (
                <Chip key={x}>{x}</Chip>
              ))}
            </div>
          </div>
        </div>

        {/* Progress bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
          <div 
            className="h-full bg-gradient-to-r from-emerald-400 to-purple-400 transition-all group-hover:from-emerald-300 group-hover:to-purple-300"
            style={{ width: `${Math.min(100, (items.length / 10) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="skills"
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

        <div className="absolute left-1/2 top-10 -translate-x-1/2 h-[520px] w-[900px] rounded-full blur-3xl opacity-20
                        bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.18),transparent_60%)] animate-pulse-slow" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <BlockReveal onScroll>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 backdrop-blur-xl px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400">skills.tree.active</span>
            </div>
          </BlockReveal>

          <BlockReveal onScroll delay={0.06}>
            <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-white">
              Stack <span className="text-emerald-400">Technique</span>
            </h2>
          </BlockReveal>

          <BlockReveal onScroll delay={0.12}>
            <p className="mt-4 max-w-2xl text-white/60 leading-relaxed">
              Technologies et outils que j'utilise pour construire des applications robustes, 
              scalables et maintenables.
            </p>
          </BlockReveal>
        </div>

        {/* Main Tree Structure */}
        <div className="mt-12">
          <div className="relative rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl p-6 md:p-10 overflow-hidden">
            {/* Decorative background */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-emerald-400/30 via-emerald-400/10 to-transparent" />
            </div>

            {/* SVG Tree Lines - Enhanced */}
            {mounted && (
              <div className="pointer-events-none absolute inset-0 hidden lg:block">
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 1200 900"
                  preserveAspectRatio="none"
                >
                  {/* Root to main branches */}
                  <path
                    d="M600 95 L600 180"
                    stroke="rgba(16,185,129,0.3)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    className="animate-dash"
                  />
                  
                  {/* Main branches to left */}
                  <path
                    d="M600 180 L320 180 L320 230"
                    stroke="rgba(16,185,129,0.25)"
                    strokeWidth="2"
                    fill="none"
                  />
                  
                  {/* Main branches to right */}
                  <path
                    d="M600 180 L880 180 L880 230"
                    stroke="rgba(16,185,129,0.25)"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* Connection dots */}
                  <circle cx="600" cy="95" r="4" fill="rgba(16,185,129,0.5)" className="animate-pulse" />
                  <circle cx="600" cy="180" r="4" fill="rgba(16,185,129,0.5)" />
                  <circle cx="320" cy="180" r="3" fill="rgba(16,185,129,0.4)" />
                  <circle cx="880" cy="180" r="3" fill="rgba(16,185,129,0.4)" />
                </svg>
              </div>
            )}

            {/* Root Node */}
            <div className="flex justify-center">
              <BlockReveal onScroll>
                <div className="relative z-10">
                  <div className="rounded-2xl border-2 border-emerald-400/40 bg-gradient-to-br from-emerald-400/20 via-black/60 to-black/60 backdrop-blur-xl px-8 py-4 text-center shadow-2xl shadow-emerald-500/20">
                    <div className="text-3xl mb-2">🌳</div>
                    <div className="text-xs uppercase tracking-widest text-emerald-300/90 font-mono">
                      {"<"} Tech Stack {"/>"}
                    </div>
                    <div className="mt-2 text-sm text-white/70">
                      Compétences Techniques
                    </div>
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-emerald-400/20 rounded-2xl blur-xl -z-10 animate-pulse-slow" />
                </div>
              </BlockReveal>
            </div>

            {/* Main Branches - Frontend & Backend */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <BlockReveal onScroll delay={0.08}>
                <Node
                  title="Frontend Development"
                  badge="client-side"
                  items={SKILLS.frontend}
                  icon="🎨"
                  level="root"
                />
              </BlockReveal>

              <BlockReveal onScroll delay={0.14}>
                <Node
                  title="Backend Development"
                  badge="server-side"
                  items={SKILLS.backend}
                  icon="⚙️"
                  level="root"
                />
              </BlockReveal>
            </div>

            {/* Secondary Branches */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <BlockReveal onScroll delay={0.10}>
                <Node 
                  title="Langages de Programmation" 
                  items={SKILLS.languages} 
                  icon="💻"
                />
              </BlockReveal>

              <BlockReveal onScroll delay={0.16}>
                <Node 
                  title="Bases de Données (SGBD)" 
                  items={SKILLS.databases} 
                  icon="🗄️"
                />
              </BlockReveal>

              <BlockReveal onScroll delay={0.22}>
                <Node 
                  title="DevOps & Outils" 
                  items={SKILLS.devops} 
                  icon="🚀"
                />
              </BlockReveal>

              <BlockReveal onScroll delay={0.28}>
                <Node 
                  title="Méthodologies & Modélisation" 
                  items={SKILLS.methods} 
                  icon="📋"
                />
              </BlockReveal>

              <BlockReveal onScroll delay={0.34}>
                <Node 
                  title="Sécurité & Authentification" 
                  items={SKILLS.security} 
                  icon="🔐"
                />
              </BlockReveal>

              <BlockReveal onScroll delay={0.40}>
                <Node 
                  title="Systèmes d'Exploitation" 
                  items={SKILLS.os} 
                  icon="🖥️"
                />
              </BlockReveal>
            </div>

            {/* Stats Summary */}
            <BlockReveal onScroll delay={0.46}>
              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-400">
                    {SKILLS.frontend.length + SKILLS.backend.length}+
                  </div>
                  <div className="text-xs text-white/50 mt-1 font-mono">Frameworks</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {SKILLS.languages.length}+
                  </div>
                  <div className="text-xs text-white/50 mt-1 font-mono">Langages</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {SKILLS.databases.length}+
                  </div>
                  <div className="text-xs text-white/50 mt-1 font-mono">Databases</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-4 text-center">
                  <div className="text-2xl font-bold text-amber-400">
                    {SKILLS.devops.length}+
                  </div>
                  <div className="text-xs text-white/50 mt-1 font-mono">DevOps Tools</div>
                </div>
              </div>
            </BlockReveal>
          </div>
        </div>
      </div>

     
    </section>
  );
}