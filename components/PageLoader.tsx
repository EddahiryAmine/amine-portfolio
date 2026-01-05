"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================
// FICHIER: components/PageLoader.tsx
// ============================================
export function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [codeLines, setCodeLines] = useState<string[]>([]);

  // Lignes de code qui s'affichent progressivement
  const allCodeLines = [
    "$ initializing developer_mode...",
    "→ loading core modules...",
    "✓ react.js [OK]",
    "✓ spring-boot [OK]",
    "✓ docker [OK]",
    "→ compiling portfolio assets...",
    "✓ projects [12 found]",
    "✓ certifications [6 verified]",
    "✓ skills [mastered]",
    "→ establishing connection...",
    "✓ backend APIs [READY]",
    "✓ database [CONNECTED]",
    "→ launching portfolio.exe...",
    "✓ all systems operational",
    "$ welcome_to_developer_mode()",
  ];

  useEffect(() => {
    // Affichage progressif des lignes de code
    const lineInterval = setInterval(() => {
      setCodeLines((prev) => {
        if (prev.length < allCodeLines.length) {
          return [...prev, allCodeLines[prev.length]];
        }
        clearInterval(lineInterval);
        return prev;
      });
    }, 200);

    // Phases de chargement
    const phaseInterval = setInterval(() => {
      setLoadingPhase((prev) => (prev + 1) % 4);
    }, 500);

    const loader = loaderRef.current;
    if (!loader) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => setIsLoading(false), 500);
        },
      });

      // Animation d'entrée spectaculaire
      tl.from(".loader-container", {
        scale: 0,
        rotation: -180,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      })
        .from(".matrix-bg", {
          opacity: 0,
          duration: 1,
        }, "-=0.5")
        .from(".profile-hexagon", {
          scale: 0,
          rotation: 360,
          duration: 1.2,
          ease: "back.out(1.7)",
        }, "-=0.8")
        .from(".orbit-ring", {
          scale: 0,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
        }, "-=0.6")
        .from(".tech-icon", {
          scale: 0,
          opacity: 0,
          rotation: 360,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(2)",
        }, "-=0.4")
        .from(".terminal-window", {
          y: 100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.4")
        // Attente pour voir l'animation
        .to({}, { duration: 3 })
        // Animation de sortie épique
        .to(".profile-hexagon", {
          scale: 0,
          rotation: -360,
          duration: 0.8,
          ease: "back.in(2)",
        })
        .to(".orbit-ring", {
          scale: 3,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.in",
        }, "-=0.6")
        .to(".tech-icon", {
          y: -200,
          opacity: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power3.in",
        }, "-=0.5")
        .to(".terminal-window", {
          y: 200,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        }, "-=0.4")
        .to(".loader-container", {
          scale: 0,
          rotation: 180,
          opacity: 0,
          duration: 0.8,
          ease: "power4.in",
        }, "-=0.3")
        .to(".matrix-bg", {
          opacity: 0,
          duration: 0.5,
        }, "-=0.5");
    });

    return () => {
      clearInterval(lineInterval);
      clearInterval(phaseInterval);
      ctx.revert();
    };
  }, []);

  if (!isLoading) return null;

  const techIcons = [
    { icon: "⚛️", label: "React", angle: 0 },
    { icon: "🍃", label: "Spring", angle: 45 },
    { icon: "🐳", label: "Docker", angle: 90 },
    { icon: "⚡", label: "FastAPI", angle: 135 },
    { icon: "🗄️", label: "SQL", angle: 180 },
    { icon: "🔥", label: "Firebase", angle: 225 },
    { icon: "☁️", label: "Cloud", angle: 270 },
    { icon: "🎨", label: "Design", angle: 315 },
  ];

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#0a0118] via-[#0d0221] to-[#050108] overflow-hidden"
    >
      {/* Matrix Rain Background */}
      <div className="matrix-bg absolute inset-0 opacity-20">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(16, 185, 129, 0.03) 2px,
              rgba(16, 185, 129, 0.03) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(16, 185, 129, 0.03) 2px,
              rgba(16, 185, 129, 0.03) 4px
            )`,
            backgroundSize: "50px 50px",
            animation: "matrixScroll 20s linear infinite"
          }}
        />
      </div>

      {/* Particles flottantes */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Container principal */}
      <div className="loader-container relative h-full flex items-center justify-center">
        
        {/* Orbites avec icônes tech */}
        <div className="relative w-[500px] h-[500px]">
          
          {/* Anneaux orbitaux */}
          {[1, 2, 3].map((ring, idx) => (
            <div
              key={ring}
              className="orbit-ring absolute inset-0 border-2 rounded-full"
              style={{
                borderColor: `rgba(16, 185, 129, ${0.1 + idx * 0.1})`,
                transform: `scale(${0.4 + idx * 0.3})`,
                animation: `rotate ${15 - idx * 3}s linear infinite ${idx % 2 === 0 ? '' : 'reverse'}`,
              }}
            />
          ))}

          {/* Icônes tech en orbite */}
          {techIcons.map((tech, idx) => {
            const radius = 200;
            const angle = (tech.angle * Math.PI) / 180;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={tech.label}
                className="tech-icon absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  animation: `float ${3 + idx * 0.3}s ease-in-out infinite`,
                  animationDelay: `${idx * 0.2}s`,
                }}
              >
                <div className="relative group">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-purple-500/20 
                    rounded-2xl border border-emerald-400/30 backdrop-blur-xl
                    flex items-center justify-center text-3xl
                    hover:scale-110 transition-transform duration-300
                    shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    {tech.icon}
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                    opacity-0 group-hover:opacity-100 transition-opacity
                    text-xs font-mono text-emerald-400 whitespace-nowrap">
                    {tech.label}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Photo centrale avec hexagone */}
          <div className="profile-hexagon absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              {/* Hexagone glow effect */}
              <div className="absolute inset-0 blur-2xl">
                <div className="w-40 h-40 bg-gradient-to-br from-emerald-400 to-purple-500 
                  opacity-60 animate-pulse" 
                  style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                />
              </div>

              {/* Hexagone principal */}
              <div className="relative w-40 h-40 bg-gradient-to-br from-emerald-500/30 to-purple-500/30 
                backdrop-blur-xl border-2 border-emerald-400/50
                flex items-center justify-center overflow-hidden
                shadow-[0_0_60px_rgba(16,185,129,0.4)]"
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              >
                {/* Votre photo ici */}
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  👨‍💻
                </div>
                {/* Décommentez pour ajouter votre photo */}
                {/* <img src="/me.png" alt="Amine" className="w-full h-full object-cover" /> */}
                
                {/* Scanline effect */}
                <div className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(16, 185, 129, 0.3) 2px, rgba(16, 185, 129, 0.3) 4px)",
                    animation: "scanline 2s linear infinite"
                  }}
                />
              </div>

              {/* Nom en dessous */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center w-full">
                <div className="text-2xl font-bold text-white font-mono mb-1
                  drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                  Amine Eddahiry
                </div>
                <div className="text-emerald-400 font-mono text-sm">
                  Full Stack Developer
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Terminal en bas */}
      <div className="terminal-window absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-3xl px-6">
        <div className="bg-black/80 backdrop-blur-2xl rounded-2xl border border-emerald-400/30 
          overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)]">
          
          {/* Header terminal */}
          <div className="bg-gradient-to-r from-emerald-500/20 to-purple-500/20 px-4 py-3 
            border-b border-emerald-400/30 flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: "0.2s" }} />
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
            <span className="text-xs font-mono text-emerald-400/80">
              developer@portfolio:~$
            </span>
          </div>

          {/* Corps terminal */}
          <div className="p-4 h-48 overflow-y-auto font-mono text-xs space-y-1 
            scrollbar-thin scrollbar-thumb-emerald-400/50 scrollbar-track-transparent">
            {codeLines.map((line, idx) => (
              <div
                key={idx}
                className={`${
                  line.includes("✓") ? "text-emerald-400" :
                  line.includes("$") ? "text-purple-400" :
                  line.includes("→") ? "text-blue-400" :
                  "text-gray-400"
                } animate-fadeIn`}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {line}
              </div>
            ))}
            <div className="flex items-center gap-2 text-emerald-400">
              <span>$</span>
              <span className="animate-pulse">_</span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading text avec animation */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center">
        <div className="text-emerald-400 font-mono text-sm flex items-center gap-2">
          <span>Loading</span>
          <span className="w-16 text-left">
            {".".repeat(loadingPhase + 1)}
          </span>
        </div>
      </div>

     
    </div>
  );
}