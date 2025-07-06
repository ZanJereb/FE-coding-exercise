import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          'https://h49q2nbrwe.execute-api.eu-central-1.amazonaws.com/HiringTest/:path*'
      },
    ];
  },
};

export default nextConfig;
