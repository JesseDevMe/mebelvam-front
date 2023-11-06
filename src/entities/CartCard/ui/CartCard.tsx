'use client'
import {FC} from "react";
import {CartFurniture, CartItem} from "@/entities/Cart";
import Image from "next/image";
import {CartCounter} from "@/features/CartCounter";
import {deleteFromCart} from "@/shared/Utils";
import useCartStore from "@/entities/Cart/store/useCartStore";
import Link from "next/link";

interface CartCardProps extends CartFurniture{

}

const CartCard: FC<CartCardProps> = ({ id, name, imageUrl, color, size , price, count, variantId, attrId, oldPrice}) => {
    const removeFur = useCartStore(state => state.remove);

    function deleteHandler(e: React.MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
        const cartItem: CartItem = {
            id: id,
            count: count,
            variant_id: variantId,
            attribute_id: attrId,
        }
        deleteFromCart(cartItem);
        removeFur(attrId);
        window.dispatchEvent(new Event("storage"));
    }

    return (
        <Link href={`/product/${id}`} className="relative flex flex-col gap-5 md:flex-row py-5 border-b-2">
            <div
                onClick={deleteHandler}
                className="absolute right-0 top-4"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <line x1="18.6702" y1="5.41406" x2="4.4684" y2="20.0382" stroke="#292A2D" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="4.41371" y1="4.98208" x2="18.4371" y2="19.7774" stroke="#292A2D" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>

            <div className="relative aspect-square max-h-[310px] md:min-h-[220px] mt-8 md:mt-0 overflow-hidden rounded-[5px] shrink-0">
                <Image src={imageUrl} alt={''} fill style={{objectFit: "contain"}}/>
            </div>
            <div className="grow md:flex md:flex-col justify-between">
                <h2 className="font-montserrat text-base font-semibold h-[2.9em] line-clamp-2 mr-8">{name}</h2>
                <div className="mt-7">
                    <p className="mb-1.5">Цвет: {color}</p>
                    <p className="mb-5">Размер: {size}</p>
                    <p className="">{price} руб. / шт.</p>
                    <div
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        className="mt-1"
                    >
                        <CartCounter furnitureId={id} variantId={variantId} attrId={attrId} ItemsCount={count}
                                     price={price} oldPrice={oldPrice}/>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CartCard;