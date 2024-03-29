/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_HOST: process.env.API_HOST || "localhost",
        API_PORT: process.env.API_PORT || "8080",
      },
};

export default nextConfig;
