import {FC} from "react";
import Image from "next/image";
import {MiniCardSlider} from "@/shared/Slider";
import icon_basket from "@/../public/Pages/Furniture/icon_basket.svg"
import {util} from "zod";
import joinValues = util.joinValues;
import Link from "next/link";

interface FurnitureCardProps {
    id: number;
    name: string;
    price: number;
    size: string;
    manufacturer: string;
    materials?: string;
    imagesUrl: string[];
}

const FurnitureCard: FC<FurnitureCardProps> = async ({id, name, imagesUrl, manufacturer, materials, size, price}) => {


    return (
        <Link href={`/product/${id}`} className="flex relative flex-col gap-y-4 border-[1px] rounded bg-fon min-w-[165px] min-h-[340px]
                lg:min-w-[220px] shadow-[0px_4px_7px_0px_rgba(182,182,178,0.25)] md:shadow-[0px_7px_30px_0px_rgba(182,182,178,0.25)] [&_#name]:hover:text-accent">
            <MiniCardSlider>
                {
                    imagesUrl.map((imageUrl) =>
                        <div key={imageUrl} className="relative overflow-hidden w-full aspect-[1/1] shrink-0">
                            <Image draggable={false} fill style={{objectFit: 'contain'}} src={imageUrl} alt={''}/>
                        </div>
                    )
                }
            </MiniCardSlider>

            <div className="absolute top-0 right-0 z-10 p-2.5 bg-[rgba(253,253,253,0.80)] rounded-bl">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
                    <path d="M1.8509 8.34937L1.85049 8.34895C1.00228 7.50298 0.517899 6.35935 0.500486 5.16163C0.483073 3.96391 0.934002 2.80669 1.75726 1.93642C2.58051 1.06615 3.71107 0.551597 4.90815 0.502355C6.04165 0.45573 7.21393 1.11081 8.16678 1.9651C8.35671 2.13539 8.64439 2.13539 8.83433 1.9651C9.78729 1.1107 10.9584 0.455734 12.0918 0.502355C13.2889 0.551597 14.4195 1.06615 15.2427 1.93642C16.066 2.80669 16.5169 3.96391 16.4995 5.16163C16.4821 6.35935 15.9977 7.50298 15.1495 8.34895L15.1491 8.34937L9.34775 14.149C9.34774 14.149 9.34773 14.149 9.34772 14.149C9.12288 14.3737 8.81795 14.5 8.5 14.5C8.18204 14.5 7.87712 14.3737 7.65228 14.149C7.65227 14.149 7.65226 14.149 7.65225 14.149L1.8509 8.34937Z" stroke="#292A2D" strokeLinejoin="round"/>
                </svg>
            </div>

            <div className="p-2.5 md:p-3.5 gap-y-3.5 flex flex-col justify-between flex-grow">
                <div className="">
                    <p id="name" className="font-roboto h-[2.9em] line-clamp-2 md:font-montserrat md:font-semibold lg:text-base">{name}</p>
                    <p className="text-[12px] h-[2.9em] line-clamp-2 mt-2 font-roboto font-light lg:text-sm">
                        {
                            `${manufacturer},
                                        ${materials ? materials + ',' : ''}
                                        ${size}
                                        
                                        `
                        }
                    </p>
                </div>

                <div className="flex gap-x-1.5 justify-between items-center mt-3">
                    <div className="font-montserrat font-semibold text-base md:text-xl">
                        {price} <span className="font-roboto text-[12px] md:text-[14px] font-normal">руб.</span>
                    </div>

                    <div className="cursor-pointer relative bg-dark rounded w-[40px] h-[30px] md:h-[40px] lg:w-[50px] lg:h-[50px]">
                        <Image className="px-3 md:px-2.5 lg:px-3" src={icon_basket} fill alt="Добавить в корзину"/>
                    </div>
                </div>
            </div>

        </Link>
    );
};

export default FurnitureCard;