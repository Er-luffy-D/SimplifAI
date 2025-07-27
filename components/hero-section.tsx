"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Sparkles, Brain, Rocket } from "lucide-react";
import { useSession } from "next-auth/react";

export function HeroSection() {
	const handleGetStarted = () => {
		window.location.href = "/signin";
	};
	const user = useSession().data?.user;
	return (
		<div className="relative bg-gradient-to-br from-primary/10 via-purple-50/50 to-pink-50/30 dark:from-primary/5 dark:via-purple-950/20 dark:to-pink-950/10 pt-28 sm:pt-20 pb-16 overflow-hidden">
			{/* Floating elements */}
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
				<div className="inline-flex items-center justify-center px-4 py-1.5 mb-9 sm:mb-6 text-sm font-medium rounded-full bg-primary/20 text-primary border border-primary/20 animate-pulse-gentle">
					<Zap className="w-4 h-4 mr-2 animate-spin-slow" />
					Powered by AI
				</div>

				<h1 className="text-[40px] font-extrabold tracking-tight sm:text-5xl md:text-6xl animate-fade-in-up">
					Simplify your learning with <span className="text-gradient-purple-pink">Simplifai</span>
				</h1>

				<p className="max-w-2xl mx-auto mt-6 text-xl text-muted-foreground animate-fade-in-up animation-delay-200">
					Upload any document and instantly get flashcards, summaries, and quizzes to accelerate your learning process.
				</p>

				<div className="flex flex-wrap justify-center gap-4 mt-12 animate-fade-in-up animation-delay-400">
					{!user ? (
						<Button
							size="lg"
							className="gap-2 group hover:scale-105 transition-all duration-300 bg-gradient-primary-purple hover:bg-gradient-purple-pink text-white"
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
							className="gap-2 group hover:scale-105 transition-all duration-300 bg-gradient-primary-purple hover:bg-gradient-purple-pink text-white"
							onClick={() => {
								window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
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
						className="group hover:scale-105 duration-300 hover:bg-gradient-primary-purple transition-all"
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
						<div className="text-2xl font-bold text-gradient-blue-cyan">10K+</div>
						<div className="text-sm text-muted-foreground">Documents Processed</div>
					</div>
					<div className="text-center group hover:scale-110 transition-all duration-300" data-cursor="hover" data-cursor-text="Flashcards">
						<div className="text-2xl font-bold text-gradient-green-emerald">50K+</div>
						<div className="text-sm text-muted-foreground">Flashcards Created</div>
					</div>
					<div className="text-center group hover:scale-110 transition-all duration-300" data-cursor="hover" data-cursor-text="Success Rate">
						<div className="text-2xl font-bold text-gradient-purple-pink">95%</div>
						<div className="text-sm text-muted-foreground">Success Rate</div>
					</div>
				</div>
			</div>
		</div>
	);
}
