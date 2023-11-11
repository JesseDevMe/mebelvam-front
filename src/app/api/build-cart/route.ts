import {NextRequest} from "next/server";
import {CartFurniture, CartItem} from "@/entities/Cart";
import {fetchFurnituresWithVariants} from "@/entities/Furniture/model";
import {attr, variant} from "@/entities/Furniture";

export async function POST(request: NextRequest) {
    const cart: CartItem[] = await request.json();

    if (!cart || cart.length === 0) {
        return Response.json([]);
    }

    const furnitures = await fetchFurnituresWithVariants(cart.map(item => item.id));

    const cartFurniture: CartFurniture[] = [];

    for (const item of cart) {
        const curFur = furnitures.find((fur) => fur.id === item.id);
        if (!curFur) continue;

        let curVariant: variant | undefined;
        let curAttr: attr | undefined;
        if (!item.variant_id) {
            curVariant = curFur.variants[0];
            curAttr = curVariant.attributes[0];
        } else {
            curVariant = curFur.variants.find(variant => variant.id === item.variant_id);
            if (!curVariant) continue;

            if (!item.attribute_id) {
                curAttr = curVariant.attributes[0];
            } else {
                curAttr = curVariant.attributes.find(attr => attr.id === item.attribute_id);
                if (!curAttr) continue;
            }
        }


        cartFurniture.push({
            id: curFur.id,
            name: curFur.name,
            imageUrl: curFur.imageUrl,
            color: curVariant.color,
            size: `${curAttr.height}x${curAttr.width}${curAttr.depth ? 'x' + curAttr.depth : ''}`,
            price: curAttr.price,
            oldPrice: Number(curAttr.old_price),
            count: item.count,
            variantId: curVariant.id,
            attrId: curAttr?.id,
            isModular: curFur.isModular,
        })
    }


    return Response.json(cartFurniture);
}