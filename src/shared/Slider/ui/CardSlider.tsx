'use client'
import {FC, ReactNode, useEffect, useRef, useState} from "react";
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './../style/style.css'
import Image from "next/image";

interface CardSliderProps {
    imagesUrl: string[];
}

const CardSlider: FC<CardSliderProps> = ({ imagesUrl }) => {
    const swiperRef = useRef<SwiperRef>(null);
    const [curSlideIndex, setCurSlideIndex] = useState(0);


    return (
        <div className="flex gap-7">
            <div className="hidden lg:flex flex-col gap-2.5">
                {
                    imagesUrl.map( (imageUrl, index) =>
                        <div
                            onClick={() => swiperRef.current?.swiper.slideTo(index)}
                            key={index}
                            className={`relative w-[78px] h-[78px] will-change-transform transition-transform cursor-pointer ${index === curSlideIndex ? 'border-2 border-dark' : ' hover:scale-110'}`}
                        >
                            <Image fill className="object-cover" src={imageUrl} alt=''/>
                        </div>
                    )
                }
            </div>

            <Swiper
                ref={swiperRef}
                onActiveIndexChange={(swiper) => setCurSlideIndex(swiper.activeIndex)}
                className="!overflow-y-visible grow"
                modules={[Pagination, Navigation]}
                slidesPerView={1}
                pagination={{
                    clickable: true,
                    bulletClass: 'bullet-card',
                    bulletActiveClass: 'activeBulletCard',
                    horizontalClass: 'horizontal-card',
                }}
            >

                {
                    imagesUrl.map((imageUrl, index) =>
                        <SwiperSlide key={index}>
                            <div key={imageUrl}
                                 className="w-full relative shrink-0 aspect-square md:aspect-video lg:aspect-square overflow-hidden">
                                <Image draggable={false} fill style={{objectFit: 'contain'}} src={imageUrl} alt=""/>
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    )
};

export default CardSlider;