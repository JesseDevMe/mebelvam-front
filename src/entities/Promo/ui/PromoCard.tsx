import {FC} from "react";
import {Promo} from "@/entities/Promo";
import Link from "next/link";
import {MiniCardSlider} from "@/shared/Slider";
import Image from "next/image";
import {PromoAddToCart} from "@/features/PromoAddToCart";
import {FavoritesBtn} from "@/features/FavoritesBtn";

interface PromoCardProps extends Promo{

}

const PromoCard: FC<PromoCardProps> = ({ id, name, price, old_price, size, color, imagesUrl, variantId, attrId }) => {

    return (
        <Link href={`/product/${id}`} className="flex relative flex-col gap-y-2 border border-[#E9E9E9] rounded-[5px] bg-fon min-w-[0px] min-h-[300px]
                shadow-[0px_4px_7px_0px_rgba(182,182,178,0.25)] md:shadow-[0px_7px_30px_0px_rgba(182,182,178,0.20)] [&_#name]:hover:text-accent">
            <MiniCardSlider>
                {
                    imagesUrl.map((imageUrl) =>
                        <div key={imageUrl} className="relative overflow-hidden aspect-[1/1]">
                            <Image
                                draggable={false} fill
                                sizes="50vw, (min-width: 560px) 33vw, (min-width: 950px) 25vw, (min-width: 1400px) 20vw"
                                style={{objectFit: 'contain'}}
                                src={imageUrl} alt={''}
                            />
                        </div>
                    )
                }
            </MiniCardSlider>

            <FavoritesBtn id={id}/>

            <div className="p-2.5 md:p-3.5 gap-y-4 flex flex-col justify-between flex-grow">
                <div className="font-roboto">
                    <h3 id="name" className="h-[2.9em] line-clamp-2">{name}</h3>
                    <div className="font-light mt-2.5">
                        <p className="line-clamp-1">Цвет: {color}</p>
                        <p className="line-clamp-1">Размер: {size}</p>
                    </div>
                </div>

                <div className="flex gap-x-1.5 justify-between items-center">
                    <div className="">
                        <div className="line-through text-[12px] text-gray-500">
                            {old_price} <span className="font-roboto">руб.</span>
                        </div>
                        <div className="font-semibold text-base md:text-xl text-accent font-montserrat">
                            {price} <span className="font-roboto text-[12px] lg:text-sm font-normal">руб.</span>
                        </div>
                    </div>
                    <PromoAddToCart
                        furnitureId={id}
                        variantId={variantId}
                        attrId={attrId}
                    />
                </div>
            </div>

        </Link>
    );
};

export default PromoCard;