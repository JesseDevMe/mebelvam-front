'use client'
import React, {FC, useEffect, useRef, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

interface SortProps {

}

const Sort: FC<SortProps> = ({}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [curSort, setCurSort] = useState<'По умолчанию' | 'Сначала дешевые' | 'Сначала дорогие'>('По умолчанию');

    const sortRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sortOption = searchParams.get('sort')
        if (sortOption === 'asc') {
            setCurSort('Сначала дешевые');
        } else if (sortOption === 'desc') {
            setCurSort('Сначала дорогие')
        } else setCurSort('По умолчанию');
    }, [searchParams.get('sort')])

    function toggleHandler() {
        setIsOpen(!isOpen)
    }

    function defaultHandler() {
        setCurSort("По умолчанию");

        const newSearch = new URLSearchParams(searchParams);
        newSearch.delete('sort');
        newSearch.set('page', '1');
        router.push(pathname + '?' + newSearch.toString());

        setIsOpen(false);
    }

    function ascHandler() {
        setCurSort("Сначала дешевые");

        const newSearch = new URLSearchParams(searchParams);
        newSearch.set('sort', 'asc');
        newSearch.set('page', '1');
        router.push(pathname + '?' + newSearch.toString());

        setIsOpen(false);
    }

    function descHandler() {
        setCurSort("Сначала дорогие");

        const newSearch = new URLSearchParams(searchParams);
        newSearch.set('sort', 'desc');
        newSearch.set('page', '1');
        router.push(pathname + '?' + newSearch.toString());

        setIsOpen(false);
    }
    function bodyClickHandler(e: MouseEvent) {
        // @ts-ignore
        if (isOpen && !sortRef.current?.contains(e.target)) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', bodyClickHandler);

        return () => {
            document.body.removeEventListener('click', bodyClickHandler)
        }
    }, [isOpen])


    return (
        <div ref={sortRef} className="relative flex gap-x-2 items-center font-roboto">
            <span onClick={toggleHandler} className="cursor-pointer hover:text-accent">{curSort}</span>
            <div
                className={`${isOpen ? 'flex' : 'hidden'} flex-col absolute -left-1 w-[190px] top-full translate-y-[10px] bg-fon overflow-hidden rounded-[7px]
                shadow-[0px_0px_15px_-6px_rgba(0,0,0,0.1)] z-[20] border`}
            >
                <div
                    onClick={defaultHandler}
                    className="py-2 px-3 active:bg-gray-200 hover:bg-light border-b last:border-none cursor-pointer"
                >
                    <span>По умолчанию</span>
                    <svg className={`ml-4 ${curSort === 'По умолчанию' ? 'inline-block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                        <path d="M1 5.49838L4.89691 11L10 1" stroke="#292A2D" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                </div>

                <div
                    onClick={ascHandler}
                    className="py-2 px-3 active:bg-gray-200 hover:bg-light border-b last:border-none cursor-pointer"
                >
                    <span>Сначала дешевые</span>
                    <svg className={`ml-4 ${curSort === 'Сначала дешевые' ? 'inline-block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                        <path d="M1 5.49838L4.89691 11L10 1" stroke="#292A2D" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                </div>

                <div
                    onClick={descHandler}
                    className="py-2 px-3 active:bg-gray-200 hover:bg-light border-b last:border-none cursor-pointer"
                >
                    <span>Сначала дорогие </span>
                    <svg className={`ml-4 ${curSort === 'Сначала дорогие' ? 'inline-block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                        <path d="M1 5.49838L4.89691 11L10 1" stroke="#292A2D" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                </div>
            </div>
            <svg className={`transition duration-300 ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
                <path d="M5.24443 6.65822C5.12479 6.82573 4.87584 6.82574 4.75619 6.65824L0.338863 0.474379C0.197026 0.275819 0.338963 0 0.582978 0L9.41706 0C9.66107 0 9.80301 0.275803 9.66119 0.474364L5.24443 6.65822Z" fill="#292A2D"/>
            </svg>

        </div>
    );
};

export default Sort;