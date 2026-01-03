"use client";
import { useEffect, useState } from "react";
function Typewriter({ text, speed = 42 }: { text: string; speed?: number }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    setOut("");
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);

    return () => window.clearInterval(id);
  }, [text, speed]);

  return (
    <span className="relative">
      {out}
      <span className="inline-block w-[10px] ml-1 text-emerald-400 animate-pulse">
        |
      </span>
    </span>
  );
}
function FloatingCode({ delay = 0 }: { delay?: number }) {
  return (
    <div 
      className="absolute rounded-lg border border-emerald-400/30 bg-black/60 backdrop-blur-xl px-3 py-2 font-mono text-xs text-emerald-400 shadow-lg shadow-emerald-500/20 animate-float"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="text-purple-400">const</span> build = () =&gt; <span className="text-amber-400">'✓'</span>
    </div>
  );
}
function Pill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70 backdrop-blur hover:border-emerald-400/30 hover:bg-emerald-400/5 transition-all">
      {children}
    </span>
  );
}

function PrimaryCTA({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="
        group inline-flex items-center justify-center gap-2
        rounded-2xl px-6 py-3 text-sm font-semibold
        bg-emerald-400 text-black
        shadow-[0_18px_55px_-30px_rgba(16,185,129,0.85)]
        transition-all
        hover:brightness-110 hover:shadow-[0_22px_70px_-28px_rgba(16,185,129,0.95)]
        active:scale-[0.99]
      "
    >
      {children}
      <span className="opacity-80 transition-transform group-hover:translate-x-0.5">↗</span>
    </a>
  );
}

function SecondaryCTA({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="
        inline-flex items-center justify-center gap-2
        rounded-2xl px-6 py-3 text-sm font-semibold
        border border-white/12 bg-white/[0.03]
        text-white/85 backdrop-blur
        transition-all
        hover:bg-white/[0.06] hover:border-emerald-400/18
        active:scale-[0.99]
      "
    >
      {children}
      <span className="opacity-70 transition-transform group-hover:translate-x-0.5">→</span>
    </a>
  );
}
function EnhancedStat({ icon, value, label, gradient }: { icon: string; value: string; label: string; gradient: string }) {
  return (
    <div className={`group relative rounded-2xl border border-white/10 bg-gradient-to-br ${gradient} p-[1px] backdrop-blur overflow-hidden transition-all hover:scale-[1.02]`}>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative rounded-2xl bg-black/80 backdrop-blur px-5 py-4 h-full">
        <div className="flex items-start justify-between mb-2">
          <div className="text-3xl">{icon}</div>
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <div className="text-xs uppercase tracking-wider text-white/50 font-mono">
          {label}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}
export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <section
      id="home"
      className="min-h-[92vh] overflow-hidden px-6 pt-32 pb-16 relative"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14] via-[#070a0f] to-black" />
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('/noise.png')]" />
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }} 
        />
        <div
          className="absolute -top-56 -left-56 h-[720px] w-[720px] rounded-full blur-3xl opacity-35
          bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.20),transparent_62%)]"
        />
        <div
          className="absolute -bottom-64 -right-64 h-[760px] w-[760px] rounded-full blur-3xl opacity-25
          bg-[radial-gradient(circle_at_40%_40%,rgba(16,185,129,0.14),transparent_62%)]"
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/65 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
              Full-Stack Developer • Backend first • Production mindset
            </div>

            <h1 className="mt-4 text-5xl md:text-6xl font-semibold leading-[1.05]">
              <span className="font-mono tracking-tight text-white/60">
                {"<"}dev{">"}
              </span>
              <br />
              <span className="font-mono tracking-tight text-white">
                Bonjour, je suis
              </span>
              <br />
              <span className="font-mono tracking-tight text-emerald-400">
                <Typewriter text="Amine Eddahiry" />
              </span>
              <br />
              <span className="font-mono tracking-tight text-white/60 text-2xl">
                {"</"}dev{">"}
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-white/70 leading-relaxed">
              Je construis des produits solides : APIs robustes, microservices, sécurité,
              intégrations et IA appliquée — avec un focus qualité, performance et maintenance.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Pill>Spring Boot</Pill>
              <Pill>.NET</Pill>
              <Pill>FastAPI</Pill>
              <Pill>Microservices</Pill>
              <Pill>Docker</Pill>
              <Pill>PostgreSQL</Pill>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PrimaryCTA href="#contact">Me contacter</PrimaryCTA>
              <SecondaryCTA href="#projects">Voir mes projets</SecondaryCTA>

              <a
                href="#resume"
                className="
                  inline-flex items-center justify-center
                  rounded-2xl px-6 py-3 text-sm font-semibold
                  border border-emerald-400/25 bg-emerald-400/10 text-emerald-100/90
                  transition-all
                  hover:bg-emerald-400/14 hover:border-emerald-400/35
                  active:scale-[0.99]
                "
              >
                CV (PDF)
              </a>
            </div>
            <div className="mt-10 inline-flex items-center gap-2 text-xs text-white/45">
              <span className="inline-flex h-8 w-5 items-start justify-center rounded-full border border-white/10 bg-white/[0.03] pt-1">
                <span className="h-2 w-1 rounded-full bg-emerald-400/70 animate-bounce" />
              </span>
              Faites défiler pour découvrir mes projets
            </div>
          </div>
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-[360px] h-[360px] md:w-[480px] md:h-[480px] lg:w-[520px] lg:h-[520px]">
              {mounted && (
                <>
                  <div className="absolute -top-4 -left-8 hidden lg:block">
                    <FloatingCode delay={0} />
                  </div>
                  <div className="absolute top-16 -right-12 hidden lg:block">
                    <div 
                      className="rounded-lg border border-purple-400/30 bg-black/60 backdrop-blur-xl px-3 py-2 font-mono text-xs text-purple-400 shadow-lg shadow-purple-500/20 animate-float"
                      style={{ animationDelay: '600ms' }}
                    >
                      docker compose up -d
                    </div>
                  </div>
                  <div className="absolute bottom-8 -left-12 hidden lg:block">
                    <div 
                      className="rounded-lg border border-blue-400/30 bg-black/60 backdrop-blur-xl px-3 py-2 font-mono text-xs text-blue-400 shadow-lg shadow-blue-500/20 animate-float"
                      style={{ animationDelay: '1200ms' }}
                    >
                      git push origin main
                    </div>
                  </div>
                </>
              )}
              <div className="absolute inset-0">
                <div
                  className="absolute -inset-12 rounded-full blur-3xl opacity-30
                  bg-[radial-gradient(circle_at_35%_30%,rgba(16,185,129,0.24),transparent_62%)]"
                />
                <div className="absolute inset-0 rounded-full border border-emerald-400/22 ring-spin" />
                <div className="absolute -inset-5 rounded-full border border-emerald-400/14 ring-spin-slow" />
                <div className="absolute -inset-10 rounded-full border border-white/8 ring-spin-slower" />
                <div className="absolute inset-0 ring-float">
                  <span className="absolute top-10 left-1/2 -translate-x-1/2 h-[10px] w-[110px] rounded-full bg-emerald-400/70" />
                  <span className="absolute right-7 top-1/2 -translate-y-1/2 h-[10px] w-[74px] rounded-full bg-emerald-400/55" />
                  <span className="absolute bottom-12 left-12 h-[10px] w-[64px] rounded-full bg-emerald-400/45" />
                </div>
                <div className="absolute inset-8 rounded-full overflow-hidden border border-white/12 bg-white/[0.03] backdrop-blur">
                  <img
                    src="me.png"
                    alt="Amine Eddahiry"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('/noise.png')]" />
                </div>

                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
                  <div className="rounded-2xl border border-white/10 bg-black/80 px-4 py-2 text-xs text-white/75 backdrop-blur-xl shadow-xl">
                    <span className="text-emerald-400 font-mono">// </span>
                    Full-Stack Developer • Casablanca
                    <span className="ml-2 text-emerald-300/80">● Disponible</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <EnhancedStat 
            icon="🎓" 
            value="3+" 
            label="Stages Pro"
            gradient="from-emerald-400/20 via-emerald-400/10 to-transparent"
          />
          <EnhancedStat 
            icon="🚀" 
            value="8+" 
            label="Projets Déployés"
            gradient="from-blue-400/20 via-blue-400/10 to-transparent"
          />
          <EnhancedStat 
            icon="⚡" 
            value="Microservices" 
            label="Architecture"
            gradient="from-purple-400/20 via-purple-400/10 to-transparent"
          />
          <EnhancedStat 
            icon="🤖" 
            value="IA appliquée" 
            label="ML & LLMs"
            gradient="from-amber-400/20 via-amber-400/10 to-transparent"
          />
        </div>

        <div className="h-10" />
      </div>

    
    </section>
  );
}