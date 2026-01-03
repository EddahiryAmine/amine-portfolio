"use client";

import BlockReveal from "@/components/ui/BlockReveal";

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur">
      <div className="text-[11px] uppercase tracking-wider text-white/45">{label}</div>
      <div className="mt-1 text-sm font-semibold text-white/85">{value}</div>
    </div>
  );
}

export default function Resume() {
  return (
    <section
      id="resume"
      className="scroll-mt-28 relative isolate px-6 py-24 border-t border-white/10 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14] via-[#070a0f] to-black" />
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('/noise.png')]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />

        <div
          className="absolute left-1/2 top-10 -translate-x-1/2 h-[520px] w-[900px] rounded-full blur-3xl opacity-20
          bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.18),transparent_60%)]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-3xl">
            <BlockReveal onScroll>
              <p className="text-emerald-300/80 text-sm uppercase tracking-wide">CV</p>
            </BlockReveal>

            <BlockReveal onScroll delay={0.06}>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-white tracking-tight">
                CV prêt à partager
              </h2>
            </BlockReveal>

            <BlockReveal onScroll delay={0.12}>
              <p className="mt-3 text-sm text-white/65 leading-relaxed">
                Une version concise et lisible, pensée pour le recrutement. Téléchargez le PDF
                ou ouvrez-le directement dans un nouvel onglet.
              </p>
            </BlockReveal>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto">
            <MiniStat label="Format" value="PDF" />
            <MiniStat label="Langue" value="FR" />
            <MiniStat label="Mise à jour" value="2026" />
          </div>
        </div>

        <div className="mt-10 relative rounded-[28px] border border-white/10 bg-white/[0.02] backdrop-blur overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-25 bg-emerald-400/20" />
            <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full blur-3xl opacity-20 bg-emerald-400/15" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/18 to-transparent" />
          </div>

          <div className="relative p-6 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
              <div>
                <BlockReveal onScroll>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    Télécharger ou consulter
                  </h3>
                </BlockReveal>

                <BlockReveal onScroll delay={0.08}>
                  <p className="mt-3 text-sm text-white/65 leading-relaxed">
                    Si vous voulez une vue rapide : téléchargez et ouvrez le PDF. 
                    Les liens et sections sont structurés pour une lecture efficace (profil, compétences, expériences, projets).
                  </p>
                </BlockReveal>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href="/Amine_Eddahiry.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="
                      group inline-flex items-center justify-center gap-2
                      rounded-2xl px-6 py-3
                      bg-emerald-400 text-black font-semibold
                      shadow-[0_18px_55px_-25px_rgba(16,185,129,0.75)]
                      transition
                      hover:brightness-110 hover:shadow-[0_22px_70px_-28px_rgba(16,185,129,0.9)]
                      active:scale-[0.99]
                    "
                  >
                    Télécharger mon CV
                    <span className="opacity-80 transition group-hover:translate-x-0.5">↓</span>
                  </a>

                  <a
                    href="/Amine_Eddahiry.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex items-center justify-center gap-2
                      rounded-2xl px-6 py-3
                      border border-white/12 bg-white/[0.03]
                      text-white/85 font-medium backdrop-blur
                      transition
                      hover:bg-white/[0.06] hover:border-emerald-400/18
                      active:scale-[0.99]
                    "
                  >
                    Voir le CV
                    <span className="opacity-70">↗</span>
                  </a>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] text-white/45">
                  <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                    Lecture rapide
                  </span>
                  <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                    Version PDF propre
                  </span>
                  <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                    Partage simple
                  </span>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-3xl border border-white/10 bg-black/40 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                    </div>
                    <div className="text-[11px] text-white/55">cv.pdf</div>
                  </div>

                  <div className="p-5">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <div className="h-3 w-24 rounded bg-white/10" />
                      <div className="mt-3 space-y-2">
                        <div className="h-2 w-full rounded bg-white/10" />
                        <div className="h-2 w-[92%] rounded bg-white/10" />
                        <div className="h-2 w-[86%] rounded bg-white/10" />
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-2">
                        <div className="h-10 rounded-xl bg-white/[0.04] border border-white/10" />
                        <div className="h-10 rounded-xl bg-white/[0.04] border border-white/10" />
                        <div className="h-10 rounded-xl bg-white/[0.04] border border-white/10" />
                        <div className="h-10 rounded-xl bg-white/[0.04] border border-white/10" />
                      </div>

                      <div className="mt-5 space-y-2">
                        <div className="h-2 w-full rounded bg-white/10" />
                        <div className="h-2 w-[88%] rounded bg-white/10" />
                        <div className="h-2 w-[80%] rounded bg-white/10" />
                      </div>
                    </div>

                    <div className="mt-4 text-[11px] text-white/45">
                      Aperçu (style document). Le PDF complet s’ouvre via “Voir le CV”.
                    </div>
                  </div>
                </div>

                <div className="pointer-events-none absolute -inset-1 rounded-[28px] opacity-25 blur-2xl bg-emerald-400/15" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
