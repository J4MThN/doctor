import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fedialife.ir",
      },
      // فقط اگه لازم شد برای تست لوکال بک‌اند:
      // {
      //   protocol: "https",
      //   hostname: "localhost",
      //   port: "4259",
      // },
    ],
  },
};

export default nextConfig;