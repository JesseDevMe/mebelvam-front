export interface Promo {
    id: number;
    name: string;
    price: number;
    old_price: number;
    size: string;
    color: string;
    imagesUrl: string[];
    variantId: number;
    attrId: number;
}

export interface PromosMeta {
    pagination: {
        page: number;
        pageCount: number;
    },
}

export interface Promos {
    data: Promo[];
    meta: PromosMeta;
}