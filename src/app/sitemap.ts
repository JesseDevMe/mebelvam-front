import { MetadataRoute } from 'next'
import {fetchCategoriesSlug} from "@/entities/Category";
import {fetchSubcategoriesPath} from "@/entities/Subcategory";
import {fetchFurnituresId} from "@/entities/Furniture";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        const categoriesSlug: string[] = await fetchCategoriesSlug();
        const subcategoryPath: string[] = await fetchSubcategoriesPath();
        const furnituresId: number[] = await fetchFurnituresId();

        const categoriesMap: MetadataRoute.Sitemap = categoriesSlug.map(slug => ({
            url: 'https://mebelvam-sev.ru/catalog/' + slug,
            lastModified: new Date(),
            priority: 0.8,
        }));

        const subcategoriesMap: MetadataRoute.Sitemap = subcategoryPath.map(path => ({
            url: 'https://mebelvam-sev.ru/catalog/' + path,
            lastModified: new Date(),
            priority: 0.8,
        }));

        const furnituresMap: MetadataRoute.Sitemap = furnituresId.map(id => ({
            url: 'https://mebelvam-sev.ru/product/' + id,
            lastModified: new Date(),
            priority: 0.6,
        }));

        const sitemap: MetadataRoute.Sitemap = [
            {
                url: 'https://mebelvam-sev.ru',
                lastModified: new Date(),
                priority: 1,
            },
            {
                url: 'https://mebelvam-sev.ru/catalog',
                lastModified: new Date(),
                priority: 0.8,
            },
            {
                url: 'https://mebelvam-sev.ru/catalog/collections',
                lastModified: new Date(),
                priority: 0.4,
            },
            {
                url: 'https://mebelvam-sev.ru/catalog/promos',
                lastModified: new Date(),
                priority: 0.4,
            },
            ...categoriesMap,
            ...subcategoriesMap,
            ...furnituresMap,
        ]

        return sitemap;
    } catch (e) {
        console.log(new Date() + ': fetch dynamic data for sitemap failed.');
        return [];
    }
}