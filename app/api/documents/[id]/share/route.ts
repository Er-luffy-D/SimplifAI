import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const token = await getToken({ req, secret: process.env.AUTH_SECRET });
        if (!token || !token.email) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
            });
        }

        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: "Document ID is required" }, { status: 400 });
        }

        const updatedDoc = await prisma.parsedDocument.updateMany({
            where: {
                id,
                user: { email: token.email },
            },
            data: { shared: true },
        });

        if (updatedDoc.count === 0) {
            return NextResponse.json({ error: "Document not found or not owned by user" }, { status: 404 });
        }
        return NextResponse.json(
            {
                message: "Document shared successfully",
                status: "success",
            },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error fetching document:", err);
        return NextResponse.json({ error: "Failed to fetch document" }, { status: 500 });
    }
}
