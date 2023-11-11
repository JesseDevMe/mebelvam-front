import {Subcategory} from "@/entities/Subcategory";

export interface FurnitureMini {
    id: number;
    name: string;
    price: number;
    colors: string[];
    sizes: string[];
    imagesUrl: string[];
    firstVariantId: number;
    firstAttrId: number;
    isModular?: boolean;
}

export type attr = {
    id: number,
    price: number,
    old_price?: string | null;
    width?: number,
    height?: number
    depth?: number,
}

export type variant = {
    id: number;
    color: string;
    attributes: attr[];
}

export type furModule = {
    id: number;
    name: string;
    count: number;
    imageUrl: string;
}

export interface Furniture {
    id: number;
    name: string;
    description: string;
    manufacturer: string;
    materials?: string[];
    imagesUrl: string[];
    variants: variant[];
    collectionId?: number;
    subcategory: {
        id: number;
        slug: string;
        name: string;
        category: {
            id: number;
            slug: string;
            name: string;
        }
    };
    modules?: furModule[];
}

export interface Furnitures {
    data: FurnitureMini[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number
        }
    }
}

export interface FurnitureWithVariant {
    id: number;
    name: string;
    imageUrl: string;
    variants: variant[];
    isModular?: boolean,
}