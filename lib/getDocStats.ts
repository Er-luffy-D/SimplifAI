import { prisma } from "@/lib/prisma";

export async function getDocStats(userId: string) {
    const [
        totalDocs,
        generated,
        pending,
        shared,
        lastActiveDoc,
        recentDocs,
        allCreatedDates
    ] = await Promise.all([
        prisma.parsedDocument.count({
            where: { userId },
        }),
        prisma.parsedDocument.count({
            where: { userId, generationStatus: "success" },
        }),
        prisma.parsedDocument.count({
            where: { userId, generationStatus: "processing" },
        }),
        prisma.parsedDocument.count({
            where: { userId, shared: true },
        }),
        prisma.parsedDocument.findFirst({
            where: { userId },
            orderBy: { updatedAt: "desc" },
            select: { updatedAt: true },
        }),
        prisma.parsedDocument.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            take: 5,
            select: {
                id: true,
                docName: true,
                createdAt: true,
                generationStatus: true
            }
        }),
        prisma.parsedDocument.findMany({
            where: { userId },
            select: { createdAt: true }
        })
    ]);

    // Aggregate docs by month/year
    const monthlyDocs = allCreatedDates.reduce((acc, { createdAt }) => {
        const monthName = createdAt.toLocaleString("default", { month: "long" });
        const year = createdAt.getFullYear();
        const key = `${monthName} ${year}`;
        const existing = acc.find(m => m.month === key);
        if (existing) {
            existing.count += 1;
        } else {
            acc.push({ month: key, count: 1 });
        }
        return acc;
    }, [] as { month: string; count: number }[]);

    return {
        totalDocs,
        generated,
        pending,
        shared,
        lastActive: lastActiveDoc?.updatedAt || null,
        recentDocs,
        monthlyDocs
    };
}
