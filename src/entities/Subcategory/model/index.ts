import {fetchStrapi} from "@/shared/API";
import {Subcategory} from "@/entities/Subcategory";

export async function fetchSubcategories(id: number): Promise<Subcategory[]> {
    const res = await fetchStrapi('/subcategories?populate[0]=image&populate[1]=category&filters[category][id]='+ id);

    if (!res.ok) {
        throw new Error('Subcategories fetch error')
    }

    const { data } = await res.json();

    const subcategories: Subcategory[] = data.map((subcategoryData: any): Subcategory => {
        return {
            id: subcategoryData.id,
            slug: subcategoryData.attributes.slug,
            name: subcategoryData.attributes.title,
            imgUrl: process.env.STRAPI_URL + subcategoryData.attributes.image.data.attributes.url,
            categoryId: subcategoryData.attributes.category.data.id,
        }
    })

    return subcategories;
}

export async function fetchSubcategory(id: number): Promise<Subcategory> {
    const res = await fetchStrapi('/subcategories/'+ id + '?populate=*');

    if (!res.ok) {
        throw new Error('Subcategory fetch error')
    }

    const { data } = await res.json();

    const subcategory: Subcategory = {
        id: data.id,
        slug: data.attributes.slug,
        name: data.attributes.title,
        imgUrl: process.env.STRAPI_URL + data.attributes.image.data.attributes.url,
        categoryId: data.attributes.category.data.id
    }

    return subcategory;
}

export async function fetchSubcategoriesPath(): Promise<string[]> {
    const res =
        await fetchStrapi('/subcategories?fields=slug&populate[category][fields]=slug&pagination[limit]=-1');

    if (!res.ok) {
        throw new Error(await res.json());
    }

    const { data } = await res.json();

    return data.map((subcategory: any): string =>
        subcategory.attributes.category.data.attributes.slug + '-' +
        subcategory.attributes.category.data.id + '/' +
        subcategory.attributes.slug + '-' +
        subcategory.id
    )
}