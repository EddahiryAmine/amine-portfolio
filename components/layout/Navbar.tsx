"use client";
import { useEffect, useMemo, useState } from "react";

type NavItem = { id: string; label: string; icon: string };

export default function Navbar() {
  const items: NavItem[] = useMemo(
    () => [
      { id: "home", label: "Accueil", icon: "🏠" },
      { id: "skills", label: "Compétences", icon: "⚡" },
      { id: "projects", label: "Projets", icon: "🚀" },
      { id: "certifications", label: "Certifications", icon: "🎓" },
      { id: "resume", label: "CV", icon: "📄" },
      { id: "contact", label: "Contact", icon: "✉️" },
    ],
    []
  );

  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const els = items
      .map((it) => document.getElementById(it.id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: [0, 0.1, 0.3, 0.5, 0.7],
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

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
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Progress bar améliorée */}
      <div className="h-[3px] w-full bg-gradient-to-r from-black/50 via-black/30 to-black/50 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 transition-[width] duration-150 relative overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>

      <div className="px-4 sm:px-6 pt-4">
        <div className="mx-auto max-w-7xl">
          <div
            className={`
              relative rounded-2xl border
              backdrop-blur-xl
              shadow-2xl
              overflow-hidden
              transition-all duration-300
              ${scrolled 
                ? 'border-white/20 bg-black/70 shadow-emerald-500/10' 
                : 'border-white/10 bg-black/40 shadow-black/50'
              }
            `}
          >
            {/* Background effects */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-56 w-[520px] rounded-full blur-3xl opacity-30 bg-emerald-400/20 animate-pulse-slow" />
              <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('/noise.png')]" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
              
              {/* Animated grid pattern */}
              <div 
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `linear-gradient(rgba(16,185,129,0.4) 1px, transparent 1px), 
                                  linear-gradient(90deg, rgba(16,185,129,0.4) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}
              />
            </div>

            <div className="relative flex items-center justify-between px-4 sm:px-6 py-3.5">
              {/* Logo avec effet tech */}
              <button
                onClick={() => scrollTo("home")}
                className="group inline-flex items-center gap-2.5 text-white font-semibold tracking-wide transition-all hover:scale-[1.02]"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-400/20 rounded-lg blur-md group-hover:blur-lg transition-all" />
                  <div className="relative px-2 py-1 rounded-lg border border-emerald-400/30 bg-emerald-400/10 backdrop-blur">
                    <span className="text-lg font-mono text-emerald-400">{"<A/>"}</span>
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-base leading-none">Amine Eddahiry</span>
                  <span className="hidden sm:inline text-[10px] text-white/50 font-mono mt-0.5">
                    // Full-Stack Developer
                  </span>
                </div>
              </button>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1.5">
                {items.map((it) => {
                  const isActive = active === it.id;
                  return (
                    <button
                      key={it.id}
                      onClick={() => scrollTo(it.id)}
                      className={`
                        group relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                        ${isActive
                          ? "text-emerald-100"
                          : "text-white/70 hover:text-white"
                        }
                      `}
                    >
                      {/* Background glow pour l'item actif */}
                      {isActive && (
                        <div className="absolute inset-0 bg-emerald-400/10 rounded-xl blur-sm" />
                      )}
                      
                      {/* Background layer */}
                      <span
                        className={`
                          absolute inset-0 rounded-xl transition-all
                          ${isActive
                            ? "bg-gradient-to-br from-emerald-400/15 to-emerald-400/5 border border-emerald-400/25 shadow-lg shadow-emerald-500/10"
                            : "bg-transparent border border-transparent group-hover:bg-white/5 group-hover:border-white/10"
                          }
                        `}
                      />
                      
                      <span className="relative flex items-center gap-2">
                        <span className={`text-base transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                          {it.icon}
                        </span>
                        {it.label}
                      </span>
                      
                      {/* Active indicator line */}
                      {isActive && (
                        <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] w-12 rounded-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
                      )}
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
                    rounded-xl border px-3 py-2.5 transition-all
                    ${open
                      ? 'bg-emerald-400/10 border-emerald-400/30 text-emerald-400'
                      : 'border-white/10 bg-white/[0.03] text-white/80 hover:bg-white/[0.06] hover:border-emerald-400/20'
                    }
                    active:scale-95
                  `}
                  aria-label="Ouvrir le menu"
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="transition-transform duration-300"
                    style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
                  >
                    {open ? (
                      <path
                        d="M6 18L18 6M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    ) : (
                      <path
                        d="M4 6h16M4 12h16M4 18h16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    )}
                  </svg>
                </button>

                {/* CTA Button */}
                <button
                  onClick={() => scrollTo("contact")}
                  className="
                    group relative inline-flex items-center justify-center gap-2
                    rounded-xl px-5 py-2.5 text-sm font-semibold overflow-hidden
                    bg-gradient-to-r from-emerald-400 to-emerald-500 text-black
                    shadow-lg shadow-emerald-500/30
                    transition-all
                    hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-[1.02]
                    active:scale-95
                  "
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative">Contacter-moi</span>
                  <svg className="relative w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {open && (
              <div className="relative md:hidden border-t border-white/10 bg-gradient-to-b from-black/50 to-black/70 backdrop-blur-xl animate-slide-down">
                <div className="p-4 grid gap-2">
                  {items.map((it, index) => {
                    const isActive = active === it.id;
                    return (
                      <button
                        key={it.id}
                        onClick={() => scrollTo(it.id)}
                        className={`
                          group w-full text-left rounded-xl px-4 py-3.5 text-sm font-medium transition-all border backdrop-blur
                          opacity-0 animate-fade-in-up
                          ${isActive
                            ? "border-emerald-400/30 bg-gradient-to-br from-emerald-400/15 to-emerald-400/5 text-emerald-100 shadow-lg shadow-emerald-500/10"
                            : "border-white/10 bg-white/[0.03] text-white/75 hover:bg-white/[0.06] hover:border-emerald-400/20"
                          }
                        `}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-lg transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                            {it.icon}
                          </span>
                          <span>{it.label}</span>
                          {isActive && (
                            <span className="ml-auto">
                              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}