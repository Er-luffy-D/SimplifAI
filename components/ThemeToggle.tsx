"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-10 h-10 rounded-full bg-gradient-to-br from-muted to-muted/80 hover:from-muted/80 hover:to-muted transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 dark:focus:ring-offset-background group"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex items-center justify-center w-full h-full">
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-yellow-400 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
        ) : (
          <Moon className="w-5 h-5 text-slate-700 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110" />
        )}
      </div>

      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-active:opacity-100 transition-opacity duration-150" />
    </button>
  );
}
