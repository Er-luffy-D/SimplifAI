"use client";
import { BookOpen, FileText, FileType2, ListChecks, MessageSquare, TrendingUp } from "lucide-react";
import React from "react";
import { MovingBorder } from "@/components/ui/moving-border";

export function Features() {
	const features = [
		{
			icon: <BookOpen />,
			title: "Smart Flashcards",
			description: "AI-generated flashcards to help you memorize key concepts quickly",
			bgGradient: "bg-blue-500/10",
			textColor: "text-blue-500",
			borderColor: "bg-[radial-gradient(#3b82f6_40%,transparent_60%)]",
		},
		{
			icon: <FileText />,
			title: "Concise Summaries",
			description: "Get the main points of any document without reading the entire text",
			bgGradient: "bg-green-500/10",
			textColor: "text-green-500",
			borderColor: "bg-[radial-gradient(#22c55e_40%,transparent_60%)]",
		},
		{
			icon: <ListChecks />,
			title: "Interactive Quizzes",
			description: "Test your knowledge with automatically generated quizzes",
			bgGradient: "bg-purple-500/10",
			textColor: "text-purple-500",
			borderColor: "bg-[radial-gradient(#a855f7_40%,transparent_60%)]",
		},
		{
			icon: <MessageSquare />,
			title: "Ask Questions",
			description: "Chat with your document to get instant answers to your questions",
			bgGradient: "bg-orange-500/10",
			textColor: "text-orange-500",
			borderColor: "bg-[radial-gradient(#f97316_40%,transparent_60%)]",
		},
		{
			icon: <FileType2 />,
			title: "PDF & TXT Support",
			description: "Easily upload and process PDF and TXT files (DOCX support coming soon)",
			bgGradient: "bg-indigo-500/10",
			textColor: "text-indigo-500",
			borderColor: "bg-[radial-gradient(#6366f1_40%,transparent_60%)]",
		},
		{
			icon: <TrendingUp />,
			title: "Progress Tracking",
			description: "Monitor your learning journey with detailed analytics and insights",
			bgGradient: "bg-rose-500/10",
			textColor: "text-rose-500",
			borderColor: "bg-[radial-gradient(#f43f5e_40%,transparent_60%)]",
		},
	];

	return (
		<>
			{features.map((feature, index) => (
				<div
					key={index}
					className="group relative overflow-hidden bg-transparent p-[1px] rounded-xl transition-all duration-500 hover:scale-105 animate-fade-in-up cursor-pointer"
					style={{ animationDelay: `${index * 100}ms` }}
				>
					<MovingBorder duration={12000} rx="30%" ry="30%">
						<div className={`h-32 w-32 ${feature.borderColor} opacity-[0.7]`} />
					</MovingBorder>

					<div className="relative flex flex-col items-center justify-center rounded-xl bg-card p-6 text-center">
						<div
							className={`mb-4 rounded-full ${feature.bgGradient} group-hover:scale-110 transition-all duration-300 flex items-center justify-center w-16 h-16 aspect-square`}
						>
							<div className={`w-8 h-8 ${feature.textColor} group-hover:animate-pulse`}>
								{React.cloneElement(feature.icon, {
									className: "w-full h-full stroke-current",
								})}
							</div>
						</div>
						<h3 className="mb-2 text-xl font-bold group-hover:text-primary transition-colors duration-300">
							{feature.title}
						</h3>
						<p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
							{feature.description}
						</p>
					</div>
				</div>
			))}
		</>
	);
}
