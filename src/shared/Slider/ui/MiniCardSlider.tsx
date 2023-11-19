'use client'
import {FC, ReactNode} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import {OverSwiper} from "@/features/OverSwiper";
import 'swiper/css';
import 'swiper/css/pagination';
import './../style/style.css'

interface CardSliderProps {
    children: ReactNode[];
}

const MiniCardSlider: FC<CardSliderProps> = ({ children }) => {
    const slidesCount = children.length;

    return (
        <div className="w-full relative rounded-t overflow-hidden">
            <div className="w-full relative mb-5">
                <Swiper
                    className="!overflow-y-visible"
                    modules={[Pagination]}
                    slidesPerView={1}
                    pagination={{
                        clickable: true,
                        bulletClass: 'bullet-mini',
                        bulletActiveClass: 'activeBulletMini',
                        horizontalClass: 'horizontal-mini'
                    }}
                >
                    {
                        children.map((child, index) => {
                            if (index < 4)
                                return (
                                    <SwiperSlide key={index}>
                                        {child}
                                    </SwiperSlide>
                                )
                            }
                        )
                    }
                    <OverSwiper
                        slidesCount={slidesCount}
                    />
                </Swiper>
            </div>

        </div>

    );
};

export default MiniCardSlider;