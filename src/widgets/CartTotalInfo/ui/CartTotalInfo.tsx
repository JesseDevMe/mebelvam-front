'use client'
import {FC} from "react";
import useCartStore from "@/entities/Cart/store/useCartStore";
import Link from "next/link";

interface CartTotalInfoProps {

}

const CartTotalInfo: FC<CartTotalInfoProps> = ({}) => {
    const furnitures = useCartStore(state => state.furnitures);


    return (
        <div className="border rounded bg-fon shadow-[0px_7px_30px_0px_rgba(41,42,45,0.10)] px-5 py-[30px] lg:min-w-[350px] mb-7">
            <Link href={'/cart/order'} className="block cursor-pointer rounded bg-dark hover:bg-black py-4
                text-center text-light font-montserrat text-base font-semibold"
            >
                Перейти к оформлению
            </Link>
            <div className="mt-7">
                <div className="flex justify-between font-montserrat font-semibold ">
                    <span className="text-base">Количество товаров:</span>
                    <span>{furnitures.reduce((result, cur) => result + cur.count, 0)} шт.</span>
                </div>

                <div className="flex justify-between mt-6 font-roboto">
                    <span className="">Сумма скидки:</span>
                    <p className="">{furnitures.reduce((result, cur) => {
                        if (cur.oldPrice) {
                             return result + (cur.oldPrice - cur.price) * cur.count;
                        } else {
                            return result;
                        }
                    }, 0)}
                        <span className="text-sm"> руб.</span></p>
                </div>

                <div className="flex justify-between mt-2 font-montserrat font-semibold text-xl">
                    <span>Итого:</span>
                    <p>{furnitures.reduce((result, cur) => result + cur.price * cur.count, 0)}
                        <span className="text-sm"> руб.</span></p>
                </div>
            </div>
        </div>
    );
};

export default CartTotalInfo;