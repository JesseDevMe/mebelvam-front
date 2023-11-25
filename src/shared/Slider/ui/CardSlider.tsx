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
    aspect?: '4/3' | 'square';
}

const CardSlider: FC<CardSliderProps> = ({ imagesUrl, aspect }) => {
    const swiperRef = useRef<SwiperRef>(null);
    const [curSlideIndex, setCurSlideIndex] = useState(0);
    const [curFullImage, setCurFullImage] = useState<null | string>(null);


    function bgClickHandler() {
        document.body.style.overflow = 'auto';
        setCurFullImage(null);
    }

    function fullOpenHandler(imgUrl: string) {
        document.body.style.overflow = 'hidden';
        setCurFullImage(imgUrl);
    }


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
                            <Image
                                fill className="object-cover"
                                sizes="78px"
                                src={imageUrl} alt=''
                            />
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
                            <div
                                onClick={() => fullOpenHandler(imageUrl)}
                                key={imageUrl}
                                className={`w-full relative shrink-0 ${aspect === '4/3' ? 'aspect-[4/3] ' +
                                    'lg:aspect-[4/3]' : 'aspect-square lg:aspect-square'} md:aspect-video 
                                    overflow-hidden`}
                            >
                                <Image
                                    draggable={false} fill
                                    sizes="100vw, (min-width: 1024px) 35vw"
                                    style={{objectFit: 'contain'}} src={imageUrl}
                                    alt=""
                                />
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>


            { curFullImage &&
                <div
                    onClick={bgClickHandler}
                    className="fixed top-0 left-0 w-full h-full z-[100] md:px-2.5
                        bg-[rgba(0,0,0,0.667)] overflow-auto py-20 flex"
                >
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                        className="relative w-full max-w-[1000px] aspect-square mx-auto my-auto"
                    >
                        <Image
                            fill style={{objectFit: 'contain'}}
                            quality={100} priority
                            sizes="100vw, (min-width: 800px) 1000px"
                            src={curFullImage} alt=""
                        />
                    </div>
                    <div className="cursor-pointer absolute right-2 top-2 flex gap-x-1 items-center">
                        <span className=" text-base text-light font-montserrat">ЗАКРЫТЬ</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path d="M11 29L29 11.3223" stroke="#F2F2F1" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M11 11L29 28.6777" stroke="#F2F2F1" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </div>
                </div>
            }

        </div>
    )
};

export default CardSlider;