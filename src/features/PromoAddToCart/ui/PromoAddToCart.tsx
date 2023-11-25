'use client'
import React, {FC, useEffect, useState} from "react";
import Image from "next/image";
import icon_basket from "../../../../public/Pages/Furniture/icon_basket.svg";
import {addToCart, deleteFromCart, deleteFromCartById, getCart, isItemIdInCart, isItemInCart} from "@/shared/Utils";
import {CartItem} from "@/entities/Cart";
import incart from "../../../../public/Pages/Furniture/incart.svg";
import {routesUpdateCart} from "@/shared/Utils/RouteHandlers";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import useUserStore from "@/entities/User/store/useUserStore";

interface PromoAddToCartProps {
    furnitureId: number;
    variantId: number;
    attrId: number;
}

const PromoAddToCart: FC<PromoAddToCartProps> = ({ furnitureId, variantId, attrId }) => {
    const [isInCart, setIsInCart] = useState(false);
    const setIsAuth = useUserStore(state => state.setIsAuth);

    const cartItem: CartItem = {
        id: furnitureId,
        count: 1,
        variant_id: variantId,
        attribute_id: attrId,
    }

    function cartHandler(e: React.MouseEvent) {
        e.stopPropagation()
        e.preventDefault()
        if (isInCart) {
            deleteFromCart(cartItem);
            setIsInCart(isItemInCart(cartItem));

            const token = localStorage.getItem('token')
            if (token) {
                const cart = getCart();
                routesUpdateCart(cart, token)
                    .catch(error => {
                        if (error === 401) {
                            localStorage.removeItem('token');
                            setIsAuth(false);
                        }
                    })
            }
        } else {
            addToCart(cartItem);
            setIsInCart(isItemInCart(cartItem));

            const token = localStorage.getItem('token')
            if (token) {
                const cart = getCart();
                routesUpdateCart(cart, token)
                    .catch(error => {
                        if (error === 401) {
                            localStorage.removeItem('token');
                            setIsAuth(false);
                        }
                    })
            }
        }
    }

    useEffect(() => {
        setIsInCart(isItemInCart(cartItem));
    }, [])

    return (
        <div
            onClick={cartHandler}
            className="cursor-pointer relative bg-dark rounded w-[40px] h-[30px] md:h-[40px]"
        >
            <Image className="px-3 md:px-2.5" src={isInCart ? incart : icon_basket} fill alt="Добавить в корзину"/>
        </div>
    );
};

export default PromoAddToCart;