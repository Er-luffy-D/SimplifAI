import type React from "react";

export default function ContactPage() {
	return (
		<div className="container mx-auto px-4 py-16">
			<div className="max-w-2xl mx-auto text-center">
				<h1 className="text-4xl font-bold text-gradient-purple-pink mb-6">Contact Us</h1>
				<p className="text-muted-foreground mb-8">
					Have questions or need support? We&apos;d love to hear from you.
				</p>
				<div className="text-left space-y-4">
					<div>
						<h3 className="font-semibold">Email</h3>
						<p className="text-muted-foreground">contact@simplifai.com</p>
					</div>
					<div>
						<h3 className="font-semibold">Support</h3>
						<p className="text-muted-foreground">support@simplifai.com</p>
					</div>
				</div>
			</div>
		</div>
	);
}
