"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type summary = {
    mainPoints: { keyPoint: string }[];
    keyInsights: string;
    recommendations: { statement: string }[];
};

export function SummaryView({ summaryData }: { summaryData?: summary | null }) {
    if (!summaryData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-muted-foreground">No summary data available.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Main Points</CardTitle>
                    <CardDescription>Key concepts extracted from your document</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {summaryData.mainPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="flex items-center justify-center w-6 h-6 text-xs font-medium rounded-full bg-primary/10 text-primary">
                                    {index + 1}
                                </span>
                                <span>{point.keyPoint}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Key Insights</CardTitle>
                    <CardDescription>The core message of the document</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{summaryData.keyInsights}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                    <CardDescription>Suggested actions based on the document</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {summaryData.recommendations.map((recommendation, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="flex items-center justify-center w-6 h-6 text-xs font-medium rounded-full bg-primary/10 text-primary">
                                    {index + 1}
                                </span>
                                <span>{recommendation.statement}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
