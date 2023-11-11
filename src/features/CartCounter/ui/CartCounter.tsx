'use client'
import {FC, useEffect, useState} from "react";
import {addToCart, getCart} from "@/shared/Utils";
import {CartItem} from "@/entities/Cart";
import useCartStore from "@/entities/Cart/store/useCartStore";
import {routesUpdateCart} from "@/shared/Utils/RouteHandlers";
import useUserStore from "@/entities/User/store/useUserStore";

interface CartCounterProps {
    furnitureId: number,
    variantId: number,
    attrId: number,
    ItemsCount: number,
    price: number,
    oldPrice?: number,
}

const CartCounter: FC<CartCounterProps> = ({ furnitureId, variantId, attrId, ItemsCount, price, oldPrice }) => {
    const furnitures = useCartStore(state => state.furnitures);
    const setFur = useCartStore(state => state.setFurnitures);
    const setIsAuth = useUserStore(state => state.setIsAuth);


    const cartItem: CartItem = {
        id: furnitureId,
        count: ItemsCount,
        variant_id: variantId,
        attribute_id: attrId,
    }

    function minusHandler() {
        if (ItemsCount > 1) {
            addToCart({...cartItem, count: ItemsCount - 1})
            setFur([...furnitures.map(fur => {
                if (fur.attrId !== attrId) return fur;
                return {
                    ...fur,
                    count: fur.count - 1,
                }
            })]);
            window.dispatchEvent(new Event("storage"));

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

    function plusHandler() {
        addToCart({...cartItem, count: ItemsCount + 1});
        setFur([...furnitures.map(fur => {
            if (fur.attrId !== attrId) return fur;
            return {
                ...fur,
                count: fur.count + 1,
            }
        })]);
        window.dispatchEvent(new Event("storage"));

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

    return (
        <div className="flex justify-between items-end">
            <div className="border border-dark rounded flex items-center">
                <div onClick={minusHandler} className="p-2.5 cursor-pointer min-w-[40px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="2" viewBox="0 0 18 2" fill="none">
                        <path d="M1 1H17" stroke="#292A2D" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
                <div className="px-2.5 py-1 border-r border-l border-dark text-center font-semibold font-montserrat text-base min-w-[40px]">
                    {ItemsCount}
                </div>
                <div onClick={plusHandler} className="p-2.5 cursor-pointer min-w-[40px]">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9H17" stroke="#292A2D" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M9 17L9 1" stroke="#292A2D" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
            </div>
            <div className="font-semibold">
                {oldPrice !== undefined && oldPrice !== 0 && <span className="font-normal line-through mr-2.5">{ItemsCount * oldPrice} руб.</span>}
                <span className={`text-base font-montserrat md:text-xl ${oldPrice ? 'text-accent' : ''}`}>{ItemsCount * price} </span>
                <span className={`text-sm font-roboto ${oldPrice ? 'text-accent' : ''}`}>руб.</span>
            </div>
        </div>

    );
};

export default CartCounter;