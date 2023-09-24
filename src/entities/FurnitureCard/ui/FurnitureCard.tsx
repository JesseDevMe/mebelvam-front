import {FC} from "react";
import Image from "next/image";
import {CardSlider} from "@/shared/Slider";
import icon_basket from "@/../public/Pages/Furniture/icon_basket.svg"
import {util} from "zod";
import joinValues = util.joinValues;

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
        <div className="flex flex-col gap-y-4 border-[1px] rounded bg-fon min-w-[165px] min-h-[340px]
                lg:min-w-[220px] shadow-[0px_4px_7px_0px_rgba(182,182,178,0.25)] md:shadow-[0px_7px_30px_0px_rgba(182,182,178,0.25)]">
            <CardSlider>
                {
                    imagesUrl.map((imageUrl) =>
                        <div className="relative overflow-hidden w-full aspect-[1/1] shrink-0">
                            <Image fill style={{objectFit: 'contain'}} src={imageUrl} alt={''}/>
                        </div>
                    )
                }
            </CardSlider>

            <div className="p-2.5 md:p-3.5 gap-y-3.5 flex flex-col justify-between flex-grow">
                <div className="">
                    <p className="font-roboto h-[3em] md:font-montserrat md:font-semibold lg:text-base">{name}</p>

                    <p className="text-[12px] overflow-clip mt-2 font-roboto font-light lg:text-sm">
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

        </div>
    );
};

export default FurnitureCard;