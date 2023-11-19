import {FC} from "react";
import Image from "next/image";
import {CartCounter} from "@/features/CartCounter";
import Link from "next/link";

interface CartCardSkeletonProps {

}

const CartCardSkeleton: FC<CartCardSkeletonProps> = ({}) => {

    return (
        <div className="relative flex flex-col gap-5 md:flex-row py-5 border-b-2">
            <div className="aspect-square max-h-[310px] md:min-h-[220px] mt-8 md:mt-0 overflow-hidden rounded-[5px]
                    shrink-0 bg-gray-200 animate-pulse"
            ></div>

            <div className="grow md:flex md:flex-col justify-between">
                <h2 className="text-base h-[1em] w-1/2 mr-8 bg-gray-200 rounded animate-pulse"></h2>
                <div className="mt-7">
                    <p className="h-[1em] w-1/4 mb-1.5 bg-gray-200 rounded animate-pulse"></p>
                    <p></p>
                    <p className="h-[1em] w-1/4 mt-5 bg-gray-200 rounded animate-pulse"></p>
                    <div
                        className="mt-5 flex justify-between"
                    >
                        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-[1.5em] w-32 bg-gray-200 rounded animate-pulse self-end"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartCardSkeleton;