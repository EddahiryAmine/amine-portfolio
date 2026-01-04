"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Github, Linkedin, Mail, Phone, Terminal, Code2 } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => setVisible(e.isIntersecting));
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      className={[
        "relative mt-24 border-t overflow-hidden",
        "border-white/10 bg-black/70 backdrop-blur-xl text-white/70",
        "transition-all duration-700 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      ].join(" ")}
    >
      {/* top highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.35) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(16,185,129,0.35) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />

      {/* blobs */}
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl bg-emerald-400/10" />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl bg-emerald-400/10" />

      <div className="relative mx-auto max-w-7xl px-6 py-12">
        {/* header row */}
        <div className="flex items-center gap-4">
          {/* photo small */}
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/[0.03]">
            <Image
              src="/me.png"
              alt="Amine Eddahiry"
              width={48}
              height={48}
              className="h-full w-full object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/10">
                <Terminal className="h-4 w-4 text-emerald-300" />
              </span>
              <h3 className="text-lg font-semibold text-white">Amine Eddahiry</h3>
            </div>
            <p className="mt-1 text-sm text-white/55">
              Full-Stack Developer • Backend first • Production mindset
            </p>
          </div>
        </div>

        {/* main grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* about */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/80">
              À propos
            </h4>
            <p className="text-sm leading-relaxed text-white/60">
              Je construis des produits solides : APIs robustes, microservices, sécurité,
              intégrations et IA appliquée — avec un focus qualité, performance et maintenance.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/45">
              <Code2 className="h-4 w-4" />
              <span>Next.js • Tailwind • UI moderne</span>
            </div>
          </div>

          {/* quick links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/80">
              Liens
            </h4>

            <nav className="flex flex-col gap-3">
              <a
                href="https://github.com/EddahiryAmine"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-white/65 hover:text-white transition-colors"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] group-hover:border-emerald-400/25 group-hover:bg-emerald-400/10 transition-all">
                  <Github className="h-4 w-4" />
                </span>
                <span>GitHub Projects</span>
              </a>

              <a
                href="https://www.linkedin.com/in/eddahiry-amine/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-white/65 hover:text-white transition-colors"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] group-hover:border-emerald-400/25 group-hover:bg-emerald-400/10 transition-all">
                  <Linkedin className="h-4 w-4" />
                </span>
                <span>LinkedIn Profile</span>
              </a>
            </nav>
          </div>

          {/* contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/80">
              Contact
            </h4>

            <div className="flex flex-col gap-3">
              <a
                href="mailto:eddahiryamine@gmail.com"
                className="group inline-flex items-center gap-2 text-sm text-white/65 hover:text-white transition-colors"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] group-hover:border-emerald-400/25 group-hover:bg-emerald-400/10 transition-all">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="break-all">eddahiryamine@gmail.com</span>
              </a>

              <a
                href="tel:+212724546394"
                className="group inline-flex items-center gap-2 text-sm text-white/65 hover:text-white transition-colors"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] group-hover:border-emerald-400/25 group-hover:bg-emerald-400/10 transition-all">
                  <Phone className="h-4 w-4" />
                </span>
                <span>+212 7 24 54 63 94</span>
              </a>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* bottom row */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/45">
            © {year} Amine Eddahiry. Tous droits réservés.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/EddahiryAmine"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:border-emerald-400/25 hover:bg-emerald-400/10 transition-all"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>

            <a
              href="https://www.linkedin.com/in/eddahiry-amine/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:border-emerald-400/25 hover:bg-emerald-400/10 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>

            <a
              href="mailto:eddahiryamine@gmail.com"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:border-emerald-400/25 hover:bg-emerald-400/10 transition-all"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
