"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUploader } from "@/components/file-uploader";
import { Features } from "@/components/features";
import { HeroSection } from "@/components/hero-section";
import { AnimatedBackground } from "@/components/animated-background";
import OmniDimWidget from "@/components/Omnidev";

import Link from "next/link";
import { useState } from "react";
import MobileMenu from "@/components/MobileMenu";

// Auth bits for inline header user area
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User } from "lucide-react";

// If you want to still show the floating label, you can import it too
// import { UserLabel } from "@/components/user-label";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col relative min-h-screen bg-black text-white">
      {/* Background */}
      <AnimatedBackground />

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-gray-800/50 backdrop-blur-md bg-black/60">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Simplifai
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-white font-medium">
                Home
              </Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors duration-300">
                Pricing
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-300">
                About
              </Link>
            </nav>

            {/* Right actions: auth area on desktop */}
            <div className="hidden md:flex items-center">
              {status === "loading" ? (
                <div className="rounded-full px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-gray-300 animate-pulse select-none min-w-[120px] text-center">
                  Loading...
                </div>
              ) : session?.user?.name ? (
                <div className="relative">
                  <details className="group">
                    <summary className="list-none cursor-pointer">
                      <button
                        className="flex items-center gap-2 rounded-full px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 hover:scale-105 transition-all font-medium text-white shadow shadow-purple-950/10"
                        aria-haspopup="true"
                        aria-expanded={false}
                        title={session.user.name ?? ""}
                        data-cursor="hover"
                        data-cursor-text="User Menu"
                      >
                        <User className="w-5 h-5 text-purple-300" />
                        <span className="bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300 bg-clip-text text-transparent max-w-[180px] truncate">
                          {session.user.name}
                        </span>
                      </button>
                    </summary>
                    <div className="absolute right-0 mt-2 min-w-[180px] rounded-xl border border-purple-500/30 bg-black/95 shadow-xl shadow-purple-900/20 py-2">
                      <Button
                        variant="ghost"
                        className="w-full flex justify-start gap-2 px-4 py-2 rounded-none font-medium text-left hover:bg-purple-500/10"
                        onClick={() => signOut({ callbackUrl: "/" })}
                        data-cursor="hover"
                        data-cursor-text="Logout"
                      >
                        <LogOut className="w-4 h-4 text-pink-400" />
                        Logout
                      </Button>
                    </div>
                  </details>
                </div>
              ) : (
                <Button
                  size="sm"
                  className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6 shadow-lg shadow-purple-500/25 hover:from-purple-600 hover:to-pink-600 transition-all"
                  onClick={() => (window.location.href = "/signin")}
                  data-cursor="button"
                  data-cursor-text="Sign In"
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile: logo doubles as menu toggle or use a hamburger as you prefer */}
            <button
              className="md:hidden text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              Menu
            </button>
          </div>

          {/* Mobile menu drawer and mobile auth actions */}
          {menuOpen && (
            <div className="md:hidden pt-4">
              <MobileMenu onClose={() => setMenuOpen(false)} />
              <div className="mt-3 flex justify-end">
                {status === "loading" ? (
                  <div className="rounded-full px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-gray-300 animate-pulse select-none">
                    Loading...
                  </div>
                ) : session?.user?.name ? (
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <Button
                    className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6"
                    onClick={() => (window.location.href = "/signin")}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Optional: Floating user label if you still want it on Home. 
          If you keep it, it will sit below the sticky header thanks to the updated offset in the component below. */}
      {/* <UserLabel /> */}

      {/* Page Content */}
      <div className="relative z-10">
        <HeroSection />

        <div className="container px-4 py-12 mx-auto relative">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Features />
          </div>

          <div id="fileupl" className="max-w-3xl mx-auto mt-16">
            <Card className="border-2 border-dashed backdrop-blur-sm bg-card/80 hover:bg-card/90 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary/10">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gradient-purple-pink">Upload Your Document</CardTitle>
                <CardDescription>
                  PDF and TXT files up to 10MB{" "}
                  <span className="font-semibold text-foreground">(ideally &lt; 2MB for speed)</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUploader />
              </CardContent>
              <CardFooter className="flex justify-center text-sm text-muted-foreground">
                🔒 Your files are securely processed and never shared with third parties
              </CardFooter>
            </Card>
          </div>

          <OmniDimWidget />
        </div>
      </div>
    </div>
  );
}
