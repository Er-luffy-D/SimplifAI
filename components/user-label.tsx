"use client";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { LogOut, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UserLabel() {
	const { data: session, status } = useSession();
	const [open, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	// Close menu on outside click
	useEffect(() => {
		if (!open) return;
		function handle(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
		}
		document.addEventListener("mousedown", handle);
		return () => document.removeEventListener("mousedown", handle);
	}, [open]);

	// Nice gradient for email
	return (
		<div className="fixed top-6 right-5 z-50 flex items-center" ref={menuRef}>
			{status === "loading" ? (
				<div className="rounded-full px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-gray-300 animate-pulse select-none min-w-[120px] text-center">
					Loading...
				</div>
			) : session?.user?.email ? (
				<div className="relative">
					<button
						className="flex items-center gap-2 rounded-full px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 hover:scale-105 transition-all font-medium text-white shadow shadow-purple-950/10"
						onClick={() => setOpen((v) => !v)}
						aria-haspopup="true"
						aria-expanded={open}
						title={session.user.email ?? ""}
						data-cursor="hover"
						data-cursor-text="User Menu"
					>
						<User className="w-5 h-5 text-purple-300" />
						<span className="bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300 bg-clip-text text-transparent max-w-[180px] truncate">
							{session.user.email}
						</span>
					</button>
					{open && (
						<div className="absolute right-0 mt-2 min-w-[160px] rounded-xl border border-purple-500/30 bg-black/95 shadow-xl shadow-purple-900/20 py-2 animate-fade-in-up">
							<Button
								variant="ghost"
								className="w-full flex justify-start gap-2 px-4 py-2 rounded-none font-medium text-left hover:bg-purple-500/10"
								onClick={() => {
									signOut({ callbackUrl: "/" });
									setOpen(false);
								}}
								data-cursor="hover"
								data-cursor-text="Logout"
							>
								<LogOut className="w-4 h-4 text-pink-400" />
								Logout
							</Button>
						</div>
					)}
				</div>
			) : (
				<Button
					size="sm"
					className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-9 shadow-lg shadow-purple-500/25 hover:from-purple-600 hover:to-pink-600 transition-all"
					onClick={() => (window.location.href = "/signin")}
					data-cursor="button"
					data-cursor-text="Sign In"
				>
					<LogIn className="w-4 h-4 mr-1" />
					Sign In
				</Button>
			)}
		</div>
	);
}
