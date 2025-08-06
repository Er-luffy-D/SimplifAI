import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
	/* config options here */
	serverExternalPackages: ["pdf-parse", "chromadb"],
	
	webpack: (config: any) => {
		config.resolve.alias = {
			...config.resolve.alias,
			"@": path.resolve(__dirname, "."), // Changed from "src" to "."
		};
		config.externals.push({
			chromadb: "chromadb",
		});
		return config;
	},
};

export default nextConfig;
