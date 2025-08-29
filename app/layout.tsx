import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import StoreProvider from "./store-provider";
import { SessionProviderC } from "@/components/SessionProviderC";
import { LoadingProvider } from "@/components/loading-provider";
import { Footer } from "@/components/footer";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Simplifai - AI-Powered Learning",
	description: "Transform your documents into flashcards, summaries, and quizzes with AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<Analytics />
				<SpeedInsights />
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
					<LoadingProvider>
						<SessionProviderC>
							<StoreProvider>
								<LenisProvider>
									<CustomCursor />
									<ScrollProgress />
									<div className="flex flex-col min-h-screen">
										<main className="flex-1">{children}</main>
										<Footer />
									</div>
								</LenisProvider>
							</StoreProvider>
						</SessionProviderC>
					</LoadingProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
