import { prisma } from "@/lib/prisma"
import ChartAreaClient from "./docsbarchartclient"

export default async function DocsProcessedServer() {
  const docs = await prisma.parsedDocument.findMany({
    select: {
      createdAt: true,
      generationStatus: true,
    },
  })

 
  const grouped: Record<string, { total: number; success: number; pending: number }> = {}

  docs.forEach(doc => {
    const dateKey = doc.createdAt.toISOString().split("T")[0]

    if (!grouped[dateKey]) {
      grouped[dateKey] = { total: 0, success: 0, pending: 0 }
    }

    grouped[dateKey].total += 1

    if (doc.generationStatus === "success") {
      grouped[dateKey].success += 1
    } else if (doc.generationStatus === "processing") {
      grouped[dateKey].pending += 1
    }
  })

  const chartData = Object.entries(grouped)
    .map(([date, counts]) => ({
      date,
      total: counts.total,
      success: counts.success,
      pending: counts.pending,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return <ChartAreaClient chartData={chartData} />
}
