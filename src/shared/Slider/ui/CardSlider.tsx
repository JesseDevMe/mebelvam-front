'use client'
import {FC, ReactNode, useEffect, useRef, useState} from "react";

interface CardSliderProps {
    children: ReactNode[];
}

const CardSlider: FC<CardSliderProps> = ({ children }) => {
    const [curSlideN, setCurSlideN] = useState(1);
    const slidesCount = children.length;
    const swiperRef = useRef<HTMLDivElement>(null)

    function nextSlide() {
        if (curSlideN >= slidesCount) {
            setCurSlideN(1);
        } else setCurSlideN(curSlideN + 1);
    }

    function prevSlide() {
        if (curSlideN > 1) {
            setCurSlideN(curSlideN - 1);
        } else {
            setCurSlideN(slidesCount)
        }
    }


    useEffect(()=> {
        if (!swiperRef.current) {
            return;
        }

        let x1 = 0;
        let x2 = 0;

        function onTouchStart(e: TouchEvent) {
            e.stopPropagation();
            x1 = e.targetTouches[0].clientX;
        }
        function onTouchEnd(e:TouchEvent) {
            x2 = e.changedTouches[0].clientX;
            e.stopPropagation();

            if ((x1 - x2) > 50) {
                nextSlide();
            }

            if ((x1 - x2) < -50) {
                prevSlide();
            }
        }
        function onMouseDown(e:MouseEvent) {
            e.stopPropagation();
            x1 = e.clientX;
        }
        function onMouseUp(e:MouseEvent) {
            e.stopPropagation();
            x2 = e.clientX;

            if ((x1 - x2) > 50) {
                nextSlide();
            }

            if ((x1 - x2) < -50) {
                prevSlide();
            }
        }

        swiperRef.current.addEventListener('touchstart', onTouchStart)
        swiperRef.current.addEventListener('touchend', onTouchEnd)
        swiperRef.current.addEventListener('mousedown', onMouseDown)
        swiperRef.current.addEventListener('mouseup', onMouseUp)

        return () => {
            if (!swiperRef.current) {
                return;
            }
            swiperRef.current.removeEventListener('touchstart', onTouchStart)
            swiperRef.current.removeEventListener('touchend', onTouchEnd)
            swiperRef.current.removeEventListener('mousedown', onMouseDown)
            swiperRef.current.removeEventListener('mouseup', onMouseUp)
        }
    }, [curSlideN])


    return (
        <div className="w-full relative">
            <div className="overflow-hidden w-full">
                <div ref={swiperRef} className="flex transition-transform will-change-transform"
                     style={{transform: 'translate(-' + (curSlideN * 100 - 100) + '%)'}}>
                    {...children}
                </div>
            </div>
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full flex gap-x-1">
                {
                    [...new Array(slidesCount)].map((elem, index) =>
                        <div key={index} onClick={() => setCurSlideN(index + 1)} className="w-[34px] h-5 flex justify-center items-center cursor-pointer">
                            <div className={`w-[30px] h-0.5 ${index + 1 === curSlideN ? 'bg-dark' : 'bg-[#DADADA]'}`}>
                            </div>
                        </div>)
                }
            </div>
        </div>

    );
};

export default CardSlider;