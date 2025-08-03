"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, ArrowLeft, Sparkles, Brain, FileQuestion, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);

		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	const floatingElements = [
		{ icon: Brain, delay: 0, duration: 6 },
		{ icon: Sparkles, delay: 1, duration: 8 },
		{ icon: FileQuestion, delay: 2, duration: 7 },
		{ icon: Zap, delay: 0.5, duration: 9 },
	];

	return (
		<div className="min-h-screen bg-background text-foreground overflow-hidden relative">
			{/* Animated background */}
			<div className="fixed inset-0 -z-10">
				{/* Mouse follower gradient */}
				<div
					className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out pointer-events-none"
					style={{
						left: mousePosition.x - 192,
						top: mousePosition.y - 192,
					}}
				/>

				{/* Static floating orbs */}
				<div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl animate-float-slow" />
				<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full blur-3xl animate-float-slower" />
				<div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-full blur-3xl animate-float" />

				{/* Grid pattern */}
				<div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
			</div>

			{/* Floating icons */}
			{floatingElements.map((element, index) => {
				const Icon = element.icon;
				return (
					<div
						key={index}
						className="absolute opacity-20 text-purple-400"
						style={{
							left: `${20 + index * 20}%`,
							top: `${30 + index * 15}%`,
							animation: `float ${element.duration}s ease-in-out infinite`,
							animationDelay: `${element.delay}s`,
						}}
					>
						<Icon className="w-8 h-8" />
					</div>
				);
			})}

			{/* Main content */}
			<div className="relative z-10 min-h-screen flex items-center justify-center px-6">
				<div className="text-center max-w-2xl mx-auto">
					{/* 404 Number with glitch effect */}
					<div
						className={`relative mb-8 transition-all duration-1000 ${
							isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
						}`}
					>
						<div className="text-[12rem] md:text-[16rem] font-black leading-none relative">
							<span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
								404
							</span>

							{/* Glitch overlay */}
							<span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent opacity-0 animate-pulse">
								404
							</span>
						</div>

						{/* Decorative elements around 404 */}
						<div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-purple-500 animate-pulse" />
						<div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-pink-500 animate-pulse animation-delay-200" />
						<div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-blue-500 animate-pulse animation-delay-400" />
						<div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-500 animate-pulse animation-delay-600" />
					</div>

					{/* Error message */}
					<div
						className={`mb-8 transition-all duration-1000 delay-300 ${
							isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
						}`}
					>
						<h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
						<p className="text-lg text-muted-foreground mb-8">
							Oops! The page you're looking for seems to have wandered off into the digital void.
						</p>
					</div>

					{/* Action buttons */}
					<div
						className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${
							isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
						}`}
					>
						<Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
							<Link href="/">
								<Home className="w-4 h-4 mr-2" />
								Go Home
							</Link>
						</Button>
						<Button variant="outline" size="lg" asChild>
							<Link href="/about">
								<Search className="w-4 h-4 mr-2" />
								Learn More
							</Link>
						</Button>
					</div>

					{/* Helpful suggestions */}
					<div
						className={`mt-12 transition-all duration-1000 delay-700 ${
							isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
						}`}
					>
						<Card className="bg-card/50 backdrop-blur-sm border-border/50">
							<CardContent className="p-6">
								<h3 className="text-lg font-semibold mb-4">What you can do:</h3>
								<div className="grid gap-4 md:grid-cols-2 text-sm">
									<div className="flex items-start gap-3">
										<div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
											<Home className="w-4 h-4 text-purple-500" />
										</div>
										<div>
											<h4 className="font-medium mb-1">Go Home</h4>
											<p className="text-muted-foreground">Return to the main page and explore our features</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
											<Search className="w-4 h-4 text-blue-500" />
										</div>
										<div>
											<h4 className="font-medium mb-1">Search</h4>
											<p className="text-muted-foreground">Use the navigation to find what you're looking for</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
											<Brain className="w-4 h-4 text-green-500" />
										</div>
										<div>
											<h4 className="font-medium mb-1">Upload Document</h4>
											<p className="text-muted-foreground">Try our AI-powered document processing</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
											<Zap className="w-4 h-4 text-orange-500" />
										</div>
										<div>
											<h4 className="font-medium mb-1">Get Started</h4>
											<p className="text-muted-foreground">Sign up and start learning with AI</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
