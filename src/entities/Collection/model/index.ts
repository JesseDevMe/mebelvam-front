import {fetchStrapi} from "@/shared/API";
import {Collection, CollectionMini, CollectionsMeta, CollectionsResponse} from "@/entities/Collection/types";
import {FurnitureMini} from "@/entities/Furniture";


export async function fetchCollections(): Promise<CollectionsResponse> {
    const res = await fetchStrapi('/collections?fields[0]=name&populate[images][fields][0]=url');

    if (!res.ok) {
        throw new Error('collections fetch error');
    }

    const { data, meta } = await res.json();

    const collections: CollectionMini[] = data.map((collection: any): CollectionMini => {
        return {
            id: collection.id,
            name: collection.attributes.name,
            imageUrl: process.env.STRAPI_URL + collection.attributes.images.data[0].attributes.url,
        }
    })

    const collectionsMeta: CollectionsMeta = {
        page: meta.pagination.page,
        pageCount: meta.pagination.pageCount,
    }

    return {
        collections,
        meta: collectionsMeta,
    }
}

export async function fetchCollection(id: number): Promise<Collection> {
    const res = await fetchStrapi(`/collections/${id}?populate[images][fields][0]=url&populate[manufacturer][fields][0]=name&populate[materials][fields][0]=title&populate[furnitures][populate][images][fields]=url&populate[furnitures][populate][variants][populate]=*`);

    if (!res.ok) {
        throw new Error('collection fetch error')
    }

    const { data } = await res.json();

    const collection: Collection = {
        id: data.id,
        name: data.attributes.name,
        description: data.attributes.description,
        materials: data.attributes.materials.data.map((material: any) => material.attributes.title),
        manufacturer: data.attributes.manufacturer.data.attributes.name,
        imagesUrl: data.attributes.images.data.map((image:any) => process.env.STRAPI_URL + image.attributes.url),
        modules: data.attributes.furnitures.data.map((furniture: any): FurnitureMini => {
            return {
                id: furniture.id,
                name: furniture.attributes.name,
                price: Number(furniture.attributes.under_price),
                imagesUrl: furniture.attributes.images.data.map((image:any) => process.env.STRAPI_URL + image.attributes.url),
                colors: furniture.attributes.variants.map((variant: any): string => variant.color),
                sizes: furniture.attributes.variants.flatMap((variant: any): string[] => variant.attributes.map((attribute: any):string => `${attribute.width}x${attribute.height}${attribute.depth ? 'x' + attribute.depth : ''}`)).filter((value: string, index: number, array: string[]) => array.indexOf(value) === index),
                firstVariantId: furniture.attributes.variants[0].id,
                firstAttrId: furniture.attributes.variants[0].attributes[0].id,
            }
        })
    }


    return collection;
}