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

const LINKS = {
  github: "https://github.com/EddahiryAmine",
  linkedin: "https://www.linkedin.com/in/eddahiry-amine/",
  email: "eddahiryamine@gmail.com",
  phone: "0724546394",
};

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // fallback
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl
        border backdrop-blur px-4 py-2 text-xs font-semibold
        transition-all
        ${copied
          ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-100"
          : "border-white/10 bg-black/40 text-white/70 hover:bg-emerald-400/10 hover:border-emerald-400/30 hover:text-emerald-100"
        }
        active:scale-95
      `}
      aria-label={`Copier ${label}`}
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Copié !
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copier
        </>
      )}
    </button>
  );
}

function ContactCard({
  title,
  subtitle,
  href,
  icon,
  badge,
  right,
  primary,
  description
}: {
  title: string;
  subtitle: string;
  href?: string;
  icon: React.ReactNode;
  badge?: string;
  right?: React.ReactNode;
  primary?: boolean;
  description?: string;
}) {
  const Wrapper: any = href ? "a" : "div";

  return (
    <Wrapper
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className={`
        group relative rounded-3xl border backdrop-blur-xl overflow-hidden transition-all
        ${href ? "cursor-pointer" : ""}
        ${primary
          ? "border-emerald-400/30 bg-gradient-to-br from-emerald-400/15 via-emerald-400/5 to-black/40 hover:border-emerald-400/40 hover:from-emerald-400/20"
          : "border-white/10 bg-gradient-to-br from-white/[0.03] to-black/40 hover:border-emerald-400/20 hover:bg-white/[0.06]"
        }
        hover:scale-[1.02] hover:shadow-2xl
        ${primary ? "hover:shadow-emerald-500/20" : "hover:shadow-black/50"}
      `}
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${
        primary ? "bg-gradient-to-br from-emerald-400/10 via-transparent to-purple-400/10" : "bg-gradient-to-br from-emerald-400/5 via-transparent to-transparent"
      }`} />

      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 min-w-0 flex-1">
            {/* Icon */}
            <div className={`
              h-14 w-14 shrink-0 rounded-2xl border flex items-center justify-center transition-all
              ${primary
                ? "border-emerald-400/30 bg-emerald-400/15 group-hover:bg-emerald-400/20 group-hover:scale-110"
                : "border-white/10 bg-black/40 group-hover:border-emerald-400/30 group-hover:bg-emerald-400/10 group-hover:scale-110"
              }
            `}>
              {icon}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-white">
                  {title}
                </h3>
                {badge && (
                  <span className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-emerald-400/30 bg-emerald-400/15 px-2.5 py-1 text-xs font-semibold text-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {badge}
                  </span>
                )}
              </div>

              <p className="mt-1.5 text-sm text-white/70 font-mono">{subtitle}</p>
              
              {description && (
                <p className="mt-2 text-xs text-white/50 leading-relaxed">{description}</p>
              )}
            </div>
          </div>

          {right && <div className="shrink-0">{right}</div>}
        </div>

        {href && (
          <div className="mt-5 flex items-center gap-2 text-xs text-white/50 font-mono">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="group-hover:text-emerald-400 transition-colors">Click to open</span>
            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        )}
      </div>
    </Wrapper>
  );
}

export default function Contact() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="contact"
      className="scroll-mt-28 relative isolate px-6 py-24 border-t border-white/10 overflow-hidden"
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
              <span className="text-xs font-mono text-emerald-400">contact.me.available</span>
            </div>
          </BlockReveal>

          <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-3xl">
              <BlockReveal onScroll delay={0.06}>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                  Discutons d'une <span className="text-emerald-400">Opportunité</span>
                </h2>
              </BlockReveal>

              <BlockReveal onScroll delay={0.12}>
                <p className="mt-4 text-white/60 leading-relaxed">
                  Le plus rapide : <span className="text-emerald-400 font-semibold">email</span>. 
                  Sinon LinkedIn pour échanger, et GitHub pour voir mes projets en action.
                </p>
              </BlockReveal>
            </div>

            {/* Primary CTA */}
            <BlockReveal onScroll delay={0.18}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:${LINKS.email}`}
                  className="
                    group inline-flex items-center justify-center gap-2
                    rounded-2xl px-8 py-4
                    bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-bold text-sm
                    shadow-2xl shadow-emerald-500/40
                    transition-all
                    hover:shadow-emerald-500/60 hover:scale-105
                    active:scale-95
                    relative overflow-hidden
                  "
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <svg className="w-5 h-5 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="relative">Envoyer un email</span>
                  <svg className="w-4 h-4 relative transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    group inline-flex items-center justify-center gap-2
                    rounded-2xl px-8 py-4
                    border border-white/20 bg-white/[0.05]
                    text-white font-semibold text-sm backdrop-blur-xl
                    transition-all
                    hover:bg-white/[0.1] hover:border-emerald-400/30 hover:scale-105
                    active:scale-95
                  "
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>LinkedIn</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </BlockReveal>
          </div>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <BlockReveal onScroll delay={0.24}>
            <ContactCard
              title="Email"
              subtitle={LINKS.email}
              href={`mailto:${LINKS.email}`}
              badge="Rapide"
              description="Réponse sous 24h en semaine"
              primary
              right={<CopyButton value={LINKS.email} label="email" />}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7Z"
                    stroke="rgba(255,255,255,0.80)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M6.5 8.5 12 12.5l5.5-4"
                    stroke="rgba(16,185,129,1)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </BlockReveal>

          <BlockReveal onScroll delay={0.30}>
            <ContactCard
              title="Téléphone"
              subtitle={LINKS.phone}
              href={`tel:${LINKS.phone}`}
              description="Disponible 9h-18h (GMT+1)"
              right={<CopyButton value={LINKS.phone} label="numéro" />}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7.5 4.5h2.2c.5 0 .9.3 1 .8l.6 2.7c.1.4 0 .8-.3 1.1l-1.1 1.1c1 2.1 2.7 3.8 4.8 4.8l1.1-1.1c.3-.3.7-.4 1.1-.3l2.7.6c.5.1.8.5.8 1V18.5c0 .6-.5 1-1 1h-1.1C11 19.5 4.5 13 4.5 5.6V4.5c0-.6.4-1 1-1Z"
                    stroke="rgba(255,255,255,0.80)"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </BlockReveal>

          <BlockReveal onScroll delay={0.36}>
            <ContactCard
              title="LinkedIn"
              subtitle="eddahiry-amine"
              href={LINKS.linkedin}
              badge="Réseau"
              description="Networking & opportunités professionnelles"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6.5 9.5V18"
                    stroke="rgba(255,255,255,0.80)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6.5 6.75h.01"
                    stroke="rgba(16,185,129,1)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10.25 18v-5.2c0-1.6 1-2.55 2.35-2.55 1.3 0 2.15.9 2.15 2.6V18"
                    stroke="rgba(255,255,255,0.80)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.25 10.2V18"
                    stroke="rgba(255,255,255,0.80)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4.5 5.8c0-.72.58-1.3 1.3-1.3h12.4c.72 0 1.3.58 1.3 1.3v12.4c0 .72-.58 1.3-1.3 1.3H5.8c-.72 0-1.3-.58-1.3-1.3V5.8Z"
                    stroke="rgba(255,255,255,0.40)"
                    strokeWidth="1.2"
                  />
                </svg>
              }
            />
          </BlockReveal>

          <BlockReveal onScroll delay={0.42}>
            <ContactCard
              title="GitHub"
              subtitle="EddahiryAmine"
              href={LINKS.github}
              badge="Code"
              description="Repos publics & contributions open-source"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2.75c-5.1 0-9.25 4.15-9.25 9.26 0 4.08 2.65 7.54 6.33 8.77.46.08.63-.2.63-.45v-1.6c-2.57.56-3.11-1.1-3.11-1.1-.42-1.06-1.03-1.35-1.03-1.35-.84-.57.06-.56.06-.56.93.06 1.42.96 1.42.96.82 1.41 2.15 1 2.67.77.08-.6.32-1 .57-1.23-2.05-.23-4.2-1.02-4.2-4.56 0-1 .36-1.82.96-2.47-.1-.24-.42-1.18.1-2.45 0 0 .78-.25 2.55.95a8.7 8.7 0 0 1 4.64 0c1.77-1.2 2.55-.95 2.55-.95.52 1.27.2 2.21.1 2.45.6.65.96 1.47.96 2.47 0 3.55-2.16 4.33-4.22 4.56.34.3.64.87.64 1.75v2.59c0 .25.17.53.64.45A9.27 9.27 0 0 0 21.25 12c0-5.11-4.15-9.25-9.25-9.25Z"
                    stroke="rgba(255,255,255,0.80)"
                    strokeWidth="1.2"
                  />
                </svg>
              }
            />
          </BlockReveal>
        </div>

        {/* Availability Banner */}
        <BlockReveal onScroll delay={0.48}>
          <div className="mt-10 rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/10 via-black/40 to-purple-400/5 backdrop-blur-xl p-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-transparent to-purple-400/5" />
            
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl border-2 border-emerald-400/30 bg-emerald-400/10 shrink-0">
                <span className="text-3xl">💼</span>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  Disponible pour opportunités
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Stage de fin d'études ou pré-embauche. Démarrage possible immédiatement. 
                  Intéressé par des projets backend/full-stack avec architecture moderne.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <span className="text-sm font-mono text-emerald-400">Online</span>
              </div>
            </div>
          </div>
        </BlockReveal>
      </div>

    
    </section>
  );
}