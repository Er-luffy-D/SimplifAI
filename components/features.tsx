import { BookOpen, FileText, FileType2, ListChecks, MessageSquare, TrendingUp } from "lucide-react";
import React from "react";

export function Features() {
	const features = [
		{
			icon: <BookOpen />,
			title: "Smart Flashcards",
			description: "AI-generated flashcards to help you memorize key concepts quickly",
			bgGradient: "bg-blue-500/10",
			textColor: "text-blue-500",
		},
		{
			icon: <FileText />,
			title: "Concise Summaries",
			description: "Get the main points of any document without reading the entire text",
			bgGradient: "bg-green-500/10",
			textColor: "text-green-500",
		},
		{
			icon: <ListChecks />,
			title: "Interactive Quizzes",
			description: "Test your knowledge with automatically generated quizzes",
			bgGradient: "bg-purple-500/10",
			textColor: "text-purple-500",
		},
		{
			icon: <MessageSquare />,
			title: "Ask Questions",
			description: "Chat with your document to get instant answers to your questions",
			bgGradient: "bg-orange-500/10",
			textColor: "text-orange-500",
		},
		{
			icon: <FileType2 />,
			title: "PDF & TXT Support",
			description: "Easily upload and process PDF and TXT files (DOCX support coming soon)",
			bgGradient: "bg-indigo-500/10",
			textColor: "text-indigo-500",
		},
		{
			icon: <TrendingUp />,
			title: "Progress Tracking",
			description: "Monitor your learning journey with detailed analytics and performance insights",
			bgGradient: "bg-rose-500/10",
			textColor: "text-rose-500",
		},
	];

	return (
		<>
			{features.map((feature, index) => (
				<div
					key={index}
					className="group flex flex-col items-center p-6 text-center rounded-xl bg-card border hover:border-primary/20 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 animate-fade-in-up cursor-pointer"
					style={{ animationDelay: `${index * 100}ms` }}
				>
					<div
						className={`mb-4 rounded-full ${feature.bgGradient} group-hover:scale-110 transition-all duration-300 flex items-center justify-center w-16 h-16 aspect-square`}
					>
						<div className={`w-8 h-8 ${feature.textColor} group-hover:animate-pulse`}>
							{React.cloneElement(feature.icon, {
								className: "w-full h-full stroke-current",
							})}
						</div>
					</div>
					{/* <div
						className={`p-4 mb-4 rounded-full ${feature.bgGradient} group-hover:scale-110 transition-all duration-300`}
					>
						<div className={`${feature.gradient} group-hover:animate-pulse`}>{feature.icon}</div>
					</div> */}
					<h3 className="mb-2 text-xl font-bold group-hover:text-primary transition-colors duration-300">
						{feature.title}
					</h3>
					<p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
						{feature.description}
					</p>
				</div>
			))}
		</>
	);
}
