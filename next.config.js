/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: process.env.STRAPI_HOST,
                port: process.env.STRAPI_PORT,
            },
        ],
    }
}

module.exports = nextConfig
