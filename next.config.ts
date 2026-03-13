import type { NextConfig } from "next";

function getUmamiProxyTargets() {
  const rawScriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL?.trim();
  if (!rawScriptUrl) return null;

  try {
    const scriptUrl = new URL(rawScriptUrl);
    const scriptDestination = `${scriptUrl.origin}${scriptUrl.pathname}${scriptUrl.search}`;

    let sendPath = "/api/send";
    if (scriptUrl.pathname.endsWith("/script.js")) {
      const basePath = scriptUrl.pathname.replace(/\/script\.js$/, "");
      sendPath = `${basePath}/api/send`;
    }

    const sendDestination = `${scriptUrl.origin}${sendPath}`;

    return { scriptDestination, sendDestination };
  } catch {
    return null;
  }
}

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  reactCompiler: true,
  reactStrictMode: false,
  transpilePackages: ["next-mdx-remote"],
  async redirects() {
    return [
      {
        source: "/r/:path([^.]*)",
        destination: "/r/:path.json",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const umamiProxyTargets = getUmamiProxyTargets();
    if (!umamiProxyTargets) return [];

    return [
      {
        source: "/metrics/lib.js",
        destination: umamiProxyTargets.scriptDestination,
      },
      {
        source: "/metrics/api/send",
        destination: umamiProxyTargets.sendDestination,
      },
    ];
  },
  outputFileTracingIncludes: {
    "/*": ["./src/registry/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
      },
    ],
  },
};

export default nextConfig;
