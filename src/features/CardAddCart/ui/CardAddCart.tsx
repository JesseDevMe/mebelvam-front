'use client'
import {FC, useEffect, useState} from "react";
import cart from '@/../public/Pages/Furniture/icon_basket.svg'
import incart from '@/../public/Pages/Furniture/incart.svg'
import Image from "next/image";
import Link from "next/link";
import {attr, variant} from "@/entities/Furniture";
import {addToCart, deleteFromCart, getCart, isItemInCart} from "@/shared/Utils";
import {CartItem} from "@/entities/Cart";
import {routesUpdateCart} from "@/shared/Utils/RouteHandlers";

interface CardAddCartProps {
    furnitureId: number,
    curVariant: variant,
    curAttr: attr,
}

const CardAddCart: FC<CardAddCartProps> = ({ furnitureId, curAttr, curVariant }) => {
    const [isInCart, setIsInCart] = useState(false);
    const [count, setCount] = useState(1);

    const cartItem: CartItem = {
        id: furnitureId,
        count: count,
        variant_id: curVariant.id,
        attribute_id: curAttr.id,
    }

    function minusHandler() {
        if (count > 1) {
            addToCart({...cartItem, count: count - 1})
            setCount(count - 1);
            setIsInCart(true);
            window.dispatchEvent(new Event("storage"));

            const token = localStorage.getItem('token')
            if (token) {
                const cart = getCart();
                routesUpdateCart(cart, token).catch()
            }
        }
    }

    function plusHandler() {
        addToCart({...cartItem, count: count + 1});
        setCount(count+1);
        setIsInCart(true);
        window.dispatchEvent(new Event("storage"));

        const token = localStorage.getItem('token')
        if (token) {
            const cart = getCart();
            routesUpdateCart(cart, token).catch()
        }
    }

    function toCartHandler() {
        if (isInCart) {
            deleteFromCart(cartItem);
            setIsInCart(isItemInCart(cartItem));

            const token = localStorage.getItem('token')
            if (token) {
                const cart = getCart();
                routesUpdateCart(cart, token).catch()
            }
        } else {
            addToCart(cartItem);
            setIsInCart(isItemInCart(cartItem));

            const token = localStorage.getItem('token')
            if (token) {
                const cart = getCart();
                routesUpdateCart(cart, token).catch()
            }
        }
    }

    useEffect(() => {
        if (isItemInCart(cartItem)) {
            setIsInCart(true);
            const cart = getCart();
            const curItem = cart.find((item) =>
                item.attribute_id === curAttr.id
            )
            setCount(curItem?.count || 1);
        } else {
            setIsInCart(false);
            setCount(1);
        }


    }, [curAttr, curVariant, furnitureId])

    return (
        <div className="flex flex-col gap-y-8 font-montserrat text-base font-semibold items-center self-center
                min-[500px]:flex-row min-[500px]:justify-between min-[500px]:self-auto"
        >
            <div className="border border-dark rounded flex items-center">
                <div onClick={minusHandler} className="p-2.5 cursor-pointer min-w-[40px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="2" viewBox="0 0 18 2" fill="none">
                        <path d="M1 1H17" stroke="#292A2D" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
                <div className="px-2.5 py-1 border-r border-l border-dark text-center min-w-[40px]">
                    {count}
                </div>
                <div onClick={plusHandler} className="p-2.5 cursor-pointer min-w-[40px]">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9H17" stroke="#292A2D" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M9 17L9 1" stroke="#292A2D" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
            </div>

            <div
                className="text-light flex justify-center gap-x-3.5 bg-dark px-[60px] py-3.5 w-fit min-w-[250px] rounded-[5px] cursor-pointer"
                onClick={toCartHandler}
            >
                {isInCart && <Image src={incart} alt='В корзине'/>}
                {!isInCart &&
                    <>
                        <span>В корзину</span>
                        <Image src={cart} alt="Корзина"/>
                    </>
                }

            </div>
        </div>
    );
};

export default CardAddCart;