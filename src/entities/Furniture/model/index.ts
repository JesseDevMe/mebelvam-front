import {fetchStrapi} from "@/shared/API";
import {Furniture, FurnitureMini, Furnitures, variant} from "@/entities/Furniture";
import {getParamsString} from "@/shared/Utils";

export type Params = {
    page?: string | string[] | undefined;
}

const defaultParams: Params = {
    page: '1',
}

export async function fetchFurnituresBySub(subcategoryId: number, params: Params = defaultParams): Promise<Furnitures> {

    const paramsString = getParamsString(params);

    const res = await fetchStrapi(`/furnitures?fields[0]=name&filters[subcategory][id]=${subcategoryId}&populate[0]=images&populate[1]=sizes&populate[2]=materials&populate[3]=manufacturer&populate[4]=variants.attributes${paramsString}`);

    if (!res.ok) {
        throw new Error('furnitures fetch error');
    }

    const { data, meta } = await res.json();


    const furnitures: FurnitureMini[] = data.flatMap((furniture: any): FurnitureMini[] => {
        return furniture.attributes.variants.flatMap((variant: any): FurnitureMini[] => {
            return variant.attributes.map((attribute: any): FurnitureMini => {
                return {
                    id: furniture.id,
                    name: furniture.attributes.name,
                    manufacturer: furniture.attributes.manufacturer.data.attributes.name,
                    materials: furniture.attributes.materials.data.map((material:any): string => material.attributes.title),
                    size: `${attribute.width}x${attribute.height}${attribute.depth ? 'x'+attribute.depth : ''}`,
                    price: attribute.price,
                    imagesUrl: furniture.attributes.images.data.map((image:any): string => process.env.STRAPI_URL + image.attributes.url)
                }
            } )
        })
    })

    const uniqueSizesSet = new Set<string>();
    const filteredFurnitures = furnitures.filter((furniture): boolean => {
        if (!uniqueSizesSet.has(furniture.size)) {
            uniqueSizesSet.add(furniture.size);
            return true;
        } else {
            return false;
        }
    });

    return {
        data: filteredFurnitures,
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
