import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function DELETE() {
	const session = await getServerSession(authOptions);
	if (!session || !session.user?.email) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		await prisma.user.delete({
			where: { email: session.user.email },
		});
		return NextResponse.json({ message: "Profile deleted" }, { status: 200 });
	} catch {
		return NextResponse.json({ error: "Failed to delete profile" }, { status: 500 });
	}
}
