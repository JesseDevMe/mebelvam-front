'use client'
import {FC, useState} from "react";
import cart from '@/../public/Pages/Furniture/icon_basket.svg'
import Image from "next/image";
import Link from "next/link";

interface CardAddCartProps {

}

const CardAddCart: FC<CardAddCartProps> = ({}) => {
    const [count, setCount] = useState(1);
    function minusHandler() {
        if (count > 1)
            setCount(count-1);
    }

    function plusHandler() {
        setCount(count+1)
    }

    return (
        <div className="flex flex-col gap-y-8 font-montserrat text-base font-semibold items-center self-center
                min-[500px]:flex-row min-[500px]:justify-between min-[500px]:self-auto"
        >
            <div className="border border-dark rounded grid grid-cols-3 w-[120px] items-center">
                <div onClick={minusHandler} className="p-2.5 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="2" viewBox="0 0 18 2" fill="none">
                        <path d="M1 1H17" stroke="#292A2D" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
                <div className="px-2.5 py-1 border-r border-l border-dark text-center">
                    {count}
                </div>
                <div onClick={plusHandler} className="p-2.5 cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9H17" stroke="#292A2D" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M9 17L9 1" stroke="#292A2D" strokeWidth="2" strokeLinecap="round"/>
                    </svg>

                </div>
            </div>

            <div className="text-light flex gap-x-3.5 bg-dark px-[60px] py-3.5 w-fit rounded-[5px]">
                <span>В корзину</span>
                <Image src={cart} alt="Корзина"/>
            </div>
        </div>
    );
};

export default CardAddCart;