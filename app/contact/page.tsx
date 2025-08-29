import type React from "react";
import { Mail, Phone, MapPin, LifeBuoy } from "lucide-react";

export default function ContactPage() {
	const mainHeadingClass =
		"scroll-m-20 text-start text-4xl font-extrabold tracking-tight text-balance text-purple-200 dark:text-purple-500";

	const cardClass =
		"flex flex-col gap-2 p-5 border rounded-xl bg-card shadow-sm";
	const iconWrapperClass =
		"p-2 bg-secondary w-fit h-fit rounded-xl";

	return (
		<div className="w-full flex justify-center items-center">
			<div className="w-full max-w-2xl flex flex-col min-h-fit px-4 py-10 bg-background">
				<div className="max-w-3xl mx-auto mt-10 lg:mt-20">
					<h1 className={mainHeadingClass}>Contact Us</h1>
					<p className="leading-7 mt-4 text-muted-foreground">
						We&apos;d love to hear from you! Reach out using any of the options below — we&apos;ll
						get back to you as soon as possible.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
					<div className={cardClass}>
						<span className={iconWrapperClass}>
							<Mail />
						</span>
						<span className="font-semibold">Email</span>
						<a
							href="mailto:example@email.com"
							className="text-white/50 hover:underline break-words"
						>
							example@email.com
						</a>
					</div>

					<div className={cardClass}>
						<span className={iconWrapperClass}>
							<Phone />
						</span>
						<span className="font-semibold">Phone</span>
						<a href="tel:+15551234567" className="text-white/50 hover:underline">
							123
						</a>
					</div>

					<div className={cardClass}>
						<span className={iconWrapperClass}>
							<MapPin />
						</span>
						<span className="font-semibold">Address</span>
						<p className="text-muted-foreground">
							XYZ
						</p>
					</div>

					<div className={cardClass}>
						<span className={iconWrapperClass}>
							<LifeBuoy />
						</span>
						<span className="font-semibold">Support</span>
						<a
							href="mailto:support@example.com"
							className="text-white/50 hover:underline break-words"
						>
							support@example.com
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
