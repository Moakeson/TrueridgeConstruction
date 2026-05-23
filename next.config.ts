import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoBasePath = "/TrueridgeConstruction";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? repoBasePath : "",
  },
  ...(isGithubPages
    ? {
        output: "export",
        basePath: repoBasePath,
        assetPrefix: `${repoBasePath}/`,
        trailingSlash: true,
      }
    : {}),
  images: {
    unoptimized: isGithubPages,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
