import {variant} from "@/entities/Furniture";

export interface CartItem {
    id: number,
    count: number,
    variant_id: number,
    attribute_id: number,
}

export interface CartFurniture {
    id: number;
    name: string;
    imageUrl: string;
    color: string;
    size: string;
    price: number;
    oldPrice?: number;
    count: number;
    variantId: number;
    attrId: number;
}