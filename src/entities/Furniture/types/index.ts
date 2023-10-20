import {Subcategory} from "@/entities/Subcategory";

export interface FurnitureMini {
    id: number;
    name: string;
    price: number;
    colors: string[];
    sizes: string[];
    imagesUrl: string[];
}

export type attr = {
    price: number,
    width: number,
    height: number
    depth?: number,
}

export type variant = {
    color: string;
    attributes: attr[]
}

export interface Furniture {
    id: number;
    name: string;
    description: string;
    manufacturer: string;
    materials?: string[];
    imagesUrl: string[];
    variants: variant[];
    subcategory: {
        id: number;
        slug: string;
        name: string;
        category: {
            id: number;
            slug: string;
            name: string;
        }
    }
}

export interface Furnitures {
    data: FurnitureMini[];
    meta:
        {
            pagination: {
                page: number;
                pageSize: number;
                pageCount: number;
                total: number
            }
        }
}