
import {FC, useState} from "react";
import Image from "next/image";
import {MiniCardSlider} from "@/shared/Slider";
import icon_basket from "@/../public/Pages/Furniture/icon_basket.svg"
import Link from "next/link";
import {FurnitureMini} from "@/entities/Furniture";
import {CardDetails} from "@/features/CardDetails";
import {FavoritesBtn} from "@/features/FavoritesBtn";
import {addToCart} from "@/shared/Utils";
import {CartItem} from "@/entities/Cart";
import {CartButton} from "@/features/CartButton";

interface FurnitureCardProps extends FurnitureMini{
}

const FurnitureCard: FC<FurnitureCardProps> = ({id, name, imagesUrl, sizes, colors, price, firstVariantId, firstAttrId }) => {



    return (
        <Link href={`/product/${id}`} className="flex relative flex-col gap-y-2 border border-[#E9E9E9] rounded bg-fon min-w-[165px] min-h-[300px]
                min-[560px]:min-w-[175px] md:min-w-[220px] shadow-[0px_4px_7px_0px_rgba(182,182,178,0.25)] md:shadow-[0px_7px_30px_0px_rgba(182,182,178,0.20)] [&_#name]:hover:text-accent">
            <MiniCardSlider>
                {
                    imagesUrl.map((imageUrl, index) =>
                        <div key={imageUrl} className="relative overflow-hidden w-full aspect-[1/1] shrink-0">
                            <Image draggable={false} fill style={{objectFit: 'contain'}} src={imageUrl} alt={''}/>
                        </div>
                    )
                }
            </MiniCardSlider>

            <FavoritesBtn id={id}/>

            <div className="p-2.5 md:p-3.5 gap-y-4 flex flex-col justify-between flex-grow">
                <div className="font-roboto">
                    <p id="name" className="h-[2.9em] line-clamp-2">{name}</p>
                    <CardDetails
                        sizes={sizes}
                        colors={colors}
                    />
                </div>

                <div className="flex gap-x-1.5 justify-between items-center">
                    <div className="font-montserrat font-semibold text-base md:text-xl">
                        {(sizes.length > 1 || colors.length > 1) && <span className="text-sm md:text-base">от </span>}{price} <span className="font-roboto text-[12px] lg:text-sm font-normal">руб.</span>
                    </div>

                    <CartButton furnitureId={id} variantId={firstVariantId} attrId={firstAttrId}/>
                </div>
            </div>

        </Link>
    );
};

export default FurnitureCard;