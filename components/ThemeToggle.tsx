"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-lg border px-3 py-2 text-sm transition
                 bg-gray-100 text-black border-gray-200
                 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
