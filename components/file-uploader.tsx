"use client";

import type React from "react";
import { useState } from "react";
import { jsonrepair } from "jsonrepair";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { FileText, Upload, CheckCircle2, Sparkles } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Add_data } from "@/lib/store/slices/parseSlice";
import { useSession } from "next-auth/react";
import { Toast } from "./toasts";

export function FileUploader() {
	const dispatch = useDispatch();
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState<string | null>(null);
	const [info, setInfo] = useState<string | null>(null);
	const [dragActive, setDragActive] = useState(false);
	const [summaryLength, setSummaryLength] = useState<"short" | "medium" | "long">("short");
	const router = useRouter();
	const session = useSession();

	const handleInfo = (message: string) => {
		setInfo(message);
		setTimeout(() => setInfo(null), 3800);
	};
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0];
			if (selectedFile.size > 10 * 1024 * 1024) {
				setError("File size exceeds 10MB limit. Please select a smaller file.");
				setFile(null);
				return;
			}
			setFile(selectedFile);
		}
	};

	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			const droppedFile = e.dataTransfer.files[0];
			if (droppedFile.size > 10 * 1024 * 1024) {
				setError("File size exceeds 10MB limit. Please select a smaller file.");
				setFile(null);
				return;
			}
			setFile(droppedFile);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!session.data?.user?.email) {
			setError("You must be signed in to upload a file!");
			return;
		}
		if (!file) {
			setError("Please select a file to process.");
			return;
		}
		setUploading(true);

		const progressInterval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 60) return prev;
				return prev + Math.random() * 10 + Math.random() * 5;
			});
		}, 200);

		const formData = new FormData();
		formData.append("file", file);
		formData.append("type", file.type);
		formData.append("summaryLength", summaryLength);

		try {
			const res = await axios.post(`/api/parse-pdf`, formData);
			const data = res.data;

			const rawMessage = data.result.choices?.[0]?.message?.content ?? "";

			let parseMessage;
			try {
				const jsonMatch = rawMessage.match(/\{[\s\S]*\}/);
				if (!jsonMatch) throw new Error("No valid JSON found");

				const repaired = jsonrepair(jsonMatch[0]);
				parseMessage = JSON.parse(repaired);
			} catch (err) {
				console.error("❌ Failed to parse or repair JSON:", err, "\nRaw message:\n", rawMessage);
				setError("⚠️ The AI response was broken. Please try again with a different file or retry.");
				clearInterval(progressInterval);
				setUploading(false);
				return;
			}

			dispatch(
				Add_data({
					summary: parseMessage.summary,
					flashcards: parseMessage.flashcards,
					quiz: parseMessage.quiz,
				})
			);

			setProgress(100);
			clearInterval(progressInterval);

			setTimeout(() => {
				setUploading(false);
				router.push(`/results/${encodeURIComponent(file.name)}`);
			}, 800);
		} catch (e) {
			console.error("❌ Upload failed:", e);
			clearInterval(progressInterval);
			setUploading(false);
			setError("Oops! The upload failed. The file may contain too many images or the server failed. Please try again.");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{error && <Toast message={error} type="error" onClose={() => setError(null)} />}
			{info && <Toast message={info} type="info" onClose={() => setError(null)} />}
			<div className="grid w-full gap-4">
				{/* Summary Length Selection */}
				<div className="space-y-3">
					<label className="text-sm font-medium text-foreground">Summary Length</label>
					<div className="flex flex-col sm:flex-row gap-3 md:gap-2 mt-2 md:mt-3.5">
						<Button
							type="button"
							variant={summaryLength === "short" ? "default" : "outline"}
							size="sm"
							onClick={() => setSummaryLength("short")}
							className={`flex-1 min-w-[120px] py-1 ${summaryLength === "short" ? "bg-violet-500 hover:bg-violet-700" : ""}`}
							data-cursor="hover"
							data-cursor-text="Short Summary"
						>
							Short <span className="text-xs ml-1 opacity-75">(3-4 points)</span>
						</Button>
						<Button
							type="button"
							variant={summaryLength === "medium" ? "default" : "outline"}
							size="sm"
							onClick={() => {
								setSummaryLength("medium");
								handleInfo("It will take too long to process. Use less size files 1-2 MB for medium summaries.");
							}}
							className={`flex-1 min-w-[120px] py-1 ${summaryLength === "medium" ? "bg-violet-500 hover:bg-violet-700" : ""}`}
							data-cursor="hover"
							data-cursor-text="Medium Summary"
						>
							Medium <span className="text-xs ml-1 opacity-75">(6-8 points)</span>
						</Button>
						<Button
							type="button"
							variant={summaryLength === "long" ? "default" : "outline"}
							size="sm"
							onClick={() => {
								setSummaryLength("long");
								handleInfo("It will take too long to process. Use less size files 1-2 MB for long summaries.");
							}}
							className={`flex-1 min-w-[120px] py-1 ${summaryLength === "long" ? "bg-violet-500 hover:bg-violet-700" : ""}`}
							data-cursor="hover"
							data-cursor-text="Long Summary"
						>
							Long <span className="text-xs ml-1 opacity-75">(9-10 points)</span>
						</Button>
					</div>
				</div>

				{/* File Dropzone */}
				<div
					className={`relative flex flex-col items-center justify-center text-center p-6 sm:p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300
    ${dragActive
							? "border-primary bg-primary/10 scale-105"
							: file
								? "border-green-500 bg-green-50 dark:bg-green-950/20"
								: "border-muted-foreground/25 bg-muted/30 hover:bg-muted/50 hover:border-primary/50 hover:scale-[1.02]"
						}`}
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}
					data-cursor="hover"
					data-cursor-text="Upload PDF"
				>
					{file ? (
						<div className="flex flex-col items-center gap-3 text-center animate-fade-in w-full break-words px-2"> {/* ✅ ADDED padding & wrapping */}
							<div className="relative">
								<FileText className="w-12 h-12 text-green-500 animate-bounce-gentle" />
								<CheckCircle2 className="w-5 h-5 text-green-500 absolute -top-1 -right-1 animate-scale-in" />
							</div>
							<div className="max-w-full"> {/* ✅ NEW: Wrap file name */}
								<p className="font-medium text-green-700 dark:text-green-400 text-sm truncate">{file.name}</p>
								<p className="text-sm text-green-600 dark:text-green-500">
									{(file.size / 1024 / 1024).toFixed(2)} MB • Ready to process
								</p>
							</div>
						</div>
					) : (
						<div className="flex flex-col items-center gap-3 text-center px-2">
							<div className="relative">
								<Upload
									className={`w-12 h-12 text-muted-foreground transition-all duration-300 ${dragActive ? "scale-110 text-primary" : ""}`}
								/>
								{dragActive && <Sparkles className="w-4 h-4 text-primary absolute -top-1 -right-1 animate-spin" />}
							</div>
							<div className="space-y-1">
								<p className="font-medium">{dragActive ? "Drop your file here!" : "Drag & drop your file here"}</p>
								<p className="text-sm text-muted-foreground">or click to browse • PDF, DOCX, TXT</p>
							</div>
						</div>
					)}
					<Input id="file" type="file" className="hidden" accept=".pdf,.txt" onChange={handleFileChange} />
					<label htmlFor="file" className="w-full h-full absolute top-0 left-0 cursor-pointer">
						<span className="sr-only">Choose file</span>
					</label>
				</div>

				{/* Submit Button and Progress */}
				{file && (
					<div className="space-y-4 animate-fade-in-up">
						{uploading && (
							<div className="space-y-2 text-sm">
								<div className="flex justify-between text-sm">
									<span>Processing your document...</span>
									<span>{Math.round(progress)}%</span>
								</div>
								<Progress value={progress} className="h-3 transition-all duration-300" />
								<div className="flex items-center gap-2 text-muted-foreground">
									<div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
									{progress < 30 && "Analyzing document structure..."}
									{progress >= 30 && progress < 60 && "Extracting key information..."}
									{progress >= 60 && progress < 90 && "Generating learning materials..."}
									{progress >= 90 && "Almost ready!"}
								</div>
							</div>
						)}
						<Button
							type="submit"
							className="w-full group hover:scale-[1.02] transition-all duration-300 bg-gradient-primary-purple hover:bg-gradient-purple-pink text-white text-base sm:text-sm"
							disabled={!file || uploading}
							data-cursor="button"
							data-cursor-text="Process Document"
						>
							{uploading ? (
								<>
									<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
									Processing...
								</>
							) : (
								<>
									<Sparkles className="w-4 h-4 mr-2 group-hover:animate-spin" />
									Process Document
								</>
							)}
						</Button>
					</div>
				)}
			</div>
		</form>
	);
}