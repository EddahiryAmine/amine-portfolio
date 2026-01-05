"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

type ProjectType = "stage" | "academic";

type Project = {
  type: ProjectType;
  title: string;
  subtitle: string;
  desc: string;
  stack: string[];
  image?: string;
  year: string;
  status: string;
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    type: "stage",
    title: "EQDOM",
    subtitle: "App Mobile React Native • Backend Spring Boot",
    desc: "Intégration SDK Mon eID via bridge Kotlin, authentification sécurisée et persistance PostgreSQL.",
    stack: ["React Native", "Spring Boot", "PostgreSQL", "Kotlin", "Security"],
    year: "2025",
    status: "Production",
    featured: true,
  },
  {
    type: "stage",
    title: "BS-Link",
    subtitle: "Application Web ASP.NET • ERP",
    desc: "Suivi des processus d'achats : workflows, règles métier et validation SQL.",
    stack: ["ASP.NET", "C#", "SQL Server", "ERP"],
    year: "2024",
    status: "Déployé",
    featured: true,
  },
  {
    type: "stage",
    title: "Wal-IT Services",
    subtitle: "Plateforme Laravel • Formations",
    desc: "Back-office de gestion de contenus pédagogiques avec authentification et CRUD.",
    stack: ["Laravel", "PHP", "MySQL", "Auth"],
    year: "2023",
    status: "Livré",
  },
  {
    type: "academic",
    title: "SmartFun 2030",
    subtitle: "Microservices • Event-Driven",
    desc: "Billetterie événementielle avec Gateway, RabbitMQ, JWT et MongoDB.",
    stack: ["Spring Boot", "Gateway", "RabbitMQ", "JWT"],
    year: "2024",
    status: "Complété",
    featured: true,
  },
  {
    type: "academic",
    title: "Portail Pédagogique",
    subtitle: "ASP.NET Core • Gestion",
    desc: "Système de gestion cours/TD/TP avec réservation de salles et RBAC.",
    stack: ["ASP.NET Core", "SQL Server", "RBAC"],
    year: "2024",
    status: "Complété",
  },
  {
    type: "academic",
    title: "JobPortal",
    subtitle: "Laravel + React • Recrutement",
    desc: "Plateforme offres/candidatures avec workflow employeur-candidat.",
    stack: ["Laravel", "React", "MySQL"],
    year: "2024",
    status: "Complété",
  },
  {
    type: "academic",
    title: "DAR VISION",
    subtitle: "Microservices • IA Design",
    desc: "Design d'intérieur IA : détection d'espace + génération image-to-image via n8n.",
    stack: ["Spring Boot", "n8n", "ML API", "Img2Img"],
    year: "2024",
    status: "Complété",
  },
  {
    type: "academic",
    title: "Sentiment App",
    subtitle: "NLP • Analyse de Sentiment",
    desc: "Analyse tweets et feedbacks clients via modèle IA avec exposition API.",
    stack: ["NLP", "API", "Mobile", "ML"],
    year: "2024",
    status: "Complété",
  },
];

function FilterTab({
  active,
  children,
  count,
  onClick,
}: {
  active: boolean;
  children: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 rounded-xl font-mono text-sm transition-all border ${
        active
          ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-400 shadow-lg shadow-emerald-500/20"
          : "border-white/10 bg-black/30 text-white/60 hover:border-emerald-400/30 hover:text-white"
      }`}
    >
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-transparent rounded-xl animate-pulse" />
      )}
      <span className="relative flex items-center gap-2">
        <span className={active ? "text-emerald-400" : "text-white/40"}>//</span>
        {children}
        <span className="text-xs opacity-70">({count})</span>
      </span>
    </button>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative h-full flex flex-col rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden hover:border-emerald-400/30 transition-all duration-300 hover:scale-[1.02]">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-transparent to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Image/Placeholder */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-emerald-400/10 to-purple-400/10">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-2">
                {project.type === "stage" ? "💼" : "🎓"}
              </div>
              <div className="text-xs text-white/40 font-mono">
                // {project.type}
              </div>
            </div>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-xl border ${
              project.type === "stage"
                ? "bg-blue-400/20 border-blue-400/40 text-blue-100"
                : "bg-purple-400/20 border-purple-400/40 text-purple-100"
            }`}
          >
            {project.type === "stage" ? "💼 Stage" : "🎓 Academic"}
          </span>
        </div>

        {/* Status */}
        <div className="absolute top-3 right-3">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-400/20 border border-emerald-400/40 backdrop-blur-xl text-xs text-emerald-100 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {project.status}
          </span>
        </div>

        {/* Year */}
        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1 rounded-lg bg-black/80 border border-white/20 backdrop-blur-xl text-xs text-white/80 font-mono">
            {project.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative flex-1 p-5 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
        <p className="text-xs text-emerald-400/80 font-medium mb-3">
          {project.subtitle}
        </p>

        <p className="text-sm text-white/70 leading-relaxed mb-4 flex-1">
          {project.desc}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white/70 font-mono hover:border-emerald-400/30 hover:bg-emerald-400/5 transition-all"
            >
              <span className="text-emerald-400 mr-1">#</span>
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50 font-mono">
              +{project.stack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Bottom line indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

// ============ MAIN COMPONENT ============
export default function Projects() {
  const [filter, setFilter] = useState<"all" | ProjectType>("all");

  const filteredProjects = useMemo(() => {
    if (filter === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.type === filter);
  }, [filter]);

  const featuredProjects = PROJECTS.filter((p) => p.featured);

  const stageCount = PROJECTS.filter((p) => p.type === "stage").length;
  const academicCount = PROJECTS.filter((p) => p.type === "academic").length;

  return (
    <section
      id="projects"
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
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 backdrop-blur-xl px-4 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400">
                projects.portfolio.active
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              <span className="text-purple-400 font-mono text-2xl">const</span>{" "}
              projects = {"["}
              <br />
              <span className="ml-8 text-emerald-400">Réalisations</span>
              <br />
              {"];"}
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="max-w-2xl text-white/60 leading-relaxed">
              Projets réalisés en{" "}
              <span className="text-blue-400">stage professionnel</span> et{" "}
              <span className="text-purple-400">contexte académique</span>,
              avec focus sur l'architecture et la production.
            </p>
          </Reveal>
        </div>

        {/* Featured Projects - Mise en avant */}
        <Reveal delay={0.2}>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-amber-400 text-2xl"></span>
              <h3 className="text-2xl font-bold text-white font-mono">
                <span className="text-emerald-400">//</span> Projets phares
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, i) => (
                <Reveal key={project.title} delay={0.05 * i}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        {/* All Projects Section */}
        <Reveal delay={0.3}>
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white font-mono">
                <span className="text-emerald-400">//</span> Tous les projets
              </h3>

              {/* Filters */}
              <div className="flex gap-2">
                <FilterTab
                  active={filter === "all"}
                  count={PROJECTS.length}
                  onClick={() => setFilter("all")}
                >
                  Tous
                </FilterTab>
                <FilterTab
                  active={filter === "stage"}
                  count={stageCount}
                  onClick={() => setFilter("stage")}
                >
                  Stages
                </FilterTab>
                <FilterTab
                  active={filter === "academic"}
                  count={academicCount}
                  onClick={() => setFilter("academic")}
                >
                  Academic
                </FilterTab>
              </div>
            </div>

            {/* Terminal-style container */}
            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center justify-between px-6 py-4 bg-black/60 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-white/40 font-mono">
                    ~/projects/{filter}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-emerald-400">
                    {filteredProjects.length}
                  </span>
                  <span className="text-white/50">found</span>
                </div>
              </div>

              {/* Projects grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project, i) => (
                    <Reveal key={project.title} delay={0.05 * i}>
                      <ProjectCard project={project} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Stats Summary */}
        <Reveal delay={0.4}>
          <div className="mt-16 rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/10 to-black/20 backdrop-blur-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-emerald-400 mb-2">
                  {PROJECTS.length}
                </div>
                <div className="text-sm text-white/60 font-mono">
                  Total Projects
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {stageCount}
                </div>
                <div className="text-sm text-white/60 font-mono">
                  Stages Pro
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  {academicCount}
                </div>
                <div className="text-sm text-white/60 font-mono">
                  Academic
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-400 mb-2">
                  {featuredProjects.length}
                </div>
                <div className="text-sm text-white/60 font-mono">Featured</div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <div className="rounded-lg border border-emerald-400/30 bg-black/60 backdrop-blur px-4 py-2 font-mono text-xs text-emerald-400">
                <span className="text-purple-400">console</span>.log(
                <span className="text-amber-400">"Ready for production"</span>
                );
              </div>
            </div>
          </div>
        </Reveal>
      </div>

    </section>
  );
}