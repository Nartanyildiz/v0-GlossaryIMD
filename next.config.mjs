/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vous pouvez soit:
  // 1. Garder output: 'export' et utiliser generateStaticParams
  output: 'export',
  
  // 2. OU commenter/supprimer la ligne ci-dessus pour utiliser le rendu côté serveur
  // ce qui est plus adapté pour un dictionnaire qui pourrait s'agrandir
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
