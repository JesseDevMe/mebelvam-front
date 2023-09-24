'use client'
import {FC, ReactNode, useEffect, useRef, useState} from "react";

interface SliderRlProps {
    children: ReactNode;
    count: number;
}

const SliderRL: FC<SliderRlProps> = ({children, count}) => {
    const [curSlideN, setCurSlideN] = useState(1);
    const swiperRef = useRef<HTMLDivElement>(null);
    const [slideWidth, setSlideWidth] = useState(0);


    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.target.clientWidth !== slideWidth) {
                    setSlideWidth(entry.target.clientWidth);
                }
            }
        });

        if (swiperRef.current?.firstElementChild?.firstElementChild?.firstElementChild)
            resizeObserver.observe(swiperRef.current.firstElementChild.firstElementChild.firstElementChild)

        return () => {
            resizeObserver.disconnect()
        }
    }, [swiperRef.current, slideWidth])


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
    }, [curSlideN]);


    return (
        <div ref={swiperRef} className="overflow-hidden relative">
            <div className="transition-transform duration-500 will-change-transform" style={{transform: 'translate(-' + (curSlideN * slideWidth - slideWidth) + 'px)'}}>
                {children}
            </div>

            <button onClick={prevSlide} className="absolute top-1/2 left-5 -translate-y-1/2 hidden md:block z-[40]">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="40" viewBox="0 0 42 40" fill="none">
                    <path d="M12 10C12 10 2 19.2993 2 20C2 20.7007 12 30 12 30" stroke="#292A2D" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            </button>

            <button onClick={nextSlide} className="absolute top-1/2 right-5 -translate-y-1/2 hidden md:block z-[40]">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="40" viewBox="0 0 42 40" fill="none">
                    <path d="M30 30C30 30 40 20.7007 40 20C40 19.2993 30 10 30 10" stroke="#292A2D" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            </button>

            <div className="absolute right-0 top-0 w-1/4 h-full bg-[linear-gradient(270deg,rgba(253,253,253,.8)7%,rgba(253,253,253,0)70%)]
                        z-[30]"></div>
        </div>
    );
};

export default SliderRL;