import type React from "react";

export default function CookiesPage() {
	return (
		<div className="container mx-auto px-4 py-16">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-bold text-gradient-purple-pink mb-6">Cookie Policy</h1>
				<div className="prose prose-neutral dark:prose-invert max-w-none">
					<p className="text-muted-foreground mb-6">
						Last updated: {new Date().toLocaleDateString()}
					</p>
					
					<h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
					<p className="mb-4">
						Cookies are small text files that are stored on your device when you visit our website.
					</p>
					
					<h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
					<p className="mb-4">
						We use cookies to improve your experience, remember your preferences, and analyze website traffic.
					</p>
					
					<h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
					<p className="mb-4">
						You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.
					</p>
				</div>
			</div>
		</div>
	);
}
