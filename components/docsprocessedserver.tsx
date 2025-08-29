
import { prisma } from "@/lib/prisma";
import { getDocStats } from "@/lib/getDocStats";
import ChartAreaClient from "./docsprocessedclient";

export const description = "Total Documents per Month";

export  async function ChartAreaDefault() {
    const user = await prisma.user.findUnique({
        where: { email: "test@test.com" },
        select: { id: true },
    });

    if (!user) throw new Error("User not found");

    const stats = await getDocStats(user.id);

    const chartData = stats.monthlyDocs.map(m => ({
        month: m.month.trim(),
        desktop: m.count
    }));

    return <ChartAreaClient stats={stats} chartData={chartData} />;
}
