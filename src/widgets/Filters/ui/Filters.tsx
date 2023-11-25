'use client'
import {FC, useEffect, useState} from "react";
import {Filter, FiltersType} from "@/entities/Filter";
import {ApplyFilters} from "@/features/ApplyFilters";
import {ClearFilters} from "@/features/ClearFilters";
import Image from "next/image";
import filterIcon from '@/../public/Pages/Furniture/icon_filter.svg'
import useCustomFiltersStore from "@/widgets/Filters/store/useCustomFiltersStore";
import {useSearchParams} from "next/navigation";
import useSizesStore from "@/widgets/Filters/store/useSizesStore";
import {SizeFilters} from "@/features/SizeFilters";
import {PriceFilter} from "@/features/PriceFilter";
import {ManufacturerFilter} from "@/features/ManufacturerFilter";
import useDefaultFiltersStore from "@/widgets/Filters/store/useDefaultFiltersStore";
import {Sort} from "@/features/Sort";
import usePriceStore from "@/widgets/Filters/store/usePriceStore";
import {ColorFilter} from "@/features/ColorFilter";

enum FetchStatus {
    LOADING,
    FAILED,
    DONE,
}

interface FiltersProps {
    subcategoryId: number;
}

const Filters: FC<FiltersProps> = ({ subcategoryId }) => {
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.LOADING);
    const [filters, setFilters] = useState<FiltersType | null>(null);
    const isOpen = useCustomFiltersStore(state => state.isOpen);
    const setIsOpen = useCustomFiltersStore(state => state.setIsOpen);

    const initFilterStore = useCustomFiltersStore(state => state.init);
    const initSizesStore = useSizesStore(state => state.init);
    const initManufacturerStore = useDefaultFiltersStore(state => state.initManufacturers);
    const initColorStore = useDefaultFiltersStore(state => state.initColors);
    const initPriceStore = usePriceStore(state => state.init);

    const searchParams = useSearchParams();
    const customParams = new URLSearchParams(searchParams);
    customParams.delete('page');
    customParams.delete('sort');
    customParams.delete('price');
    customParams.delete('manufacturer');
    customParams.delete('width');
    customParams.delete('height');
    customParams.delete('depth');
    customParams.delete('color');

    useEffect( () => {
        fetch(`/api/filters?subcategoryId=${subcategoryId}`)
            .then(res => {
                if (!res.ok) {
                    setFetchStatus(FetchStatus.FAILED);
                    throw new Error();
                } return res.json();
            })
            .then((data) => {
                setFilters(data);
                setFetchStatus(FetchStatus.DONE);
            })
            .catch(() => setFetchStatus(FetchStatus.FAILED));
    }, []);

    useEffect(() => {
        initFilterStore(customParams);
    }, [customParams]);

    useEffect(() => {
        initSizesStore(searchParams);
    }, [searchParams.get('width'), searchParams.get('height'), searchParams.get('depth')]);

    useEffect(() => {
        initManufacturerStore(searchParams.get('manufacturer'));
    }, [searchParams.get('manufacturer')]);

    useEffect(() => {
        initColorStore(searchParams.get('color'));
    }, [searchParams.get('color')]);

    useEffect(() => {
        initPriceStore(searchParams.get('price'))
    }, [searchParams.get('price')])

    function filterToggle() {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        if (isOpen && window.innerWidth < 768) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

    }, [isOpen]);

    return (
        <>
            <div className="flex justify-between items-center gap-x-[30px] col-span-2 lg:col-span-1 lg:justify-end">
                {fetchStatus === FetchStatus.LOADING &&
                    <>
                        <div className="h-[1em] w-32 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-[24px] w-[24px] bg-gray-200 rounded animate-pulse"></div>
                    </>
                }

                {fetchStatus === FetchStatus.DONE &&
                    <>
                        <Sort/>

                        <div onClick={filterToggle} className="cursor-pointer">
                            <Image src={filterIcon} alt='Фильтры'/>
                        </div>
                    </>
                }

                {fetchStatus === FetchStatus.FAILED &&
                    <span className="font-roboto text-red-500">Не удалось загрузить фильтры</span>
                }

            </div>

            <div
                className={`${isOpen ? 'block' : 'hidden'} fixed left-0 top-0 w-full h-full z-50 pt-5 pb-20 px-7 bg-fon overflow-scroll
                                md:overflow-visible md:relative md:h-fit md:mt-12 md:p-5 md:z-10 md:col-span-2 md:border md:rounded md:shadow-[0px_7px_30px_0px_rgba(41,42,45,0.10)]`
                }
            >
                <div className="flex justify-between items-center">
                    <h2 className="font-montserrat text-base font-semibold md:font-normal md:font-roboto">Фильтры</h2>
                    <svg onClick={() => setIsOpen(false)} className="cursor-pointer md:hidden"
                         xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <line x1="1" y1="-1" x2="21.487" y2="-1"
                              transform="matrix(0.709463 0.704742 -0.709463 0.704742 12 12)" stroke="#292A2D"
                              strokeWidth="2" strokeLinecap="round"/>
                        <line x1="1" y1="-1" x2="21.487" y2="-1"
                              transform="matrix(0.709463 -0.704742 0.709463 0.704742 13.0464 28)" stroke="#292A2D"
                              strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
                <div className="flex flex-col gap-y-2.5 mt-5 md:flex-row md:gap-x-4 md:flex-wrap">
                    {filters?.defaultFilters.price && <PriceFilter subcategoryId={subcategoryId}/>}
                    <SizeFilters
                        isWidth={filters?.defaultFilters.width || false}
                        isHeight={filters?.defaultFilters.height || false}
                        isDepth={filters?.defaultFilters.depth || false}
                        subcategoryId={subcategoryId}
                    />
                    {filters?.defaultFilters.manufacturer &&
                        <ManufacturerFilter
                            subcategoryId={subcategoryId}
                        />
                    }

                    {
                        filters?.defaultFilters.color &&
                        <ColorFilter subcategoryId={subcategoryId}/>
                    }


                    {
                        filters?.customFilters && fetchStatus === FetchStatus.DONE &&
                        filters.customFilters.map((filter) =>
                            <Filter key={filter.slug} title={filter.title} slug={filter.slug} values={filter.values}/>
                        )
                    }
                </div>
                <div className="flex gap-5 mt-7 font-roboto flex-wrap">
                    <ApplyFilters/>
                    <ClearFilters/>
                </div>
            </div>
        </>
    );
};

export default Filters;