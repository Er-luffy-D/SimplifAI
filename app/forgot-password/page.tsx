"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, CheckCircle, Sparkles, Brain } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setIsLoading(false);
		setIsSubmitted(true);
	};

	return (
		<div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
			{/* Animated background */}
			<div className="fixed inset-0 -z-10">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-float-slow" />
				<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl animate-float-slower" />

				{/* Grid pattern */}
				<div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
			</div>

			{/* Floating icons */}
			<div className="fixed top-20 left-20 opacity-20 animate-bounce-slow">
				<Brain className="w-8 h-8 text-purple-400" />
			</div>
			<div className="fixed bottom-20 right-20 opacity-20 animate-bounce-slower">
				<Sparkles className="w-6 h-6 text-pink-400" />
			</div>

			{/* Main content */}
			<div className="w-full max-w-md relative z-10">
				{/* Header */}
				<div className="text-center mb-8">
					<Link href="/" className="inline-block mb-6">
						<span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
							Simplifai
						</span>
					</Link>
				</div>

				<Card className="bg-card/50 border-border/50 backdrop-blur-sm">
					{!isSubmitted ? (
						<>
							<CardHeader className="space-y-1">
								<CardTitle className="text-2xl text-center">Reset Password</CardTitle>
								<CardDescription className="text-center">
									Enter your email address and we&apos;ll send you a link to reset your password
								</CardDescription>
							</CardHeader>

							<CardContent>
								<form onSubmit={handleSubmit} className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="email" className="text-muted-foreground">
											Email
										</Label>
										<div className="relative">
											<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
											<Input
												id="email"
												type="email"
												placeholder="Enter your email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												className="pl-10 bg-input/50 border-border text-foreground placeholder:text-muted-foreground focus:border-purple-500"
												required
											/>
										</div>
									</div>

									<Button
										type="submit"
										className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium"
										disabled={isLoading}
									>
										{isLoading ? (
											<>
												<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
												Sending...
											</>
										) : (
											"Send Reset Link"
										)}
									</Button>
								</form>
							</CardContent>

							<CardFooter>
								<Link
									href="/signin"
									className="flex items-center justify-center w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
								>
									<ArrowLeft className="w-4 h-4 mr-2" />
									Back to Sign In
								</Link>
							</CardFooter>
						</>
					) : (
						<>
							<CardHeader className="space-y-1">
								<div className="flex justify-center mb-4">
									<CheckCircle className="w-16 h-16 text-green-500" />
								</div>
								<CardTitle className="text-2xl text-center">Check Your Email</CardTitle>
								<CardDescription className="text-center">
									We&apos;ve sent a password reset link to <strong>{email}</strong>
								</CardDescription>
							</CardHeader>

							<CardContent>
								<div className="text-center space-y-4">
									<p className="text-muted-foreground">
										Click the link in your email to reset your password. The link will expire in 1 hour.
									</p>
									<div className="bg-muted/50 rounded-lg p-4">
										<p className="text-sm text-muted-foreground">
											Didn&apos;t receive the email? Check your spam folder or{" "}
											<button
												onClick={() => setIsSubmitted(false)}
												className="text-purple-400 hover:text-purple-300 font-medium"
											>
												try again
											</button>
										</p>
									</div>
								</div>
							</CardContent>

							<CardFooter>
								<Link
									href="/signin"
									className="flex items-center justify-center w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
								>
									<ArrowLeft className="w-4 h-4 mr-2" />
									Back to Sign In
								</Link>
							</CardFooter>
						</>
					)}
				</Card>
			</div>
		</div>
	);
}
