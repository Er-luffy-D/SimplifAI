import React from 'react'
import { prisma } from "@/lib/prisma";
import { getDocStats } from "@/lib/getDocStats";

export const RecentActivity = async () => {
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
        <div className="p-4 rounded-lg shadow border-2 h-auto max-h-[40vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
            <ul className="divide-y divide-gray-200">
                {stats.recentDocs.length > 0 ? (
                    stats.recentDocs.map((doc) => (
                        <li key={doc.id} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="w-full sm:w-auto break-words">
                                <p className="font-medium text-gray-900 truncate max-w-[200px] sm:max-w-xs">{doc.docName}</p>
                                <p className="text-sm text-gray-500">
                                    {doc.createdAt.toLocaleDateString()} — {doc.generationStatus}
                                </p>
                            </div>
                            <div className="flex space-x-2 text-sm">
                                <button className="text-blue-500 hover:underline">View</button>
                                <button className="text-green-500 hover:underline">Share</button>
                                <button className="text-red-500 hover:underline">Delete</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">No recent activity</p>
                )}
            </ul>
        </div>
    )
}

export default RecentActivity
