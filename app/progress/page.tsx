import React from 'react'
import { HeroSection } from "@/components/hero-section-2";
import { AnimatedBackground } from "@/components/animated-background";
import { UserLabel } from "@/components/user-label";
import StatusBar from "@/components/stats-bar";
import { prisma } from "@/lib/prisma";
import RecentActivity from '@/components/recent-activity';
import ChartAreaClient from '@/components/docsbarchartclient';
import { SectionCards } from "@/components/personalDetails";
import Link from 'next/link';

const progress = async () => {
    const user = await prisma.user.findMany();

    return (
        <div>

            <div>
                <AnimatedBackground />
                <UserLabel />
                <HeroSection />
            </div>

            <div className="px-4 py-12 mx-auto relative z-10 max-w">

                <div className="relative bg-gradient-to-br from-primary/10 via-purple-50/50 to-pink-50/30 dark:from-primary/5 dark:via-purple-950/20 dark:to-pink-950/10 
                    pt-16 sm:pt-20 pb-8 sm:pb-16 overflow-hidden p-4 sm:p-6 rounded-lg shadow-lg 
                    flex flex-col lg:flex-row items-start lg:items-center justify-start mx-auto gap-6 lg:gap-10">


                    <div className="bg-background w-full lg:w-1/3 rounded-2xl p-6 sm:p-10 border-4">
                        <div className="bg-background w-full rounded-2xl p-6 border-4 flex flex-col items-center justify-center gap-4">
                            <h1>{user[0].image}</h1>
                            <h1 className="font-bold text-xl sm:text-2xl">{user[0].name}</h1>
                            <h1 className="font-bold text-sm sm:text-lg break-all">{user[0].email}</h1>
                            <p className="text-sm sm:text-base">Created At: {user[0].createdAt.toLocaleDateString()}</p>
                            <p className="text-sm sm:text-base">Last updated: {user[0].updatedAt.toLocaleDateString()}</p>


                            <div className="flex gap-4 mt-4 flex-wrap justify-center">

                                <Link href="https://x.com/home">
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
                                    </svg>
                                </Link>

                            </div>
                        </div>
                    </div>


                    <div className="bg-background w-full lg:w-2/3 rounded-2xl p-6 sm:p-10 border-4 flex flex-col md:flex-row gap-6 overflow-auto">

                        <div className="bg-background rounded-2xl p-6 sm:p-10 border-4 w-full md:w-1/2">
                            <h1 className="text-center font-bold text-lg sm:text-2xl mb-6 sm:mb-10">Your Progress</h1>
                            <StatusBar />
                            <SectionCards />
                        </div>

                        <div className="w-full  md:w-1/2">
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
    )
}

export default progress
