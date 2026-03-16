import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

initOpenNextCloudflareForDev()

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
