export default function TermsPage() {
	const mainHeadingClass =
		"scroll-m-20 text-4xl font-extrabold tracking-tight text-purple-200 dark:text-purple-500";
	const subHeadingClass =
		"scroll-m-20 text-2xl font-semibold tracking-tight flex items-center gap-2";
	const pointBadgeClass =
		"inline-flex items-center justify-center rounded-full bg-purple-200 dark:bg-purple-700 text-gray-700 dark:text-gray-200 text-sm font-medium w-8 h-8 shrink-0";

	const sections = [
		{
			title: "Acceptance of Terms",
			content: (
				<p className="leading-7 mt-4">
					By accessing or using <strong>SimplifAI</strong> (“the Service”), you
					agree to be bound by these Terms & Conditions and our{" "}
					<a href="/privacy-policy" className="underline">
						Privacy Policy
					</a>
					. If you do not agree, you must not use our Service.
				</p>
			),
		},
		{
			title: "Description of Service",
			content: (
				<p className="leading-7 mt-4">
					SimplifAI is an AI-powered platform designed to help you transform
					documents into learning materials. The Service is provided for lawful
					purposes only and is subject to change or discontinuation at our
					discretion.
				</p>
			),
		},
		{
			title: "User Responsibilities",
			content: (
				<ul className="list-disc pl-6 space-y-2 leading-7 mt-4">
					<li>You are responsible for the content you upload and process.</li>
					<li>You agree not to use the Service for illegal or harmful purposes.</li>
					<li>You will not attempt to disrupt or exploit the platform’s systems.</li>
				</ul>
			),
		},
		{
			title: "Intellectual Property",
			content: (
				<p className="leading-7 mt-4">
					All intellectual property related to the Service, including but not
					limited to software, design, branding, and AI models, is owned by
					SimplifAI or its licensors. You may not reproduce, distribute, or
					modify any part of the Service without prior written consent.
				</p>
			),
		},
		{
			title: "AI-Generated Content Disclaimer",
			content: (
				<p className="leading-7 mt-4">
					AI-generated outputs may not always be accurate, complete, or
					up-to-date. You should independently verify information before relying
					on it. SimplifAI is not responsible for any decisions made based on
					AI-generated content.
				</p>
			),
		},
		{
			title: "Limitation of Liability",
			content: (
				<p className="leading-7 mt-4">
					The Service is provided “as is” without any warranties. To the maximum
					extent permitted by law, SimplifAI shall not be liable for any damages
					arising from your use of the Service.
				</p>
			),
		},
		{
			title: "Termination",
			content: (
				<p className="leading-7 mt-4">
					We reserve the right to suspend or terminate your access to the
					Service at any time, without prior notice, if we believe you have
					violated these Terms.
				</p>
			),
		},
		{
			title: "Governing Law",
			content: (
				<p className="leading-7 mt-4">
					These Terms are governed by and construed in accordance with the laws
					of your jurisdiction. Any disputes shall be resolved exclusively in
					the competent courts of that jurisdiction.
				</p>
			),
		},
		{
			title: "Changes to Terms",
			content: (
				<p className="leading-7 mt-4">
					We may update these Terms from time to time. Continued use of the
					Service after changes means you accept the revised Terms.
				</p>
			),
		},
		{
			title: "Contact Us",
			content: (
				<p className="leading-7 mt-4">
					If you have any questions about these Terms, please contact us at{" "}
					<a href="mailto:contact@simplifai.com" className="underline">
						contact@simplifai.com
					</a>
					.
				</p>
			),
		},
	];

	return (
		<div className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-background">
			<div className="max-w-2xl w-full">
				<div className="mt-6 lg:mt-16">
					<h1 className={mainHeadingClass}>Terms & Conditions</h1>
					<blockquote className="mt-3 border-l-2 pl-2 italic">
						Last updated: {new Date().toLocaleDateString()}
					</blockquote>
				</div>

				<div className="mt-6 space-y-6">
					{sections.map((section) => (
						<div
							key={section.title}
							className="bg-secondary/50 border rounded-lg shadow-lg p-6"
						>
							<h2 className={subHeadingClass}>
								<span className={pointBadgeClass}>
									{sections.indexOf(section) + 1}
								</span>{" "}
								{section.title}
							</h2>
							{section.content}
						</div>
					))}

					<div className="bg-secondary/50 border rounded-lg shadow-lg p-6">
						<p className="leading-7 italic">
							By using our services, you agree to these Terms & Conditions.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
