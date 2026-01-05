"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Github, Linkedin, Mail, Phone, Terminal, Code2, Sparkles } from "lucide-react";

export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [photoHover, setPhotoHover] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      className={[
        "relative mt-24 overflow-hidden border-t border-white/10",
        "bg-transparent text-white/70",
        "transition-all duration-1000 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
      ].join(" ")}
    >
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-black/60 via-black/50 to-black/40 backdrop-blur-2xl shadow-2xl shadow-emerald-500/10 overflow-hidden">
          
          {/* Top shimmer effect */}
          <div className="absolute top-0 left-0 right-0 h-px">
            <div className="h-full bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent animate-shimmer" 
                 style={{
                   backgroundSize: '200% 100%',
                   animation: 'shimmer 3s infinite'
                 }} />
          </div>

          {/* Animated grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(16,185,129,0.4) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(16,185,129,0.4) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
              animation: 'grid-flow 20s linear infinite'
            }}
          />

          {/* Gradient orbs */}
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full blur-3xl bg-emerald-400/10 animate-pulse" 
               style={{ animationDuration: '5s' }} />
          <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl bg-cyan-400/10 animate-pulse" 
               style={{ animationDuration: '7s', animationDelay: '2s' }} />

          <div className="relative p-10 md:p-14">
            {/* Header avec photo */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
              
              {/* Photo professionnelle */}
              <div 
                className="relative group"
                onMouseEnter={() => setPhotoHover(true)}
                onMouseLeave={() => setPhotoHover(false)}
              >
                {/* Glow effect */}
                <div className={[
                  "absolute -inset-2 rounded-full bg-gradient-to-br from-emerald-400/40 via-cyan-400/40 to-emerald-400/40 blur-xl",
                  "transition-all duration-500",
                  photoHover ? "opacity-100 scale-110" : "opacity-0 scale-100"
                ].join(" ")} />
                
                {/* Rotating ring */}
                <div className="absolute -inset-3 rounded-full border-2 border-emerald-400/20 animate-spin-slow" 
                     style={{ animationDuration: '10s' }} />
                
                {/* Photo container */}
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-emerald-400/30 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 shadow-2xl shadow-emerald-500/20">
                  <img
                    src="me2.png"
                    alt="Amine Eddahiry"
                    className={[
                      "h-full w-full object-cover transition-all duration-500",
                      photoHover ? "scale-110 brightness-110" : "scale-100"
                    ].join(" ")}
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Status indicator */}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50 animate-pulse" />
                  </div>
                </div>

                {/* Sparkles */}
                {photoHover && (
                  <>
                    <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-emerald-400 animate-ping" />
                    <Sparkles className="absolute -bottom-2 -left-2 h-4 w-4 text-cyan-400 animate-ping" 
                              style={{ animationDelay: '0.5s' }} />
                  </>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left space-y-3">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/15 to-cyan-400/15 shadow-lg shadow-emerald-500/10">
                    <Terminal className="h-5 w-5 text-emerald-300" />
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      Amine Eddahiry
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-sm text-emerald-400 font-medium">Disponible pour projets</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-base text-white/70 max-w-2xl">
                  Full-Stack Developer • Backend first • Production mindset
                </p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
                  <TechBadge icon={<Code2 className="h-3.5 w-3.5" />} text="Next.js" />
                  <TechBadge icon={<Terminal className="h-3.5 w-3.5" />} text="APIs" />
                  <TechBadge icon={<Sparkles className="h-3.5 w-3.5" />} text="IA" />
                </div>
              </div>
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 mb-10">
              
              {/* À propos */}
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400/90 flex items-center gap-2">
                  <div className="h-px w-8 bg-gradient-to-r from-emerald-400/60 to-transparent" />
                  À propos
                </h4>
                <p className="text-sm leading-relaxed text-white/65">
                  Je construis des produits solides : APIs robustes, microservices, sécurité,
                  intégrations et IA appliquée — avec un focus qualité, performance et maintenance.
                </p>
              </div>

              {/* Liens */}
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400/90 flex items-center gap-2">
                  <div className="h-px w-8 bg-gradient-to-r from-emerald-400/60 to-transparent" />
                  Liens
                </h4>
                <nav className="flex flex-col gap-3">
                  <FooterLink
                    href="https://github.com/EddahiryAmine"
                    label="GitHub Projects"
                    icon={<Github className="h-4 w-4" />}
                  />
                  <FooterLink
                    href="https://www.linkedin.com/in/eddahiry-amine/"
                    label="LinkedIn Profile"
                    icon={<Linkedin className="h-4 w-4" />}
                  />
                </nav>
              </div>

              {/* Contact */}
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400/90 flex items-center gap-2">
                  <div className="h-px w-8 bg-gradient-to-r from-emerald-400/60 to-transparent" />
                  Contact
                </h4>
                <div className="flex flex-col gap-3">
                  <FooterLink
                    href="mailto:eddahiryamine@gmail.com"
                    label="eddahiryamine@gmail.com"
                    icon={<Mail className="h-4 w-4" />}
                    breakAll
                  />
                  <FooterLink
                    href="tel:+212724546394"
                    label="+212 7 24 54 63 94"
                    icon={<Phone className="h-4 w-4" />}
                  />
                </div>
              </div>
            </div>

            {/* Divider élégant */}
            <div className="relative h-px my-8">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent blur-sm" />
            </div>

            {/* Bottom row - Copyright */}
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              
              {/* Copyright avec animation */}
              <div className="flex items-center gap-3 group">
                <div className="h-8 w-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-emerald-400/30 group-hover:bg-emerald-400/10 transition-all duration-300">
                  <Terminal className="h-4 w-4 text-emerald-400" />
                </div>
                <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                  © {year} <span className="font-semibold text-white/70">Amine Eddahiry</span>
                  <span className="mx-2 text-white/30">•</span>
                  <span className="text-white/45">Tous droits réservés</span>
                </p>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-3">
                <IconBtn
                  href="https://github.com/EddahiryAmine"
                  label="GitHub"
                  icon={<Github className="h-5 w-5" />}
                />
                <IconBtn
                  href="https://www.linkedin.com/in/eddahiry-amine/"
                  label="LinkedIn"
                  icon={<Linkedin className="h-5 w-5" />}
                />
                <IconBtn
                  href="mailto:eddahiryamine@gmail.com"
                  label="Email"
                  icon={<Mail className="h-5 w-5" />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { background-position: 200% 0; }
          50% { background-position: -200% 0; }
        }
        @keyframes grid-flow {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-spin-slow { animation: spin-slow linear infinite; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
      `}</style>
    </footer>
  );
}

function TechBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:border-emerald-400/30 hover:bg-emerald-400/10 transition-all duration-300 group">
      <span className="text-emerald-400 group-hover:scale-110 transition-transform">{icon}</span>
      <span className="text-xs font-medium text-white/70 group-hover:text-white transition-colors">{text}</span>
    </div>
  );
}

function FooterLink({
  href,
  label,
  icon,
  breakAll,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  breakAll?: boolean;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-flex items-center gap-3 text-sm text-white/60 hover:text-white transition-all duration-300"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 group-hover:border-emerald-400/40 group-hover:bg-emerald-400/15 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-300">
        <span className="group-hover:scale-110 transition-transform">{icon}</span>
      </span>
      <span className={`group-hover:translate-x-1 transition-transform duration-300 ${breakAll ? "break-all" : ""}`}>
        {label}
      </span>
    </a>
  );
}

function IconBtn({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-emerald-400/40 hover:bg-emerald-400/15 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 group"
      aria-label={label}
      title={label}
    >
      <span className="group-hover:scale-110 transition-transform duration-300">{icon}</span>
      
      <span className="absolute inset-0 rounded-full border border-emerald-400/0 group-hover:border-emerald-400/40 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" />
    </a>
  );
}