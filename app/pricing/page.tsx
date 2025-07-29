"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown, Rocket, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "@/components/MobileMenu";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import MagneticButton from "@/components/MagneticButton";

export default function PricingPage() {
	const containerRef = useScrollAnimations();
	const [menuOpen, setMenuOpen] = useState(false);
	const plans = [
		{
			name: "Free",
			price: "$0",
			period: "forever",
			description: "Perfect for students getting started",
			icon: <Star className="w-6 h-6" />,
			gradient: "from-slate-600 to-slate-700",
			borderGradient: "from-slate-500/50 to-slate-600/50",
			features: [
				"5 documents per month",
				"Basic flashcards generation",
				"Simple text summaries",
				"Community support",
				"Export to PDF",
			],
			limitations: ["10MB file size limit", "Basic quiz generation", "No priority support", "Limited file formats"],
			cta: "Get Started Free",
			popular: false,
		},
		{
			name: "Pro",
			price: "$19",
			period: "per month",
			description: "For serious learners and professionals",
			icon: <Zap className="w-6 h-6" />,
			gradient: "from-purple-600 to-pink-600",
			borderGradient: "from-purple-500 to-pink-500",
			features: [
				"Unlimited documents",
				"Advanced AI flashcards",
				"Detailed summaries with insights",
				"Interactive quizzes with explanations",
				"Priority email support",
				"Advanced analytics dashboard",
				"Custom study schedules",
				"Collaboration tools",
				"API access",
				"All file formats supported",
			],
			limitations: [],
			cta: "Start 14-Day Free Trial",
			popular: true,
		},
		{
			name: "Enterprise",
			price: "$99",
			period: "per month",
			description: "For teams and educational institutions",
			icon: <Crown className="w-6 h-6" />,
			gradient: "from-amber-500 to-orange-600",
			borderGradient: "from-amber-400 to-orange-500",
			features: [
				"Everything in Pro",
				"Team management dashboard",
				"SSO & SAML integration",
				"Custom branding & white-label",
				"Advanced security & compliance",
				"Dedicated account manager",
				"Custom integrations & API",
				"Advanced analytics & reporting",
				"Bulk document processing",
				"24/7 phone support",
				"Custom training sessions",
			],
			limitations: [],
			cta: "Contact Sales",
			popular: false,
		},
	];

	const faqs = [
		{
			question: "Can I change my plan anytime?",
			answer:
				"Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any charges.",
		},
		{
			question: "Is there a free trial for Pro?",
			answer: "Yes, we offer a 14-day free trial for the Pro plan. No credit card required to start your trial.",
		},
		{
			question: "What file formats do you support?",
			answer: "Free plan supports PDF and TXT. Pro and Enterprise support PDF, DOCX, TXT, RTF, and more formats.",
		},
		{
			question: "Do you offer refunds?",
			answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked.",
		},
		{
			question: "How does the AI processing work?",
			answer:
				"Our AI analyzes your documents using advanced NLP to extract key concepts, generate questions, and create personalized learning materials.",
		},
		{
			question: "Is my data secure?",
			answer:
				"Absolutely. We use enterprise-grade encryption and never store your documents permanently. All data is processed securely and deleted after processing.",
		},
	];

	return (
		<div ref={containerRef} className="min-h-screen bg-black text-white">
			{/* Animated background with parallax */}
			<div className="fixed inset-0 -z-10">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-morphing" data-parallax="0.3" />
				<div className="absolute top-3/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-float-slower" data-parallax="0.5" />
				<div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float" data-parallax="0.2" />
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
							<Link href="/pricing" className="text-white font-medium">
								Pricing
							</Link>
							<Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-300">
								About
							</Link>
						</nav>
					</div>
				</div>
			</div>

			{/* Hero Section */}
			<div className="relative z-0 container mx-auto px-4 py-20">
				<div className="text-center max-w-4xl mx-auto">
					<div className="inline-flex items-center justify-center px-4 py-2 mb-8 text-sm font-medium rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 animate-glow" data-animate="fade-up">
						<Rocket className="w-4 h-4 mr-2 text-purple-400" />
						<span className="text-purple-300">Simple, Transparent Pricing</span>
					</div>

					<h1 className="text-5xl md:text-7xl font-black mb-8" data-animate="text-reveal">
						Choose Your{" "}
						<span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
							Perfect
						</span>{" "}
						Plan
					</h1>

					<p className="text-xl text-gray-400 max-w-3xl mx-auto mb-16 leading-relaxed" data-animate="fade-up">
						Start free and scale as you grow. Every plan includes our powerful AI-driven learning tools designed to
						accelerate your education.
					</p>

					{/* Trust indicators */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20" data-animate="stagger">
						<div className="text-center group" data-cursor="hover" data-cursor-text="Documents">
							<div
								className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300"
								data-animate="counter"
								data-target="50000"
								data-suffix="+"
								data-duration="2.5"
							>
								50K+
							</div>
							<div className="text-gray-500 text-sm">Documents Processed</div>
						</div>
						<div className="text-center group" data-cursor="hover" data-cursor-text="Accuracy">
							<div
								className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300"
								data-animate="counter"
								data-target="98"
								data-suffix="%"
								data-duration="2"
							>
								98%
							</div>
							<div className="text-gray-500 text-sm">Accuracy Rate</div>
						</div>
						<div className="text-center group" data-cursor="hover" data-cursor-text="Users">
							<div
								className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300"
								data-animate="counter"
								data-target="15000"
								data-suffix="+"
								data-duration="2.2"
							>
								15K+
							</div>
							<div className="text-gray-500 text-sm">Happy Users</div>
						</div>
						<div className="text-center group" data-cursor="hover" data-cursor-text="Rating">
							<div
								className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300"
								data-animate="counter"
								data-target="4.9"
								data-suffix="★"
								data-duration="1.5"
							>
								4.9★
							</div>
							<div className="text-gray-500 text-sm">User Rating</div>
						</div>
					</div>
				</div>
			</div>

			{/* Pricing Cards */}
			<div className="relative z-10 container mx-auto px-4 pb-20">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto" data-animate="stagger">
					{plans.map((plan) => (
						<div
							key={plan.name}
							className={`relative group ${plan.popular ? "lg:-mt-8" : ""}`}
							data-cursor="hover"
							data-cursor-text={plan.name}
						>
							{plan.popular && (
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10" data-animate="scale-in-bounce">
									<Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-sm font-semibold shadow-lg animate-glow">
										Most Popular
									</Badge>
								</div>
							)}

							<Card
								className={`relative h-full bg-gray-900/50 backdrop-blur-sm border-0 overflow-hidden transition-all duration-500 group-hover:scale-105 ${
									plan.popular
										? "ring-2 ring-purple-500/50 shadow-2xl shadow-purple-500/20"
										: "border border-gray-800 hover:border-gray-700"
								}`}
								data-animate="rotate-in"
							>
								{/* Gradient border effect */}
								<div
									className={`absolute inset-0 bg-gradient-to-r ${plan.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`}
								/>
								<div className="absolute inset-[1px] bg-gray-900/90 rounded-lg" />

								<div className="relative z-10 p-8">
									<CardHeader className="text-center pb-8 px-0">
										<div
											className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 animate-scale-in-bounce`}
										>
											{plan.icon}
										</div>
										<CardTitle className="text-2xl font-bold mb-2" data-animate="text-reveal">{plan.name}</CardTitle>
										<CardDescription className="text-gray-400 mb-6" data-animate="fade-up">{plan.description}</CardDescription>
										<div className="mb-6" data-animate="fade-up">
											<span className="text-5xl font-black">{plan.price}</span>
											<span className="text-gray-400 ml-2">/{plan.period}</span>
										</div>
									</CardHeader>

									<CardContent className="px-0">
										<div className="space-y-4 mb-8" data-animate="stagger">
											{plan.features.map((feature, featureIndex) => (
												<div key={featureIndex} className="flex items-start gap-3">
													<Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5 animate-scale-in" />
													<span className="text-gray-300 text-sm">{feature}</span>
												</div>
											))}
											{plan.limitations.map((limitation, limitIndex) => (
												<div key={limitIndex} className="flex items-start gap-3 opacity-60">
													<X className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
													<span className="text-gray-500 text-sm line-through">{limitation}</span>
												</div>
											))}
										</div>
									</CardContent>

									<CardFooter className="px-0 pt-0">
										<MagneticButton
											className={`w-full h-12 text-white font-semibold ${
												plan.popular
													? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25"
													: `bg-gradient-to-r ${plan.gradient} hover:opacity-90`
											}`}
											size="lg"
											cursorText={plan.cta}
											onClick={() => {}}
											data-animate="scale-in"
										>
											{plan.cta}
										</MagneticButton>
									</CardFooter>
								</div>
							</Card>
						</div>
					))}
				</div>
			</div>

			{/* FAQ Section */}
			<div className="relative z-10 container mx-auto px-4 py-20">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold mb-6" data-animate="text-reveal">Frequently Asked Questions</h2>
					<p className="text-xl text-gray-400 max-w-2xl mx-auto" data-animate="fade-up">
						Everything you need to know about our pricing and features
					</p>
				</div>

				<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6" data-animate="stagger">
					{faqs.map((faq, index) => (
						<Card
							key={index}
							className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105 cursor-pointer"
							data-cursor="hover"
							data-cursor-text="FAQ"
						>
							<CardHeader>
								<CardTitle className="text-lg text-white" data-animate="text-reveal">{faq.question}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-400 leading-relaxed" data-animate="fade-up">{faq.answer}</p>
							</CardContent>
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
							<h2 className="text-4xl font-bold mb-6" data-animate="text-reveal">Ready to Transform Your Learning?</h2>
							<p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed" data-animate="fade-up">
								Join thousands of learners who are already using Simplifai to accelerate their education and achieve
								their goals faster.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center" data-animate="stagger">
								<MagneticButton
									size="lg"
									className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 h-auto shadow-lg shadow-purple-500/25"
									onClick={() => {}}
									cursorText="Start Trial"
								>
									Start Free Trial
								</MagneticButton>
								<MagneticButton
									size="lg"
									variant="outline"
									className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 px-8 py-4 h-auto"
									onClick={() => {}}
									cursorText="Schedule Demo"
								>
									Schedule Demo
								</MagneticButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
