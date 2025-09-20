"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
	const cursorRef = useRef(null);
	const followerRef = useRef(null);
	const [isHovering, setIsHovering] = useState(false);
	const [cursorVariant, setCursorVariant] = useState("default");

	useEffect(() => {
		if (typeof window === "undefined") return;

		const cursor = cursorRef.current;
		const follower = followerRef.current;
		if (!cursor || !follower) return;

		// Mouse move tracking
		const handleMouseMove = (e: MouseEvent) => {
			// Instant cursor
			gsap.set(cursor, {
				x: e.clientX,
				y: e.clientY,
			});

			// Faster, smoother follower
			gsap.to(follower, {
				x: e.clientX,
				y: e.clientY,
				duration: 0.12, // very short
				ease: "none", // no slow easing
				overwrite: true, // kill old tweens (avoids lag stacking)
			});
		};

		// Hover effects
		const handleMouseEnter = (e: Event) => {
			const target = e.target as HTMLElement | null;
			if (!(target instanceof HTMLElement)) return;

			if (target.closest('[data-cursor="hover"]')) {
				setIsHovering(true);
				setCursorVariant("hover");
				gsap.to([cursor, follower], { scale: 1.5, duration: 0.15, ease: "power2.out" });
			} else if (target.closest("button, a, [role='button']")) {
				setIsHovering(true);
				setCursorVariant("button");
				gsap.to([cursor, follower], { scale: 1.3, duration: 0.15, ease: "power2.out" });
			} else if (target.closest("input, textarea")) {
				setIsHovering(true);
				setCursorVariant("text");
				gsap.to([cursor, follower], { scale: 1.2, duration: 0.15, ease: "power2.out" });
			}
		};

		const handleMouseLeave = () => {
			setIsHovering(false);
			setCursorVariant("default");
			gsap.to([cursor, follower], { scale: 1, duration: 0.15, ease: "power2.out" });
		};

		// Click feedback
		const handleMouseDown = () => {
			gsap.to([cursor, follower], { scale: 0.8, duration: 0.1, ease: "power2.out" });
		};
		const handleMouseUp = () => {
			gsap.to([cursor, follower], {
				scale: isHovering ? 1.3 : 1,
				duration: 0.1,
				ease: "power2.out",
			});
		};

		// Hide when outside window
		const handleLeaveWindow = () => gsap.to([cursor, follower], { opacity: 0, duration: 0.15 });
		const handleEnterWindow = () => gsap.to([cursor, follower], { opacity: 1, duration: 0.15 });

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseenter", handleMouseEnter, true);
		document.addEventListener("mouseleave", handleMouseLeave, true);
		document.addEventListener("mousedown", handleMouseDown);
		document.addEventListener("mouseup", handleMouseUp);
		document.addEventListener("mouseleave", handleLeaveWindow);
		document.addEventListener("mouseenter", handleEnterWindow);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseenter", handleMouseEnter, true);
			document.removeEventListener("mouseleave", handleMouseLeave, true);
			document.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("mouseup", handleMouseUp);
			document.removeEventListener("mouseleave", handleLeaveWindow);
			document.removeEventListener("mouseenter", handleEnterWindow);
		};
	}, [isHovering]);

	return (
		<>
			{/* Main dot */}
			<div
				ref={cursorRef}
				className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-colors duration-200 ${
					cursorVariant === "hover"
						? "bg-purple-400"
						: cursorVariant === "button"
						? "bg-green-400"
						: cursorVariant === "text"
						? "bg-blue-400"
						: "bg-white"
				}`}
				style={{ transform: "translate(-50%, -50%)" }}
			/>

			{/* Follower (optimized) */}
			<div
				ref={followerRef}
				className={`fixed top-0 left-0 w-10	 h-10 rounded-full pointer-events-none z-[9998] mix-blend-difference transition-colors duration-150 ${
					cursorVariant === "hover"
						? "border-2 border-purple-400/60 bg-purple-400/10"
						: cursorVariant === "button"
						? "border-2 border-green-400/60 bg-green-400/10"
						: cursorVariant === "text"
						? "border-2 border-blue-400/60 bg-blue-400/10"
						: "border border-white/30 bg-white/5"
				}`}
				style={{ transform: "translate(-50%, -50%)" }}
			/>
		</>
	);
}
