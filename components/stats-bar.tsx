// app/dashboard/page.tsx
import { prisma } from "@/lib/prisma";
import { getDocStats } from "@/lib/getDocStats";


export default async function StatusBar() {




    // ✅ Get userId from DB using email
    const user = await prisma.user.findUnique({
        where: { email: "test@test.com" },
        select: { id: true },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const userId = user.id;
    const stats = await getDocStats(userId);

    return (
        <>



            <div className="grid grid-cols-5 gap-4  p-4 rounded-lg shadow ">


                <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">{stats.totalDocs}</span>
                    <span className="text-xs text-gray-500">Total Docs</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-green-600">{stats.generated}</span>
                    <span className="text-xs text-gray-500">Generated</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-yellow-500">{stats.pending}</span>
                    <span className="text-xs text-gray-500">Pending</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-blue-500">{stats.shared}</span>
                    <span className="text-xs text-gray-500">Shared</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-sm">{stats.lastActive ? stats.lastActive.toLocaleDateString() : "—"}</span>
                    <span className="text-xs text-gray-500">Last Active</span>
                </div>
            </div>
        </>

    );
}
