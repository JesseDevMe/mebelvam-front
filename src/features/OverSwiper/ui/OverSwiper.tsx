'use client'
import {FC} from "react";
import {useSwiper} from "swiper/react";

interface OverSwiperProps {
    slidesCount: number;
}

const OverSwiper: FC<OverSwiperProps> = ({ slidesCount }) => {
    const swiper = useSwiper()

    return (
        <div className="[@media(hover:none)]:hidden absolute left-0 top-0 right-0 bottom-0 flex z-10">
            {
                [...new Array(slidesCount)].map((elem, index) =>
                    <div key={index} onMouseOver={() => swiper.slideTo(index)} className="flex-auto h-full">
                    </div>
                )
            }
        </div>
    );
};

export default OverSwiper;