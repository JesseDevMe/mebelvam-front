import {FC} from "react";
import Image from "next/image";
import {MiniCardSlider} from "@/shared/Slider";
import icon_basket from "@/../public/Pages/Furniture/icon_basket.svg"
import Link from "next/link";
import {FurnitureMini} from "@/entities/Furniture";
import {CardDetails} from "@/features/CardDetails";

interface FurnitureCardProps extends FurnitureMini{
}

const FurnitureCard: FC<FurnitureCardProps> = ({id, name, imagesUrl, sizes, colors, price}) => {


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

            <div className="absolute top-0 right-0 z-[9] p-2.5 bg-[rgba(253,253,253,0.80)] rounded-bl">
                <svg className="md:w-6 md:h-[22px]" xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 24 22" fill="none">
                    <path d="M2.47416 12.4176L2.47375 12.4171C1.23613 11.1348 0.526229 9.3974 0.500712 7.57405C0.475195 5.75069 1.1362 3.99231 2.33774 2.67277C3.53872 1.35383 5.18396 0.57787 6.92149 0.503618C8.59401 0.432145 10.2977 1.4331 11.66 2.70201C11.852 2.88084 12.1496 2.88084 12.3416 2.70201C13.704 1.43299 15.4061 0.432149 17.0785 0.503618C18.816 0.57787 20.4613 1.35383 21.6623 2.67277C22.8638 3.99231 23.5248 5.75069 23.4993 7.57405C23.4738 9.3974 22.7639 11.1348 21.5262 12.4171L21.5258 12.4176L13.3357 20.9237C12.9781 21.2951 12.4972 21.5 12 21.5C11.5028 21.5 11.0219 21.2951 10.6643 20.9237L2.47416 12.4176Z" stroke="#292A2D" strokeLinejoin="round"/>
                </svg>
            </div>

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

                    <div className="cursor-pointer relative bg-dark rounded w-[40px] h-[30px] md:h-[40px]">
                        <Image className="px-3 md:px-2.5" src={icon_basket} fill alt="Добавить в корзину"/>
                    </div>
                </div>
            </div>

        </Link>
    );
};

export default FurnitureCard;