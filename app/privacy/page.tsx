import type React from "react";

export default function PrivacyPage() {
	return (
		<div className="container mx-auto px-4 py-16">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-bold text-gradient-purple-pink mb-6">Privacy Policy</h1>
				<div className="prose prose-neutral dark:prose-invert max-w-none">
					<p className="text-muted-foreground mb-6">
						Last updated: {new Date().toLocaleDateString()}
					</p>
					
					<h2 className="text-2xl font-semibold mb-4">Data Collection</h2>
					<p className="mb-4">
						At SimplifAI, we prioritize your privacy. We collect only the minimal data necessary to provide our AI-powered learning services.
					</p>
					
					<h2 className="text-2xl font-semibold mb-4">Document Processing</h2>
					<p className="mb-4">
						Your uploaded documents are processed securely and are never shared with third parties. Files are temporarily stored for processing and then deleted.
					</p>
					
					<h2 className="text-2xl font-semibold mb-4">Security</h2>
					<p className="mb-4">
						We implement industry-standard security measures to protect your data and ensure your privacy is maintained at all times.
					</p>
				</div>
			</div>
		</div>
	);
}
