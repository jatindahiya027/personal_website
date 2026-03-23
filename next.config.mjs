/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",       // static HTML export for GitHub Pages
  images: {
    unoptimized: true,    // required for static export (no Next server for image API)
  },
  trailingSlash: true,    // GitHub Pages friendly URLs
};

export default nextConfig;
