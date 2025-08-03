"use client";
import { Sparkles, Loader2 } from "lucide-react";

export function LoaderScreen() {
	return (
		<div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/90 backdrop-blur-lg">
			<div className="flex items-center space-x-3 animate-fade-in-up">
				<Loader2 className="w-10 h-10 text-primary animate-spin" />
				<span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
					Simplifai
				</span>
				<Sparkles className="w-8 h-8 text-pink-400 animate-bounce-slow ml-2" />
			</div>
			<p className="mt-6 text-lg text-muted-foreground animate-pulse">Loading your experience...</p>
		</div>
	);
}
