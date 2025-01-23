import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"], // Firebase Storage domenini qo'shing
  },
};

export default nextConfig;
