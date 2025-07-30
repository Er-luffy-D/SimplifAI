"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, Brain, Check, X, Chrome } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Toast } from "@/components/toasts";

export default function SignUpPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null);

	const passwordRequirements = [
		{ text: "At least 8 characters", met: formData.password.length >= 8 },
		{ text: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
		{ text: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
		{ text: "Contains number", met: /\d/.test(formData.password) },
	];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			setToast({ message: "Passwords do not match.", type: "error" });
			return;
		}

		setIsLoading(true);
		const res = await fetch("/api/auth/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});

		setIsLoading(false);
		if (res.ok) {
			setToast({ message: "Account created! Logging you in...", type: "success" });
			await signIn("credentials", {
				email: formData.email,
				password: formData.password,
				redirect: true,
				callbackUrl: "/",
			});
		} else {
			const data = await res.json();
			setToast({ message: data.error || "Failed to sign up. Please try again.", type: "error" });
			console.log(res);
		}
	};

	const handleSocialLogin = (provider: string) => {
		signIn(provider, { callbackUrl: "/", redirect: true });
	};

	return (
		<div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
			{toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
			{/* Animated background */}
			<div className="fixed inset-0 -z-10">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-float-slow" />
				<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl animate-float-slower" />
				<div className="absolute top-1/2 right-1/3 w-72 h-72 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full blur-3xl animate-float" />

				{/* Grid pattern */}
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.02)_1px,transparent_0)] bg-[length:50px_50px]" />
			</div>

			{/* Floating icons */}
			<div className="fixed top-20 right-20 opacity-20 animate-bounce-slow">
				<Brain className="w-8 h-8 text-purple-400" />
			</div>
			<div className="fixed bottom-20 left-20 opacity-20 animate-bounce-slower">
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
					<h1 className="text-3xl font-bold mb-2">Create your account</h1>
					<p className="text-zinc-400">Start your learning journey with AI-powered tools</p>
				</div>

				<Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl text-center text-white">Sign Up</CardTitle>
						<CardDescription className="text-center text-zinc-400">Create your account to get started</CardDescription>
					</CardHeader>

					<CardContent className="space-y-6">
						{/* Social login buttons */}
						<div className="space-y-3">
							<Button
								variant="outline"
								className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600"
								onClick={() => handleSocialLogin("google")}
							>
								<Chrome className="w-4 h-4 mr-2" />
								Continue with Google
							</Button>
						</div>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<Separator className="w-full bg-zinc-800" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-zinc-900 px-2 text-zinc-500">Or continue with email</span>
							</div>
						</div>

						{/* Registration form */}
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name" className="text-zinc-300">
									Full Name
								</Label>
								<div className="relative">
									<User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
									<Input
										id="name"
										type="text"
										placeholder="Enter your full name"
										value={formData.name}
										onChange={(e) => setFormData({ ...formData, name: e.target.value })}
										className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-purple-500"
										required
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="email" className="text-zinc-300">
									Email
								</Label>
								<div className="relative">
									<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
									<Input
										id="email"
										type="email"
										placeholder="Enter your email"
										value={formData.email}
										onChange={(e) => setFormData({ ...formData, email: e.target.value })}
										className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-purple-500"
										required
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="password" className="text-zinc-300">
									Password
								</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
									<Input
										id="password"
										type={showPassword ? "text" : "password"}
										placeholder="Create a password"
										value={formData.password}
										onChange={(e) => setFormData({ ...formData, password: e.target.value })}
										className="pl-10 pr-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-purple-500"
										required
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
									>
										{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
									</button>
								</div>

								{/* Password requirements */}
								{formData.password && (
									<div className="space-y-1 mt-2">
										{passwordRequirements.map((req, index) => (
											<div key={index} className="flex items-center gap-2 text-xs">
												{req.met ? (
													<Check className="w-3 h-3 text-green-400" />
												) : (
													<X className="w-3 h-3 text-zinc-500" />
												)}
												<span className={req.met ? "text-green-400" : "text-zinc-500"}>{req.text}</span>
											</div>
										))}
									</div>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="confirmPassword" className="text-zinc-300">
									Confirm Password
								</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
									<Input
										id="confirmPassword"
										type={showConfirmPassword ? "text" : "password"}
										placeholder="Confirm your password"
										value={formData.confirmPassword}
										onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
										className={`pl-10 pr-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-purple-500 ${
											formData.confirmPassword && formData.password !== formData.confirmPassword ? "border-red-500" : ""
										}`}
										required
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
									>
										{showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
									</button>
								</div>
								{formData.confirmPassword && formData.password !== formData.confirmPassword && (
									<p className="text-xs text-red-400">Passwords do not match</p>
								)}
							</div>

							<div className="flex items-start space-x-2">
								<input
									id="terms"
									type="checkbox"
									className="w-4 h-4 mt-0.5 rounded border-zinc-700 bg-zinc-800 text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
									required
								/>
								<Label htmlFor="terms" className="text-sm text-zinc-400 leading-relaxed">
									I agree to the{" "}
									<Link href="/terms" className="text-purple-400 hover:text-purple-300">
										Terms of Service
									</Link>{" "}
									and{" "}
									<Link href="/privacy" className="text-purple-400 hover:text-purple-300">
										Privacy Policy
									</Link>
								</Label>
							</div>

							<Button
								type="submit"
								className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium"
								disabled={isLoading || formData.password !== formData.confirmPassword}
								data-cursor="button"
								data-cursor-text="Create Account"
							>
								{isLoading ? (
									<>
										<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
										Creating account...
									</>
								) : (
									<>
										Create Account
										<ArrowRight className="w-4 h-4 ml-2" />
									</>
								)}
							</Button>
						</form>
					</CardContent>

					<CardFooter>
						<p className="text-center text-sm text-zinc-400 w-full">
							Already have an account?{" "}
							<Link href="/signin" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
								Sign in
							</Link>
						</p>
					</CardFooter>
				</Card>

				{/* Security note */}
				<div className="text-center mt-6 text-xs text-zinc-500">
					🔒 Your data is encrypted and secure. We never share your information.
				</div>
			</div>
		</div>
	);
}
