import type React from "react";

export default function PrivacyPage() {
	const mainHeadingClass =
		"scroll-m-20 text-4xl font-extrabold tracking-tight text-purple-200 dark:text-purple-500";
	const subHeadingClass =
		"scroll-m-20 text-2xl font-semibold tracking-tight flex items-center gap-2";
	const pointBadgeClass =
		"inline-flex items-center justify-center rounded-full bg-purple-200 dark:bg-purple-700 text-gray-700 dark:text-gray-200 text-sm font-medium w-8 h-8 shrink-0";

	return (
		<div className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-background">
			<div className="max-w-2xl w-full">
				<div className="mt-6 lg:mt-16">
					<h1 className={mainHeadingClass}>Privacy Policy</h1>
					<blockquote className="mt-3 border-l-2 pl-2 italic">
						Last updated: {new Date().toLocaleDateString()}
					</blockquote>
				</div>

				<div className="mt-6 space-y-6">
					<div className="bg-secondary/50 border rounded-lg shadow-lg p-6">
						<h2 className={subHeadingClass}>
							<span className={pointBadgeClass}>1</span> Data Collection
						</h2>
						<p className="leading-7 mt-4">
							At <strong>SimplifAI</strong>, we respect your privacy and are
							committed to safeguarding your personal information. We collect
							only the minimal data required to deliver our AI-powered learning
							services and improve user experience.
						</p>
					</div>

					<div className="bg-secondary/50 border rounded-lg shadow-lg p-6">
						<h2 className={subHeadingClass}>
							<span className={pointBadgeClass}>2</span> Document Processing
						</h2>
						<p className="leading-7 mt-4">
							Any documents you upload are processed securely within our system.
							They are never shared with third parties. Temporary storage is
							used solely for processing purposes, and files are automatically
							deleted once the process is complete.
						</p>
					</div>

					<div className="bg-secondary/50 border rounded-lg shadow-lg p-6">
						<h2 className={subHeadingClass}>
							<span className={pointBadgeClass}>3</span> Security
						</h2>
						<p className="leading-7 mt-4">
							We employ industry-standard security practices, including
							encryption and secure servers, to protect your data at every step.
							Regular security reviews ensure compliance with privacy
							regulations and safeguard your trust.
						</p>
					</div>

					<div className="bg-secondary/50 border rounded-lg shadow-lg p-6">
						<h2 className={subHeadingClass}>
							<span className={pointBadgeClass}>4</span> Your Rights
						</h2>
						<p className="leading-7 mt-4">
							You have the right to request access to, correction of, or
							deletion of your personal data. For any privacy-related concerns,
							you can contact our support team at{" "}
							<a href="mailto:support@simplifai.com" className="underline">
								support@simplifai.com
							</a>
							.
						</p>
					</div>

					<div className="bg-secondary/50 border rounded-lg shadow-lg p-6">
						<p className="leading-7 italic">
							By using our services, you consent to the terms of this Privacy
							Policy.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
