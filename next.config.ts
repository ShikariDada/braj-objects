import type { NextConfig } from "next";

// Permanent-link build (GitHub Pages): PAGES_EXPORT=1 switches to a fully
// static export under the /braj-objects subpath with unoptimized images.
// Normal dev/prod builds are untouched (no basePath, optimized images).
const isPagesExport = process.env.PAGES_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isPagesExport
    ? {
        output: "export" as const,
        basePath: "/braj-objects",
        images: { unoptimized: true },
      }
    : {
        images: {
          formats: ["image/avif", "image/webp"],
        },
      }),
  experimental: {
    optimizePackageImports: ["three", "@react-three/fiber", "@react-three/drei"],
  },
};

export default nextConfig;
