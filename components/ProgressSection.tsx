"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Sparkles, Brain, Rocket } from "lucide-react";

export function ProgressSection({
	user,
}: {
	user: {
		name: string | null;
		id: string;
		email: string;
		password: string | null;
		emailVerified: Date | null;
		image: string | null;
		createdAt: Date;
		updatedAt: Date;
	} | null;
}) {
	const handleGetStarted = () => {
		window.location.href = "/";
	};
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
					Your <span className="text-gradient-purple-pink">Progress</span>
				</h1>

				<p className="max-w-2xl mx-auto mt-6 text-xl text-muted-foreground animate-fade-in-up animation-delay-200">
					Track your learning journey and see how much you've accomplished.
				</p>

				<div className="flex flex-wrap justify-center gap-4 mt-12 animate-fade-in-up animation-delay-400">
					{!user ? (
						<Button
							size="lg"
							className="gap-2 group hover:scale-105 transition-all duration-300 bg-gradient-primary-purple hover:bg-gradient-purple-pink text-white"
							onClick={handleGetStarted}
							data-cursor="hover"
							data-cursor-text="Back to Home"
						>
							Back to Home
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
			</div>
		</div>
	);
}
