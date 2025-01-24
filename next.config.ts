import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com","gravatar.com","lh3.googleusercontent.com"], // Firebase Storage domenini qo'shing
  },
};

export default nextConfig;
