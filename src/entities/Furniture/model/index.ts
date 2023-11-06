import {fetchStrapi} from "@/shared/API";
import {attr, Furniture, FurnitureMini, Furnitures, FurnitureWithVariant, variant} from "@/entities/Furniture";
import {min_max} from "@/widgets/Filters/store/useSizesStore";

function getFiltersUrl(customFilters: string[][]): string {
    let url = '';
    customFilters.forEach((values, indexS) => {
        values.map((value, index) => {
            url += `&filters[$and][${indexS}][specific_values][id][$in][${index}]=${value}`
        })
    })

    return url;
}

export type Params = {
    page?: string;
    sort?: 'asc' | 'desc' | null;
    customFilters?: string[][];
    width?: min_max;
    height?: min_max;
    depth?: min_max;
    price?: min_max;
    manufacturer?: string[];
    color?: string[];
}

const defaultParams: Params = {
    page: '1',
}

export async function fetchFurnituresBySub(subcategoryId: number, params: Params = defaultParams): Promise<Furnitures> {

    let filtersQuery = '';
    if (params.customFilters) {
        filtersQuery = getFiltersUrl(params.customFilters);
    }

    const widthQuery = params.width && `&filters[variants][attributes][width][$between][0]=${params.width.min}&filters[variants][attributes][width][$between][1]=${params.width.max}`;
    const heightQuery = params.height && `&filters[variants][attributes][height][$between][0]=${params.height.min}&filters[variants][attributes][height][$between][1]=${params.height.max}`;
    const depthQuery = params.depth && `&filters[variants][attributes][depth][$between][0]=${params.depth.min}&filters[variants][attributes][depth][$between][1]=${params.depth.max}`;

    const priceQuery = params.price && `&filters[variants][attributes][price][$between][0]=${params.price.min}&filters[variants][attributes][price][$between][1]=${params.price.max}`;
    const manufacturerQuery = params.manufacturer && params.manufacturer.map((manufacturerId, index) => `&filters[manufacturer][id][$in][${index}]=${manufacturerId}`).join('');
    const colorQuery = params.color && params.color.map((colorId, index) => `&filters[colors][id][$in][${index}]=${colorId}`).join('');

    const res = await fetchStrapi(`/furnitures?fields[0]=name&fields[1]=under_price&filters[subcategory][id]=${subcategoryId}&populate[0]=images&populate[1]=variants.attributes&pagination[page]=${params.page}&pagination[pageSize]=25${filtersQuery}${widthQuery ? widthQuery : ''}${heightQuery ? heightQuery : ''}${depthQuery ? depthQuery : ''}${priceQuery ? priceQuery : ''}${manufacturerQuery ? manufacturerQuery : ''}${params.color ? colorQuery : ''}${params.sort ? '&sort=under_price:' + params.sort : ''}`);

    if (!res.ok) {
        throw new Error('furnitures fetch error');
    }

    const { data, meta } = await res.json();


    const furnitures: FurnitureMini[] = data.map((furniture: any): FurnitureMini => {
        return {
            id: furniture.id,
            name: furniture.attributes.name,
            colors: furniture.attributes.variants.map((variant: any): string => variant.color),
            sizes: furniture.attributes.variants.flatMap((variant: any): string[] => variant.attributes.map((attribute: any):string => `${attribute.width}x${attribute.height}${attribute.depth ? 'x' + attribute.depth : ''}`)).filter((value: string, index: number, array: string[]) => array.indexOf(value) === index),
            price: Number(furniture.attributes.under_price),
            imagesUrl: furniture.attributes.images.data.map((image:any): string => process.env.STRAPI_URL + image.attributes.url),
            firstVariantId: furniture.attributes.variants[0].id,
            firstAttrId: furniture.attributes.variants[0].attributes[0].id,
        }
    })

    return {
        data: furnitures,
        meta: meta,
    }
}

export async function fetchFurniture(id: number): Promise<Furniture> {
    const res =
        await fetchStrapi(`/furnitures/${id}?populate[0]=images&populate[1]=materials&populate[2]=manufacturer&populate[3]=subcategory.category&populate[4]=collection&populate[5]=modules&populate[6]=variants.attributes`);

    if (!res.ok) {
        throw new Error('furniture fetch error');
    }

    const { data } = await res.json();

    const furniture: Furniture = {
        id: data.id,
        name: data.attributes.name,
        description: data.attributes.description,
        manufacturer: data.attributes.manufacturer.data.attributes.name,
        materials: data.attributes.materials.data.map((material: any): string => material.attributes.title),
        imagesUrl: data.attributes.images.data.map((image:any): string => process.env.STRAPI_URL + image.attributes.url),
        collectionId: data.attributes.collection.data?.id,
        subcategory: {
            id: data.attributes.subcategory.data.id,
            name: data.attributes.subcategory.data.attributes.title,
            slug: data.attributes.subcategory.data.attributes.slug,
            category: {
                id: data.attributes.subcategory.data.attributes.category.data.id,
                slug: data.attributes.subcategory.data.attributes.category.data.attributes.slug,
                name: data.attributes.subcategory.data.attributes.category.data.attributes.title,
            }
        },
        variants: data.attributes.variants.map( (variant_e:any): variant => {
            return {
                id: variant_e.id,
                color: variant_e.color,
                attributes: variant_e.attributes.map( (attribute:any): attr => {
                    return {
                        id: attribute.id,
                        price: attribute.price,
                        old_price: attribute.old_price,
                        width: attribute.width,
                        height: attribute.height,
                        depth: attribute.depth,
                    }
                } )
            }
        } ),
    }

    return furniture;
}

export async function fetchFurnitures(ids: string[] | null | undefined): Promise<FurnitureMini[]> {
    if (!ids) return [];

    const idQuery = ids.map((id, index) => `&filters[id][$in][${index}]=${id}`).join('')

    const res = await fetchStrapi(`/furnitures?fields[0]=name&fields[1]=under_price&populate[images][fields][0]=url&populate[variants][populate]=attributes${idQuery}`);

    if (!res.ok) throw new Error('furnitures by ids fetch error');

    const { data } = await res.json();

    const furnitures: FurnitureMini[] = data.map((furniture: any): FurnitureMini => {
        return {
            id: furniture.id,
            name: furniture.attributes.name,
            colors: furniture.attributes.variants.map((variant: any): string => variant.color),
            sizes: furniture.attributes.variants.flatMap((variant: any): string[] => variant.attributes.map((attribute: any):string => `${attribute.width}x${attribute.height}${attribute.depth ? 'x' + attribute.depth : ''}`)).filter((value: string, index: number, array: string[]) => array.indexOf(value) === index),
            price: Number(furniture.attributes.under_price),
            imagesUrl: furniture.attributes.images.data.map((image:any): string => process.env.STRAPI_URL + image.attributes.url),
            firstVariantId: furniture.attributes.variants[0].id,
            firstAttrId: furniture.attributes.variants[0].attributes[0].id,
        }
    })

    return furnitures;
}


export async function fetchFurnituresWithVariants(ids: number[] | null | undefined): Promise<FurnitureWithVariant[]> {
    if (!ids) return [];

    const idQuery = ids.map((id, index) => `&filters[id][$in][${index}]=${id}`).join('')

    const res = await fetchStrapi(`/furnitures?fields[0]=name&populate[images][fields][0]=url&populate[variants][populate]=attributes${idQuery}`);

    if (!res.ok) throw new Error('furnitures with variants fetch by ids error');

    const { data } = await res.json();

    const furnitures: FurnitureWithVariant[] = data.map((furniture: any): FurnitureWithVariant => {
        return {
            id: furniture.id,
            name: furniture.attributes.name,
            imageUrl: process.env.STRAPI_URL + furniture.attributes.images.data[0].attributes.url,
            variants: furniture.attributes.variants.map((variant: any): variant => ({
                id: variant.id,
                color: variant.color,
                attributes: variant.attributes.map((attr: any): attr => ({
                    id: attr.id,
                    price: attr.price,
                    old_price: attr.old_price,
                    width: attr.width,
                    height: attr.height,
                    depth: attr.depth,
                }))
            }))
        }
    })

    return furnitures;
}