'use client'
import {FC, useRef} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/image";
import bg_slide1 from "@/../public/Pages/Home/Welcome/bg1.jpeg"
import bg_slide2 from "@/../public/Pages/Home/Welcome/bg2.jpeg"
import bg_slide3 from "@/../public/Pages/Home/Welcome/bg3.jpeg"
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './../styles/style.css'

interface WelcomeProps {

}

const Welcome: FC<WelcomeProps> = ({}) => {

    return (
        <div className="max-w-[1520px] w-full mx-auto">
            <Swiper
                modules={[Pagination,Autoplay]}
                autoplay={{delay: 5000, disableOnInteraction: false}}
                slidesPerView={1}
                pagination={{
                    clickable: true,
                    bulletClass: 'bullet',
                    bulletActiveClass: 'activeBullet',
                }}
            >
                <SwiperSlide>
                    <div className="h-[300px] md:h-[410px] lg:h-[700px] select-none relative w-full bg-[linear-gradient(225deg,rgba(41,42,45,0)0%,rgba(41,42,45,0)30%,rgba(41,42,45,0.9)100%)]">
                        <Image fill className="object-cover -z-10" src={bg_slide1} alt=""/>

                        <div className="max-w-[300px] text-light font-montserrat flex flex-col gap-y-2.5 lg:gap-y-7 px-2.5 md:px-5 lg:px-10
                        xl:px-20 absolute bottom-5 md:bottom-11 lg:bottom-20 lg:max-w-2xl md:text-[16px]"
                        >
                            <h2 className="text-xl md:text-3xl lg:text-5xl font-semibold">Мебель Вам</h2>
                            <p className="font-light font-roboto md:font-montserrat max-w-[240px] md:max-w-[370px] lg:max-w-[500px]">Интернет-магазин мебели в Севастополе</p>
                            <a
                                className="w-fit py-2 px-3.5 md:py-4 md:px-12 md:mt-5 lg:mt-0 text-dark bg-light border-solid border-[1px]
                                    rounded border-[rgba(41,42,45,0.15)] font-semibold transition-colors hover:bg-fon"
                                href="#"
                            >
                                Каталог товаров
                            </a>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="h-[300px] md:h-[410px] lg:h-[700px] select-none relative w-full bg-[linear-gradient(225deg,rgba(41,42,45,0)0%,rgba(41,42,45,0)30%,rgba(41,42,45,0.9)100%)]">
                        <Image fill className="object-cover -z-10" src={bg_slide2} alt=""/>

                        <div className="text-light font-montserrat flex flex-col gap-y-2.5 lg:gap-y-7 px-2.5 md:px-5 lg:px-10
                        xl:px-20 absolute bottom-5 md:bottom-11 lg:bottom-20 md:text-[16px] max-w-[240px] md:max-w-[370px] lg:max-w-[500px]"
                        >
                            <h2 className="text-xl lg:text-3xl font-semibold">Бесплатный <br/>
                                <span className="text-[14px] md:text-xl md:font-medium lg:text-3xl">вызов замерщика</span></h2>
                            <a
                                className="w-fit py-2 px-3.5 md:py-4 md:px-12 md:mt-5 lg:mt-0 text-dark bg-light border-solid border-[1px]
                                    rounded border-[rgba(41,42,45,0.15)] font-semibold transition-colors hover:bg-fon"
                                href="#"
                            >
                                Каталог товаров
                            </a>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="h-[300px] md:h-[410px] lg:h-[700px] select-none relative w-full bg-[linear-gradient(225deg,rgba(41,42,45,0)0%,rgba(41,42,45,0)30%,rgba(41,42,45,0.9)100%)]">
                        <Image fill className="object-cover -z-10" src={bg_slide3} alt=""/>

                        <div className="text-light font-montserrat flex flex-col gap-y-2.5 lg:gap-y-7 px-2.5 md:px-5 lg:px-10
                        xl:px-20 absolute bottom-5 md:bottom-11 lg:bottom-20 max-w-[250px] md:max-w-[370px] lg:max-w-[500px] md:text-[16px]"
                        >
                            <h2 className="text-xl lg:text-3xl font-semibold">Бесплатная доставка<br/>
                                <span className="text-[14px] md:text-xl md:font-medium">
                                при заказе от 7000 р.</span></h2>
                            <a
                                className="w-fit py-2 px-3.5 md:py-4 md:px-12 md:mt-5 lg:mt-0 text-dark bg-light border-solid border-[1px]
                                    rounded border-[rgba(41,42,45,0.15)] font-semibold transition-colors hover:bg-fon"
                                href="#"
                            >
                                Каталог товаров
                            </a>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

            <p className="bg-dark py-3.5 md:py-5 lg:py-7 px-2.5 md:px-5 lg:px-10 xl:px-20 text-[#E1E1E1] text-[12px] font-light text-center leading-4 min-[1520px]:rounded-b-[10px]">Мебель доставляется в разобранном виде  в плоских упаковках. В комплекте идет вся необходимая фурнитура, крепеж и схема сборки, собирается как конструктор</p>
        </div>
    );
};
export default Welcome;