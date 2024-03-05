const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rshop-next-ecommerce.s3.amazonaws.com'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com'
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com'
      }
    ]
  }
};

module.exports = nextConfig;
