"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============ PAGE LOADER COMPONENT ============
export function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    // Simulation du chargement
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => setIsLoading(false), 200);
        },
      });

      // Animation d'entrée
      tl.from(".loader-content", {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      })
        .from(".loader-photo", {
          scale: 0,
          rotation: 180,
          duration: 0.8,
          ease: "back.out(1.7)",
        }, "-=0.3")
        .from(".loader-code", {
          x: -50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.4")
        // Pause avant la sortie
        .to({}, { duration: 1.2 })
        // Animation de sortie
        .to(".loader-content", {
          y: -50,
          opacity: 0,
          duration: 0.6,
          ease: "power3.in",
        })
        .to(
          ".loader-bar",
          {
            scaleY: 0,
            transformOrigin: "top",
            duration: 0.8,
            stagger: 0.08,
            ease: "power4.inOut",
          },
          "-=0.3"
        );
    });

    return () => {
      clearInterval(progressInterval);
      ctx.revert();
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0b0f14]"
    >
      {/* Barres pour l'effet gomme */}
      <div className="absolute inset-0 flex">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="loader-bar flex-1 bg-gradient-to-b from-emerald-500/90 via-emerald-600/70 to-[#0b0f14]"
          />
        ))}
      </div>

      {/* Grille animée */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          animation: "gridMove 20s linear infinite",
        }}
      />

      {/* Contenu principal */}
      <div className="loader-content relative z-10 flex flex-col items-center px-6 max-w-2xl">
        
        {/* Photo avec effet terminal */}
        <div className="loader-photo relative mb-8">
          <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-emerald-400/50 shadow-2xl shadow-emerald-500/50">
            {/* Image placeholder - remplacez par votre photo */}
            <div className="w-full h-full bg-gradient-to-br from-emerald-400/30 to-purple-400/30 flex items-center justify-center">
              <div className="text-5xl">👨‍💻</div>
            </div>
            {/* Vous pouvez décommenter ceci et ajouter votre photo */}
            {/* <img src="/me.png" alt="Amine" className="w-full h-full object-cover" /> */}
            
            {/* Overlay scanline */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(16, 185, 129, 0.2) 2px, rgba(16, 185, 129, 0.2) 4px)",
                animation: "scanline 3s linear infinite"
              }}
            />
          </div>
          
          {/* Points lumineux */}
          <div className="absolute -top-2 -right-2 flex gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: "0.3s" }} />
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: "0.6s" }} />
          </div>
        </div>

        {/* Code snippets */}
        <div className="w-full max-w-md space-y-2 mb-6">
          <div className="loader-code rounded-lg bg-black/80 border border-emerald-400/30 px-4 py-2 font-mono text-xs backdrop-blur-xl">
            <span className="text-purple-400">const</span>{" "}
            <span className="text-emerald-400">developer</span> ={" "}
            <span className="text-amber-400">"Amine Eddahiry"</span>;
          </div>
          <div className="loader-code rounded-lg bg-black/80 border border-emerald-400/30 px-4 py-2 font-mono text-xs backdrop-blur-xl">
            <span className="text-purple-400">await</span>{" "}
            <span className="text-blue-400">portfolio</span>.
            <span className="text-emerald-400">load</span>();
          </div>
          <div className="loader-code rounded-lg bg-black/80 border border-emerald-400/30 px-4 py-2 font-mono text-xs backdrop-blur-xl">
            <span className="text-gray-400">// </span>
            <span className="text-gray-500">Initialisation des projets...</span>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-400 font-mono text-xs">
              Loading...
            </span>
            <span className="text-emerald-400 font-mono text-xs">
              {Math.min(Math.round(progress), 100)}%
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              {/* Effet de brillance qui se déplace */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{ animation: "shimmer 1.5s infinite" }}
              />
            </div>
          </div>
        </div>

        {/* Terminal prompt */}
        <div className="mt-6 flex items-center gap-2 text-white/50 font-mono text-xs">
          <span className="text-emerald-400">$</span>
          <span className="animate-pulse">_</span>
        </div>

      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

// ============ REVEAL COMPONENT ============
type RevealProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
};

export function Reveal({
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
        delay: delay + 2.5, // Attendre la fin du loader
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "top 70%",
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

// ============ DEMO PAGE ============
export default function PortfolioDemo() {
  return (
    <>
      <PageLoader />
      
      <div className="min-h-screen bg-gradient-to-br from-[#0b0f14] via-[#070a0f] to-black">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <Reveal>
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-mono">
                {"<"}Bienvenue{" />"}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl md:text-2xl text-emerald-400 mb-8 font-mono">
                Full Stack Developer • Backend Expert
              </p>
            </Reveal>
            <Reveal delay={0.4} direction="up">
              <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-black rounded-2xl font-semibold hover:scale-105 transition-transform shadow-lg shadow-emerald-500/50">
                Voir mes projets →
              </button>
            </Reveal>
          </div>
        </section>

        {/* About Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-4xl">
            <Reveal>
              <h2 className="text-5xl font-bold text-white mb-8 font-mono">
                <span className="text-emerald-400">// </span>À propos
              </h2>
            </Reveal>
            <Reveal delay={0.2} direction="left">
              <p className="text-xl text-gray-300 mb-6">
                Développeur passionné par la création de solutions backend robustes
                et l'architecture microservices. Expert en Spring Boot, .NET et FastAPI.
              </p>
            </Reveal>
            <Reveal delay={0.4} direction="right">
              <div className="grid grid-cols-3 gap-6 mt-12">
                {["Spring Boot", ".NET", "Docker"].map((skill, i) => (
                  <div
                    key={i}
                    className="bg-white/5 backdrop-blur-sm p-6 rounded-lg text-center border border-emerald-400/20 hover:border-emerald-400/50 transition-colors"
                  >
                    <h3 className="text-2xl font-bold text-emerald-400 font-mono">{skill}</h3>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Projects Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-6xl w-full">
            <Reveal>
              <h2 className="text-5xl font-bold text-white mb-12 text-center font-mono">
                <span className="text-emerald-400">const</span> projects = [];
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((project, i) => (
                <Reveal key={project} delay={i * 0.1} y={80}>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:scale-105 transition-transform cursor-pointer border border-emerald-400/20 hover:border-emerald-400/50 group">
                    <div className="w-full h-48 bg-gradient-to-br from-emerald-500/20 to-purple-500/20 rounded-lg mb-6 flex items-center justify-center font-mono text-6xl text-emerald-400 group-hover:scale-110 transition-transform">
                      {"{ }"}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 font-mono">
                      Project_{project}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      API REST • Microservices • PostgreSQL • Docker
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-2xl">
            <Reveal>
              <h2 className="text-5xl font-bold text-white mb-8 font-mono">
                <span className="text-emerald-400">$</span> Contact
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl text-gray-300 mb-12 font-mono">
                <span className="text-purple-400">if</span> (interested) {"{"} <span className="text-emerald-400">contact</span>(); {"}"}
              </p>
            </Reveal>
            <Reveal delay={0.4} direction="up">
              <button className="px-12 py-5 bg-emerald-400 text-black rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-emerald-500/50 font-mono">
                me.contact()
              </button>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}