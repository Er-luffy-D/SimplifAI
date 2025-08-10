import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ParsedDocumentResponse, ResultsHeader } from "@/components/results-header";
import { FlashcardView } from "@/components/flashcard-view";
import { SummaryView } from "@/components/summary-view";
import { QuizView } from "@/components/quiz-view";
import { cookies } from "next/headers";

interface ResultsPageProps {
    params: Promise<{ fileId: string }>;
}

import { AlertTriangle, FileWarning, Loader2, Ban } from "lucide-react";

const DocumentStateLayout = ({
    icon: Icon,
    title,
    description,
    actionLabel,
    actionHref,
}: {
    icon: React.ElementType;
    title: string;
    description?: string;
    actionLabel?: string;
    actionHref?: string;
}) => (
    <main className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="container px-4 py-12 mx-auto text-center max-w-lg">
            <Icon className="mx-auto mb-6 text-blue-600" size={56} />
            <h1 className="text-2xl font-bold">{title}</h1>
            {description && <p className="mt-4 text-gray-600">{description}</p>}
            {actionLabel && actionHref && (
                <a
                    href={actionHref}
                    className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    {actionLabel}
                </a>
            )}
        </div>
    </main>
);

const DocumentIdRequired = () => (
    <DocumentStateLayout
        icon={AlertTriangle}
        title="Document ID Required"
        description="Please provide a valid document ID to view the results."
    />
);

const DocumentNotFound = () => (
    <DocumentStateLayout
        icon={FileWarning}
        title="Document Not Found"
        description="We couldn't find the document you were looking for."
        actionLabel="Go to Home"
        actionHref="/"
    />
);

const DocumentGenerationFailed = () => (
    <DocumentStateLayout
        icon={Ban}
        title="Document Generation Failed"
        description="There was an error generating content for this document. Please try again later."
    />
);

const DocumentNotSupported = () => (
    <DocumentStateLayout
        icon={FileWarning}
        title="This document doesn’t support flashcards & summaries"
        description="It looks like this document was uploaded before we introduced new features. To use flashcards, summaries, and quizzes, please re-upload or regenerate this document."
        actionLabel="Go to Home"
        actionHref="/"
    />
);

const DocumentProcessing = () => (
    <DocumentStateLayout
        icon={Loader2}
        title="Document is still being processed"
        description="Please wait a moment and refresh the page."
    />
);

export default async function ResultsPage({ params }: ResultsPageProps) {
    const { fileId } = await params;
    const id = decodeURIComponent(fileId);
    if (!id) return <DocumentIdRequired />;

    const cookieHeader = (await cookies())
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/documents/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cookie": cookieHeader,
        },
        cache: "no-store",
    });

    if (!response.ok) return <DocumentNotFound />;
    const data = await response.json() as ParsedDocumentResponse;

    // older documents
    if (data.generationStatus === "not_generated" || !data.generationStatus) return <DocumentNotSupported />;
    if (data.generationStatus == "processing") return <DocumentProcessing />;
    if (data.generationStatus != "success" || data.responseFormat !== "json" || !data.generatedContent) return <DocumentGenerationFailed />;

    return (
        <main className="min-h-screen bg-muted/30">
            <ResultsHeader parsedDocument={data} />

            <div className="container px-4 py-8 mx-auto">
                <Tabs defaultValue="summary" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="summary">Summary</TabsTrigger>
                        <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                        <TabsTrigger value="quiz">Quiz</TabsTrigger>
                    </TabsList>
                    <TabsContent value="summary">
                        <SummaryView summaryData={data.generatedContent?.summary} />
                    </TabsContent>
                    <TabsContent value="flashcards">
                        <FlashcardView originalFlashcards={data.generatedContent?.flashcards} />
                    </TabsContent>
                    <TabsContent value="quiz">
                        <QuizView quizQuestions={data.generatedContent?.quiz} />
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
}
