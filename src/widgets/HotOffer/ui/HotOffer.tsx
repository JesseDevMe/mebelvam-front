import {FC, useEffect, useRef, useState} from "react";
import {SliderRL} from "@/shared/Slider";
import {offers} from './../model'
import Image from "next/image";

interface HotOfferProps {

}

const HotOffer: FC<HotOfferProps> = ({}) => {


    return (
        <div>
            <SliderRL
                count={offers.length}
            >
                <div className="flex">
                    {
                        offers.map((offer, index) =>
                            <div key={offer.title} className="flex flex-col-reverse justify-end md:justify-start md:flex-row select-none
                                    flex-shrink-0 gap-x-5 lg:gap-x-7 gap-y-2.5 border-r-[1px] px-5 md:px-10 xl:px-[100px] py-7 w-[290px] md:w-[600px] lg:w-[800px] xl:w-[1180px]">
                                <div className="flex flex-col gap-y-5 justify-center xl:min-w-[350px]">
                                    <h2 className="text-base lg:text-xl font-semibold font-montserrat">{offer.title}</h2>
                                    <div className="flex gap-x-2.5">
                                        <p className="font-roboto text-[12px] flex items-center"><span className="line-through">{offer.oldPrice}</span> руб.</p>
                                        <p className="font-bold text-[#A50B34]"><span className="text-base md:text-xl lg:text-3xl">{offer.price}</span> руб.</p>
                                    </div>
                                </div>

                                <div className="shrink-0 relative flex items-center justify-center w-[250px] h-[180px]
                                        md:w-[300px] md:h-[225px] lg:w-[500px] lg:h-[300px] xl:w-[600px] xl:h-[400px]">
                                    <Image draggable={false} fill objectFit="contain" src={offer.imgUrl} alt=""/>
                                </div>
                            </div>
                        )
                    }
                </div>


            </SliderRL>
        </div>
    );
};

export default HotOffer;