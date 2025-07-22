"use client";
import { useEffect } from "react";
import { X, CheckCircle, AlertTriangle } from "lucide-react";

export function Toast({
	message,
	type = "error",
	onClose,
}: {
	message: string;
	type?: "error" | "success";
	onClose: () => void;
}) {
	useEffect(() => {
		if (!message) return;
		const timer = setTimeout(onClose, 3000);
		return () => clearTimeout(timer);
	}, [message, onClose]);

	if (!message) return null;

	const isError = type === "error";

	return (
		<div
			className={`fixed top-6 right-6 z-[2000] flex items-center gap-3 px-5 py-3 rounded-xl font-medium shadow-xl text-white transition-all
				${isError ? "bg-red-600/90" : "bg-green-600/90"} animate-fade-in-up`}
		>
			{isError ? (
				<AlertTriangle className="w-5 h-5 text-white" />
			) : (
				<CheckCircle className="w-5 h-5 text-white" />
			)}
			<span className="flex-1">{message}</span>
			<button onClick={onClose} className="text-white/70 hover:text-white">
				<X size={16} />
			</button>
		</div>
	);

}
