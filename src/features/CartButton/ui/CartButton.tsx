'use client'
import React, {FC, useEffect, useState} from "react";
import Image from "next/image";
import icon_basket from "../../../../public/Pages/Furniture/icon_basket.svg";
import incart from "@/../public/Pages/Furniture/incart.svg"
import {CartItem} from "@/entities/Cart";
import {addToCart, deleteFromCart, deleteFromCartById, isItemIdInCart, isItemInCart} from "@/shared/Utils";

interface CartButtonProps {
    furnitureId: number;
    variantId: number;
    attrId: number;
}

const CartButton: FC<CartButtonProps> = ({ furnitureId, variantId, attrId }) => {
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        setIsInCart(isItemIdInCart(furnitureId));
    }, [])
    function cartHandler(e: React.MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
        if (isInCart) {
            deleteFromCartById(furnitureId);
            setIsInCart(isItemIdInCart(furnitureId));
        } else {
            const cartItem: CartItem = {
                id: furnitureId,
                attribute_id: attrId,
                variant_id: variantId,
                count: 1,
            }
            addToCart(cartItem);
            setIsInCart(isItemIdInCart(furnitureId));
        }

    }

    return (
        <div
            onClick={cartHandler}
            className="cursor-pointer relative bg-dark rounded w-[40px] h-[30px] md:h-[40px]"
        >
            <Image className="px-3 md:px-2.5" src={isInCart ? incart : icon_basket} fill alt="Добавить в корзину"/>
        </div>
    );
};

export default CartButton;