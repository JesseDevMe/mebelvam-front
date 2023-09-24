import {fetchStrapi} from "@/shared/API";
import {FurnitureMini} from "@/entities/Furniture/types";
import {attribute} from "postcss-selector-parser";
import {shuffle} from "@/shared/Utils";


export async function fetchFurnituresBySub(subcategoryId: number): Promise<FurnitureMini[]> {
    const res = await fetchStrapi('/furnitures?fields[0]=name&populate[0]=images&populate[1]=sizes&populate[2]=materials&populate[3]=manufacturer&populate[4]=variants.attributes');

    if (!res.ok) {
        throw new Error('furnitures fetch error');
    }

    const { data } = await res.json();


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
    return furnitures.filter((furniture): boolean => {
        if (!uniqueSizesSet.has(furniture.size)) {
            uniqueSizesSet.add(furniture.size);
            return true;
        } else {
            return false;
        }
    });
}
