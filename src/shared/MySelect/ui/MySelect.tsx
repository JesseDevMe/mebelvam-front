'use client'
import React, {Dispatch, FC, ReactNode, SetStateAction, useEffect, useRef, useState} from "react";
import Image from "next/image";
import saleSvg from "@/../public/Pages/Furniture/sale.svg"

type option = {
    name: string;
    value: any;
    isSale?: boolean;
}

interface MySelectProps {
    options: option[];
    changeHandler: (value: any) => void;
}

const MySelect: FC<MySelectProps> = ({ options, changeHandler }) => {
    const [curValue, setCurValue] = useState(options[0].name);
    const [isListOpen, setIsListOpen] = useState(false);

    function toggleList() {
        setIsListOpen(!isListOpen);
    }

    function optionHandler(option: option) {
        setCurValue(option.name);
        setIsListOpen(false);
        changeHandler(option.value);
    }

    useEffect(() => {
        function clickHandler(e: MouseEvent) {
            // if (e.target)
            setIsListOpen(false);
        }

        document.addEventListener('click', clickHandler);

        return () => {
            document.removeEventListener('click', clickHandler);
        }
    },[isListOpen]);

    return (
        <div
            className="relative border border-dark hover:border-accent group rounded select-none"
            onClick={(e) => {
                e.preventDefault()
            }}
        >
            <div onClick={toggleList} className="cursor-pointer group-hover:text-accent relative py-1.5 pl-5 pr-[50px]">
                {curValue}
                <span className={`absolute right-5 top-1/2 -translate-y-1/2 transition-transform duration-300 ${isListOpen ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 12 8" fill="none">
                        <path d="M6.24037 7.67999C6.12038 7.84 5.88038 7.84 5.76037 7.68001L0.360029 0.480008C0.211692 0.282238 0.352805 0 0.600023 0L11.4 0C11.6472 0 11.7883 0.28222 11.64 0.479993L6.24037 7.67999Z" fill="#292A2D"/>
                    </svg>
                </span>
            </div>
            <div
                className={`${isListOpen ? 'flex' : 'hidden'} flex-col absolute -right-1 -left-1 translate-y-[10px] bg-fon overflow-hidden rounded-[7px]
                shadow-[0px_0px_15px_-6px_rgba(0,0,0,0.1)] z-[20] border`}
            >
                {
                    options.map( (option) =>
                    <div
                        key={option.name}
                        onClick={() => optionHandler(option)}
                        className="py-2 px-3 active:bg-gray-200 hover:bg-light border-b last:border-none cursor-pointer"
                    >
                        {option.name} {option.isSale && <Image className="inline-block ml-2.5" width={24} height={24} src={saleSvg} alt='Скидка'/>}
                    </div>
                    )
                }
            </div>
        </div>
    );
};

export default MySelect;