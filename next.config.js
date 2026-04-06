/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para producción
  productionBrowserSourceMaps: false,
  
  // Optimización de imágenes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
