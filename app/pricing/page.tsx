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
			answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll refund your payment.",
		},
		{
			question: "Can I cancel my subscription?",
			answer: "Yes, you can cancel your subscription at any time from your account settings. No cancellation fees.",
		},
		{
			question: "Do you offer educational discounts?",
			answer: "Yes! We offer special pricing for students, teachers, and educational institutions. Contact us for details.",
		},
	];

	return (
		<div ref={containerRef} className="min-h-screen bg-background text-foreground">
			{/* Animated background */}
			<div className="fixed inset-0 -z-10 pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-morphing" />
				<div className="absolute top-3/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-float-slower" />
				<div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float" />
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

						{/* Desktop Navigation */}
						<nav className="hidden md:flex items-center space-x-8">
							<Link href="/" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
								Home
							</Link>
							<Link href="/pricing" className="text-foreground font-medium">
								Pricing
							</Link>
							<Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
								About
							</Link>
						</nav>

						{/* Mobile Menu Button */}
						<button
							className="md:hidden p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
							onClick={() => setMenuOpen(true)}
						>
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

			{/* Main Content */}
			<div className="relative z-10 container mx-auto px-4 py-16">
				{/* Hero Section */}
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
						Simple,{" "}
						<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
							Transparent
						</span>{" "}
						Pricing
					</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
						Choose the perfect plan for your learning journey. Start free, upgrade when you're ready.
					</p>
				</div>

				{/* Pricing Cards */}
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
					{plans.map((plan, index) => (
						<div
							key={plan.name}
							className={`relative group ${
								plan.popular
									? "lg:scale-105 border-2 border-purple-500/50"
									: "border border-border/50"
							} rounded-2xl p-8 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 animate-fade-in-up`}
							style={{ animationDelay: `${index * 200}ms` }}
						>
							{plan.popular && (
								<Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-sm font-semibold shadow-lg animate-glow absolute -top-4 left-1/2 transform -translate-x-1/2">
									Most Popular
								</Badge>
							)}

							<div
								className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 animate-scale-in-bounce`}
							>
								{plan.icon}
							</div>

							<h3 className="text-2xl font-bold text-center mb-2">{plan.name}</h3>
							<div className="text-center mb-4">
								<span className="text-4xl font-bold">{plan.price}</span>
								<span className="text-muted-foreground">/{plan.period}</span>
							</div>
							<p className="text-muted-foreground text-center mb-8">{plan.description}</p>

							{/* Features */}
							<div className="space-y-3 mb-8">
								{plan.features.map((feature, featureIndex) => (
									<div key={featureIndex} className="flex items-center space-x-3">
										<Check className="w-5 h-5 text-green-500 flex-shrink-0" />
										<span className="text-sm">{feature}</span>
									</div>
								))}
								{plan.limitations.map((limitation, limitationIndex) => (
									<div key={limitationIndex} className="flex items-center space-x-3">
										<X className="w-5 h-5 text-red-500 flex-shrink-0" />
										<span className="text-sm text-muted-foreground">{limitation}</span>
									</div>
								))}
							</div>

							<MagneticButton
								className={`w-full h-12 text-white font-semibold ${
									plan.popular
										? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
										: "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
								} rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl`}
								data-cursor="button"
								data-cursor-text={plan.cta}
							>
								{plan.cta}
							</MagneticButton>
						</div>
					))}
				</div>

				{/* FAQ Section */}
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12 animate-fade-in-up">Frequently Asked Questions</h2>
					<div className="grid gap-6 md:grid-cols-2">
						{faqs.map((faq, index) => (
							<Card
								key={index}
								className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-300 hover:scale-105 cursor-pointer"
								data-animate="fade-in-up"
								style={{ animationDelay: `${index * 100}ms` }}
							>
								<CardHeader>
									<CardTitle className="text-lg" data-animate="text-reveal">{faq.question}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">{faq.answer}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* CTA Section */}
				<div className="text-center mt-16">
					<h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning?</h2>
					<p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
						Join thousands of students and professionals who are already using Simplifai to accelerate their learning.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<MagneticButton
							className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 h-auto shadow-lg shadow-purple-500/25"
							data-cursor="button"
							data-cursor-text="Start Free Trial"
						>
							Start Free Trial
						</MagneticButton>
						<MagneticButton
							variant="outline"
							className="border-border text-muted-foreground hover:bg-muted hover:border-border px-8 py-4 h-auto"
							data-cursor="button"
							data-cursor-text="Contact Sales"
						>
							Contact Sales
						</MagneticButton>
					</div>
				</div>
			</div>
		</div>
	);
}
