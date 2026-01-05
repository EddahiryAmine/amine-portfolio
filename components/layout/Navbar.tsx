"use client";
import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  faHouse,
  faBolt,
  faRocket,
  faGraduationCap,
  faFilePdf,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

type NavItem = { id: string; label: string; icon: IconDefinition };

export default function Navbar() {
 const items: NavItem[] = useMemo(
  () => [
    { id: "home", label: "Accueil", icon: faHouse },
    { id: "skills", label: "Compétences", icon: faBolt },
    { id: "projects", label: "Projets", icon: faRocket },
    { id: "certifications", label: "Certifications", icon: faGraduationCap },
    { id: "resume", label: "CV", icon: faFilePdf },
    { id: "contact", label: "Contact", icon: faEnvelope },
  ],
  []
);
const [vw, setVw] = useState(1200); // valeur par défaut SSR-safe
const [vh, setVh] = useState(800);

useEffect(() => {
  const update = () => {
    setVw(window.innerWidth);
    setVh(window.innerHeight);
  };
  update();
  window.addEventListener("resize", update);
  return () => window.removeEventListener("resize", update);
}, []);


  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Détection de section active améliorée
  useEffect(() => {
    const els = items
      .map((it) => document.getElementById(it.id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Trier par position pour prendre la section la plus haute visible
        const visibleEntries = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        
        if (visibleEntries.length > 0) {
          setActive(visibleEntries[0].target.id);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
        rootMargin: "-15% 0px -35% 0px", // Plus précis pour l'activation
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  // Progress bar et scroll detection
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      setProgress(p);
      setScrolled(doc.scrollTop > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mouse tracking pour effet parallax
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    
    // Scroll avec offset pour la navbar
    const yOffset = -100;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Progress bar ultra moderne */}
      <div className="h-1 w-full bg-black/80 backdrop-blur-sm relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 transition-[width] duration-200 relative overflow-hidden shadow-lg shadow-emerald-500/50"
          style={{ width: `${progress}%` }}
        >
          {/* Shimmer effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{
              animation: 'shimmer 2s infinite',
              backgroundSize: '200% 100%'
            }}
          />
          {/* Glow effect */}
          <div className="absolute inset-0 blur-md bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 opacity-60" />
        </div>
        
        {/* Particle effect on progress bar */}
        {progress > 0 && (
          <div 
            className="absolute top-0 h-full w-2 bg-white/60 rounded-full blur-sm animate-pulse"
            style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
          />
        )}
      </div>

      <div className="px-3 sm:px-6 pt-3 sm:pt-4">
        <div className="mx-auto max-w-7xl">
          <div
            className={`
              relative rounded-2xl border
              backdrop-blur-2xl
              shadow-2xl
              overflow-hidden
              transition-all duration-500
              ${scrolled 
                ? 'border-white/25 bg-black/85 shadow-emerald-500/20 scale-[0.98]' 
                : 'border-white/15 bg-black/60 shadow-black/50 scale-100'
              }
            `}
          >
{/* Background effects avancés */}
<div className="pointer-events-none absolute inset-0">
  {/* Gradient orb animé */}
  <div
    className="absolute inset-0"
    style={{
      background: "radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)",
      left: `${(mousePos.x / Math.max(vw, 1)) * 20 - 10}%`,
      opacity: scrolled ? 0.3 : 0.2,
    }}
  />

              
              {/* Grille animée */}
              <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px), 
                                  linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                  animation: 'grid-move 20s linear infinite'
                }}
              />
              
              {/* Top border glow */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
              
              {/* Noise texture */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />
            </div>

            <div className="relative flex items-center justify-between px-4 sm:px-6 py-3.5">
              {/* Logo avec animations tech */}
              <button
                onClick={() => scrollTo("home")}
                className="group inline-flex items-center gap-2.5 text-white font-semibold tracking-wide transition-all hover:scale-105 active:scale-95"
              >
                <div className="relative">
                  {/* Glow layers */}
                  <div className="absolute inset-0 bg-emerald-400/30 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-lg blur-md group-hover:blur-lg transition-all duration-300 animate-pulse" />
                  
                  {/* Logo container */}
                  <div className="relative px-2.5 py-1.5 rounded-lg border border-emerald-400/40 bg-gradient-to-br from-emerald-400/15 to-cyan-400/10 backdrop-blur-sm shadow-lg shadow-emerald-500/20 group-hover:border-emerald-400/60 transition-all">
                    <span className="text-lg font-mono text-emerald-400 group-hover:text-emerald-300 transition-colors font-bold">
                      {"<A/>"}
                    </span>
                  </div>
                  
                  {/* Corner accents */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-emerald-400/50 rounded-tl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-400/50 rounded-br opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="flex flex-col items-start">
                  <span className="text-base leading-none group-hover:text-emerald-100 transition-colors">
                    Amine Eddahiry
                  </span>
                  <span className="hidden sm:inline text-[10px] text-white/50 font-mono mt-0.5 group-hover:text-emerald-400/70 transition-colors">
                    // Full-Stack Developer
                  </span>
                </div>
              </button>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                {items.map((it, index) => {
                  const isActive = active === it.id;
                  return (
                    <button
                      key={it.id}
                      onClick={() => scrollTo(it.id)}
                      className={`
                        group relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                        ${isActive
                          ? "text-emerald-100 scale-105"
                          : "text-white/70 hover:text-white hover:scale-105"
                        }
                      `}
                      style={{
                        transitionDelay: `${index * 30}ms`
                      }}
                    >
                      {/* Animated background pour l'item actif */}
                      {isActive && (
                        <>
                          <div className="absolute inset-0 bg-emerald-400/15 rounded-xl blur-md animate-pulse" />
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-cyan-400/5 to-emerald-400/10 rounded-xl" />
                        </>
                      )}
                      
                      {/* Background layer avec border glow */}
                      <span
                        className={`
                          absolute inset-0 rounded-xl transition-all duration-300
                          ${isActive
                            ? "bg-gradient-to-br from-emerald-400/20 to-cyan-400/10 border-2 border-emerald-400/40 shadow-lg shadow-emerald-500/20"
                            : "bg-transparent border border-transparent group-hover:bg-white/5 group-hover:border-white/20"
                          }
                        `}
                      />
                      
                      <span className="relative flex items-center gap-2.5">
                        <span 
                          className={`text-base transition-all duration-300 ${
                            isActive 
                              ? 'scale-125 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' 
                              : 'group-hover:scale-110 group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]'
                          }`}
                        >
                          <FontAwesomeIcon icon={it.icon} />
                        </span>
                        <span className="font-semibold">{it.label}</span>
                      </span>
                      
                      {/* Active indicator avec animation */}
                      {isActive && (
                        <>
                          <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[3px] w-16 rounded-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" />
                          <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[3px] w-16 rounded-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent blur-sm" />
                        </>
                      )}
                      
                      {/* Hover particles effect */}
                      <span className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="absolute top-0 left-0 w-1 h-1 bg-emerald-400/60 rounded-full animate-ping" />
                        <span className="absolute bottom-0 right-0 w-1 h-1 bg-cyan-400/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {/* Mobile menu button */}
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  className={`
                    md:hidden inline-flex items-center justify-center
                    rounded-xl border px-3 py-2.5 transition-all duration-300
                    ${open
                      ? 'bg-emerald-400/15 border-emerald-400/40 text-emerald-400 scale-95 shadow-lg shadow-emerald-500/20'
                      : 'border-white/20 bg-white/5 text-white/80 hover:bg-white/10 hover:border-emerald-400/30 hover:scale-105'
                    }
                    active:scale-90
                  `}
                  aria-label="Menu"
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="transition-all duration-500"
                    style={{ 
                      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                      filter: open ? 'drop-shadow(0 0 4px rgba(16,185,129,0.5))' : 'none'
                    }}
                  >
                    {open ? (
                      <path
                        d="M6 18L18 6M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    ) : (
                      <path
                        d="M4 6h16M4 12h16M4 18h16"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    )}
                  </svg>
                </button>

                {/* CTA Button ultra stylé */}
                <button
                  onClick={() => scrollTo("contact")}
                  className="
                    group relative inline-flex items-center justify-center gap-2
                    rounded-xl px-5 py-2.5 text-sm font-bold overflow-hidden
                    bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 text-black
                    shadow-lg shadow-emerald-500/40
                    transition-all duration-300
                    hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105
                    active:scale-95
                  "
                >
                  {/* Animated shine */}
                  <span 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    style={{
                      animation: 'shine 3s infinite',
                      backgroundSize: '200% 100%'
                    }}
                  />
                  
                  {/* Glow layer */}
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                  
                  <span className="relative font-bold tracking-wide">Contacter-moi</span>
                  
                  <svg 
                    className="relative w-4 h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  
                  {/* Corners */}
                  <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/50 rounded-tl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/50 rounded-br opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>

            {/* Mobile Menu avec animations fluides */}
            <div 
              className={`
                md:hidden border-t border-white/10 bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-2xl
                transition-all duration-500 origin-top overflow-hidden
                ${open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <div className="p-4 grid gap-2">
                {items.map((it, index) => {
                  const isActive = active === it.id;
                  return (
                    <button
                      key={it.id}
                      onClick={() => scrollTo(it.id)}
                      className={`
                        group w-full text-left rounded-xl px-4 py-4 text-sm font-semibold transition-all duration-300 border backdrop-blur-sm
                        ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                        ${isActive
                          ? "border-emerald-400/40 bg-gradient-to-br from-emerald-400/20 to-cyan-400/10 text-emerald-100 shadow-lg shadow-emerald-500/20 scale-[1.02]"
                          : "border-white/15 bg-white/5 text-white/75 hover:bg-white/10 hover:border-emerald-400/30 hover:scale-[1.02]"
                        }
                      `}
                      style={{ 
                        transitionDelay: open ? `${index * 60}ms` : '0ms'
                      }}
                    >
                      <div className="flex items-center gap-3.5">
                        <span 
                          className={`
                            text-xl transition-all duration-300
                            ${isActive 
                              ? 'scale-125 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]' 
                              : 'group-hover:scale-110 group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]'
                            }
                          `}
                        >
                          <FontAwesomeIcon icon={it.icon} />
                        </span>
                        <span>{it.label}</span>
                        {isActive && (
                          <span className="ml-auto flex items-center gap-2">
                            <span className="text-xs text-emerald-400 font-mono">actif</span>
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
                          </span>
                        )}
                      </div>
                      
                      {isActive && (
                        <div className="mt-2 h-1 w-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 shadow-lg shadow-emerald-400/50" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </header>
  );
}