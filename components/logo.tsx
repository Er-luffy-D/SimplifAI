"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "icon" | "text";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  href?: string;
  showText?: boolean;
}

export function Logo({
  variant = "default",
  size = "md",
  className,
  href = "/",
  showText = true,
}: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  const logoImage = variant === "icon" ? "/logo-icon.svg" : "/logo.svg";

  const LogoContent = () => (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src={logoImage}
        alt="SimplifAI Logo"
        width={32}
        height={32}
        className={cn(
          "transition-transform duration-300 hover:scale-110",
          sizeClasses[size]
        )}
        priority
      />
      {showText && variant !== "icon" && (
        <span
          className={cn(
            "font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent",
            textSizeClasses[size]
          )}
        >
          Simplifai
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center transition-opacity duration-300 hover:opacity-80"
      >
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
}
