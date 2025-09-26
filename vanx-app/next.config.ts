const nextConfig = {
  experimental: {
    turbo: false,
  },
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8777',
        pathname: '/storage/**',
      },
    ],
    unoptimized: true,
  }
};

module.exports = nextConfig;
