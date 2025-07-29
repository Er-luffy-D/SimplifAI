import type React from "react";

export default function TermsPage() {
	return (
		<div className="container mx-auto px-4 py-16">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-bold text-gradient-purple-pink mb-6">Terms of Service</h1>
				<div className="prose prose-neutral dark:prose-invert max-w-none">
					<p className="text-muted-foreground mb-6">
						Last updated: {new Date().toLocaleDateString()}
					</p>
					
					<h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
					<p className="mb-4">
						By using SimplifAI, you agree to these terms of service and our privacy policy.
					</p>
					
					<h2 className="text-2xl font-semibold mb-4">Use of Service</h2>
					<p className="mb-4">
						SimplifAI is designed to help you transform documents into learning materials using AI. Please use our service responsibly.
					</p>
					
					<h2 className="text-2xl font-semibold mb-4">Limitations</h2>
					<p className="mb-4">
						We provide our service &quot;as is&quot; and make no warranties about the accuracy or completeness of AI-generated content.
					</p>
				</div>
			</div>
		</div>
	);
}
