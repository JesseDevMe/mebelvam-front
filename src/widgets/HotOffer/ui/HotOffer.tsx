'use client'
import {FC, useRef} from "react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import {Offer} from "@/widgets/HotOffer/model";
import Link from "next/link";

interface HotOfferProps {
    offers: Offer[],
}

const HotOffer: FC<HotOfferProps> = ({ offers }) => {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    if (offers.length === 0) {
        return;
    }

    return (
        <div className="max-w-[1520px] w-full mx-auto">
            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    // @ts-ignore
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    // @ts-ignore
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                }}
                slidesPerView={'auto'}
            >
                {
                    offers.map((offer, index) =>
                        <SwiperSlide key={offer.title + index} className="!w-fit">
                            <Link href={'/product/' + offer.furnitureId} key={offer.title} className="flex flex-col-reverse justify-end md:justify-start md:flex-row select-none
                                    gap-x-5 lg:gap-x-7 gap-y-2.5 border-r-[1px] px-5 md:px-10 xl:px-[100px] py-7 w-[290px] md:w-[600px] lg:w-[800px] xl:w-[1180px] group">
                                <div className="flex flex-col gap-y-5 justify-center xl:min-w-[350px]">
                                    <h2 className="text-base lg:text-xl font-semibold font-montserrat group-hover:text-accent">{offer.title}</h2>
                                    <div className="flex gap-x-2.5">
                                        <p className="font-roboto text-[12px] flex items-center"><span className="line-through">{offer.oldPrice}</span> руб.</p>
                                        <p className="font-bold text-[#A50B34]"><span className="text-base md:text-xl lg:text-3xl">{offer.price}</span> руб.</p>
                                    </div>
                                </div>

                                <div className="shrink-0 relative flex items-center justify-center w-[250px] h-[180px]
                                        md:w-[300px] md:h-[225px] lg:w-[500px] lg:h-[300px] xl:w-[600px] xl:h-[400px]">
                                    <Image
                                        fill style={{objectFit: 'contain'}}
                                        src={offer.imgUrl} alt=""
                                        sizes="(max-width: 768px) 250px, (max-width: 1024px) 300px, (max-width: 1280px) 500px, 600px"
                                    />
                                </div>
                            </Link>
                        </SwiperSlide>

                    )
                }
                <button ref={navigationPrevRef} className="cursor-pointer absolute top-1/2 left-5 -translate-y-1/2 hidden md:block z-[40] w-14">
                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="40" viewBox="0 0 42 40" fill="none">
                        <path d="M12 10C12 10 2 19.2993 2 20C2 20.7007 12 30 12 30" stroke="#292A2D" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                </button>

                <button ref={navigationNextRef} className="cursor-pointer absolute top-1/2 right-5 -translate-y-1/2 hidden md:block z-[40] w-14">
                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="40" viewBox="0 0 42 40" fill="none">
                        <path d="M30 30C30 30 40 20.7007 40 20C40 19.2993 30 10 30 10" stroke="#292A2D" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                </button>
            </Swiper>
        </div>
    );
};

export default HotOffer;