import type React from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear();

	const navigationLinks = [
		{ name: "About", href: "/about" },
		{ name: "Pricing", href: "/pricing" },
		{ name: "Contact", href: "/contact" },
		{ name: "Privacy Policy", href: "/privacy" },
		{ name: "Terms of Service", href: "/terms" },
	];

	const socialLinks = [
		{
			name: "GitHub",
			href: "https://github.com/Er-luffy-D/SimplifAI",
			icon: Github,
		},
		{
			name: "Twitter",
			href: "https://twitter.com",
			icon: Twitter,
		},
		{
			name: "LinkedIn",
			href: "https://linkedin.com",
			icon: Linkedin,
		},
		{
			name: "Email",
			href: "mailto:contact@simplifai.com",
			icon: Mail,
		},
	];

	return (
		<footer className="relative bg-card/50 backdrop-blur-sm border-t border-border mt-16">
			{/* Gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5" />
			
			<div className="relative container mx-auto px-4 py-12">
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					{/* Brand Section */}
					<div className="lg:col-span-2">
						<div className="flex items-center space-x-2 mb-4">
							<div className="w-8 h-8 bg-gradient-purple-pink rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-sm">S</span>
							</div>
							<h3 className="text-xl font-bold text-gradient-purple-pink">SimplifAI</h3>
						</div>
						<p className="text-muted-foreground max-w-md mb-4">
							Transform your documents into flashcards, summaries, and quizzes with AI. 
							Revolutionizing the way you learn and study with cutting-edge artificial intelligence.
						</p>
						<div className="flex items-center space-x-1 text-sm text-muted-foreground">
							<span>Made with</span>
							<Heart className="w-4 h-4 text-red-500 fill-current" />
							<span>for better learning</span>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
						<nav className="space-y-2">
							{navigationLinks.map((link) => (
								<Link
									key={link.name}
									href={link.href}
									className="block text-muted-foreground hover:text-foreground transition-colors duration-200 hover:translate-x-1 transform"
								>
									{link.name}
								</Link>
							))}
						</nav>
					</div>

					{/* Connect With Us */}
					<div>
						<h4 className="font-semibold text-foreground mb-4">Connect With Us</h4>
						<div className="flex space-x-3">
							{socialLinks.map((social) => {
								const IconComponent = social.icon;
								return (
									<Link
										key={social.name}
										href={social.href}
										className="group p-2 rounded-lg bg-muted/50 hover:bg-gradient-purple-pink transition-all duration-200 hover:scale-110"
										aria-label={social.name}
									>
										<IconComponent className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
									</Link>
								);
							})}
						</div>
						<div className="mt-4">
							<p className="text-sm text-muted-foreground mb-2">Get in touch:</p>
							<Link
								href="mailto:contact@simplifai.com"
								className="text-sm text-muted-foreground hover:text-foreground transition-colors"
							>
								contact@simplifai.com
							</Link>
						</div>
					</div>
				</div>

				<Separator className="my-8" />

				{/* Bottom Section */}
				<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
					<div className="text-sm text-muted-foreground">
						© {currentYear} SimplifAI. All rights reserved.
					</div>
					<div className="flex items-center space-x-6 text-sm text-muted-foreground">
						<Link href="/privacy" className="hover:text-foreground transition-colors">
							Privacy
						</Link>
						<Link href="/terms" className="hover:text-foreground transition-colors">
							Terms
						</Link>
						<Link href="/cookies" className="hover:text-foreground transition-colors">
							Cookies
						</Link>
					</div>
				</div>

				{/* Security Badge */}
				<div className="flex justify-center mt-6">
					<div className="flex items-center space-x-2 text-xs text-muted-foreground bg-muted/30 rounded-full px-3 py-1">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						<span>Secure & Privacy-Focused</span>
					</div>
				</div>
			</div>
		</footer>
	);
};

export { Footer };
