"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

/* ----------------------------- Types & Data ----------------------------- */

type ProjectType = "stage" | "academic";

type Project = {
  type: ProjectType;
  title: string;
  subtitle?: string;
  desc: string;
  fullDesc?: string;
  stack: string[];
  image?: string;
  links?: { label: string; href: string }[];
  year?: string;
  status?: string;
};

const ALL_PROJECTS: Project[] = [
  {
    type: "stage",
    title: "EQDOM Casablanca",
    subtitle: "Stage Développeur Mobile (Juil 2025 → Sep 2025)",
    desc: "App React Native avec intégration SDK Mon eID via bridge Kotlin, backend Spring Boot et PostgreSQL.",
    fullDesc: "Développement d'une application mobile React Native avec intégration du SDK Mon eID via bridge Kotlin. L'app est connectée à un backend Spring Boot pour une authentification sécurisée et la gestion des données, avec persistance dans PostgreSQL.",
    stack: ["React Native", "Spring Boot", "PostgreSQL", "SDK", "Sécurité"],
    image: "/projects/eqdom.jpg",
    links: [{ label: "Détails", href: "#resume" }],
    year: "2025",
    status: "Production"
  },
  {
    type: "stage",
    title: "BS-Link Casablanca",
    subtitle: "Stage Développeur Backend (Juil 2024 → Sep 2024)",
    desc: "Application web ASP.NET inspirée de Dynamics pour le suivi de processus d'achats en contexte ERP.",
    fullDesc: "Conception d'une application web ASP.NET orientée logique métier pour le suivi des demandes d'achats en contexte ERP : workflows, écrans métier, règles de validation et exploitation de données côté SQL.",
    stack: ["ASP.NET", "C#", "ERP", "Workflows", "SQL"],
    image: "/projects/BS-Link.png",
    year: "2024",
    status: "Déployé"
  },
  {
    type: "stage",
    title: "Wal-IT Services Casablanca",
    subtitle: "Stage Backend Full-Stack (Avr 2023 → Mai 2023)",
    desc: "Plateforme Laravel pour la publication et la gestion de formations en ligne (back-office).",
    fullDesc: "Développement d'une plateforme web sous Laravel permettant la publication, l'administration et la gestion de contenus de formations en ligne (back-office), avec authentification et opérations CRUD orientées usage réel.",
    stack: ["Laravel", "PHP", "Auth", "CRUD", "Web"],
    image: "/projects/wal-it-services.png",
    year: "2023",
    status: "Livré"
  },
  {
    type: "academic",
    title: "SmartFun 2030",
    subtitle: "Microservices • Event-Driven",
    desc: "Billetterie & événements : API Gateway, auth JWT, RabbitMQ, DB par service, découplage et discovery.",
    stack: ["Spring Boot", "Gateway", "RabbitMQ", "JWT", "MongoDB"],
    year: "2024",
    status: "Complété"
  },
  {
    type: "academic",
    title: "Portail Pédagogique",
    subtitle: "ASP.NET Core • SQL Server",
    desc: "Gestion pédagogique : cours/TD/TP, documents, rôles et réservation de salles avec authentification.",
    stack: ["ASP.NET Core", "SQL Server", "RBAC", "ERP-like"],
    year: "2024",
    status: "Complété"
  },
  {
    type: "academic",
    title: "JobPortal",
    subtitle: "Laravel • React • MySQL",
    desc: "Recrutement : offres, candidatures, suivi des statuts et canal employeur–candidat après acceptation.",
    stack: ["Laravel", "React", "MySQL", "Workflow"],
    year: "2024",
    status: "Complété"
  },
  {
    type: "academic",
    title: "DAR VISION",
    subtitle: "Microservices • n8n • IA x2",
    desc: "Design d'intérieur IA : détection du type d'espace + génération de redesign (image-to-image), workflows n8n.",
    stack: ["Spring Boot", "Microservices", "n8n", "ML API", "Img2Img"],
    year: "2024",
    status: "Complété"
  },
  {
    type: "academic",
    title: "Sentiment App",
    subtitle: "NLP • Tweets & Feedbacks",
    desc: "Analyse de sentiment sur tweets et feedbacks clients via modèle IA, exposition API et usage orienté KPI.",
    stack: ["NLP", "API", "Mobile", "KPI", "IA"],
    year: "2024",
    status: "Complété"
  },
];

function Pill({ active, children, onClick }: { active?: boolean; children: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-all border backdrop-blur
        active:scale-95
        ${active
          ? "border-emerald-400/40 bg-gradient-to-r from-emerald-400/15 to-emerald-400/10 text-emerald-100 shadow-lg shadow-emerald-500/20"
          : "border-white/10 bg-white/[0.03] text-white/70 hover:border-emerald-400/20 hover:bg-emerald-400/[0.06] hover:text-white"
        }
      `}
    >
      {active && (
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/10 to-transparent animate-shimmer" />
      )}
      <span className="relative">{children}</span>
    </button>
  );
}

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-white/10 bg-black/40 backdrop-blur-xl px-2.5 py-1 text-xs text-white/70 font-mono hover:border-emerald-400/30 hover:bg-emerald-400/5 transition-all">
      <span className="text-emerald-400 mr-1">#</span>
      {children}
    </span>
  );
}

function MediaFallback({ label, type }: { label: string; type: ProjectType }) {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-black/80 to-purple-400/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.2),transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[url('/noise.png')]" />

      {/* Code pattern background */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), 
                          linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex rounded-2xl border-2 border-white/10 bg-black/60 backdrop-blur-xl p-6">
            <div className="text-6xl mb-3">{type === "stage" ? "💼" : "🎓"}</div>
            <div className="text-sm font-semibold text-white/90 mb-1">{label}</div>
            <div className="text-xs text-white/50 font-mono">// Coming soon</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectMedia({ src, type }: { src?: string; type: ProjectType }) {
  const [failed, setFailed] = useState(false);

  if (!src) return <MediaFallback label="Preview à venir" type={type} />;
  if (failed) return <MediaFallback label="Image introuvable" type={type} />;

  return (
    <img
      src={src}
      alt=""
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      onError={() => setFailed(true)}
    />
  );
}

function ScrollButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group inline-flex items-center justify-center
        rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl
        w-12 h-12 text-white/70 
        transition-all
        hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-400 hover:scale-110
        active:scale-95
      "
    >
      <svg 
        className={`w-5 h-5 transition-transform group-hover:${dir === 'prev' ? '-translate-x-0.5' : 'translate-x-0.5'}`}
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2.5} 
          d={dir === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} 
        />
      </svg>
    </button>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const [open, setOpen] = useState(false);
  const hasFull = Boolean(p.fullDesc && p.fullDesc.trim().length > 0);

  return (
    <article className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl transition-all hover:border-emerald-400/30 hover:-translate-y-1 hover:shadow-emerald-500/10">
      {/* Media */}
      <div className="relative h-[58%] w-full overflow-hidden">
        <ProjectMedia src={p.image} type={p.type} />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        
        {/* Top badges */}
        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2 z-10">
          {p.subtitle && (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-400/30 bg-black/70 backdrop-blur-xl px-3 py-1.5 text-xs font-medium text-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {p.subtitle}
            </span>
          )}
        </div>

        {/* Bottom info bar */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center rounded-lg border backdrop-blur-xl px-2.5 py-1 text-xs font-medium ${
              p.type === "stage"
                ? "border-blue-400/30 bg-blue-400/10 text-blue-100"
                : "border-purple-400/30 bg-purple-400/10 text-purple-100"
            }`}>
              {p.type === "stage" ? "💼 Stage" : "🎓 Academic"}
            </span>
            
            {p.year && (
              <span className="inline-flex items-center rounded-lg border border-white/10 bg-black/60 backdrop-blur-xl px-2.5 py-1 text-xs text-white/70 font-mono">
                {p.year}
              </span>
            )}
          </div>

          {p.status && (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-400/30 bg-black/70 backdrop-blur-xl px-2.5 py-1 text-xs text-emerald-400 font-mono">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
              {p.status}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="h-[42%] p-6 flex flex-col">
        <h4 className="text-lg font-bold text-white leading-snug line-clamp-1 group-hover:text-emerald-400 transition-colors">
          {p.title}
        </h4>

        <p className={`mt-3 text-sm leading-relaxed text-white/70 ${open ? "" : "line-clamp-2"}`}>
          {open && hasFull ? p.fullDesc : p.desc}
        </p>

        {hasFull && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span className="font-mono">//</span>
            {open ? "Réduire" : "Lire plus"}
            <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {p.stack.slice(0, 5).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>

        {p.links?.length ? (
          <div className="mt-auto pt-4 flex items-center gap-3">
            {p.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="
                  group/link inline-flex items-center gap-2 rounded-xl
                  border border-emerald-400/30 bg-emerald-400/10 backdrop-blur-xl
                  px-4 py-2 text-xs font-semibold text-emerald-100
                  transition-all
                  hover:bg-emerald-400/20 hover:border-emerald-400/50 hover:scale-105
                  active:scale-95
                "
              >
                {l.label}
                <svg className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<"all" | ProjectType>("all");
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const items = useMemo(() => {
    if (filter === "all") return ALL_PROJECTS;
    return ALL_PROJECTS.filter((p) => p.type === filter);
  }, [filter]);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [filter]);

  const scrollByPage = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9) * dir;
    el.scrollTo({ left: el.scrollLeft + amount, behavior: "smooth" });
  };

  const stageCount = ALL_PROJECTS.filter(p => p.type === "stage").length;
  const academicCount = ALL_PROJECTS.filter(p => p.type === "academic").length;

  return (
    <section
      id="projects"
      className="scroll-mt-28 relative isolate px-6 pt-28 pb-32 border-t border-white/10 overflow-hidden"
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
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 backdrop-blur-xl px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400">projects.showcase.active</span>
            </div>
          </BlockReveal>

          <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <BlockReveal onScroll delay={0.06}>
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Projets <span className="text-emerald-400">Sélectionnés</span>
                </h2>
              </BlockReveal>
              
              <BlockReveal onScroll delay={0.12}>
                <p className="mt-4 text-white/60 leading-relaxed">
                  Une sélection de projets réalisés en stage et dans un cadre académique, 
                  orientés production et architecture moderne.
                </p>
              </BlockReveal>
            </div>

            <BlockReveal onScroll delay={0.18}>
              <div className="flex flex-wrap items-center gap-3">
                <Pill active={filter === "all"} onClick={() => setFilter("all")}>
                  {`Tout (${ALL_PROJECTS.length})`}
                </Pill>
                <Pill active={filter === "stage"} onClick={() => setFilter("stage")}>
                  {`Stages (${stageCount})`}
                </Pill>
                <Pill active={filter === "academic"} onClick={() => setFilter("academic")}>
                  {`Academic (${academicCount})`}
                </Pill>
              </div>
            </BlockReveal>
          </div>
        </div>

        {/* Premium frame */}
        <BlockReveal onScroll delay={0.24}>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-black/20 backdrop-blur-xl p-6 md:p-8 shadow-2xl">
            {/* Top bar */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs text-white/40 font-mono">~/projects</span>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
                <span className="text-emerald-400">{items.length}</span>
                <span>projects found</span>
              </div>
            </div>

            {/* Carousel */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10" />

              <div
                ref={scrollerRef}
                className="
                  flex gap-5 overflow-x-auto overflow-y-hidden pb-4
                  scroll-smooth
                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden
                  snap-x snap-mandatory
                "
              >
                {items.map((p) => (
                  <div
                    key={`${p.type}-${p.title}`}
                    className="snap-start shrink-0 w-[85%] sm:w-[60%] lg:w-[42%] xl:w-[36%] h-[480px]"
                  >
                    <ProjectCard p={p} />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom controls */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="flex items-center gap-4">
                <ScrollButton dir="prev" onClick={() => scrollByPage(-1)} />
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
                <ScrollButton dir="next" onClick={() => scrollByPage(1)} />
              </div>

              <p className="text-xs text-white/40 font-mono">
                <span className="text-emerald-400">//</span> Shift + scroll pour navigation horizontale
              </p>
            </div>
          </div>
        </BlockReveal>
      </div>

     
    </section>
  );
}