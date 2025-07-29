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
		<div ref={containerRef} className="min-h-screen bg-black text-white">
			{/* Animated background with parallax */}
			<div className="fixed inset-0 -z-10 pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-morphing" data-parallax="0.3" />
				<div className="absolute top-3/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-float-slower" data-parallax="0.5" />
				<div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float" data-parallax="0.2" />
				<div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-float-slow" data-parallax="0.4" />
			</div>

			{/* Header */}
			<div className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm">
				<div className="container mx-auto px-4 py-6">
					<div className="flex items-center justify-between">
						<Link
							href="/"
							className="text-2xl  hidden md:flex font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
						>
							Simplifai
						</Link>
						<div
							className="text-2xl md:hidden  font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
							onClick={() => setMenuOpen(!menuOpen)}
						>
							Simplifai
						</div>
						{menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}

						<nav className="hidden md:flex space-x-8">
							<Link href="/" className="text-gray-300 hover:text-white transition-colors duration-300">
								Home
							</Link>
							<Link href="/pricing" className="text-gray-300 hover:text-white transition-colors duration-300">
								Pricing
							</Link>
							<Link href="/about" className="text-white font-medium">
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

					<p className="text-xl text-gray-400 max-w-4xl mx-auto mb-16 leading-relaxed" data-animate="fade-up">
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
								<div className="text-gray-500 text-sm">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Mission Section */}
			<div className="relative z-10 container mx-auto px-4 py-20">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
					<div data-animate="slide-left">
						<h2 className="text-4xl font-bold mb-8" data-animate="text-reveal">Our Mission</h2>
						<div className="space-y-6 text-lg text-gray-300 leading-relaxed">
							<p data-animate="fade-up">
								Traditional learning methods often leave students overwhelmed, disengaged, and struggling to retain
								information. We saw an opportunity to change that fundamentally.
							</p>
							<p data-animate="fade-up">
								Our AI-powered platform transforms dense, complex documents into personalized learning experiences that
								adapt to each individual&apos;s pace, style, and goals.
							</p>
							<p data-animate="fade-up">
								We believe that with the right tools, anyone can master any subject. That&apos;s why we&apos;re building
								the future of education—one learner at a time.
							</p>
						</div>
						<MagneticButton
							className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 h-auto shadow-lg shadow-purple-500/25"
							onClick={() => window.open("https://github.com/Er-luffy-d")}
							cursorText="Github"
							data-animate="scale-in"
						>
							Check Github <Github className="inline-block w-5 h-5" />
						</MagneticButton>
					</div>

					<div className="relative" data-animate="slide-right">
						<div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl animate-pulse-gentle" data-parallax="0.1" />
						<Card
							className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-500 hover:scale-105 overflow-hidden"
							style={{
								backgroundImage: "url(/avatar.png)",
								backgroundSize: "contain",
								backgroundBlendMode: "multiply",
								backgroundRepeat: "no-repeat",
								backgroundPosition: "left",
							}}
							data-cursor="hover"
							data-cursor-text="Our Vision"
						>
							<CardContent className="p-12 text-center">
								<div className="mb-8">
									<Zap className="w-20 h-20 mx-auto text-purple-400 animate-bounce-slow" />
								</div>
								<h3 className="text-2xl font-bold mb-6" data-animate="text-reveal">Powered by Curiosity</h3>
								<p className="text-white/80 leading-relaxed" data-animate="fade-up">
									SimplifAI was born out of a simple idea: to make learning easier, faster, and more enjoyable for
									everyone.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			{/* Values Section */}
			<div className="relative z-10 container mx-auto px-4 py-20">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold mb-6" data-animate="text-reveal">Our Core Values</h2>
					<p className="text-xl text-gray-400 max-w-2xl mx-auto" data-animate="fade-up">
						The fundamental principles that guide everything we do
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto" data-animate="stagger">
					{values.map((value, index) => (
						<Card
							key={index}
							className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-500 hover:scale-105 cursor-pointer"
							data-cursor="hover"
							data-cursor-text={value.title}
						>
							<CardHeader className="pb-6">
								<div className="flex items-start gap-6">
									<div
										className={`p-4 rounded-2xl bg-gradient-to-r ${value.gradient} group-hover:scale-110 transition-transform duration-300 flex-shrink-0 animate-rotate-in`}
									>
										<div className="text-white">{value.icon}</div>
									</div>
									<div>
										<CardTitle className="text-xl mb-3 group-hover:text-purple-400 transition-colors duration-300" data-animate="text-reveal">
											{value.title}
										</CardTitle>
										<p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300" data-animate="fade-up">
											{value.description}
										</p>
									</div>
								</div>
							</CardHeader>
						</Card>
					))}
				</div>
			</div>

			{/* Timeline Section */}
			<div className="relative z-10 container mx-auto px-4 py-20">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold mb-6" data-animate="text-reveal">Our Journey</h2>
					<p className="text-xl text-gray-400 max-w-2xl mx-auto" data-animate="fade-up">
						Key milestones in our mission to transform learning
					</p>
				</div>

				<div className="max-w-4xl mx-auto">
					<div className="relative">
						{/* Timeline line */}
						<div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500" data-animate="slide-in-top" />

						{milestones.map((milestone, index) => (
							<div
								key={index}
								className={`relative flex items-center mb-16 ${
									index % 2 === 0 ? "justify-start" : "justify-end"
								}`}
								data-animate="fade-up"
							>
								<Card
									className={`w-full max-w-md bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-500 hover:scale-105 group ${
										index % 2 === 0 ? "mr-8" : "ml-8"
									}`}
									data-cursor="hover"
									data-cursor-text={milestone.event}
								>
									<CardHeader>
										<div className="flex items-center gap-4 mb-4">
											<div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-300 animate-rotate-in">
												<div className="text-white">{milestone.icon}</div>
											</div>
											<Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 font-semibold animate-glow">
												{milestone.year}
											</Badge>
										</div>
										<CardTitle className="text-xl group-hover:text-purple-400 transition-colors duration-300" data-animate="text-reveal">
											{milestone.event}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300" data-animate="fade-up">
											{milestone.description}
										</p>
									</CardContent>
								</Card>

								{/* Timeline dot */}
								<div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-black animate-pulse-gentle" />
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Team Section */}
			<div className="relative z-10 container mx-auto px-4 py-20">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold mb-6" data-animate="text-reveal">Meet Our Team</h2>
					<p className="text-xl text-gray-400 max-w-2xl mx-auto" data-animate="fade-up">
						The brilliant minds behind Simplifai&apos;s innovation
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto" data-animate="stagger">
					{team.map((member, index) => (
						<Card
							key={index}
							className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-500 hover:scale-105 cursor-pointer lg:col-span-4 md:col-span-2 col-span-1"
							data-cursor="hover"
							data-cursor-text={member.name}
						>
							<CardHeader className="text-center pb-6">
								<div
									className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${member.gradient} flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300 shadow-lg animate-scale-in-bounce`}
								>
									{member.initials}
								</div>
								<CardTitle className="text-lg mb-2 group-hover:text-purple-400 transition-colors duration-300" data-animate="text-reveal">
									{member.name}
								</CardTitle>
								<CardDescription className="text-purple-400 font-medium mb-4" data-animate="fade-up">{member.role}</CardDescription>
								<p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300" data-animate="fade-up">
									{member.bio}
								</p>
							</CardHeader>
						</Card>
					))}
				</div>
			</div>

			{/* CTA Section */}
			<div className="relative z-10 container mx-auto px-4 py-20">
				<div className="max-w-4xl mx-auto text-center">
					<div className="relative bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl p-12 border border-purple-500/20 backdrop-blur-sm" data-animate="scale-in">
						<div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl blur-xl" data-parallax="0.1" />
						<div className="relative z-10">
							<Rocket className="w-16 h-16 mx-auto mb-6 text-purple-400 animate-bounce-slow" />
							<h2 className="text-4xl font-bold mb-6" data-animate="text-reveal">Ready to Join Our Mission?</h2>
							<p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed" data-animate="fade-up">
								Whether you&apos;re a learner looking to accelerate your education or a developer wanting to contribute
								to the future of learning, we&apos;d love to have you on board.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center" data-animate="stagger">
								<MagneticButton
									size="lg"
									className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 h-auto shadow-lg shadow-purple-500/25"
									onClick={() => window.open("https://simplif-ai-xi.vercel.app/", "_blank")}
									cursorText="Start Learning"
								>
									Start Learning Today
								</MagneticButton>
								<MagneticButton
									size="lg"
									variant="outline"
									className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 px-8 py-4 h-auto"
									onClick={() => window.open("https://linkedin.com/in/piyushdixitizme", "_blank")}
									cursorText="Connect"
								>
									Connect
								</MagneticButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
