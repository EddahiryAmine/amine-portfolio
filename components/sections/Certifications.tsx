"use client";

import { useState } from "react";
import { CERTIFICATIONS } from "@/data/certifications";
import { Pagination } from "@/components/sections/Pagination";
import Reveal from "@/components/ui/Reveal";
import { CertificationCard } from "@/components/sections/CertificationCard";
const PER_PAGE = 6;

export default function Certifications() {
  const [page, setPage] = useState(0);

  const start = page * PER_PAGE;
  const current = CERTIFICATIONS.slice(start, start + PER_PAGE);
  const totalPages = Math.ceil(CERTIFICATIONS.length / PER_PAGE);

  return (
    <section
      id="certifications"
      className="scroll-mt-28 relative px-6 py-24 border-t border-white/10"
    >
      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <Reveal>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-16">
            Certifications
          </h2>
        </Reveal>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {current.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.05}>
              <CertificationCard cert={cert} />
            </Reveal>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            page={page}
            total={totalPages}
            setPage={setPage}
          />
        )}
      </div>
    </section>
  );
}
