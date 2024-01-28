/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'replicate.com'
      },
      {
        protocol: 'https',
        hostname: 'replicate.delivery'
      },
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net'
      }
    ]
  }
};

export default nextConfig;
