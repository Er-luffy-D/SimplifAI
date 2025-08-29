"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Share2, Braces, MoreVertical } from "lucide-react";
import jsPDF from "jspdf";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MainPoint {
    keyPoint: string;
}

interface Recommendation {
    statement: string;
}

interface SummaryData {
    mainPoints: MainPoint[];
    keyInsights: string;
    recommendations: Recommendation[];
}

interface QuizItem {
    question: string;
    options: string[];
    correct: number;
}

export interface ParsedDocumentResponse {
    id: string;
    docName: string;
    generatedContent: {
        summary: SummaryData | null;
        flashcards: {
            question: string;
            answer: string;
            difficulty: "easy" | "medium" | "hard";
        }[] | null;
        quiz: QuizItem[] | null;
    }
    | null;
    generationStatus: "not_generated" | "processing" | "success" | "error";
    responseFormat: "json" | "text";
    shared: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export function ResultsHeader({ parsedDocument }: { parsedDocument: ParsedDocumentResponse }) {
    if (!parsedDocument || !parsedDocument.generatedContent || parsedDocument.responseFormat != "json") return null; // should not happen, but for type checking

    const fileName = parsedDocument.docName;
    const data = {
        summary: parsedDocument.generatedContent.summary,
        flashcards: parsedDocument.generatedContent.flashcards,
        quiz: parsedDocument.generatedContent.quiz,
    }
    const handleExportJSON = () => {
        if (!data) return;
        const blob = new Blob([JSON.stringify(parsedDocument, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleExportPDF = () => {
        if (!data || !data.summary) return;

        const pdf = new jsPDF();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const margin = 20;
        const maxWidth = pageWidth - 2 * margin;
        let yPosition = 30;

        pdf.setFont("helvetica");

        pdf.setFontSize(20);
        pdf.setFont("helvetica", "bold");
        pdf.text("SimplifAI Summary Report", margin, yPosition);
        yPosition += 15;

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        const currentDate = new Date().toLocaleString();
        pdf.text(`Generated on: ${currentDate}`, margin, yPosition);
        yPosition += 10;
        pdf.setFont("helvetica", "bold");
        pdf.text(`Document: ${fileName}`, margin, yPosition);
        yPosition += 20;

        const summaryData = data.summary as SummaryData;

        pdf.setFontSize(16);
        pdf.setFont("helvetica", "bold");
        pdf.text("Main Points", margin, yPosition);
        yPosition += 10;

        pdf.setFontSize(11);
        pdf.setFont("helvetica", "normal");

        if (summaryData.mainPoints && Array.isArray(summaryData.mainPoints)) {
            summaryData.mainPoints.forEach((point: MainPoint, index: number) => {
                if (yPosition > 270) {
                    pdf.addPage();
                    yPosition = 30;
                }

                const pointText = `${index + 1}. ${point.keyPoint}`;
                const lines = pdf.splitTextToSize(pointText, maxWidth - 10);
                pdf.text(lines, margin + 5, yPosition);
                yPosition += lines.length * 5 + 3;
            });
        }

        yPosition += 10;

        if (yPosition > 250) {
            pdf.addPage();
            yPosition = 30;
        }

        pdf.setFontSize(16);
        pdf.setFont("helvetica", "bold");
        pdf.text("Key Insights", margin, yPosition);
        yPosition += 10;

        pdf.setFontSize(11);
        pdf.setFont("helvetica", "normal");

        if (summaryData.keyInsights) {
            const insightLines = pdf.splitTextToSize(summaryData.keyInsights, maxWidth);
            pdf.text(insightLines, margin, yPosition);
            yPosition += insightLines.length * 5 + 10;
        }

        if (yPosition > 250) {
            pdf.addPage();
            yPosition = 30;
        }

        pdf.setFontSize(16);
        pdf.setFont("helvetica", "bold");
        pdf.text("Recommendations", margin, yPosition);
        yPosition += 10;

        pdf.setFontSize(11);
        pdf.setFont("helvetica", "normal");

        if (summaryData.recommendations && Array.isArray(summaryData.recommendations)) {
            summaryData.recommendations.forEach((recommendation: Recommendation, index: number) => {
                if (yPosition > 270) {
                    pdf.addPage();
                    yPosition = 30;
                }

                const recText = `${index + 1}. ${recommendation.statement}`;
                const lines = pdf.splitTextToSize(recText, maxWidth - 10);
                pdf.text(lines, margin + 5, yPosition);
                yPosition += lines.length * 5 + 3;
            });
        }

        const quizData = data.quiz as QuizItem[];
        if (quizData && Array.isArray(quizData) && quizData.length > 0) {
            pdf.addPage();
            yPosition = 30;

            pdf.setFontSize(16);
            pdf.setFont("helvetica", "bold");
            pdf.text("Get Yourself Tested", margin, yPosition);
            yPosition += 15;

            pdf.setFontSize(11);
            pdf.setFont("helvetica", "normal");

            quizData.forEach((quiz: QuizItem, index: number) => {
                if (yPosition > 240) {
                    pdf.addPage();
                    yPosition = 30;
                }

                pdf.setFont("helvetica", "bold");
                const questionText = `${index + 1}. ${quiz.question}`;
                const questionLines = pdf.splitTextToSize(questionText, maxWidth);
                pdf.text(questionLines, margin, yPosition);
                yPosition += questionLines.length * 5 + 5;

                pdf.setFont("helvetica", "normal");
                quiz.options.forEach((option: string, optionIndex: number) => {
                    if (yPosition > 275) {
                        pdf.addPage();
                        yPosition = 30;
                    }

                    const optionText = `   ${String.fromCharCode(65 + optionIndex)}. ${option}`;
                    const optionLines = pdf.splitTextToSize(optionText, maxWidth - 10);
                    pdf.text(optionLines, margin + 5, yPosition);
                    yPosition += optionLines.length * 4 + 2;
                });

                yPosition += 5;
            });

            pdf.addPage();
            yPosition = 30;

            pdf.setFontSize(16);
            pdf.setFont("helvetica", "bold");
            pdf.text("Answer Key", margin, yPosition);
            yPosition += 15;

            pdf.setFontSize(10);
            pdf.setFont("helvetica", "normal");

            const cols = 5;
            const colWidth = (maxWidth - 20) / cols;
            let currentCol = 0;
            let currentRow = 0;

            quizData.forEach((quiz: QuizItem, index: number) => {
                if (yPosition + currentRow * 15 > 270) {
                    pdf.addPage();
                    yPosition = 30;
                    currentRow = 0;
                }

                const xPos = margin + currentCol * colWidth;
                const yPos = yPosition + currentRow * 15;

                const correctLetter = String.fromCharCode(64 + quiz.correct); // A=1, B=2, etc.
                const answerText = `${index + 1}. ${correctLetter}`;

                pdf.text(answerText, xPos, yPos);

                currentCol++;
                if (currentCol >= cols) {
                    currentCol = 0;
                    currentRow++;
                }
            });

            yPosition += Math.ceil(quizData.length / cols) * 15 + 10;
        }

        const pageCount = pdf.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            pdf.setPage(i);
            pdf.setFontSize(8);
            pdf.setFont("helvetica", "normal");
            pdf.text(`Generated by SimplifAI - Page ${i} of ${pageCount}`, margin, 285);
        }

        pdf.save(`${fileName}_summary.pdf`);
    };
    const handleShare = async () => {
        if (!data) return;

        // make the document shared
        const res = await fetch(`/api/documents/${parsedDocument.id}/share`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            alert("Failed to share the document. Please try again.");
            return;
        }

        const shareData = {
            title: `Results for ${fileName}`,
            text: `Check out the results for ${fileName}.`,
            url: window.location.href,
        };

        if (navigator.share) {
            navigator
                .share(shareData)
                .then(() => console.log("Share successful"))
                .catch((error) => console.error("Error sharing:", error));
        } else {
            // copy the share URL to clipboard as a fallback
            navigator.clipboard.writeText(shareData.url)
                .then(() => alert("Share URL copied to clipboard!"))
                .catch((error) => console.error("Error copying to clipboard:", error));
        }
    };

    return (
        <div className="sticky top-0 z-10 bg-background border-b">
            <div className="container flex items-center justify-between h-16 px-4 mx-auto">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild data-cursor="hover" data-cursor-text="Back to Home">
                        <Link href="/">
                            <ArrowLeft className="w-5 h-5" />
                            <span className="sr-only">Back</span>
                        </Link>
                    </Button>
                    <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="font-medium truncate max-w-[200px] md:max-w-md">{fileName}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center">
                        <Button
                            variant="outline"
                            size="sm"
                            className="hidden sm:flex bg-red-400 hover:bg-red-500 border-red-200 text-white hover:text-blue-500 rounded-r-none border-r-0"
                            onClick={handleExportPDF}
                            data-cursor="hover"
                            data-cursor-text="Export as PDF"
                        >
                            <FileText className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="hidden sm:flex bg-red-50 hover:bg-red-100 border-red-200 text-white hover:text-blue-500 rounded-l-none px-2"
                                    data-cursor="hover"
                                    data-cursor-text="Export Options"
                                >
                                    <MoreVertical className="w-3 h-3" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={handleExportJSON} className="cursor-pointer ring-2 ring-slate-400/40">
                                    <Braces className="w-4 h-4 mr-2" />
                                    Export as JSON
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <Button variant="outline" size="sm" className="hidden sm:flex" onClick={handleShare} data-cursor="hover" data-cursor-text="Share Results">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                    </Button>
                </div>
            </div>
        </div>
    );
}
