import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/my', '/policy', '/search', '/cart', '/favorites', '/connect', '/api', '/admin'],
        },
        sitemap: 'https://mebelvam-sev.ru/sitemap.xml',
    }
}