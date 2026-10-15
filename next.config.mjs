/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@xenova/transformers', 'sharp', 'onnxruntime-node'],
  },
};

export default nextConfig;
