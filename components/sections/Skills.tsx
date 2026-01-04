"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============ REVEAL COMPONENT ============
function Reveal({
  children,
  className = "",
  y = 50,
  delay = 0,
  duration = 0.8,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
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
        duration,
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
  }, [y, delay, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ============ SKILL CATEGORIES ============
const SKILLS = {
  featured: [
    { name: "Spring Boot", icon: "🍃", level: 90, category: "Backend" },
    { name: ".NET Core", icon: "⚡", level: 85, category: "Backend" },
    { name: "FastAPI", icon: "🚀", level: 80, category: "Backend" },
    { name: "React/Next.js", icon: "⚛️", level: 85, category: "Frontend" },
    { name: "Docker", icon: "🐳", level: 85, category: "DevOps" },
    { name: "PostgreSQL", icon: "🐘", level: 90, category: "Database" },
  ],
  backend: ["Spring Boot", "Jakarta EE", ".NET", "FastAPI", "Django", "Laravel"],
  frontend: ["React", "Next.js", "React Native", "Flutter", "Vue.js"],
  languages: ["Java", "C#", "Python", "TypeScript", "JavaScript", "PHP"],
  databases: ["PostgreSQL", "MySQL", "MongoDB", "Oracle", "SQL Server"],
  devops: ["Docker", "Git", "CI/CD", "GitLab", "SonarQube"],
  tools: ["Jira", "Figma", "Postman", "Keycloak", "UML"],
};

// ============ FEATURED SKILL CARD ============
function FeaturedSkill({
  name,
  icon,
  level,
  category,
  index,
}: {
  name: string;
  icon: string;
  level: number;
  category: string;
  index: number;
}) {
  const colors = {
    Backend: "emerald",
    Frontend: "blue",
    DevOps: "purple",
    Database: "amber",
  };

  const color = colors[category as keyof typeof colors] || "emerald";

  return (
    <div className="group relative">
      <div
        className={`absolute inset-0 bg-${color}-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`}
      />
      <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 hover:border-${color}-400/30 transition-all hover:scale-105">
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{icon}</div>
          <div className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/60 font-mono">
            {category}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-3">{name}</h3>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/50 font-mono">Niveau</span>
            <span className={`text-${color}-400 font-mono font-semibold`}>
              {level}%
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-${color}-400 to-${color}-300 rounded-full transition-all duration-1000`}
              style={{
                width: `${level}%`,
                animationDelay: `${index * 0.1}s`,
              }}
            />
          </div>
        </div>

        <div className="mt-4 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i < Math.floor(level / 20)
                  ? `bg-${color}-400`
                  : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ CATEGORY SECTION ============
function CategorySection({
  title,
  icon,
  skills,
  color = "emerald",
}: {
  title: string;
  icon: string;
  skills: string[];
  color?: string;
}) {
  return (
    <div className="group">
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-lg bg-${color}-400/10 border border-${color}-400/30 flex items-center justify-center text-xl`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-white font-semibold">{title}</h3>
          <div className="text-xs text-white/40 font-mono">
            {skills.length} technologies
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-black/30 backdrop-blur text-xs text-white/70 hover:border-${color}-400/30 hover:bg-${color}-400/5 hover:text-white transition-all font-mono`}
          >
            <span className={`w-1 h-1 rounded-full bg-${color}-400`} />
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

// ============ MAIN COMPONENT ============
export default function Skills() {
  const [activeTab, setActiveTab] = useState<"featured" | "all">("featured");

  return (
    <section
      id="skills"
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
        <div className="mb-16 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 backdrop-blur-xl px-4 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400">
                skills.init()
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
              <span className="text-purple-400 font-mono text-2xl">class</span>{" "}
              Stack {"{"}<br />
              <span className="text-emerald-400">Technique</span>
              <br />
              {"}"}
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="max-w-2xl mx-auto text-white/60 leading-relaxed">
              Technologies maîtrisées pour construire des applications{" "}
              <span className="text-emerald-400">robustes</span> et{" "}
              <span className="text-emerald-400">scalables</span>
            </p>
          </Reveal>
        </div>

        {/* Tab Navigation */}
        <Reveal delay={0.2}>
          <div className="flex justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveTab("featured")}
              className={`px-6 py-3 rounded-xl font-mono text-sm transition-all ${
                activeTab === "featured"
                  ? "bg-emerald-400/10 border-2 border-emerald-400/50 text-emerald-400"
                  : "bg-black/30 border border-white/10 text-white/60 hover:border-white/20"
              }`}
            >
              <span className="text-emerald-400 mr-2">//</span> Principales
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-3 rounded-xl font-mono text-sm transition-all ${
                activeTab === "all"
                  ? "bg-emerald-400/10 border-2 border-emerald-400/50 text-emerald-400"
                  : "bg-black/30 border border-white/10 text-white/60 hover:border-white/20"
              }`}
            >
              <span className="text-emerald-400 mr-2">//</span> Toutes
            </button>
          </div>
        </Reveal>

        {/* Featured Skills */}
        {activeTab === "featured" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {SKILLS.featured.map((skill, i) => (
              <Reveal key={skill.name} delay={0.05 * i}>
                <FeaturedSkill {...skill} index={i} />
              </Reveal>
            ))}
          </div>
        )}

        {/* All Skills by Category */}
        {activeTab === "all" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl p-6">
                <CategorySection
                  title="Backend"
                  icon="⚙️"
                  skills={SKILLS.backend}
                  color="emerald"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl p-6">
                <CategorySection
                  title="Frontend"
                  icon="🎨"
                  skills={SKILLS.frontend}
                  color="blue"
                />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl p-6">
                <CategorySection
                  title="Langages"
                  icon="💻"
                  skills={SKILLS.languages}
                  color="purple"
                />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl p-6">
                <CategorySection
                  title="Databases"
                  icon="🗄️"
                  skills={SKILLS.databases}
                  color="amber"
                />
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl p-6">
                <CategorySection
                  title="DevOps"
                  icon="🚀"
                  skills={SKILLS.devops}
                  color="cyan"
                />
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl p-6">
                <CategorySection
                  title="Outils"
                  icon="🛠️"
                  skills={SKILLS.tools}
                  color="pink"
                />
              </div>
            </Reveal>
          </div>
        )}

        {/* Stats Summary */}
        <Reveal delay={0.35}>
          <div className="mt-16 rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/10 to-black/20 backdrop-blur-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 text-sm text-emerald-400 font-mono mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Performance Overview
              </div>
              <h3 className="text-2xl font-bold text-white">
                Statistiques du Stack
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">
                  6+
                </div>
                <div className="text-sm text-white/50 font-mono">
                  Backend
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  5+
                </div>
                <div className="text-sm text-white/50 font-mono">
                  Frontend
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  6+
                </div>
                <div className="text-sm text-white/50 font-mono">
                  Langages
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-400 mb-2">
                  5+
                </div>
                <div className="text-sm text-white/50 font-mono">
                  Databases
                </div>
              </div>
            </div>

            {/* Code snippet decoration */}
            <div className="mt-8 flex justify-center">
              <div className="rounded-lg border border-emerald-400/30 bg-black/60 backdrop-blur px-4 py-2 font-mono text-xs text-emerald-400">
                <span className="text-purple-400">return</span>{" "}
                <span className="text-amber-400">"Production Ready"</span>;
              </div>
            </div>
          </div>
        </Reveal>
      </div>

    
    </section>
  );
}