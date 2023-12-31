'use client'
import {FC, useEffect, useRef, useState} from "react";
import useCustomFiltersStore from "@/widgets/Filters/store/useCustomFiltersStore";

interface DefaultFilterProps {
    title: string;
    values: FilterValue[];
    storeValues: string[],
    addToStore: (value: string) => void,
    removeFromStore: (value: string) => void,
    colors?: boolean;
}

const DefaultFilter: FC<DefaultFilterProps> = ({ title, values, storeValues, addToStore, removeFromStore, colors }) => {
    const [isOpen, setIsOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);
    const isFiltersOpen = useCustomFiltersStore(state => state.isOpen);

    function handleToggle() {
        setIsOpen(!isOpen);
    }

    function handleCheckChange(isChecked: boolean, value: string) {
        if (isChecked) {
            removeFromStore(value);
        } else {
            addToStore(value);
        }
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
    }, [isOpen]);

    useEffect(() => {
        if (!filterRef.current || !isFiltersOpen) {
            return;
        }
        if (filterRef.current.getBoundingClientRect().left > (window.innerWidth / 3 * 2)) {
            const ul = filterRef.current.getElementsByTagName('ul')[0];
            if (!ul) {
                return;
            }
            ul.style.left = 'auto';
            ul.style.right = '0';
        } else {
            const ul = filterRef.current.getElementsByTagName('ul')[0];
            if (!ul) {
                return;
            }
            ul.style.left = '0';
            ul.style.right = 'auto';
        }

    }, [window.innerWidth, filterRef.current, isFiltersOpen]);

    return (
        <div ref={filterRef} className={`py-2.5 px-5 w-full border ${isOpen ? 'border-accent' : 'border-dark'} rounded 
            font-roboto max-w-[400px] md:max-w-fit relative`}
        >
            <h3
                className="flex justify-between items-center cursor-pointer gap-x-2.5 hover:text-accent"
                onClick={handleToggle}
            >
                <span className={isOpen ? 'text-accent' : ''}>{title}</span>
                <svg className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
                    <path d="M5.24443 6.65822C5.12479 6.82573 4.87584 6.82574 4.75619 6.65824L0.338863 0.474379C0.197026 0.275819 0.338963 0 0.582978 0L9.41706 0C9.66107 0 9.80301 0.275803 9.66119 0.474364L5.24443 6.65822Z"
                          fill={isOpen ? '#a50b34' : '#292A2D'}
                    />
                </svg>
            </h3>
            <ul className={`flex flex-col gap-y-4 bg-fon overflow-hidden transition-[max-height] md:transition-none duration-300 
                    ease-[cubic-bezier(1,0,1,0.5)] before:w-full ${isOpen ? 'max-h-[3000px]' : 'max-h-0 !ease-[cubic-bezier(0,1,0.5,1)] md:hidden'}
                    md:absolute md:left-0 md:-bottom-3 md:translate-y-full md:w-fit md:max-w-[250px] md:whitespace-nowrap md:overflow-y-auto md:max-h-[300px] scrollbar [scrollbar-width:thin] [scrollbar-color:_#cccccc_#f0f0f0] md:z-10 md:border md:rounded md:pl-2.5 md:pr-7 md:py-4 md:before:content-none`
            }
            >

                {
                    values.map((value) => {
                        const isChecked = storeValues.includes(value.value);

                        return <li key={value.value}>
                            <label className="flex gap-x-2.5 items-center cursor-pointer">
                                <span className="w-5 h-5 relative border border-dark rounded-[5px]">
                                    <input
                                        className="absolute left-0 top-0 w-full h-full appearance-none cursor-pointer" type="checkbox"
                                        checked={isChecked}
                                        onChange={() => handleCheckChange(isChecked, value.value)}
                                    />
                                    <div className={`${isChecked ? 'flex' : 'hidden'} w-full h-full justify-center items-center bg-dark`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14"
                                             viewBox="0 0 12 14" fill="none">
                                          <path
                                              d="M1 6.53846L5.24782 12.3024C5.47623 12.6124 5.95454 12.5587 6.10857 12.2058L11 1"
                                              stroke="#F2F2F1" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                    </div>
                                </span>
                                {colors && <span className="w-4 h-4 border rounded-full" style={{background: value.colorHash}}></span>}
                                <span>{value.name}</span>
                            </label>
                        </li>
                    }
                    )
                }
            </ul>
        </div>
    );
};

export default DefaultFilter;