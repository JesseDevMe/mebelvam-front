import {FurnitureMini} from "@/entities/Furniture";

export interface Collection {
    id: number;
    name: string;
    description: string;
    materials: string[];
    manufacturer: string;
    modules: FurnitureMini[];
    imagesUrl: string[];
}

export interface CollectionMini {
    id: number;
    name: string;
    imageUrl: string;
}

export interface CollectionsMeta {
    page: number;
    pageCount: number;
}

export interface CollectionsResponse {
    collections: CollectionMini[];
    meta: CollectionsMeta;
}