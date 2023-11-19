import {FC} from "react";
import {MiniCardSlider} from "@/shared/Slider";
import Image from "next/image";
import {FavoritesBtn} from "@/features/FavoritesBtn";
import {CardDetails} from "@/features/CardDetails";
import {CartButton} from "@/features/CartButton";
import Link from "next/link";

interface FurnitureCardSkeletonProps {

}

const FurnitureCardSkeleton: FC<FurnitureCardSkeletonProps> = ({}) => {

    return (
        <div className="flex relative flex-col gap-y-5 border overflow-hidden border-[#E9E9E9] rounded bg-fon min-w-[165px] min-h-[300px]
                min-[560px]:min-w-[175px] md:min-w-[220px] shadow-[0px_4px_7px_0px_rgba(182,182,178,0.25)] md:shadow-[0px_7px_30px_0px_rgba(182,182,178,0.20)]"
        >

            <div className="w-full aspect-square shrink-0 bg-gray-200 animate-pulse">
            </div>

            <div className="p-2.5 md:p-3.5 gap-y-4 flex flex-col justify-between flex-grow">
                <div className="font-roboto">
                    <div className="h-[1em] w-2/3 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-[1em] w-1/2 bg-gray-300 mt-3.5 rounded animate-pulse"></div>
                </div>

                <div className="flex gap-x-1.5 justify-between items-center mt-4">
                    <div className="text-base md:text-xl">
                        <div className="bg-gray-300 h-[1em] w-20 rounded animate-pulse"></div>
                    </div>

                    <div className="bg-gray-300 rounded w-[40px] h-[30px] md:h-[40px] animate-pulse"></div>
                </div>
            </div>

        </div>
    );
};

export default FurnitureCardSkeleton;