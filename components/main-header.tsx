"use client";
import { Logo } from "@/components/logo";
import { UserLabel } from "@/components/user-label";

export function MainHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-sm border-b border-border/40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
            <a
              href="/pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a
              href="/contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
      <UserLabel />
    </header>
  );
}
