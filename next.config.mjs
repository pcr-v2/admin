/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  productionBrowserSourceMaps: false,
  experimental: {
    scrollRestoration: true,
    esmExternals: "loose",
  },
  webpack(config) {
    const imageLoaderRule = config.module.rules.find(
      (rule) => rule.loader === "next-image-loader",
    );
    config.module.rules.unshift({
      test: /\.svg$/,
      issuer: imageLoaderRule.issuer,
      dependency: imageLoaderRule.dependency,
      resourceQuery: imageLoaderRule.resourceQuery,
      use: [
        { loader: "@svgr/webpack" },
        { loader: "next-image-loader", options: imageLoaderRule.options },
      ],
    });
    return config;
  },
};

export default nextConfig;
