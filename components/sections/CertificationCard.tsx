// components/CertificationCard.tsx
import { Certification } from "@/data/certifications";

export function CertificationCard({ cert }: { cert: Certification }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-black/60 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-white/40 font-mono">
          ~/certifications
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-white font-semibold mb-1">
          {cert.title}
        </h3>
        <p className="text-xs text-white/50 font-mono mb-3">
          {cert.provider} • {cert.issued}
        </p>

        <a
          href={cert.verifyUrl}
          target="_blank"
          className="inline-flex items-center gap-2 text-sm font-mono text-emerald-400 hover:text-emerald-300"
        >
          Afficher l’identifiant →
        </a>
      </div>
    </div>
  );
}
