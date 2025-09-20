// ChartAreaClient.tsx — Client Component
"use client";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig: ChartConfig = {
    desktop: {
        label: "Total Docs",
        color: "var(--chart-1)",
    },
};
type ChartAreaClientProps = {
    stats: {
        totalDocs: number;
        monthlyDocs: { month: string; count: number }[];
    };
    chartData: { month: string; desktop: number }[];
};

export default function ChartAreaClient({ stats, chartData }: ChartAreaClientProps) {
    return (
        <>
        <h1>Total Documents Processed</h1>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ left: 12, right: 12}}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            dataKey="desktop"
                            type="natural"
                            fill="#db2777"
                            fillOpacity={0.4}
                            stroke="#ffffff"
                        />
                    </AreaChart>
                </ChartContainer>
                </>
            
    );
}
