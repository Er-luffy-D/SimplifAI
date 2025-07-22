import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const userCount = await prisma.user.count();
    const documentCount = await prisma.parsedDocument.count();
    const flashcards = await prisma.parsedDocument.count() * 4;
    console.log(`Number of users: ${userCount}, number of documents parsed: ${documentCount}, number of flashcards created: ${flashcards}`)

    return NextResponse.json({
      totalUsers: userCount,
      totalParsedDocuments: documentCount,
      totalFlashcards: flashcards
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}