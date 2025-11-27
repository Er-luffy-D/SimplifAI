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
		//Hero Bg Update - Devika Harshey
		<div className="relative bg-gradient-to-br from-primary/5 via-purple-950/20 to-pink-950/10 pt-28 sm:pt-20 pb-16 overflow-hidden">

			<div className="container px-4 mx-auto text-center relative">
				

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
					<div
						className="text-center group hover:scale-110 transition-all duration-300"
						data-cursor="hover"
						data-cursor-text="Documents"
					>
						<div className="text-2xl font-bold text-gradient-blue-cyan">10K+</div>
						<div className="text-sm text-muted-foreground">Documents Processed</div>
					</div>
					<div
						className="text-center group hover:scale-110 transition-all duration-300"
						data-cursor="hover"
						data-cursor-text="Flashcards"
					>
						<div className="text-2xl font-bold text-gradient-green-emerald">50K+</div>
						<div className="text-sm text-muted-foreground">Flashcards Created</div>
					</div>
					<div
						className="text-center group hover:scale-110 transition-all duration-300"
						data-cursor="hover"
						data-cursor-text="Success Rate"
					>
						<div className="text-2xl font-bold text-gradient-purple-pink">95%</div>
						<div className="text-sm text-muted-foreground">Success Rate</div>
					</div>
				</div>
			</div>
		</div>
	);
}
