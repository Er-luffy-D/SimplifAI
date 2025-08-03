"use client";
import Link from "next/link";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
	const { data: session } = useSession();

	useEffect(() => {
		if (open) {
			document.body.classList.add("overflow-hidden");
		}
		return () => document.body.classList.remove("overflow-hidden");
	}, [open]);

	const menuItems = [
		{ label: "Home", href: "/" },
		{ label: "About", href: "/about" },
		{ label: "Pricing", href: "/pricing" },
	];

	if (!open) return null;

	return (
		<>
			{/* Overlay */}
			<div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} aria-label="Close menu overlay" />
			{/* Toast-like popup menu */}
			<div className="fixed top-4 left-4 z-50">
				<div className="bg-card/95 border border-border shadow-2xl rounded-2xl w-72 max-w-[90vw] p-0 animate-fade-in backdrop-blur-sm">
					<div className="flex items-center justify-between px-5 py-4 border-b border-border">
						<span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
							Simplifai
						</span>
						<button
							aria-label="Close Menu"
							className="text-muted-foreground hover:text-foreground transition"
							onClick={onClose}
						>
							<X className="w-7 h-7" />
						</button>
					</div>
					<ul className="flex flex-col px-5 py-4 gap-2">
						{menuItems.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									className="block py-3 px-3 rounded-lg text-lg font-medium text-muted-foreground hover:bg-primary/10 hover:text-foreground transition"
									onClick={onClose}
								>
									{item.label}
								</Link>
							</li>
						))}
						<li>
							{session ? (
								<button
									className="block w-full text-left py-3 px-3 rounded-lg text-lg font-medium text-muted-foreground hover:bg-primary/10 hover:text-foreground transition"
									onClick={() => {
										signOut();
										onClose();
									}}
								>
									Log out
								</button>
							) : (
								<Link
									href="/signin"
									className="block py-3 px-3 rounded-lg text-lg font-medium text-muted-foreground hover:bg-primary/10 hover:text-foreground transition"
									onClick={onClose}
								>
									Sign In
								</Link>
							)}
						</li>
					</ul>
				</div>
			</div>
			{/* Simple fade-in animation */}
			<style>{`
		@keyframes fade-in {
		  from { opacity: 0; transform: translateY(-20px);}
		  to { opacity: 1; transform: none;}
		}
		.animate-fade-in {
		  animation: fade-in 0.18s cubic-bezier(.4,0,.2,1);
		}
	  `}</style>
		</>
	);
}
