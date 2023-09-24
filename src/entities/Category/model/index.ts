import {Category} from "@/entities/Category";
import {fetchStrapi} from "@/shared/API";

export async function fetchCategories(): Promise<Category[]> {
    const res = await fetchStrapi('/categories?populate[0]=image');

    if (!res) {
        throw new Error('Categories fetch error')
    }

    const { data } = await res.json();

    const categories: Category[] = data.map((categoryData: any): Category => {
        return {
            id: categoryData.id,
            slug: categoryData.attributes.slug,
            name: categoryData.attributes.title,
            imgUrl: process.env.STRAPI_URL + categoryData.attributes.image.data.attributes.url,
        }
    })

    return categories;
}

export async function fetchCategory(id: number): Promise<Category> {
    const res = await fetchStrapi('/categories/' + id + "?populate=*");

    if (!res) {
        throw new Error('Category fetch error')
    }

    const { data } = await res.json();

    const category: Category = {
        id: data.id,
        slug: data.attributes.slug,
        name: data.attributes.title,
        imgUrl: process.env.STRAPI_URL + data.attributes.image.data.attributes.url,
    }

    return category;
}