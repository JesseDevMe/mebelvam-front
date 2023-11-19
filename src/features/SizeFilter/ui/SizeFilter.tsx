'use client'
import {ChangeEvent, FC, useEffect, useRef, useState} from "react";
import './../styles/style.css'
import useSizesStore, {min_max} from "@/widgets/Filters/store/useSizesStore";
import useCustomFiltersStore from "@/widgets/Filters/store/useCustomFiltersStore";

interface SizeFilterProps {
    title: string;
    min: number;
    max: number;
    setToStore: (min: number, max: number) => void;
    storeValue: min_max | undefined;
}

const SizeFilter: FC<SizeFilterProps> = ({ title, min, max, setToStore, storeValue }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [minValue, setMinValue] = useState(min);
    const [maxValue, setMaxValue] = useState(max);

    const [inputMin, setInputMin] = useState(min);
    const [inputMax, setInputMax] = useState(max);

    const [activeThumb, setActiveThumb] = useState(1);

    const minPos = ((minValue - min) / (max - min)) * 100;
    const maxPos = ((maxValue - min) / (max - min)) * 100;

    const filterRef = useRef<HTMLDivElement>(null);
    const isFiltersOpen = useCustomFiltersStore(state => state.isOpen);

    useEffect(() => {
        setMinValue(storeValue?.min || min);
        setMaxValue(storeValue?.max || max);
        setInputMin(storeValue?.min || min);
        setInputMax(storeValue?.max || max);
    }, [storeValue?.min, storeValue?.max, min, max])

    function handleToggle() {
        setIsOpen(!isOpen);
    }

    function setMinValueC(value: number) {
        setActiveThumb(1);
        setMinValue(value);
        setToStore(value, maxValue);
    }

    function setMaxValueC(value: number) {
        setActiveThumb(2);
        setMaxValue(value);
        setToStore(minValue, value);
    }

    function handleMinChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        const value = parseFloat(event.target.value);
        const newMinVal = Math.min(value, maxValue);
        setMinValueC(newMinVal);
        setInputMin(newMinVal);

    }

    function handleMaxChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        const value = parseFloat(event.target.value);
        const newMaxVal = Math.max(value, minValue);
        setMaxValueC(newMaxVal);
        setInputMax(newMaxVal);

    }

    function blurMinHandler(event: ChangeEvent<HTMLInputElement>) {
        const value = parseFloat(event.target.value);
        if (value < min) {
            setMinValueC(min);
            setInputMin(min);
            return;
        }

        setMinValueC(Math.min(value, maxValue));
        setInputMin(Math.min(value, maxValue));

    }

    function blurMaxHandler(event: ChangeEvent<HTMLInputElement>) {
        const value = parseFloat(event.target.value);

        if (value > max) {
            setMaxValueC(max);
            setInputMax(max);
            return;
        }

        setMaxValueC(Math.max(value, minValue));
        setInputMax(Math.max(value, minValue));
    }

    function inputMinHandler(event: ChangeEvent<HTMLInputElement>) {
        setInputMin(parseFloat(event.target.value))
    }

    function inputMaxHandler(event: ChangeEvent<HTMLInputElement>) {
        setInputMax(parseFloat(event.target.value))
    }

    function bodyClickHandler(e: MouseEvent) {
        // @ts-ignore
        if (isOpen && window.innerWidth >= 768 && !filterRef.current?.contains(e.target)) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', bodyClickHandler);

        return () => {
            document.body.removeEventListener('click', bodyClickHandler)
        }
    }, [isOpen])

    useEffect(() => {
        if (window.innerWidth < 768 || !filterRef.current || !isFiltersOpen) {
            return;
        }
        if (filterRef.current.getBoundingClientRect().left > (window.innerWidth / 3 * 2)) {
            const ul = filterRef.current.getElementsByTagName('div')[0];
            if (!ul) {
                return;
            }
            ul.style.left = 'auto';
            ul.style.right = '0';
        } else {
            const ul = filterRef.current.getElementsByTagName('div')[0];
            if (!ul) {
                return;
            }
            ul.style.left = '0';
            ul.style.right = 'auto';
        }

    }, [window.innerWidth, filterRef.current, isFiltersOpen]);

    return (
        <div
            ref={filterRef}
            className={`py-2.5 px-5 w-full border ${isOpen ? 'border-accent' : 'border-dark'} rounded font-roboto 
            max-w-[400px] md:max-w-fit relative`}
        >
            <h3
                className={`flex justify-between items-center cursor-pointer gap-x-2.5 ${isOpen ? 'text-accent' : ''}`}
                onClick={handleToggle}
            >
                <span>{title}</span>
                <svg className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
                    <path d="M5.24443 6.65822C5.12479 6.82573 4.87584 6.82574 4.75619 6.65824L0.338863 0.474379C0.197026 0.275819 0.338963 0 0.582978 0L9.41706 0C9.66107 0 9.80301 0.275803 9.66119 0.474364L5.24443 6.65822Z"
                          fill={isOpen ? '#a50b34' : '#292A2D'}
                    />
                </svg>
            </h3>

            <div
                className={`uleto flex flex-col bg-fon gap-y-4 overflow-hidden transition-[max-height] md:transition-none duration-300 
                    ease-[cubic-bezier(1,0,1,0.5)] before:w-1 ${isOpen ? 'max-h-[3000px]' : 'max-h-0 !ease-[cubic-bezier(0,1,0.5,1)] md:hidden'}
                    md:absolute md:left-0 md:-bottom-3 md:z-10 md:translate-y-full md:border md:rounded md:px-2.5 md:py-4 md:before:content-none`
                }
            >
                <div className="mt-1.5">
                    <div className="flex justify-between items-center">
                        <input className="hin border rounded max-w-[110px] px-2.5 py-0.5" type="number" placeholder={min.toString()} value={inputMin} onChange={inputMinHandler} onBlur={blurMinHandler}/>
                        <span>—</span>
                        <input className="hin border rounded max-w-[110px] px-2.5 py-0.5" type="number" placeholder={max.toString()} value={inputMax} onChange={inputMaxHandler} onBlur={blurMaxHandler}/>
                    </div>
                    <div className="relative mt-4 h-6 mx-[7px]">
                        <div className="absolute top-0 bottom-0 my-auto w-full h-1 bg-[#DADADA] rounded overflow-hidden">
                            <div
                                className={`absolute top-0 bottom-0 my-auto bg-dark`}
                                style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
                            ></div>
                        </div>

                        <div
                            className={`absolute top-0 bottom-0 my-auto w-3 h-3 rounded-full bg-dark hover:bg-black`}
                            style={{left: `calc(${minPos}% - 5px)`}}
                        ></div>

                        <div
                            className={`absolute top-0 bottom-0 my-auto w-3 h-3 rounded-full bg-dark hover:bg-black`}
                            style={{left: `calc(${maxPos}% - 5px)`}}
                        ></div>

                        <div className="absolute h-full mx-[calc(14px/-2)]" style={{width: `calc(100% + 14px)`}}>


                            <input
                                type="range"
                                min={min}
                                max={max}
                                value={minValue}
                                step={1}
                                className={`input z-10 absolute top-0 bottom-0 my-auto w-full appearance-none bg-transparent pointer-events-none opacity-0 ${activeThumb === 1 ? 'z-[11]' : 'z-10'}`}
                                onChange={handleMinChange}
                            />
                            <input
                                type="range"
                                min={min}
                                max={max}
                                value={maxValue}
                                step={1}
                                className={`input z-10 absolute top-0 bottom-0 my-auto w-full appearance-none bg-transparent pointer-events-none opacity-0 ${activeThumb === 2 ? 'z-[11]' : 'z-10'}`}
                                onChange={handleMaxChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SizeFilter;