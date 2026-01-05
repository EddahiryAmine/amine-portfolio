// components/Pagination.tsx
export function Pagination({
  page,
  total,
  setPage,
}: {
  page: number;
  total: number;
  setPage: (p: number) => void;
}) {
  return (
    <div className="flex justify-center gap-3 mt-12 font-mono text-sm">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-4 py-2 rounded-lg border ${
            page === i
              ? "border-emerald-400 text-emerald-400"
              : "border-white/10 text-white/50 hover:border-white/20"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
