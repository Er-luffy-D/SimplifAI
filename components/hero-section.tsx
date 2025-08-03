"use client";
import ThemeToggle from './ThemeToggle';
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Sparkles, Brain, Rocket } from "lucide-react";
import { useSession } from "next-auth/react";

export function HeroSection() {
	const handleGetStarted = () => {
		window.location.href = "/signin";
	};
	const user = useSession().data?.user;

	return (
		<div className="relative bg-background text-foreground pt-28 sm:pt-20 pb-16 overflow-hidden transition-colors duration-500 border-b border-border">

			{/* Top-right Theme Toggle */}
			<div className="absolute top-6 right-6 z-50">
				<div className="p-2 rounded-full shadow-lg backdrop-blur-sm bg-card/50 border border-border/50 hover:scale-105 transition-transform duration-200">
					<ThemeToggle />
				</div>
			</div>

			{/* Floating icons */}
			<div className="absolute top-20 left-10 animate-bounce-slow">
				<Brain className="w-8 h-8 text-purple-400 opacity-60" />
			</div>
			<div className="absolute top-32 right-16 animate-bounce-slower">
				<Sparkles className="w-6 h-6 text-pink-400 opacity-60" />
			</div>
			<div className="absolute hidden sm:block bottom-10 left-20 animate-bounce">
				<Rocket className="w-10 h-10 text-blue-400 opacity-60" />
			</div>

			<div className="container px-4 mx-auto text-center relative">
				<div className="inline-flex items-center justify-center px-4 py-1.5 mb-9 sm:mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20 animate-pulse-gentle">
					<Zap className="w-4 h-4 mr-2 animate-spin-slow" />
					Powered by AI
				</div>

				<h1 className="text-[40px] font-extrabold tracking-tight sm:text-5xl md:text-6xl animate-fade-in-up">
					Simplify your learning with{" "}
					<span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
						Simplifai
					</span>
				</h1>

				<p className="max-w-2xl mx-auto mt-6 text-xl text-muted-foreground animate-fade-in-up animation-delay-200">
					Upload any document and instantly get flashcards, summaries, and quizzes to accelerate your learning process.
				</p>

				{/* Button Group */}
				<div className="flex flex-wrap justify-center gap-4 mt-12 animate-fade-in-up animation-delay-400">
					{!user ? (
						<Button
							size="lg"
							className="gap-2 group hover:scale-105 transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-500 text-white"
							onClick={handleGetStarted}
							data-cursor="hover"
							data-cursor-text="Get Started"
						>
							Get Started
							<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
						</Button>
					) : (
						<Button
							size="lg"
							className="gap-2 group hover:scale-105 transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-500 text-white"
							onClick={() => {
								const target = document.getElementById("fileupl");
								if (target) {
									const y = target.getBoundingClientRect().top + window.scrollY;
									window.scrollTo({ top: y - 150, behavior: "smooth" });
								}
								document.getElementById("file")?.click();
							}}
							data-cursor="hover"
							data-cursor-text="Upload File"
						>
							Upload
							<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
						</Button>
					)}

					<Button
						size="lg"
						variant="outline"
						className="group hover:scale-105 duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all"
						onClick={() => (window.location.href = "/about")}
						data-cursor="hover"
						data-cursor-text="Learn More"
					>
						Learn More
					</Button>
				</div>

				{/* Floating stats */}
				<div className="flex justify-center gap-8 mt-[50px] sm:mt-16 animate-fade-in-up animation-delay-600">
					<div className="text-center group hover:scale-110 transition-all duration-300" data-cursor="hover" data-cursor-text="Documents">
						<div className="text-2xl font-bold text-blue-500">10K+</div>
						<div className="text-sm text-muted-foreground">Documents Processed</div>
					</div>
					<div className="text-center group hover:scale-110 transition-all duration-300" data-cursor="hover" data-cursor-text="Flashcards">
						<div className="text-2xl font-bold text-emerald-500">50K+</div>
						<div className="text-sm text-muted-foreground">Flashcards Created</div>
					</div>
					<div className="text-center group hover:scale-110 transition-all duration-300" data-cursor="hover" data-cursor-text="Success Rate">
						<div className="text-2xl font-bold text-pink-500">95%</div>
						<div className="text-sm text-muted-foreground">Success Rate</div>
					</div>
				</div>
			</div>

			{/* Gradient at bottom */}
			<div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
		</div>
	);
}
