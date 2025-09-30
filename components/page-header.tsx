"use client";
import { Logo } from "@/components/logo";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageHeaderProps {
  title?: string;
  showBackButton?: boolean;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  showBackButton = false,
  children,
}: PageHeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-background/95 backdrop-blur-sm border-b border-border/40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Link
                href="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Link>
            )}
            <Logo />
            {title && (
              <h1 className="text-lg font-semibold text-foreground ml-4">
                {title}
              </h1>
            )}
          </div>
          <div className="flex items-center gap-4">{children}</div>
        </div>
      </div>
    </header>
  );
}
