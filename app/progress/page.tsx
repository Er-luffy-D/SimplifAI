export const dynamic = "force-dynamic";

import React from "react";
import { AnimatedBackground } from "@/components/animated-background";
import { UserLabel } from "@/components/user-label";
import StatusBar from "@/components/stats-bar";
import { prisma } from "@/lib/prisma";
import RecentActivity from "@/components/recent-activity";
import ChartAreaClient from "@/components/docsbarchartclient";
import { SectionCards } from "@/components/personalDetails";
import Link from "next/link";
import { ProgressSection } from "@/components/ProgressSection";
import Image from "next/image";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Progress = async () => {
	const session = await getServerSession(authOptions);
	if (!session?.user?.email) {
		return <div>Please log in</div>;
	}

	const user = await prisma.user.findUnique({
		where: { email: session.user.email },
	});

	if (!user) {
		return <div>No user found</div>;
	}
	return (
		<div className="w-full">
			<div>
				<AnimatedBackground />
				<UserLabel />
				<ProgressSection user={user} />
			</div>

			<div className="px-4 py-12 mx-auto relative z-10 max-w-full">
				<div
					className="relative bg-gradient-to-br from-primary/10 via-purple-50/50 to-pink-50/30 
                    dark:from-primary/5 dark:via-purple-950/20 dark:to-pink-950/10 
                    pt-16 sm:pt-20 pb-8 sm:pb-16 overflow-hidden 
                    p-4 sm:p-6 rounded-lg shadow-lg flex flex-col lg:flex-row 
                    items-start lg:items-center justify-start mx-auto gap-6 lg:gap-10"
				>
					<div className="bg-background w-full lg:w-1/3 rounded-2xl p-6 sm:p-10 border-4">
						<div className="bg-background w-full rounded-2xl p-6 border-4 flex flex-col items-center justify-center gap-4 text-center">
							<h1 className="break-words text-sm sm:text-base">
								{user.image && (
									<Image
										src={user.image}
										alt={user.name || "User Avatar"}
										width={80}
										height={80}
										className="rounded-full object-cover"
									/>
								)}
							</h1>
							<h1 className="font-bold text-xl sm:text-2xl truncate w-full">{user.name}</h1>
							<h1 className="font-bold text-sm sm:text-lg break-words max-w-full">{user.email}</h1>
							<p className="text-xs sm:text-sm break-words">Created At: {user.createdAt.toLocaleDateString()}</p>
							<p className="text-xs sm:text-sm break-words">Last updated: {user.updatedAt.toLocaleDateString()}</p>
						</div>
					</div>

					<div className="bg-background w-full lg:w-2/3 rounded-2xl p-6 sm:p-10 border-4 flex flex-col md:flex-row gap-6 overflow-auto">
						<div className="bg-background rounded-2xl p-6 sm:p-10 border-4 w-full md:w-1/2">
							<h1 className="text-center font-bold text-lg sm:text-2xl mb-6 sm:mb-10">Your Progress</h1>
							<StatusBar />
							<SectionCards />
						</div>

						<div className="w-full md:w-1/2">
							<RecentActivity />
						</div>
					</div>
				</div>

				<div className="mx-auto w-full bg-background justify-center items-center p-6 sm:p-10 mt-10 rounded-2xl border-4 overflow-auto">
					<div>
						<h2 className="text-lg sm:text-xl font-bold mb-4">Documents Overview</h2>
						<ChartAreaClient />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Progress;
