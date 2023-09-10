'use client'
import {FC, ReactNode, useEffect, useMemo, useRef, useState} from "react";

interface SliderProps {
    children: ReactNode;
    count: number;
}

const Slider: FC<SliderProps> = ({children, count}) => {
    const [curSlideN, setCurSlideN] = useState(1);
    const swiperRef = useRef<HTMLDivElement>(null)


    function nextSlide() {
        if (curSlideN >= count) {
            setCurSlideN(1);
        } else setCurSlideN(curSlideN + 1);
    }

    function prevSlide() {
        if (curSlideN > 1) {
            setCurSlideN(curSlideN - 1);
        }
    }

    let id: ReturnType<typeof setTimeout>;
    useEffect(()=> {
        id = setTimeout(() => {
            nextSlide();

            return () => {
                clearTimeout(id);
            }
        }, 7000)
    }, [curSlideN])


    useEffect(()=> {
        if (!swiperRef.current) {
            return;
        }

        let x1 = 0;
        let x2 = 0;

        function onTouchStart(e: TouchEvent) {
            x1 = e.targetTouches[0].clientX;
        }
        function onTouchEnd(e:TouchEvent) {
            x2 = e.changedTouches[0].clientX;

            if ((x1 - x2) > 50) {
                nextSlide();
            }

            if ((x1 - x2) < -50) {
                prevSlide();
            }
        }
        function onMouseDown(e:MouseEvent) {
            x1 = e.clientX;
        }
        function onMouseUp(e:MouseEvent) {
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

    function progressHandler(slideNumber: number) {
        clearTimeout(id);
        setCurSlideN(slideNumber);
    }

    return (
        <div className="overflow-hidden relative">
            <div ref={swiperRef} className="transition-transform duration-500" style={{transform: 'translate(-' + (curSlideN * 100 - 100) + '%)'}}>
                {children}
            </div>

            <div className="hidden absolute bottom-4 left-1/2 -translate-x-1/2 md:flex gap-x-2">
                {
                    [...new Array(count)].map((elem, index) =>
                        <div key={index} onClick={() => progressHandler(index + 1)} className="w-[74px] h-7 flex justify-center items-center">
                            <div className={`w-16 h-1 rounded-[3px] ${index + 1 === curSlideN ? 'bg-dark' : 'bg-fon'}`}>

                            </div>
                        </div>)
                }

            </div>
        </div>
    );
};

export default Slider;