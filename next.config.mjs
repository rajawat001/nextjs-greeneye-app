const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'fr', 'es', 'ar', 'zh', 'ja'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  images: {
    domains: ['scontent.fjai6-1.fna.fbcdn.net'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  }
};

export default nextConfig;
