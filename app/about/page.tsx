"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Users, Target, Award, Lightbulb, Heart, Globe, Zap, Sparkles, Rocket, Github } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "@/components/MobileMenu";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import MagneticButton from "@/components/MagneticButton";

export default function AboutPage() {
	const containerRef = useScrollAnimations();
	const [menuOpen, setMenuOpen] = useState(false);
	const team = [
		{
			name: "Piyush Dixit",
			role: "Full Stack Developer",
			bio: "A Developer, passionate about building scalable web applications. Can debug code faster than you can say 'GG', and occasionally dreams in Binary. Fueled by anime,coffee, memes, and the thrill of deploying to production on Fridays.",
			gradient: "from-purple-500 to-pink-500",
			initials: "PD",
		},
	];

	const values = [
		{
			icon: <Brain className="w-8 h-8" />,
			title: "AI-First Innovation",
			description:
				"We believe artificial intelligence should augment human learning capabilities, making education more personalized and effective.",
			gradient: "from-purple-500 to-pink-500",
		},
		{
			icon: <Users className="w-8 h-8" />,
			title: "Universal Accessibility",
			description:
				"Quality education should be accessible to everyone, regardless of background, resources, or learning style.",
			gradient: "from-blue-500 to-cyan-500",
		},
		{
			icon: <Target className="w-8 h-8" />,
			title: "Personalized Learning",
			description:
				"Every learner is unique. Our tools adapt to individual learning styles, pace, and preferences for optimal results.",
			gradient: "from-green-500 to-emerald-500",
		},
		{
			icon: <Heart className="w-8 h-8" />,
			title: "Learning with Joy",
			description:
				"We understand learning challenges and strive to make the educational journey engaging and enjoyable.",
			gradient: "from-orange-500 to-red-500",
		},
	];

	const milestones = [
		{
			year: "2025",
			event: "IDEA Formation",
			description: "Started with a vision to revolutionize learning through AI.",
			icon: <Lightbulb className="w-6 h-6" />,
		},
		{
			year: "2025",
			event: "First Prototype",
			description: "Reached our first milestone with a working AI prototype for document summarization",
			icon: <Users className="w-6 h-6" />,
		},
		{
			year: "2025",
			event: "Rag Integration (Working on it)",
			description: "Currently integrating RAG (Retrieval-Augmented Generation) for enhanced learning experiences",
			icon: <Brain className="w-6 h-6" />,
		},
		{
			year: "2026",
			event: "Target",
			description: "Aim to launch our first public beta with core features and initial user base",
			icon: <Globe className="w-6 h-6" />,
		},
	];

	return (
		<div ref={containerRef} className="min-h-screen bg-background text-foreground">
			{/* Animated background with parallax */}
			<div className="fixed inset-0 -z-10 pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-morphing" data-parallax="0.3" />
				<div className="absolute top-3/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-float-slower" data-parallax="0.5" />
				<div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float" data-parallax="0.2" />
				<div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-float-slow" data-parallax="0.4" />
			</div>

			{/* Header */}
			<div className="relative z-10 border-b border-border/50 backdrop-blur-sm">
				<div className="container mx-auto px-4 py-6">
					<div className="flex items-center justify-between">
						<Link
							href="/"
							className="text-2xl hidden md:flex font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
						>
							Simplifai
						</Link>
						<div
							className="text-2xl md:hidden font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
							onClick={() => setMenuOpen(!menuOpen)}
						>
							Simplifai
						</div>
						{menuOpen && <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />}

						<nav className="hidden md:flex space-x-8">
							<Link href="/" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
								Home
							</Link>
							<Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
								Pricing
							</Link>
							<Link href="/about" className="text-foreground font-medium">
								About
							</Link>
						</nav>
					</div>
				</div>
			</div>

			{/* Hero Section */}
			<div className="relative z-0 container mx-auto px-4 py-10 sm:py-20">
				<div className="text-center max-w-5xl mx-auto">
					<div className="inline-flex items-center justify-center px-4 py-2 mb-8 text-sm font-medium rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 animate-glow" data-animate="fade-up">
						<Sparkles className="w-4 h-4 mr-2 text-purple-400 animate-bounce-gentle" />
						<span className="text-purple-300">Our Story</span>
					</div>

					<h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-8" data-animate="text-reveal">
						Revolutionizing{" "}
						<span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
							Learning
						</span>{" "}
						with AI
					</h1>

					<p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-16 leading-relaxed" data-animate="fade-up">
						We&apos;re on a mission to make learning more efficient, engaging, and accessible for everyone. Our
						cutting-edge AI transforms how people consume, understand, and retain information.
					</p>

					{/* Floating Stats */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20" data-animate="stagger">
						{[
							{
								number: "1K+",
								label: "Active Users",
								icon: <Users className="w-6 h-6" />,
								gradient: "from-blue-400 to-cyan-400",
								target: 1000,
								suffix: "+",
							},
							{
								number: "2M+",
								label: "Documents Processed",
								icon: <Brain className="w-6 h-6" />,
								gradient: "from-green-400 to-emerald-400",
								target: 2000000,
								suffix: "+",
							},
							{
								number: "98%",
								label: "User Satisfaction",
								icon: <Award className="w-6 h-6" />,
								gradient: "from-purple-400 to-pink-400",
								target: 98,
								suffix: "%",
							},
							{
								number: "50+",
								label: "Countries",
								icon: <Globe className="w-6 h-6" />,
								gradient: "from-orange-400 to-red-400",
								target: 50,
								suffix: "+",
							},
						].map((stat, index) => (
							<div
								key={index}
								className="group text-center cursor-pointer"
								data-cursor="hover"
								data-cursor-text={stat.label}
							>
								<div className="mb-4 flex justify-center">
									<div
										className={`p-3 rounded-2xl bg-gradient-to-r ${stat.gradient} group-hover:scale-110 transition-transform duration-300 animate-rotate-in`}
									>
										<div className="text-white">{stat.icon}</div>
									</div>
								</div>
								<div
									className={`text-3xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}
									data-animate="counter"
									data-target={stat.target}
									data-suffix={stat.suffix}
									data-duration="2"
								>
									{stat.number}
								</div>
								<div className="text-muted-foreground text-sm">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Mission Section */}
			<div className="relative z-10 container mx-auto px-4 py-20">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold mb-6" data-animate="text-reveal">Our Mission</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-animate="fade-up">
						To democratize education by making AI-powered learning tools accessible to everyone, everywhere.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					<Card
						className="relative bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-500 hover:scale-105 overflow-hidden"
						data-cursor="hover"
						data-cursor-text="Our Vision"
						data-animate="slide-in-left"
					>
						<CardHeader>
							<div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg animate-scale-in-bounce">
								<Lightbulb className="w-8 h-8" />
							</div>
							<CardTitle className="text-2xl text-center" data-animate="text-reveal">Our Vision</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground leading-relaxed" data-animate="fade-up">
								A world where learning is personalized, engaging, and accessible to everyone. We envision a future where AI
								augments human intelligence, making education more effective and enjoyable.
							</p>
						</CardContent>
					</Card>

					<Card
						className="relative bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-500 hover:scale-105 overflow-hidden"
						data-cursor="hover"
						data-cursor-text="Our Approach"
						data-animate="slide-in-right"
					>
						<CardHeader>
							<div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg animate-scale-in-bounce">
								<Rocket className="w-8 h-8" />
							</div>
							<CardTitle className="text-2xl text-center" data-animate="text-reveal">Our Approach</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground leading-relaxed" data-animate="fade-up">
								We combine cutting-edge AI technology with user-centered design to create tools that adapt to individual
								learning styles and preferences.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Values Section */}
			<div className="relative z-10 container mx-auto px-4 py-20">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold mb-6" data-animate="text-reveal">Our Values</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-animate="fade-up">
						The principles that guide everything we do
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
					{values.map((value, index) => (
						<Card
							key={index}
							className="group bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-500 hover:scale-105 cursor-pointer"
							data-cursor="hover"
							data-cursor-text={value.title}
							data-animate="fade-in-up"
							style={{ animationDelay: `${index * 200}ms` }}
						>
							<CardHeader className="text-center">
								<div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 animate-scale-in-bounce">
									<div className="text-white">{value.icon}</div>
								</div>
								<CardTitle className="text-xl" data-animate="text-reveal">{value.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-center" data-animate="fade-up">
									{value.description}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Journey Section */}
			<div className="relative z-10 container mx-auto px-4 py-20">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold mb-6" data-animate="text-reveal">Our Journey</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-animate="fade-up">
						Key milestones in our mission to revolutionize learning
					</p>
				</div>

				<div className="max-w-4xl mx-auto">
					<div className="grid gap-8">
						{milestones.map((milestone, index) => (
							<Card
								key={index}
								className={`w-full max-w-md bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-500 hover:scale-105 group ${
									index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
								}`}
								data-cursor="hover"
								data-cursor-text={milestone.event}
								data-animate="fade-in-up"
								style={{ animationDelay: `${index * 300}ms` }}
							>
								<CardHeader className="text-center">
									<div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 animate-scale-in-bounce">
										<div className="text-white">{milestone.icon}</div>
									</div>
									<Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 font-semibold animate-glow">
										{milestone.year}
									</Badge>
									<CardTitle className="text-xl mt-4" data-animate="text-reveal">{milestone.event}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground text-center" data-animate="fade-up">
										{milestone.description}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>

			{/* Team Section */}
			<div className="relative z-10 container mx-auto px-4 py-20">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold mb-6" data-animate="text-reveal">Meet Our Team</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-animate="fade-up">
						The passionate minds behind SimplifAI
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{team.map((member, index) => (
						<Card
							key={index}
							className="group bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-500 hover:scale-105 cursor-pointer lg:col-span-4 md:col-span-2 col-span-1"
							data-cursor="hover"
							data-cursor-text={member.name}
							data-animate="fade-in-up"
							style={{ animationDelay: `${index * 200}ms` }}
						>
							<CardHeader className="text-center">
								<div
									className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${member.gradient} flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300 shadow-lg animate-scale-in-bounce`}
								>
									{member.initials}
								</div>
								<CardTitle className="text-xl" data-animate="text-reveal">{member.name}</CardTitle>
								<CardDescription className="text-muted-foreground" data-animate="fade-up">
									{member.role}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-center leading-relaxed" data-animate="fade-up">
									{member.bio}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* CTA Section */}
			<div className="relative z-10 container mx-auto px-4 py-20">
				<div className="text-center max-w-4xl mx-auto">
					<h2 className="text-4xl font-bold mb-6" data-animate="text-reveal">Ready to Transform Your Learning?</h2>
					<p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto" data-animate="fade-up">
						Join thousands of learners who are already using SimplifAI to accelerate their education.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center" data-animate="stagger">
						<MagneticButton
							className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 h-auto shadow-lg shadow-purple-500/25"
							data-cursor="button"
							data-cursor-text="Get Started"
						>
							Get Started Free
						</MagneticButton>
						<MagneticButton
							variant="outline"
							className="border-border text-muted-foreground hover:bg-muted hover:border-border px-8 py-4 h-auto"
							data-cursor="button"
							data-cursor-text="Learn More"
						>
							Learn More
						</MagneticButton>
					</div>
				</div>
			</div>
		</div>
	);
}
