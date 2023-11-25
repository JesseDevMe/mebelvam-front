'use client'
import React, {FC, useEffect, useState} from "react";
import Image from "next/image";
import icon_basket from "../../../../public/Pages/Furniture/icon_basket.svg";
import incart from "@/../public/Pages/Furniture/incart.svg"
import {CartItem} from "@/entities/Cart";
import {addToCart, deleteFromCartById, getCart, isItemIdInCart} from "@/shared/Utils";
import {routesUpdateCart} from "@/shared/Utils/RouteHandlers";
import useUserStore from "@/entities/User/store/useUserStore";

interface CartButtonProps {
    furnitureId: number;
    variantId: number;
    attrId: number;
}

const CartButton: FC<CartButtonProps> = ({ furnitureId, variantId, attrId }) => {
    const [isInCart, setIsInCart] = useState(false);
    const setIsAuth = useUserStore(state => state.setIsAuth);

    useEffect(() => {
        setIsInCart(isItemIdInCart(furnitureId));
    }, [])
    function cartHandler(e: React.MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
        if (isInCart) {
            deleteFromCartById(furnitureId);
            setIsInCart(isItemIdInCart(furnitureId));

            const token = localStorage.getItem('token')
            if (token) {
                const cart = getCart();
                routesUpdateCart(cart, token)
                    .then()
                    .catch(error => {
                        if (error === 401) {
                            localStorage.removeItem('token');
                            setIsAuth(false);
                        }
                    })
            }
        } else {
            const cartItem: CartItem = {
                id: furnitureId,
                attribute_id: attrId,
                variant_id: variantId,
                count: 1,
            }
            addToCart(cartItem);
            setIsInCart(isItemIdInCart(furnitureId));

            const token = localStorage.getItem('token')
            if (token) {
                const cart = getCart();
                routesUpdateCart(cart, token)
                    .then()
                    .catch(error => {
                        if (error === 401) {
                            localStorage.removeItem('token');
                            setIsAuth(false);
                        }
                    })
            }
        }

    }

    return (
        <div
            onClick={cartHandler}
            className="cursor-pointer relative bg-dark rounded w-[40px] h-[30px] md:h-[40px] shrink-0"
        >
            <Image className="px-3 md:px-2.5" src={isInCart ? incart : icon_basket} fill alt="Добавить в корзину"/>
        </div>
    );
};

export default CartButton;