import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const userCount = await prisma.user.count();
    const documentCount = await prisma.parsedDocument.count();
    console.log(`Number of users: ${userCount}, number of documents parsed: ${documentCount}`)

    return NextResponse.json({
      totalUsers: userCount,
      totalParsedDocuments: documentCount,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}