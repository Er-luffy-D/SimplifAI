import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUploader } from "@/components/file-uploader";
import { Features } from "@/components/features";
import { HeroSection } from "@/components/hero-section";
import { AnimatedBackground } from "@/components/animated-background";
import { UserLabel } from "@/components/user-label";
import OmniDimWidget from "@/components/Omnidev";

export default function Home() {
	return (
		<div className="flex flex-col relative">
			<AnimatedBackground />
			<UserLabel />
			<HeroSection />
			<div className="container px-4 py-12 mx-auto relative z-10">
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					<Features />
				</div>
				<div className="max-w-3xl mx-auto mt-16">
					<Card className="border-2 border-dashed backdrop-blur-sm bg-card/80 hover:bg-card/90 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary/10">
						<CardHeader className="text-center">
							<CardTitle className="text-2xl font-bold text-gradient-purple-pink">Upload Your Document</CardTitle>
							<CardDescription>
								PDF and TXT files up to 10MB{" "}
								<span className="font-semibold text-foreground">(ideally &lt; 2MB for speed)</span>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<FileUploader />
						</CardContent>
						<CardFooter className="flex justify-center text-sm text-muted-foreground">
							🔒 Your files are securely processed and never shared with third parties
						</CardFooter>
					</Card>
				</div>
				<OmniDimWidget />
			</div>
		</div>
	);
}
