"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Brain, Chrome, EyeIcon, EyeClosed } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Toast } from "@/components/toasts";

export default function SignInPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isEye, setIsEye] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		const res = await signIn("credentials", {
			redirect: false,
			email: formData.email,
			password: formData.password,
		});
		setIsLoading(false);
		if (res?.error) {
			setToast({ message: "Invalid email or password.", type: "error" });
		} else {
			setToast({ message: "Login successful!", type: "success" });
			setTimeout(() => {
				window.location.href = "/";
			}, 1000);
		}
	};

	const handleSocialLogin = (provider: string) => {
		signIn(provider, { callbackUrl: "/", redirect: true });
	};

	return (
		<div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
			{toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
			{/* Animated background */}
			<div className="fixed inset-0 -z-10">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-float-slow" />
				<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl animate-float-slower" />
				<div className="absolute top-1/2 right-1/3 w-72 h-72 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full blur-3xl animate-float" />

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
					<h1 className="text-3xl font-bold mb-2">Welcome back</h1>
					<p className="text-muted-foreground">Sign in to your account to continue learning</p>
				</div>

				<Card className="bg-card/50 border-border/50 backdrop-blur-sm">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl text-center">Sign In</CardTitle>
						<CardDescription className="text-center">
							Enter your credentials to access your account
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-6">
						{/* Social login buttons */}
						<div className="space-y-3">
							<Button
								variant="outline"
								className="w-full"
								onClick={() => handleSocialLogin("google")}
								data-cursor="button"
								data-cursor-text="Sign in with Google"
							>
								<Chrome className="w-4 h-4 mr-2" />
								Continue with Google
							</Button>
						</div>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<Separator className="w-full" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-muted-foreground/10 px-2 text-muted-foreground">Or continue with email</span>
							</div>
						</div>

						{/* Email/Password form */}
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
										value={formData.email}
										onChange={(e) => setFormData({ ...formData, email: e.target.value })}
										className="pl-10 bg-input/50 border-border text-foreground placeholder:text-muted-foreground focus:border-purple-500"
										required
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="password" className="text-muted-foreground">
									Password
								</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
									<Input
										id="password"
										type={showPassword ? "text" : "password"}
										placeholder="Enter your password"
										value={formData.password}
										onChange={(e) => setFormData({ ...formData, password: e.target.value })}
										className="pl-10 pr-10 bg-input/50 border-border text-foreground placeholder:text-muted-foreground focus:border-purple-500"
										required
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
									>
										{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
									</button>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<input
										id="remember"
										type="checkbox"
										className="w-4 h-4 rounded border-border bg-input text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
									/>
									<Label htmlFor="remember" className="text-sm text-muted-foreground">
										Remember me
									</Label>
								</div>
								<Link
									href="/forgot-password"
									className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
								>
									Forgot password?
								</Link>
							</div>

							<Button
								type="submit"
								className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-foreground font-medium"
								disabled={isLoading}
								data-cursor="button"
								data-cursor-text="Sign In"
							>
								{isLoading ? (
									<>
										<div className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin mr-2" />
										Signing in...
									</>
								) : (
									<>
										Sign In
										<ArrowRight className="w-4 h-4 ml-2" />
									</>
								)}
							</Button>
						</form>
					</CardContent>

					<CardFooter>
						<p className="text-center text-sm text-muted-foreground w-full">
							Don&apos;t have an account?{" "}
							<Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
								Sign up
							</Link>
						</p>
					</CardFooter>
					<div className="  justify-center w-full flex">
						<div className="text-center text-md max-w-sm w-3xs sm:w-full text-muted-foreground ring-2 rounded-lg p-3">
							<p className="font-medium text-foreground mb-1">Test Email</p>
							<p>
								Email: test@test.com{" "}
								{isEye ? (
									<EyeIcon className="inline w-5 h-4 mr-2" onClick={() => setIsEye(!isEye)} />
								) : (
									<EyeClosed className="inline w-5 h-4 mr-2" onClick={() => setIsEye(!isEye)} />
								)}
							</p>
							{isEye ? <p>Password: test@test.com</p> : <p></p>}
						</div>
					</div>
				</Card>

				{/* Footer */}
				<div className="text-center mt-8 text-xs text-muted-foreground">
					By signing in, you agree to our{" "}
					<Link href="/terms" className="text-purple-400 hover:text-purple-300">
						Terms of Service
					</Link>{" "}
					and{" "}
					<Link href="/privacy" className="text-purple-400 hover:text-purple-300">
						Privacy Policy
					</Link>
				</div>
			</div>
		</div>
	);
}
