/** @type {import('next').NextConfig} */

// const dotenv = require('dotenv');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.NEXT_PUBLIC_ANALYSE === 'true',
});

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['flagcdn.com'],
  },
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
