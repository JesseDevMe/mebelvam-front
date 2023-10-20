import {fetchStrapi} from "@/shared/API";
import {Furniture, FurnitureMini, Furnitures, variant} from "@/entities/Furniture";
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
    const manufacturerQuery = params.manufacturer && params.manufacturer.map((manufacturerId, index) => `&filters[manufacturer][id][$in][${index}]=${manufacturerId}`).join();


    const res = await fetchStrapi(`/furnitures?fields[0]=name&fields[1]=under_price&filters[subcategory][id]=${subcategoryId}&populate[0]=images&populate[1]=variants.attributes&pagination[page]=${params.page}&pagination[pageSize]=25${filtersQuery}${widthQuery ? widthQuery : ''}${heightQuery ? heightQuery : ''}${depthQuery ? depthQuery : ''}${priceQuery ? priceQuery : ''}${manufacturerQuery ? manufacturerQuery : ''}${params.sort ? '&sort=under_price:' + params.sort : ''}`);

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
        }
    })

    // const uniqueSizesSet = new Set<string>();
    // const filteredFurnitures = furnitures.filter((furniture): boolean => {
    //     if (!uniqueSizesSet.has(furniture.size + furniture.id)) {
    //         uniqueSizesSet.add(furniture.size + furniture.id);
    //         return true;
    //     } else {
    //         return false;
    //     }
    // });

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
                color: variant_e.color,
                attributes: variant_e.attributes.map( (attribute:any) => {
                    return {
                        price: attribute.price,
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
