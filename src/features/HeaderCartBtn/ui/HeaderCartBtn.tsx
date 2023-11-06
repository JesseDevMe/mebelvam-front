'use client'
import {FC, useCallback, useEffect, useState} from "react";
import Image from "next/image";
import cart from "../../../../public/header/icon_basket.svg";
import Link from "next/link";
import {getCart} from "@/shared/Utils";

interface HeaderCartBtnProps {
    isMobile?: boolean;
}

const HeaderCartBtn: FC<HeaderCartBtnProps> = ({ isMobile }) => {
    const [count, setCount] = useState(0);


    useEffect(() => {
        setCount(getCart().reduce((result, item) => result + item.count, 0));

        function cartChangeHandler(e: StorageEvent) {
            setCount(getCart().reduce((result, item) => result + item.count, 0));
        }

        window.addEventListener('storage', cartChangeHandler);

        return () => {
            window.removeEventListener('storage', cartChangeHandler);
        }
    }, [])


    return (
        <>
            {isMobile &&
                <Link
                    href="/cart"
                    className="cursor-pointer flex flex-col gap-1 items-center"
                >
                    <div className="flex items-center gap-x-1">
                        <Image src={cart} width={24} height={24} alt=''/>
                        <span>({count})</span>
                    </div>
                    <span>Корзина</span>
                </Link>
            }

            {
                !isMobile &&
                <Link
                    className="hidden md:flex px-2.5 py-1.5 items-center gap-x-2 border-[1px]
                            border-solid border-dark rounded hover:scale-110 transition-transform"
                    href="/cart"
                >
                    <Image alt="Корзина" src={cart}/>
                    <span>({count})</span>
                </Link>
            }
        </>
    );
};

export default HeaderCartBtn;